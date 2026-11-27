'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { orgFormSchema, type OrgFormValues } from '@/lib/schemas'
import { OrganizationStatus, Prisma } from '@/prisma/generated/client'
import {
  getLocalAvailableCities,
  getLocalOrgBySlug,
  isLocalMockEnabled,
  mergeAndFilterLocalOrgs,
  type OrgWithLocationAndCategories,
} from '@/lib/mock-orgs'
import { type TxClient, withAuth } from './utils'

export async function trackDonationClick(organizationId: string) {
  if (isLocalMockEnabled() && organizationId.startsWith('mock-')) {
    return { success: true }
  }

  try {
    await prisma.auditLog.create({
      data: {
        action: 'DONATION_CLICK',
        entityId: organizationId,
        details: { timestamp: new Date().toISOString() },
      },
    })
    return { success: true }
  } catch (error) {
    console.error('[trackDonationClick] Error:', error)
    return { success: false }
  }
}

export async function getPublishedOrgs(filters?: {
  categorySlug?: string
  query?: string
  page?: number
  limit?: number
  featured?: boolean
  state?: string
  city?: string
  verified?: boolean
  sort?: string
  causeType?: 'ONG' | 'YOUTH_INITIATIVE'
  isDonatariaAutorizada?: boolean
}) {
  const {
    categorySlug,
    query,
    page = 1,
    limit = 10,
    featured,
    state,
    city,
    verified,
    sort,
    causeType,
    isDonatariaAutorizada,
  } = filters || {}
  const skip = (page - 1) * limit

  const whereClause: Prisma.OrganizationWhereInput = {
    status: OrganizationStatus.PUBLISHED,
  }

  if (causeType) {
    whereClause.causeType = causeType
  }

  if (isDonatariaAutorizada !== undefined) {
    whereClause.isDonatariaAutorizada = isDonatariaAutorizada
  }

  if (categorySlug) {
    whereClause.categories = {
      some: { slug: categorySlug },
    }
  }

  if (featured !== undefined) {
    whereClause.featured = featured
  }

  if (verified !== undefined) {
    whereClause.verified = verified
  }

  if (state || city) {
    whereClause.location = {}
    if (state) {
      whereClause.location.state = { contains: state, mode: 'insensitive' }
    }
    if (city) {
      whereClause.location.city = { contains: city, mode: 'insensitive' }
    }
  }

  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { shortDescription: { contains: query, mode: 'insensitive' } },
    ]
  }

  let orderByClause: Prisma.OrganizationOrderByWithRelationInput = { createdAt: 'desc' }
  if (sort === 'name-asc') {
    orderByClause = { name: 'asc' }
  } else if (sort === 'name-desc') {
    orderByClause = { name: 'desc' }
  } else if (sort === 'oldest') {
    orderByClause = { createdAt: 'asc' }
  }

  if (isLocalMockEnabled()) {
    let dbOrgs: OrgWithLocationAndCategories[] = []
    try {
      dbOrgs = await prisma.organization.findMany({
        where: whereClause,
        include: {
          location: true,
          categories: true,
        },
        orderBy: orderByClause,
      })
    } catch {
      dbOrgs = []
    }

    const merged = mergeAndFilterLocalOrgs(dbOrgs, filters)
    return {
      success: true,
      data: merged.orgs,
      meta: {
        total: merged.total,
        page: merged.page,
        limit: merged.limit,
        totalPages: merged.totalPages,
      },
    }
  }

  try {
    const [orgs, total] = await Promise.all([
      prisma.organization.findMany({
        where: whereClause,
        include: {
          location: true,
          categories: true,
        },
        skip,
        take: limit,
        orderBy: orderByClause,
      }),
      prisma.organization.count({ where: whereClause }),
    ])

    return {
      success: true,
      data: orgs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error('[getPublishedOrgs] Error:', error)
    return { success: false, error: 'Failed to fetch organizations' }
  }
}

export interface SearchableOrg {
  slug: string
  name: string
  shortDescription: string
  categories: string[]
  location: string
  verified: boolean
  causeType: 'ONG' | 'YOUTH_INITIATIVE'
  isDonatariaAutorizada: boolean
}

export async function getSearchableOrgs(): Promise<{
  success: boolean
  data?: SearchableOrg[]
  error?: string
}> {
  const mapToSearchable = (org: OrgWithLocationAndCategories): SearchableOrg => ({
    slug: org.slug,
    name: org.name,
    shortDescription: org.shortDescription,
    categories: org.categories.map((c) => c.name),
    location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
    verified: org.verified,
    causeType: org.causeType as 'ONG' | 'YOUTH_INITIATIVE',
    isDonatariaAutorizada: org.isDonatariaAutorizada,
  })

  if (isLocalMockEnabled()) {
    let dbOrgs: OrgWithLocationAndCategories[] = []
    try {
      dbOrgs = await prisma.organization.findMany({
        where: { status: OrganizationStatus.PUBLISHED },
        include: { location: true, categories: true },
        orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      })
    } catch {
      dbOrgs = []
    }

    const merged = mergeAndFilterLocalOrgs(dbOrgs, { limit: 200, sort: 'name-asc' })
    return {
      success: true,
      data: merged.orgs.map(mapToSearchable),
    }
  }

  try {
    const orgs = await prisma.organization.findMany({
      where: { status: OrganizationStatus.PUBLISHED },
      include: { location: true, categories: true },
      orderBy: [{ featured: 'desc' }, { name: 'asc' }],
      take: 200,
    })

    return {
      success: true,
      data: orgs.map(mapToSearchable),
    }
  } catch (error) {
    console.error('[getSearchableOrgs] Error:', error)
    return { success: false, error: 'Failed to fetch searchable organizations' }
  }
}

export async function getAvailableCities(state: string) {
  if (isLocalMockEnabled()) {
    let dbCities: string[] = []
    try {
      const locations = await prisma.location.findMany({
        where: {
          state: { contains: state, mode: 'insensitive' },
          organization: {
            status: OrganizationStatus.PUBLISHED,
          },
        },
        select: { city: true },
        distinct: ['city'],
        orderBy: { city: 'asc' },
      })
      dbCities = locations.map((l) => l.city)
    } catch {
      dbCities = []
    }
    return { success: true, data: getLocalAvailableCities(state, dbCities) }
  }

  try {
    const locations = await prisma.location.findMany({
      where: {
        state: { contains: state, mode: 'insensitive' },
        organization: {
          status: OrganizationStatus.PUBLISHED,
        },
      },
      select: {
        city: true,
      },
      distinct: ['city'],
      orderBy: {
        city: 'asc',
      },
    })

    const cities = locations.map((l) => l.city)
    return { success: true, data: cities }
  } catch (error) {
    console.error('[getAvailableCities] Error:', error)
    return { success: false, error: 'Failed to fetch cities' }
  }
}

export async function getOrgBySlug(slug: string) {
  if (isLocalMockEnabled()) {
    try {
      const org = await prisma.organization.findUnique({
        where: { slug },
        include: {
          location: true,
          socialLinks: true,
          categories: true,
        },
      })
      if (org) {
        return { success: true, data: org }
      }
    } catch {
      // Fall back to local mock organizations when DB is unreachable locally
    }

    const mockOrg = getLocalOrgBySlug(slug)
    if (mockOrg) {
      return { success: true, data: mockOrg }
    }
    return { success: false, error: 'Organization not found' }
  }

  try {
    const org = await prisma.organization.findUnique({
      where: { slug },
      include: {
        location: true,
        socialLinks: true,
        categories: true,
      },
    })

    if (!org) {
      return { success: false, error: 'Organization not found' }
    }

    return { success: true, data: org }
  } catch (error) {
    console.error('[getOrgBySlug] Error:', error)
    return { success: false, error: 'Failed to fetch organization' }
  }
}

export async function getOrganizationById(id: string) {
  return withAuth(async () => {
    try {
      const org = await prisma.organization.findUnique({
        where: { id },
        include: {
          location: true,
          socialLinks: true,
          categories: true,
        },
      })

      if (!org) {
        return { success: false, error: 'Organization not found' }
      }

      return { success: true, data: org }
    } catch (error) {
      console.error('[getOrganizationById] Error:', error)
      return { success: false, error: 'Failed to fetch organization' }
    }
  })
}

// ============================================================================
// PRIVATE ACTIONS (ADMIN ONLY)
// ============================================================================

export async function upsertOrganization(data: OrgFormValues, id?: string) {
  return withAuth(async () => {
    try {
      // 2. Validate data
      const validatedData = orgFormSchema.parse(data)
      const { location, socialLinks, categoryIds, ...orgData } = validatedData

      // 3. Upsert organization
      const result = await prisma.$transaction(async (tx: TxClient) => {
        let organization

        if (id) {
          // UPDATE existing organization
          organization = await tx.organization.update({
            where: { id },
            data: {
              ...orgData,
              categories: {
                set: categoryIds.map((catId) => ({ id: catId })),
              },
            },
          })

          // Update Location (Upsert)
          if (location) {
            await tx.location.upsert({
              where: { organizationId: id },
              create: { ...location, organizationId: id },
              update: location,
            })
          }

          // Update Social Links (Delete all and recreate to avoid complex syncing)
          if (socialLinks && socialLinks.length > 0) {
            await tx.socialLink.deleteMany({ where: { organizationId: id } })
            await tx.socialLink.createMany({
              data: socialLinks.map((link) => ({
                ...link,
                organizationId: id,
              })),
            })
          }

          // Log action
          await tx.auditLog.create({
            data: {
              action: 'UPDATE',
              entityId: id,
              details: JSON.parse(JSON.stringify(validatedData)),
            },
          })
        } else {
          // CREATE new organization
          organization = await tx.organization.create({
            data: {
              ...orgData,
              location: location ? { create: location } : undefined,
              socialLinks:
                socialLinks && socialLinks.length > 0 ? { create: socialLinks } : undefined,
              categories: {
                connect: categoryIds.map((catId) => ({ id: catId })),
              },
            },
          })

          // Log action
          await tx.auditLog.create({
            data: {
              action: 'CREATE',
              entityId: organization.id,
              details: JSON.parse(JSON.stringify(validatedData)),
            },
          })
        }

        return organization
      })

      revalidatePath('/admin')
      revalidatePath('/directory')
      return { success: true, data: result }
    } catch (error) {
      console.error('[upsertOrganization] Error:', error)
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: 'An unexpected error occurred' }
    }
  })
}

export async function toggleOrgStatus(id: string, status: OrganizationStatus) {
  return withAuth(async () => {
    try {
      const result = await prisma.$transaction(async (tx: TxClient) => {
        const org = await tx.organization.update({
          where: { id },
          data: { status },
        })

        // Log action
        await tx.auditLog.create({
          data: {
            action: 'UPDATE_STATUS',
            entityId: id,
            details: { newStatus: status },
          },
        })

        return org
      })

      revalidatePath('/admin')
      return { success: true, data: result }
    } catch (error) {
      console.error('[toggleOrgStatus] Error:', error)
      return { success: false, error: 'Failed to toggle status' }
    }
  })
}

// ============================================================================
// ADMIN TABLE ACTIONS
// ============================================================================

export async function getAdminOrganizations(filters?: {
  query?: string
  status?: OrganizationStatus
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}) {
  return withAuth(async () => {
    const {
      query,
      status,
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
    } = filters || {}
    const skip = (page - 1) * limit

    try {
      const whereClause: Prisma.OrganizationWhereInput = {}

      if (status) {
        whereClause.status = status
      }

      if (query) {
        whereClause.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ]
      }

      let orderByClause: Prisma.OrganizationOrderByWithRelationInput = { createdAt: 'desc' }
      if (['createdAt', 'name', 'featured', 'updatedAt'].includes(sort)) {
        orderByClause = { [sort]: order }
      }

      const [orgs, total] = await Promise.all([
        prisma.organization.findMany({
          where: whereClause,
          include: {
            location: true,
            categories: true,
          },
          skip,
          take: limit,
          orderBy: orderByClause,
        }),
        prisma.organization.count({ where: whereClause }),
      ])

      return {
        success: true,
        data: orgs,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }
    } catch (error) {
      console.error('[getAdminOrganizations] Error:', error)
      return { success: false, error: 'Failed to fetch organizations' }
    }
  })
}

export async function toggleOrgFeatured(id: string) {
  return withAuth(async () => {
    try {
      const org = await prisma.organization.findUnique({
        where: { id },
        select: { featured: true },
      })
      if (!org) {
        return { success: false, error: 'Organization not found' }
      }

      const result = await prisma.$transaction(async (tx: TxClient) => {
        const updated = await tx.organization.update({
          where: { id },
          data: { featured: !org.featured },
        })

        await tx.auditLog.create({
          data: {
            action: 'TOGGLE_FEATURED',
            entityId: id,
            details: { featured: !org.featured },
          },
        })

        return updated
      })

      revalidatePath('/admin')
      return { success: true, data: result }
    } catch (error) {
      console.error('[toggleOrgFeatured] Error:', error)
      return { success: false, error: 'Failed to toggle featured' }
    }
  })
}

export async function deleteOrganization(id: string) {
  return withAuth(async () => {
    try {
      const result = await prisma.$transaction(async (tx: TxClient) => {
        const org = await tx.organization.update({
          where: { id },
          data: { status: OrganizationStatus.ARCHIVED },
        })

        await tx.auditLog.create({
          data: {
            action: 'SOFT_DELETE',
            entityId: id,
            details: { previousStatus: org.status, newStatus: OrganizationStatus.ARCHIVED },
          },
        })

        return org
      })

      revalidatePath('/admin')
      return { success: true, data: result }
    } catch (error) {
      console.error('[deleteOrganization] Error:', error)
      return { success: false, error: 'Failed to delete organization' }
    }
  })
}

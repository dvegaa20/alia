'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { orgFormSchema, type OrgFormValues } from '@/lib/schemas'
import { OrganizationStatus, Prisma } from '@/prisma/generated/client'
import { type TxClient, withAuth } from './utils'

export async function trackDonationClick(organizationId: string) {
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
  } = filters || {}
  const skip = (page - 1) * limit

  try {
    const whereClause: Prisma.OrganizationWhereInput = {
      status: OrganizationStatus.PUBLISHED,
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

export async function getAvailableCities(state: string) {
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

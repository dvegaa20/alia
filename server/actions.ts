'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { orgFormSchema, type OrgFormValues } from '@/lib/schemas'
import { OrganizationStatus } from '@/prisma/generated/client'

type TxClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0]

// ============================================================================
// PUBLIC ACTIONS
// ============================================================================

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
  const { categorySlug, query, page = 1, limit = 10, featured, state, city, verified, sort } = filters || {}
  const skip = (page - 1) * limit

  try {
    const whereClause: any = {
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

    let orderByClause: any = { createdAt: 'desc' }
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

export async function getTopCategoriesWithOrgs() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            organizations: {
              where: { status: OrganizationStatus.PUBLISHED },
            },
          },
        },
        organizations: {
          where: { status: OrganizationStatus.PUBLISHED },
          orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' }
          ],
          take: 5,
          include: {
            location: true
          }
        },
      },
    })

    // Sort by org count descending and take top 5
    const topCategories = categories
      .sort((a, b) => b._count.organizations - a._count.organizations)
      .slice(0, 5)

    return { success: true, data: topCategories }
  } catch (error) {
    console.error('[getTopCategoriesWithOrgs] Error:', error)
    return { success: false, error: 'Failed to fetch top categories' }
  }
}

export async function getAllCategoriesWithCount() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            organizations: {
              where: { status: OrganizationStatus.PUBLISHED },
            },
          },
        },
      },
    })

    // Sort by org count descending
    const sortedCategories = categories
      .filter((cat) => cat._count.organizations > 0) // Optional: only show categories with orgs
      .sort((a, b) => b._count.organizations - a._count.organizations)

    return { success: true, data: sortedCategories }
  } catch (error) {
    console.error('[getAllCategoriesWithCount] Error:', error)
    return { success: false, error: 'Failed to fetch all categories' }
  }
}

export async function getFeaturedOrganizations() {
  try {
    const orgs = await prisma.organization.findMany({
      where: {
        status: OrganizationStatus.PUBLISHED,
        verified: true,
        featured: true,
      },
      take: 5,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        location: true,
        categories: true,
      },
    })
    return { success: true, data: orgs }
  } catch (error) {
    console.error('[getFeaturedOrganizations] Error:', error)
    return { success: false, error: 'Failed to fetch featured organizations' }
  }
}

export async function getLatestByCategory(categorySlug: string) {
  try {
    const orgs = await prisma.organization.findMany({
      where: {
        status: OrganizationStatus.PUBLISHED,
        verified: true,
        categories: {
          some: { slug: categorySlug }
        }
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        location: true,
        categories: true,
      },
    })
    return { success: true, data: orgs }
  } catch (error) {
    console.error('[getLatestByCategory] Error:', error)
    return { success: false, error: 'Failed to fetch latest by category' }
  }
}

// ============================================================================
// PRIVATE ACTIONS (ADMIN ONLY)
// ============================================================================

export async function upsertOrganization(data: OrgFormValues, id?: string) {
  try {
    // 1. Authenticate user
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

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
            adminId: userId,
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
            adminId: userId,
            details: JSON.parse(JSON.stringify(validatedData)),
          },
        })
      }

      return organization
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('[upsertOrganization] Error:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function toggleOrgStatus(id: string, status: OrganizationStatus) {
  try {
    // 1. Authenticate user
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

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
          adminId: userId,
          details: { newStatus: status },
        },
      })

      return org
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('[toggleOrgStatus] Error:', error)
    return { success: false, error: 'Failed to toggle status' }
  }
}

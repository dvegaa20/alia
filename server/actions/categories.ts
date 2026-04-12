'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { OrganizationStatus } from '@/prisma/generated/client'
import { slugify } from '@/lib/utils'
import { withAuth } from './utils'

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
          orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
          take: 5,
          include: {
            location: true,
          },
        },
      },
    })

    // Sort by org count descending and take top 4
    const topCategories = categories
      .sort((a, b) => b._count.organizations - a._count.organizations)
      .slice(0, 4)

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

export async function getPublicCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    return { success: true, data: categories }
  } catch (error) {
    console.error('[getPublicCategories] Error:', error)
    return { success: false, error: 'Failed to fetch categories' }
  }
}

export async function getLatestByCategory(categorySlug: string) {
  try {
    const orgs = await prisma.organization.findMany({
      where: {
        status: OrganizationStatus.PUBLISHED,
        verified: true,
        categories: {
          some: { slug: categorySlug },
        },
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
// ADMIN ACTIONS
// ============================================================================

export async function getAdminCategories() {
  return withAuth(async () => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { organizations: true },
          },
        },
        orderBy: { name: 'asc' },
      })

      return { success: true, data: categories }
    } catch (error) {
      console.error('[getAdminCategories] Error:', error)
      return { success: false, error: 'Failed to fetch categories' }
    }
  })
}

export async function upsertAdminCategory(data: {
  name: string
  description?: string
  id?: string
}) {
  return withAuth(async () => {
    try {
      const slug = slugify(data.name)

      let result
      if (data.id) {
        result = await prisma.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
            slug,
            description: data.description,
          },
        })
      } else {
        result = await prisma.category.create({
          data: {
            name: data.name,
            slug,
            description: data.description,
          },
        })
      }

      revalidatePath('/admin/categories')
      return { success: true, data: result }
    } catch (error) {
      console.error('[upsertAdminCategory] Error:', error)
      return { success: false, error: 'Failed to upsert category' }
    }
  })
}

export async function deleteAdminCategory(id: string) {
  return withAuth(async () => {
    try {
      const result = await prisma.category.delete({
        where: { id },
      })

      revalidatePath('/admin/categories')
      return { success: true, data: result }
    } catch (error) {
      console.error('[deleteAdminCategory] Error:', error)
      return { success: false, error: 'Failed to delete category' }
    }
  })
}

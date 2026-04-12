'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { suggestionSchema, type SuggestionValues } from '@/lib/schemas'
import { OrganizationStatus, SuggestionStatus, Prisma } from '@/prisma/generated/client'
import { slugify } from '@/lib/utils'
import { type TxClient, withAuth } from './utils'

/**
 * PUBLIC: Submit a suggestion from an anonymous user.
 * No auth required.
 */
export async function submitSuggestion(data: SuggestionValues) {
  try {
    const validated = suggestionSchema.parse(data)

    const suggestion = await prisma.suggestion.create({
      data: validated,
    })

    revalidatePath('/admin/suggestions')
    return { success: true, data: suggestion }
  } catch (error) {
    console.error('[submitSuggestion] Error:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'No se pudo enviar la sugerencia.' }
  }
}

/**
 * ADMIN: Fetch suggestions with filters/pagination.
 */
export async function getAdminSuggestions(filters?: {
  query?: string
  status?: string
  page?: number
  limit?: number
}) {
  return withAuth(async () => {
    const { query, status, page = 1, limit = 10 } = filters || {}
    const skip = (page - 1) * limit

    try {
      const whereClause: Prisma.SuggestionWhereInput = {}

      if (status && status !== 'ALL') {
        whereClause.status = status as SuggestionStatus
      }

      if (query) {
        whereClause.OR = [
          { orgName: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
        ]
      }

      const [suggestions, total] = await Promise.all([
        prisma.suggestion.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.suggestion.count({ where: whereClause }),
      ])

      return {
        success: true,
        data: suggestions,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }
    } catch (error) {
      console.error('[getAdminSuggestions] Error:', error)
      return { success: false, error: 'Failed to fetch suggestions' }
    }
  })
}

/**
 * ADMIN: Approve a suggestion.
 * Creates a new Organization in DRAFT status with the suggestion data,
 * creates the category if it doesn't exist, and marks the suggestion as APPROVED.
 */
export async function approveSuggestion(id: string, adminNotes?: string) {
  return withAuth(async () => {
    try {
      const suggestion = await prisma.suggestion.findUnique({ where: { id } })
      if (!suggestion) {
        return { success: false, error: 'Suggestion not found' }
      }

      if (suggestion.status !== SuggestionStatus.PENDING) {
        return { success: false, error: 'Suggestion already reviewed' }
      }

      const result = await prisma.$transaction(async (tx: TxClient) => {
        // 1. Find or create category by slug
        const categorySlug = slugify(suggestion.category)
        let category = await tx.category.findUnique({ where: { slug: categorySlug } })
        if (!category) {
          category = await tx.category.create({
            data: {
              name: suggestion.category,
              slug: categorySlug,
            },
          })
        }

        // 2. Create Organization in DRAFT
        const orgSlug = slugify(suggestion.orgName)

        // Ensure unique slug — append random suffix if slug already exists
        let finalSlug = orgSlug
        const existingOrg = await tx.organization.findUnique({ where: { slug: orgSlug } })
        if (existingOrg) {
          finalSlug = `${orgSlug}-${Date.now().toString(36)}`
        }

        const organization = await tx.organization.create({
          data: {
            name: suggestion.orgName,
            slug: finalSlug,
            shortDescription: suggestion.description.substring(0, 160),
            fullDescription: suggestion.description,
            status: OrganizationStatus.DRAFT,
            email: '', // Admin will fill this in
            website: suggestion.url,
            categories: {
              connect: [{ id: category.id }],
            },
          },
        })

        // 3. Mark suggestion as APPROVED
        await tx.suggestion.update({
          where: { id },
          data: {
            status: SuggestionStatus.APPROVED,
            adminNotes: adminNotes || null,
            reviewedAt: new Date(),
          },
        })

        // 4. Audit log
        await tx.auditLog.create({
          data: {
            action: 'SUGGESTION_APPROVED',
            entityId: organization.id,
            details: {
              suggestionId: id,
              organizationId: organization.id,
              categoryId: category.id,
            },
          },
        })

        return organization
      })

      revalidatePath('/admin/suggestions')
      revalidatePath('/admin')
      revalidatePath('/admin/categories')
      return { success: true, data: result }
    } catch (error) {
      console.error('[approveSuggestion] Error:', error)
      if (error instanceof Error) {
        return { success: false, error: error.message }
      }
      return { success: false, error: 'Failed to approve suggestion' }
    }
  })
}

/**
 * ADMIN: Reject a suggestion.
 */
export async function rejectSuggestion(id: string, adminNotes?: string) {
  return withAuth(async () => {
    try {
      const suggestion = await prisma.suggestion.findUnique({ where: { id } })
      if (!suggestion) {
        return { success: false, error: 'Suggestion not found' }
      }

      if (suggestion.status !== SuggestionStatus.PENDING) {
        return { success: false, error: 'Suggestion already reviewed' }
      }

      await prisma.$transaction(async (tx: TxClient) => {
        await tx.suggestion.update({
          where: { id },
          data: {
            status: SuggestionStatus.REJECTED,
            adminNotes: adminNotes || null,
            reviewedAt: new Date(),
          },
        })

        await tx.auditLog.create({
          data: {
            action: 'SUGGESTION_REJECTED',
            entityId: id,
            details: { suggestionId: id, reason: adminNotes },
          },
        })
      })

      revalidatePath('/admin/suggestions')
      return { success: true }
    } catch (error) {
      console.error('[rejectSuggestion] Error:', error)
      return { success: false, error: 'Failed to reject suggestion' }
    }
  })
}

/**
 * ADMIN: Get count of PENDING suggestions for sidebar badge.
 */
export async function getPendingSuggestionsCount() {
  return withAuth(async () => {
    try {
      const count = await prisma.suggestion.count({
        where: { status: SuggestionStatus.PENDING },
      })

      return { success: true, data: count }
    } catch (error) {
      console.error('[getPendingSuggestionsCount] Error:', error)
      return { success: false, error: 'Failed to count suggestions' }
    }
  })
}

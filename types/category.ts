import type { Category, Organization, Location } from '@/prisma/generated/client'

// ============================================================================
// Category Types
// ============================================================================

/** Category with org count — used in admin CategoriesTable and directory SidebarFilters */
export type CategoryWithCount = {
  id: string
  name: string
  slug: string
  description: string | null
  _count: {
    organizations: number
  }
}

/** Category with full organizations — used in home CategoriesSection */
export type DynamicCategoryData = Category & {
  organizations: (Organization & { location: Location | null })[]
}

/** Minimal category shape — used in sidebar filters and dropdowns */
export type CategoryData = {
  id: string
  slug: string
  name: string
  _count: { organizations: number }
}

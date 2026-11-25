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

/** Minimal category shape — used in sidebar filters and dropdowns */
export type CategoryData = {
  id: string
  slug: string
  name: string
  _count: { organizations: number }
}

import type { OrganizationCardProps } from './organization'
import type { CategoryData } from './category'

// ============================================================================
// Directory Types (map, grid, filters)
// ============================================================================

/** A point on the map representing an organization */
export interface MapPoint {
  slug: string
  name: string
  categories: string[]
  location: string
  coordinates: [number, number] // [lng, lat]
  logoImage: string
  verified: boolean
}

/** Props for MapView component */
export interface MapViewProps {
  total?: number
  mapPoints: MapPoint[]
}

/** View mode toggle for the directory */
export type ViewMode = 'list' | 'map'

/** Props for ResultsGrid component */
export interface ResultsGridProps {
  organizations: OrganizationCardProps[]
  mapPoints: MapPoint[]
  total: number
  currentPage: number
  totalPages: number
  searchQuery?: string
  sort?: string
}

/** Props for SidebarFilters component */
export interface SidebarFiltersProps {
  searchQuery?: string
  categories?: CategoryData[]
  activeCategorySlug?: string
  activeState?: string
  activeCity?: string
  activeVerified?: boolean
}

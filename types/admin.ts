import type { OrgWithRelations } from './organization'
import type { SuggestionRow } from './suggestion'
import type { CategoryWithCount } from './category'
import type { OrgFormValues } from '@/lib/schemas'

// ============================================================================
// Admin Shared Types
// ============================================================================

/** Pagination metadata returned by server actions and used by admin tables */
export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Status config entry for status badge rendering */
export interface StatusConfigEntry {
  label: string
  dotColor: string
  textColor: string
}

/** Generic status config record */
export type StatusConfig = Record<string, StatusConfigEntry>

// ============================================================================
// Admin Table Props
// ============================================================================

/** Props for OrganizationsTable */
export interface OrganizationsTableProps {
  organizations: OrgWithRelations[]
  meta: PaginationMeta
  categories: { id: string; name: string }[]
}

/** Props for SuggestionsTable */
export interface SuggestionsTableProps {
  suggestions: SuggestionRow[]
  meta: PaginationMeta
}

/** Props for CategoriesTable */
export interface CategoriesTableProps {
  categories: CategoryWithCount[]
}

/** Props for OrganizationSheet */
export interface OrganizationSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organization?: import('./organization').OrgWithAllRelations | null
  isLoading?: boolean
  categories: { id: string; name: string }[]
  onSave: (data: OrgFormValues, id?: string) => Promise<{ success: boolean; error?: string }>
}

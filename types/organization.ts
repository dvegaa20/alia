import type {
  Organization,
  Category,
  Location,
  SocialLink,
  OrganizationStatus,
} from '@/prisma/generated/client'

// ============================================================================
// JSON Field Interfaces (typed replacements for `any` in Prisma JSON fields)
// ============================================================================

/** A single need item stored in Organization.needs JSON field */
export interface NeedItem {
  category: string
  urgency: 'alta' | 'media' | 'baja'
  title: string
  description: string
  quantity?: string
}

/** An impact highlight stored in Organization.impactHighlights JSON array */
export interface ImpactHighlight {
  value: string
  label: string
  description?: string
}

/** Testimony stored in Organization.impactTestimony JSON field */
export interface ImpactTestimony {
  quote: string
  author: string
  role: string
}

/** A single day's office hours */
export interface DayHours {
  open: string
  close: string
}

/** Office hours stored in Organization.officeHours JSON field */
export type OfficeHours = Record<string, DayHours | null>

// ============================================================================
// Organization Composite Types (from Prisma relations)
// ============================================================================

/** Organization with all relations — used in admin OrganizationSheet for full editing */
export type OrgWithAllRelations = Organization & {
  location: Location | null
  socialLinks: SocialLink[]
  categories: Category[]
}

/** Organization with minimal relations — used in admin OrganizationsTable rows */
export type OrgWithRelations = {
  id: string
  slug: string
  name: string
  logoUrl: string | null
  website: string | null
  email: string
  status: OrganizationStatus
  featured: boolean
  location: { city: string; state: string } | null
  categories: { id: string; name: string; slug: string }[]
}

// ============================================================================
// Public-facing Organization Types
// ============================================================================

/** Props for the OrganizationCard component in the directory */
export interface OrganizationCardProps {
  slug: string
  name: string
  description: string
  categories: string[]
  location: string
  coverImage: string
  logoImage: string
  verified?: boolean
}

/** Organization option for the hero search combobox */
export type OrganizationOption = {
  slug: string
  name: string
  categories: string[]
  logo: string
}

/** Props for the OrgTabs component */
export interface OrgTabsProps {
  name: string
  fullDescription: string | null
  galleryImages: string[]
  email: string
  phone?: string | null
  website?: string | null
  location?: string | null
  googleMapsUrl?: string | null
  coordinates?: { lat: number | null; lng: number | null } | null
  impactCurrent?: number | null
  impactGoal?: number | null
  impactType?: string | null
  relevantLinks: string[]
  needs?: NeedItem[]
  impactHighlights?: ImpactHighlight[]
  impactTestimony?: ImpactTestimony
  foundedYear?: number | null
  verified?: boolean
  officeHours?: OfficeHours
}

/** Props for ContactTab */
export interface ContactTabProps {
  email: string
  phone?: string | null
  location?: string | null
  googleMapsUrl?: string | null
  coordinates?: { lat: number | null; lng: number | null } | null
  officeHours?: OfficeHours
}

/** Props for ImpactTab */
export interface ImpactTabProps {
  impactHighlights?: ImpactHighlight[]
  impactTestimony?: ImpactTestimony
  foundedYear?: number | null
  verified?: boolean
}

/** Props for NeedsTab */
export interface NeedsTabProps {
  needs?: NeedItem[]
}

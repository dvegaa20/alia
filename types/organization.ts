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

/** Featured fact stored in Organization.featuredFact JSON field */
export interface FeaturedFact {
  value: string
  unit: string
  label: string
  description?: string
  badge?: string
}

/** A secondary fact stored in Organization.secondaryFacts JSON array */
export interface SecondaryFact {
  value: string
  unit: string
  label: string
  icon?: string
  color?: string
}

/** Testimony stored in Organization.testimony JSON field */
export interface Testimony {
  quote: string
  author: string
  role: string
  avatarUrl?: string
}

/** Milestone stat entry */
export interface MilestoneStat {
  value: string
  label: string
}

/** Milestone stored in Organization.milestone JSON field */
export interface Milestone {
  category: string
  tagline: string
  stats?: MilestoneStat[]
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
  category: string
  location: string
  coverImage: string
  logoImage: string
  verified?: boolean
}

/** Organization option for the hero search combobox */
export type OrganizationOption = {
  slug: string
  name: string
  category: string
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
  featuredFact?: FeaturedFact
  secondaryFacts?: SecondaryFact[]
  testimony?: Testimony
  milestone?: Milestone
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
  featuredFact?: FeaturedFact
  secondaryFacts?: SecondaryFact[]
  testimony?: Testimony
  milestone?: Milestone
  foundedYear?: number | null
  verified?: boolean
}

/** Props for NeedsTab */
export interface NeedsTabProps {
  needs?: NeedItem[]
}

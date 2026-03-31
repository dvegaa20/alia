import * as z from 'zod'
import { OrganizationStatus, SocialPlatform } from '@/prisma/generated/enums'

export const locationSchema = z.object({
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  googleMapsUrl: z.url('Must be a valid URL').optional().or(z.literal('')),
})

export const socialLinkSchema = z.object({
  platform: z.enum(
    Object.values(SocialPlatform) as [string, ...string[]]
  ) as z.ZodType<SocialPlatform>,
  url: z.url('Must be a valid URL'),
})

export const orgFormSchema = z.object({
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  name: z.string().min(2, 'Name is required'),
  shortDescription: z
    .string()
    .min(10, 'Short description is required')
    .max(160, 'Short description must be 160 characters or less'),
  fullDescription: z.string().optional(),
  logoUrl: z.url().optional().or(z.literal('')),
  coverImageUrl: z.url().optional().or(z.literal('')),
  status: (
    z.enum(
      Object.values(OrganizationStatus) as [string, ...string[]]
    ) as z.ZodType<OrganizationStatus>
  ).default('DRAFT'),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  website: z.url().optional().or(z.literal('')),
  email: z.email('Invalid email address'),
  phone: z.string().optional(),
  donationLink: z.url().optional().or(z.literal('')),
  foundedYear: z.number().int().optional(),

  // Gallery
  galleryImages: z.array(z.string()).default([]),

  // Impact sidebar
  impactCurrent: z.number().int().optional(),
  impactGoal: z.number().int().optional(),
  impactType: z.string().optional(),

  // Explore tab
  relevantLinks: z.array(z.string()).default([]),

  // Impact tab (JSON)
  featuredFact: z.any().optional(),
  secondaryFacts: z.any().optional(),
  testimony: z.any().optional(),
  milestone: z.any().optional(),

  // Contact tab
  officeHours: z.any().optional(),

  // Relations
  location: locationSchema.optional(),
  socialLinks: z.array(socialLinkSchema).default([]),
  categoryIds: z.array(z.string()).default([]),
})

export type OrgFormValues = z.infer<typeof orgFormSchema>

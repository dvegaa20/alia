import * as z from "zod";
import { OrganizationStatus, SocialPlatform } from ".prisma/client/enums";

export const locationSchema = z.object({
  street: z.string().min(2, "Street is required"),
  exteriorNumber: z.string().min(1, "Exterior number is required"),
  interiorNumber: z.string().optional(),
  neighborhood: z.string().min(2, "Neighborhood is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  googleMapsUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
});

export const socialLinkSchema = z.object({
  platform: z.enum(Object.values(SocialPlatform) as [string, ...string[]]) as z.ZodType<SocialPlatform>,
  url: z.url("Must be a valid URL"),
});

export const orgFormSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  name: z.string().min(2, "Name is required"),
  shortDescription: z
    .string()
    .min(10, "Short description is required")
    .max(160, "Short description must be 160 characters or less"),
  fullDescription: z.string().optional(),
  logoUrl: z.url().optional().or(z.literal("")),
  coverImageUrl: z.url().optional().or(z.literal("")),
  status: (z.enum(Object.values(OrganizationStatus) as [string, ...string[]]) as z.ZodType<OrganizationStatus>).default("DRAFT"),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  website: z.url().optional().or(z.literal("")),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  donationLink: z.url().optional().or(z.literal("")),
  
  // Relations
  location: locationSchema.optional(),
  socialLinks: z.array(socialLinkSchema).default([]),
  categoryIds: z.array(z.string()).default([]),
});

export type OrgFormValues = z.infer<typeof orgFormSchema>;

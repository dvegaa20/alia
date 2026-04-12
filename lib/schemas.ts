import * as z from 'zod'
import { OrganizationStatus, SocialPlatform } from '@/prisma/generated/enums'

export const locationSchema = z.object({
  city: z.string().min(2, 'La ciudad es obligatoria'),
  state: z.string().min(2, 'El estado es obligatorio'),
  googleMapsUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  latitude: z
    .number()
    .min(-90, 'Latitud mínima: -90')
    .max(90, 'Latitud máxima: 90')
    .optional()
    .nullable(),
  longitude: z
    .number()
    .min(-180, 'Longitud mínima: -180')
    .max(180, 'Longitud máxima: 180')
    .optional()
    .nullable(),
})

export const socialLinkSchema = z.object({
  platform: z.enum(
    Object.values(SocialPlatform) as [string, ...string[]]
  ) as z.ZodType<SocialPlatform>,
  url: z.url('Debe ser una URL válida'),
})

export const orgFormSchema = z.object({
  slug: z
    .string()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  name: z.string().min(2, 'El nombre es obligatorio'),
  shortDescription: z
    .string()
    .min(10, 'La descripción corta debe tener al menos 10 caracteres')
    .max(160, 'La descripción corta no puede exceder 160 caracteres'),
  fullDescription: z.string().optional(),
  logoUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  coverImageUrl: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  status: (
    z.enum(
      Object.values(OrganizationStatus) as [string, ...string[]]
    ) as z.ZodType<OrganizationStatus>
  ).default('DRAFT'),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  website: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  email: z.email('Ingresa un email válido'),
  phone: z.string().optional(),
  donationLink: z.url('Debe ser una URL válida').optional().or(z.literal('')),
  foundedYear: z.preprocess(
    (val) =>
      val === '' || val === undefined || val === null || Number.isNaN(val)
        ? undefined
        : Number(val),
    z
      .number()
      .int('Debe ser un año válido')
      .min(1800, 'El año debe ser mayor a 1800')
      .max(new Date().getFullYear(), `El año no puede ser mayor a ${new Date().getFullYear()}`)
      .optional()
  ),

  // Gallery
  galleryImages: z.array(z.string()).default([]),

  // Impact sidebar
  impactCurrent: z.preprocess(
    (val) =>
      val === '' || val === undefined || val === null || Number.isNaN(val)
        ? undefined
        : Number(val),
    z.number().int().optional()
  ),
  impactGoal: z.preprocess(
    (val) =>
      val === '' || val === undefined || val === null || Number.isNaN(val)
        ? undefined
        : Number(val),
    z.number().int().optional()
  ),
  impactType: z.string().optional(),

  // Explore tab
  relevantLinks: z.array(z.string()).default([]),

  // Needs tab (JSON)
  needs: z.any().optional(),

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

export const suggestionSchema = z.object({
  orgName: z.string().min(2, 'El nombre es obligatorio.'),
  category: z.string().min(1, 'Selecciona una categoría.'),
  location: z.string().min(2, 'La ubicación es obligatoria.'),
  description: z.string().min(10, 'Escribe al menos 10 caracteres.'),
  url: z.string().url('Introduce una URL válida.'),
})

export type SuggestionValues = z.infer<typeof suggestionSchema>

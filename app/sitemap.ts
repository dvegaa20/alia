import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'
import { OrganizationStatus } from '@/prisma/generated/client'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alia.mx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/directory`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Dynamic organization pages
  const orgs = await prisma.organization.findMany({
    where: { status: OrganizationStatus.PUBLISHED },
    select: { slug: true, updatedAt: true },
  })

  const orgPages: MetadataRoute.Sitemap = orgs.map((org) => ({
    url: `${BASE_URL}/directory/${org.slug}`,
    lastModified: org.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...orgPages]
}

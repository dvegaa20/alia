import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import { cache } from 'react'
import { HeroCover, OrgHeader, OrgTabs } from '@/components/public'
import { OrganizationProfileJsonLd } from '@/components/seo/json-ld'
import { getOrgBySlug } from '@/server/actions'
import type {
  NeedItem,
  VolunteeringInfo,
  OrgEventItem,
  ImpactHighlight,
  ImpactTestimony,
  OfficeHours,
} from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

const getCachedOrg = cache(async (slug: string) => {
  const result = await getOrgBySlug(slug)
  return result.success ? result.data : null
})

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const org = await getCachedOrg(slug)

  if (!org) return { title: 'Organización no encontrada' }

  const location = org.location ? `${org.location.city}, ${org.location.state}` : 'México'

  return {
    title: org.name,
    description: org.shortDescription || `${org.name} — Organización social en ${location}`,
    alternates: { canonical: `/directory/${slug}` },
    openGraph: {
      title: org.name,
      description: org.shortDescription || undefined,
      images: org.coverImageUrl
        ? [{ url: org.coverImageUrl, width: 1200, height: 630, alt: org.name }]
        : undefined,
      type: 'profile',
    },
  }
}

export default async function OrganizationProfilePage({ params }: PageProps) {
  const { slug } = await params

  const org = await getCachedOrg(slug)

  if (!org) {
    notFound()
  }

  const locationString = org.location ? `${org.location.city}, ${org.location.state}` : 'México'

  return (
    <div className="pt-4 pb-20 max-w-400 mx-auto px-6 lg:px-8">
      <OrganizationProfileJsonLd org={org} />
      <HeroCover
        coverImageUrl={org.coverImageUrl || '/images/directorio/card-forest.jpg'}
        logoUrl={org.logoUrl || '/images/directorio/logo-forest.jpg'}
        name={org.name}
      />

      <OrgHeader
        name={org.name}
        verified={org.verified}
        causeType={org.causeType as 'ONG' | 'YOUTH_INITIATIVE'}
        isDonatariaAutorizada={org.isDonatariaAutorizada}
        categories={org.categories || []}
        orgId={org.id}
        donationLink={org.donationLink}
      />

      <OrgTabs
        name={org.name}
        fullDescription={org.fullDescription}
        galleryImages={org.galleryImages || []}
        email={org.email}
        phone={org.phone}
        whatsapp={org.whatsapp}
        address={org.address}
        website={org.website}
        location={locationString}
        coordinates={
          org.location?.latitude && org.location?.longitude
            ? { lat: org.location.latitude, lng: org.location.longitude }
            : null
        }
        googleMapsUrl={org.location?.googleMapsUrl}
        impactCurrent={org.impactCurrent}
        impactGoal={org.impactGoal}
        impactType={org.impactType}
        relevantLinks={org.relevantLinks || []}
        needs={(org.needs ?? undefined) as unknown as NeedItem[] | undefined}
        howToDonate={org.howToDonate}
        isDonatariaAutorizada={org.isDonatariaAutorizada}
        causeType={org.causeType as 'ONG' | 'YOUTH_INITIATIVE'}
        volunteering={(org.volunteering ?? undefined) as unknown as VolunteeringInfo | undefined}
        events={(org.events ?? undefined) as unknown as OrgEventItem[] | undefined}
        impactHighlights={
          (org.impactHighlights ?? undefined) as unknown as ImpactHighlight[] | undefined
        }
        impactTestimony={
          (org.impactTestimony ?? undefined) as unknown as ImpactTestimony | undefined
        }
        foundedYear={org.foundedYear}
        officeHours={(org.officeHours ?? undefined) as unknown as OfficeHours | undefined}
        verified={org.verified}
      />
    </div>
  )
}

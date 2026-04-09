import { notFound } from "next/navigation";
import { HeroCover, OrgHeader, OrgTabs } from "@/components/public";
import { getOrgBySlug } from "@/server/actions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganizationProfilePage({ params }: PageProps) {
  const { slug } = await params;

  const result = await getOrgBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const org = result.data;
  
  const locationString = org.location
    ? `${org.location.city}, ${org.location.state}`
    : "México";

  return (
    <div className="pt-4 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
      <HeroCover
        coverImageUrl={org.coverImageUrl || "/images/directorio/card-forest.jpg"}
        logoUrl={org.logoUrl || "/images/directorio/logo-forest.jpg"}
        name={org.name}
      />

      <OrgHeader
        name={org.name}
        verified={org.verified}
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
        website={org.website}
        location={locationString}
        coordinates={org.location?.latitude && org.location?.longitude ? { lat: org.location.latitude, lng: org.location.longitude } : null}
        googleMapsUrl={org.location?.googleMapsUrl}
        impactCurrent={org.impactCurrent}
        impactGoal={org.impactGoal}
        impactType={org.impactType}
        relevantLinks={org.relevantLinks || []}
        needs={org.needs as any}
        featuredFact={org.featuredFact}
        secondaryFacts={org.secondaryFacts}
        testimony={org.testimony}
        milestone={org.milestone}
        foundedYear={org.foundedYear}
        officeHours={org.officeHours}
        verified={org.verified}
      />
    </div>
  );
}

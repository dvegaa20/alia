import { type OrgWithAllRelations } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alia.mx';

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Alia - Directorio Social de México",
          url: BASE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${BASE_URL}/directory?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  );
}

export function OrganizationProfileJsonLd({ org }: { org: OrgWithAllRelations }) {
  const socialLinks = org.socialLinks?.map((link: { url: string }) => link.url) || [];
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: org.name,
          url: `${BASE_URL}/directory/${org.slug}`,
          logo: org.logoUrl || undefined,
          image: org.coverImageUrl || undefined,
          description: org.fullDescription || org.shortDescription,
          email: org.email || undefined,
          telephone: org.phone || undefined,
          sameAs: org.website ? [org.website, ...socialLinks] : socialLinks,
          address: org.location ? {
            "@type": "PostalAddress",
            addressLocality: org.location.city,
            addressRegion: org.location.state,
            addressCountry: "MX"
          } : undefined,
          foundingDate: org.foundedYear ? `${org.foundedYear}` : undefined,
        }),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ 
  items 
}: { 
  items: { name: string, path: string }[] 
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${BASE_URL}${item.path}`,
          })),
        }),
      }}
    />
  );
}

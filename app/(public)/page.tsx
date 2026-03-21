import { getPublishedOrgs } from "@/server/actions";
import { HeroContainer } from "@/components/public/home/hero-container";
import {
  HeroSection,
  CategoriesSection,
  FeaturedSection,
  TrustSection,
} from "@/components/public";

// Fallback emojis by category slug
const fallbackIcons: Record<string, string> = {
  'medio-ambiente': '🌍',
  'educacion': '📚',
  'salud': '🏥',
  'vivienda': '🏠',
  'derechos-humanos': '⚖️',
  'infancia': '👶',
}

export default async function Page() {
  const { data: orgs } = await getPublishedOrgs({ limit: 100 });
  
  const formattedOrgs = (orgs || []).map(org => ({
    slug: org.slug,
    name: org.name,
    category: org.categories[0]?.name || 'Organización',
    logo: org.logoUrl || fallbackIcons[org.categories[0]?.slug] || '🤝'
  }));

  return (
    <>
      <HeroContainer>
        <HeroSection organizations={formattedOrgs} />
        <CategoriesSection />
      </HeroContainer>
      <FeaturedSection />
      <TrustSection />
    </>
  );
}
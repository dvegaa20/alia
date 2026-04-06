import { getPublishedOrgs, getTopCategoriesWithOrgs } from "@/server/actions";
import { HeroContainer } from "@/components/public/home/hero-container";
import {
  HeroSection,
  CategoriesSection,
  CategoryFilters,
  CategoryCarousel,
  FeaturedGrid,
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

export default async function Page(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams;

  const [{ data: orgs }, { data: topCategories }] = await Promise.all([
    getPublishedOrgs({ limit: 100 }),
    getTopCategoriesWithOrgs(),
  ]);

  const formattedOrgs = (orgs || []).map(org => ({
    slug: org.slug,
    name: org.name,
    category: org.categories[0]?.name || 'Organización',
    logo: org.logoUrl || fallbackIcons[org.categories[0]?.slug] || '🤝'
  }));

  const activeCategorySlug = searchParams?.category || topCategories?.[0]?.slug || '';
  const activeCategoryData = topCategories?.find(c => c.slug === activeCategorySlug) || topCategories?.[0];

  return (
    <>
      <HeroContainer>
        <HeroSection organizations={formattedOrgs} />

        {/* New Category Approach via Server Components */}
        <div id="categorias" className="py-20 px-8 max-w-360 mx-auto scroll-mt-20">
          <CategoryFilters
            categories={topCategories || []}
            activeCategorySlug={activeCategorySlug}
          />

          <div className="mt-8">
            {activeCategoryData && (
              <CategoryCarousel
                categorySlug={activeCategorySlug}
                categoryName={activeCategoryData.name}
                categoryDescription={activeCategoryData.description}
              />
            )}
          </div>
        </div>
      </HeroContainer>

      <FeaturedGrid />

      <TrustSection />
    </>
  );
}
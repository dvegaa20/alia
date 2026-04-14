import { type Metadata } from 'next'
import { getPublishedOrgs, getTopCategoriesWithOrgs } from '@/server/actions'
import { HeroSection, CategoryFilters, CategoryCarousel, TrustSection, FeaturesSection } from '@/components/public'

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Encuentra y apoya organizaciones sociales verificadas en México. Explora por categorías como medio ambiente, educación, salud y más.',
  alternates: { canonical: '/' },
}

// Fallback emojis by category slug
const fallbackIcons: Record<string, string> = {
  'medio-ambiente': '🌍',
  educacion: '📚',
  salud: '🏥',
  vivienda: '🏠',
  'derechos-humanos': '⚖️',
  infancia: '👶',
}

export default async function Page(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams

  const [{ data: orgs }, { data: topCategories }] = await Promise.all([
    getPublishedOrgs({ limit: 100 }),
    getTopCategoriesWithOrgs(),
  ])

  const formattedOrgs = (orgs || []).map((org) => ({
    slug: org.slug,
    name: org.name,
    categories: org.categories.map((c) => c.name) || ['Organización'],
    logo: org.logoUrl || fallbackIcons[org.categories[0]?.slug] || '🤝',
  }))

  const activeCategorySlug = searchParams?.category || topCategories?.[0]?.slug || ''
  const activeCategoryData =
    topCategories?.find((c) => c.slug === activeCategorySlug) || topCategories?.[0]

  return (
    <>
      <HeroSection organizations={formattedOrgs} />

      {/* New Category Approach via Server Components */}
      <div id="categorias" className="py-20 px-8 max-w-400 mx-auto scroll-mt-20">
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground mb-4">
            Explora por <span className="text-primary">Categoría</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground w-full max-w-2xl">
            Encuentra iniciativas afines a tus intereses y descubre cómo puedes sumar tu apoyo.
          </p>
        </div>

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
      <FeaturesSection />
      <TrustSection />
    </>
  )
}

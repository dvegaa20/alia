import { getLatestByCategory } from '@/server/actions'
import { Feature, type CampaignItem } from '@/components/ui/feature-with-image-carousel'

interface CategoryCarouselProps {
  categorySlug: string
  categoryName: string
  categoryDescription: string | null
}

export async function CategoryCarousel({
  categorySlug,
  categoryName,
  categoryDescription,
}: CategoryCarouselProps) {
  const { data: latestOrgs } = await getLatestByCategory(categorySlug)

  const items: CampaignItem[] = (latestOrgs || []).map((org) => ({
    slug: org.slug,
    name: org.name,
    description: org.shortDescription || '',
    location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
    tag: categoryName,
    image: org.coverImageUrl || '/images/landscape3.jpg',
    logo: org.logoUrl || '',
    isVerified: org.verified,
  }))

  if (items.length === 0) {
    return (
      <div className="text-center py-12 rounded-[8px] border border-[#DFD5C0] bg-[#FAF7F0] text-sm text-[#0C354C]/65">
        No se encontraron organizaciones para esta categoría aún.
      </div>
    )
  }

  return (
    <Feature
      badge={categoryName}
      title={`Descubre más sobre ${categoryName.toLowerCase()}`}
      description={
        categoryDescription ||
        'Explora las organizaciones que están haciendo la diferencia en esta categoría.'
      }
      items={items}
    />
  )
}

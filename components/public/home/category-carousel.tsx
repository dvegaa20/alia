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
    location: org.location
      ? `${org.location.city}, ${org.location.state}`
      : 'Ubicación no especificada',
    tag: categoryName,
    image:
      org.coverImageUrl ||
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80',
    logo:
      org.logoUrl ||
      'https://ui-avatars.com/api/?name=' + encodeURIComponent(org.name) + '&background=random',
  }))

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
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

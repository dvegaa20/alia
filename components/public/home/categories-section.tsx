'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Leaf, HeartPulse, GraduationCap, PawPrint, Scale, Grid2X2 } from 'lucide-react'
import { Feature, type CampaignItem } from '@/components/ui/feature-with-image-carousel'
import Link from 'next/link'
import type { DynamicCategoryData } from '@/types'
import { cn } from '@/lib/utils'

export type { DynamicCategoryData }

interface CategoriesSectionProps {
  categories: DynamicCategoryData[]
}

const categoryIcons: Record<string, React.ElementType> = {
  'medio-ambiente': Leaf,
  salud: HeartPulse,
  educacion: GraduationCap,
  animales: PawPrint,
  'justicia-social': Scale,
}

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || '')
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0]

  if (!activeCategory) return null

  const activeCategoryData = {
    badge: activeCategory.name,
    title: `Descubre más sobre ${activeCategory.name.toLowerCase()}`,
    description:
      activeCategory.description ||
      'Explora las organizaciones que están haciendo la diferencia en esta categoría.',
    items: (activeCategory.organizations || []).map((org) => ({
      slug: org.slug,
      name: org.name,
      description: org.shortDescription,
      location: org.location ? `${org.location.city}, ${org.location.state}` : 'México',
      tag: activeCategory.name,
      image: org.coverImageUrl || '/images/landscape3.jpg',
      logo: org.logoUrl || '',
      isVerified: org.verified,
    })) as CampaignItem[],
  }

  return (
    <section className="py-12 bg-[#F5EEDD] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.slug] || Leaf
              const isActive = cat.id === activeCategoryId
              return (
                <Button
                  key={cat.id}
                  variant="outline"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={cn(
                    'px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium flex items-center gap-2 transition-colors shadow-none',
                    isActive
                      ? 'bg-[#16587B] text-white border-[#16587B] hover:bg-[#0C354C] hover:border-[#0C354C] hover:text-white'
                      : 'bg-[#FAF7F0] text-[#0C354C]/80 border-[#DFD5C0] hover:border-[#16587B] hover:text-[#16587B]'
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                  {cat.name}
                </Button>
              )
            })}
          </div>

          <Link href="/directory">
            <Button
              variant="outline"
              className="px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium items-center gap-2 transition-colors bg-[#FAF7F0] text-[#16587B] border-[#16587B]/40 hover:border-[#16587B] hover:bg-[#16587B]/5 hidden md:flex shadow-none"
            >
              <Grid2X2 className="size-4" strokeWidth={1.5} />
              Ver más categorías
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <Feature
            badge={activeCategoryData.badge}
            title={activeCategoryData.title}
            description={activeCategoryData.description}
            items={activeCategoryData.items}
          />
        </div>
      </div>
    </section>
  )
}

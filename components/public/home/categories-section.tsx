'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
    <section className="px-4 sm:px-6 py-12 bg-surface overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2.5"
          >
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.slug] || Leaf
              const isActive = cat.id === activeCategoryId
              return (
                <Button
                  key={cat.id}
                  variant="outline"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={cn(
                    'px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium flex items-center gap-2 transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:text-primary-foreground'
                      : 'bg-background/60 dark:bg-surface-subtle text-foreground-secondary border-border hover:border-rock-blue hover:text-primary'
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                  {cat.name}
                </Button>
              )
            })}
          </motion.div>

          <Link href="/directory">
            <Button
              variant="outline"
              className="px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium items-center gap-2 transition-colors bg-surface text-primary border-primary/40 hover:border-primary hover:bg-primary/5 hidden md:flex"
            >
              <Grid2X2 className="size-4" strokeWidth={1.5} />
              Ver más categorías
            </Button>
          </Link>
        </div>

        <motion.div
          key={activeCategoryId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Feature
            badge={activeCategoryData.badge}
            title={activeCategoryData.title}
            description={activeCategoryData.description}
            items={activeCategoryData.items}
          />
        </motion.div>
      </div>
    </section>
  )
}

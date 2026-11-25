'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Leaf, GraduationCap, HeartPulse, Home, Scale, Baby, Grid2X2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ElementType> = {
  'medio-ambiente': Leaf,
  educacion: GraduationCap,
  salud: HeartPulse,
  vivienda: Home,
  infancia: Baby,
  'derechos-humanos': Scale,
}

interface CategoryFilterItem {
  id: string
  slug: string
  name: string
}

interface CategoryFiltersProps {
  categories: CategoryFilterItem[]
  activeCategorySlug: string
}

export function CategoryFilters({ categories, activeCategorySlug }: CategoryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap gap-2.5"
      >
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] || Leaf
          const isActive = cat.slug === activeCategorySlug
          return (
            <Link key={cat.id} href={`/?category=${cat.slug}`} scroll={false} prefetch={true}>
              <Button
                variant="outline"
                className={cn(
                  'px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium flex items-center gap-2 transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary-hover hover:text-primary-foreground'
                    : 'bg-background/60 dark:bg-surface-subtle text-foreground-secondary border-border hover:border-rock-blue hover:text-primary hover:bg-primary/5'
                )}
              >
                <Icon className="size-4" strokeWidth={1.5} />
                {cat.name}
              </Button>
            </Link>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/directory">
          <Button
            variant="outline"
            className="px-5 py-2.5 h-auto rounded-full font-sans text-sm font-medium items-center gap-2 transition-colors bg-surface text-primary border-primary/40 hover:border-primary hover:bg-primary/5 hidden md:flex"
          >
            <Grid2X2 className="size-4" strokeWidth={1.5} />
            Ver más categorías
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

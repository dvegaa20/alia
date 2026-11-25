'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { Leaf, GraduationCap, HeartPulse, Home, Scale, Baby, Grid2X2 } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-filter-item]', {
          y: 16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
    >
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] || Leaf
          const isActive = cat.slug === activeCategorySlug
          return (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}`}
              scroll={false}
              prefetch={true}
              data-filter-item
            >
              <Button
                variant="outline"
                className={cn(
                  'px-4 py-2.5 h-auto rounded-[4px] font-sans text-sm font-medium flex items-center gap-2 transition-colors duration-200 shadow-none',
                  isActive
                    ? 'bg-[#16587B] text-white border-[#16587B] hover:bg-[#0C354C] hover:border-[#0C354C] hover:text-white'
                    : 'bg-[#FAF7F0] text-[#0C354C]/80 border-[#DFD5C0] hover:border-[#16587B] hover:text-[#16587B] hover:bg-[#FAF7F0]'
                )}
              >
                <Icon className="size-4" strokeWidth={1.5} />
                {cat.name}
              </Button>
            </Link>
          )
        })}
      </div>

      <div data-filter-item>
        <Link href="/directory">
          <Button
            variant="outline"
            className="px-4 py-2.5 h-auto rounded-[4px] font-sans text-sm font-medium items-center gap-2 transition-colors bg-[#FAF7F0] text-[#16587B] border-[#16587B]/40 hover:border-[#16587B] hover:bg-[#16587B]/5 hidden md:flex shadow-none"
          >
            <Grid2X2 className="size-4" strokeWidth={1.5} />
            Ver más categorías
          </Button>
        </Link>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { MapPin, BadgeCheck, Users, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { trackSocialLead } from '@/lib/analytics'

import type { OrganizationCardProps } from '@/types'
export type { OrganizationCardProps }

export function OrganizationCard({
  slug,
  name,
  description,
  categories = [],
  location,
  coverImage,
  logoImage,
  verified = false,
}: OrganizationCardProps) {
  return (
    <Link href={`/directory/${slug}`} className="block" onClick={() => trackSocialLead('view_profile', name)}>
      <Card className="group relative bg-background rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,28,28,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-border/50 p-0! gap-0!">
        {/* Cover Image */}
        <div className="h-40 overflow-hidden relative">
          <Image
            src={coverImage}
            alt={`${name} cover`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="px-4 pt-8 relative">
          {/* Overlapping Logo */}
          <div className="absolute -top-8 left-6 w-16 h-16 bg-background rounded-xl shadow-lg flex items-center justify-center p-2 border-4 border-background">
            <Image
              src={logoImage}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="object-contain rounded-md"
            />
          </div>

          {/* Verified Badge */}
          {verified && (
            <div className="absolute top-2 right-4">
              <Badge className="bg-primary/15 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase">
                <BadgeCheck className="size-3" />
                Verificada
              </Badge>
            </div>
          )}

          <div className="space-y-3 py-2">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  className="bg-muted/40 text-muted-foreground border border-border/60 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider h-auto hover:bg-muted/60 transition-colors"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground leading-tight font-headline">{name}</h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-medium">
              {description}
            </p>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-4 pb-4 flex flex-col gap-3">
          <div className="w-full pt-4 border-t border-border/50 flex flex-col gap-3">
            <div className="flex items-start justify-between text-muted-foreground text-xs font-medium">
              <div className="flex items-start flex-1 mr-4">
                <MapPin className="size-3.5 mr-1 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{location}</span>
              </div>
              <div className="flex items-center shrink-0 mt-0.5">
                <Users className="size-3.5 mr-1 shrink-0" />
                <span>+50 Voluntarios</span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-primary font-bold text-[11px] uppercase tracking-wider hover:underline underline-offset-4 flex items-center">
                Ver perfil <ArrowRight className="size-3 ml-1" />
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, BadgeCheck, ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { trackSocialLead } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { OrganizationCardProps } from '@/types'

export type { OrganizationCardProps }

export interface ExtendedOrganizationCardProps extends OrganizationCardProps {
  surface?: 'on-merino' | 'on-white'
}

export function OrganizationCard({
  slug,
  name,
  description,
  categories = [],
  location,
  coverImage,
  logoImage,
  verified = false,
  causeType,
  isDonatariaAutorizada = false,
  hasUrgentNeeds = false,
  surface = 'on-merino',
}: ExtendedOrganizationCardProps) {
  const primaryCategory = categories[0] || 'Organización'

  return (
    <Link
      href={`/directory/${slug}`}
      className="block h-full group"
      onClick={() => trackSocialLead('view_profile', name)}
    >
      <Card
        className={cn(
          'relative h-full flex flex-col overflow-hidden rounded-[20px] border border-border p-0! gap-0! transition-all duration-200 hover:border-rock-blue hover:-translate-y-0.5',
          surface === 'on-white' ? 'bg-background/40 dark:bg-background' : 'bg-surface'
        )}
      >
        {/* Cover Image */}
        <div className="h-40 overflow-hidden relative bg-surface-subtle">
          <Image
            src={coverImage || '/images/landscape3.jpg'}
            alt={`${name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="px-6 pt-9 pb-5 relative flex-1 flex flex-col">
          {/* Overlapping Logo */}
          <div className="absolute -top-7 left-6 size-14 rounded-2xl bg-surface border border-border flex items-center justify-center p-1.5 overflow-hidden">
            {logoImage ? (
              <Image
                src={logoImage}
                alt={`${name} logo`}
                width={44}
                height={44}
                className="object-contain rounded-lg size-full"
              />
            ) : (
              <span className="font-sans font-semibold text-base text-primary bg-primary/10 size-full rounded-lg flex items-center justify-center">
                {name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          {/* Header: Category (JetBrains Mono) + Conditional Badges */}
          <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
              {primaryCategory}
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {causeType === 'YOUTH_INITIATIVE' && (
                <Badge className="rounded-full bg-rock-blue/25 text-deep-harbor dark:bg-rock-blue/20 dark:text-rock-blue border border-rock-blue/40 px-2.5 py-0.5 h-auto font-mono text-[10px] font-medium uppercase tracking-[0.04em] gap-1">
                  <Sparkles className="size-2.5" strokeWidth={1.5} />
                  Iniciativa Joven
                </Badge>
              )}
              {isDonatariaAutorizada && (
                <Badge className="rounded-full bg-verified-emerald/12 text-verified-emerald dark:bg-verified-emerald/20 dark:text-emerald-300 border border-verified-emerald/25 px-2.5 py-0.5 h-auto font-mono text-[10px] font-medium uppercase tracking-[0.04em] gap-1">
                  <BadgeCheck className="size-2.5" strokeWidth={1.5} />
                  Donataria ISR
                </Badge>
              )}
            </div>
          </div>

          {/* Title + Verified icon */}
          <div className="flex items-center gap-1.5 mb-2">
            <h3 className="font-sans text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {verified && (
              <BadgeCheck
                className="size-4 text-verified-emerald shrink-0"
                strokeWidth={1.75}
                aria-label="Organización verificada"
              />
            )}
          </div>

          {/* Brief Purpose */}
          <p className="font-sans text-sm text-foreground-secondary leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Location */}
          <div className="mt-auto flex items-center gap-1.5 text-xs text-foreground-muted">
            <MapPin className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="truncate">{location}</span>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-6 py-3.5 border-t border-border flex items-center justify-between gap-2">
          <div>
            {hasUrgentNeeds ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-urgency-coral/10 text-urgency-coral border border-urgency-coral/25 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.04em]">
                <span className="size-1.5 rounded-full bg-urgency-coral" aria-hidden="true" />
                Con urgencia
              </span>
            ) : verified ? (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.04em] text-verified-emerald dark:text-emerald-300">
                Verificada
              </span>
            ) : (
              <span />
            )}
          </div>

          <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-primary group-hover:underline underline-offset-4">
            Ver perfil
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

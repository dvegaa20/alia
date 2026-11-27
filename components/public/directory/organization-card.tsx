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
          'relative h-full flex flex-col overflow-hidden rounded-2xl border border-[#DFD5C0] shadow-none ring-0 p-0! gap-0! transition-all duration-200 hover:border-[#84B3CE] hover:-translate-y-0.5',
          surface === 'on-white' ? 'bg-[#F5EEDD]/70' : 'bg-[#FAF7F0]'
        )}
      >
        {/* Cover Image */}
        <div className="h-40 overflow-hidden relative bg-[#EAE1CD]">
          <Image
            src={coverImage || '/images/landscape3.jpg'}
            alt={`${name} cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C354C]/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <CardContent className="px-6 pt-9 pb-5 relative flex-1 flex flex-col">
          {/* Overlapping Logo */}
          <div className="absolute -top-7 left-6 size-14 rounded-2xl bg-[#FAF7F0] border border-[#DFD5C0] flex items-center justify-center p-1.5 overflow-hidden">
            {logoImage ? (
              <Image
                src={logoImage}
                alt={`${name} logo`}
                width={44}
                height={44}
                className="object-contain rounded-lg size-full"
              />
            ) : (
              <span className="font-sans font-medium text-base text-[#16587B] bg-[#16587B]/10 size-full rounded-lg flex items-center justify-center">
                {name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          {/* Header: Category (JetBrains Mono) + Conditional Badges */}
          <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
            <span className=" text-[11px] font-medium uppercase tracking-[0.06em] text-[#0C354C]/60">
              {primaryCategory}
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {causeType === 'YOUTH_INITIATIVE' && (
                <Badge className="rounded-full bg-[#124866] text-[#84B3CE] border border-[#124866] px-2.5 py-0.5 h-auto  text-[10px] font-medium uppercase tracking-[0.05em] gap-1">
                  <Sparkles className="size-2.5" strokeWidth={1.5} />
                  Iniciativa Joven
                </Badge>
              )}
              {isDonatariaAutorizada && (
                <Badge className="rounded-full bg-[#1E8E68]/12 text-[#1E8E68] border border-[#1E8E68]/25 px-2.5 py-0.5 h-auto  text-[10px] font-medium uppercase tracking-[0.05em] gap-1">
                  <BadgeCheck className="size-2.5" strokeWidth={1.5} />
                  Donataria ISR
                </Badge>
              )}
            </div>
          </div>

          {/* Title + Verified icon */}
          <div className="flex items-center gap-1.5 mb-2">
            <h3 className="font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.015em] text-[#0C354C] group-hover:text-[#16587B] transition-colors">
              {name}
            </h3>
            {verified && (
              <BadgeCheck
                className="size-4 text-[#1E8E68] shrink-0"
                strokeWidth={1.75}
                aria-label="Organización verificada"
              />
            )}
          </div>

          {/* Brief Purpose */}
          <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Location */}
          <div className="mt-auto flex items-center gap-1.5 text-xs text-[#0C354C]/60">
            <MapPin className="size-3.5 shrink-0 text-[#16587B]" strokeWidth={1.5} />
            <span className="truncate">{location}</span>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-6 py-3.5 border-t border-[#DFD5C0] flex items-center justify-between gap-2">
          <div>
            {hasUrgentNeeds ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C84B31]/10 text-[#C84B31] border border-[#C84B31]/25 px-2.5 py-0.5  text-[10px] font-medium uppercase tracking-[0.05em]">
                <span className="size-1.5 rounded-full bg-[#C84B31]" aria-hidden="true" />
                Con urgencia
              </span>
            ) : verified ? (
              <span className="inline-flex items-center gap-1  text-[10px] font-medium uppercase tracking-[0.05em] text-[#1E8E68]">
                Verificada
              </span>
            ) : (
              <span />
            )}
          </div>

          <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[#16587B] group-hover:underline underline-offset-4">
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

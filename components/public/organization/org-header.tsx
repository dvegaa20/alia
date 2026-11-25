'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BadgeCheck, Heart, Sparkles } from 'lucide-react'
import { trackDonationClick } from '@/server/actions'

interface OrgHeaderProps {
  name: string
  verified: boolean
  causeType?: 'ONG' | 'YOUTH_INITIATIVE'
  isDonatariaAutorizada?: boolean
  categories: { id: string; name: string }[]
  donationLink?: string | null
  orgId: string
}

export function OrgHeader({
  name,
  verified,
  causeType,
  isDonatariaAutorizada,
  categories,
  donationLink,
  orgId,
}: OrgHeaderProps) {
  const handleDonateClick = async () => {
    trackDonationClick(orgId).catch(() => {})
  }

  return (
    <section className="mt-20 space-y-5">
      {/* Back to Directory + Status Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors font-mono text-xs font-medium uppercase tracking-[0.04em] group"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            Volver al directorio
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            {causeType === 'YOUTH_INITIATIVE' && (
              <Badge className="bg-[#124866] text-[#84B3CE] border border-[#124866] px-3 py-1 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-[0.05em] h-auto gap-1.5">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                Iniciativa Joven
              </Badge>
            )}
            {isDonatariaAutorizada && (
              <Badge className="bg-[#1E8E68]/12 text-[#1E8E68] border border-[#1E8E68]/25 px-3 py-1 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-[0.05em] h-auto gap-1.5">
                <BadgeCheck className="size-3.5" strokeWidth={1.5} />
                Donataria ISR
              </Badge>
            )}
            {verified && (
              <Badge className="bg-[#1E8E68]/10 text-[#1E8E68] border border-[#1E8E68]/25 px-3 py-1 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-[0.05em] h-auto gap-1.5">
                <BadgeCheck className="size-3.5" strokeWidth={1.5} />
                Verificada
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-3">
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.12] text-foreground">
            {name}
          </h1>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                className="bg-surface text-foreground-secondary border border-border px-3 py-1 h-auto rounded-full font-mono text-xs font-medium uppercase tracking-[0.04em]"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Donate CTA */}
        {donationLink && (
          <Button
            className="px-6 py-3 h-auto bg-primary hover:bg-primary-hover text-primary-foreground rounded-full font-sans font-medium text-[15px] transition-colors gap-2 self-start md:self-auto"
            onClick={handleDonateClick}
            asChild
          >
            <a href={donationLink} target="_blank" rel="noopener noreferrer">
              <Heart className="size-4" strokeWidth={1.5} />
              Hacer una donación
            </a>
          </Button>
        )}
      </motion.div>
    </section>
  )
}

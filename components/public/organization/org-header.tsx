'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BadgeCheck, Heart } from 'lucide-react'
import { trackDonationClick } from '@/server/actions'

interface OrgHeaderProps {
  name: string
  verified: boolean
  categories: { id: string; name: string }[]
  donationLink?: string | null
  orgId: string
}

export function OrgHeader({ name, verified, categories, donationLink, orgId }: OrgHeaderProps) {
  const handleDonateClick = async () => {
    // Fire-and-forget tracking — don't block navigation
    trackDonationClick(orgId).catch(() => { })
  }

  return (
    <section className="mt-20 space-y-4">
      {/* Back to Directory */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-label text-sm font-bold uppercase tracking-wider group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Volver al directorio
          </Link>
          {verified && (
            <Badge className="bg-primary/20 text-primary border-none px-3 py-1 rounded-full text-xs font-bold font-label uppercase tracking-wider h-auto gap-1">
              <BadgeCheck className="size-3.5" />
              Verificada
            </Badge>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-4">
          {/* Name + Verified badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">
              {name}
            </h1>
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge key={cat.id} className="bg-primary/15 text-primary border border-primary/20 px-3 py-1 h-auto rounded-full text-xs font-bold">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Donate CTA */}
        {donationLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <Button
              className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 font-bold text-sm shadow-lg shadow-[#1e4a23]/20 hover:shadow-[#1e4a23]/30 transition-all duration-300 hover:scale-105 gap-2"
              onClick={handleDonateClick}
              asChild
            >
              <a href={donationLink} target="_blank" rel="noopener noreferrer">
                <Heart className="size-4 fill-white" />
                Hacer una donación
              </a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

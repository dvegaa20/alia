import { Clock } from 'lucide-react'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { ReachStatsGrid, type ReachStatItem } from '@/components/public/home/features-grid'
import type { PublicImpactStats } from '@/server/data/public-stats'

interface ImpactHeroProps {
  stats: PublicImpactStats
  updatedLabel: string
}

export function ImpactHero({ stats, updatedLabel }: ImpactHeroProps) {
  const items: ReachStatItem[] = [
    {
      key: 'verified',
      icon: 'shield',
      label: 'Organizaciones verificadas',
      value: stats.verifiedOrgs,
      href: '/directory?type=ONG',
    },
    {
      key: 'youth',
      icon: 'sparkles',
      label: 'Iniciativas Jóvenes activas',
      value: stats.youthInitiatives,
      href: '/directory?type=YOUTH_INITIATIVE',
    },
    {
      key: 'needs',
      icon: 'list',
      label: 'Necesidades y oportunidades publicadas',
      value: stats.activeNeeds,
      href: '/directory',
    },
    {
      key: 'donatarias',
      icon: 'receipt',
      label: 'Donatarias Autorizadas',
      value: stats.donatarias,
      href: '/directory?donataria=true',
    },
  ]

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F5EEDD] pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <GsapReveal className="text-center mb-10 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Transparencia activa
          </p>
          <h1 className="font-sans font-light text-4xl sm:text-6xl lg:text-[66px] leading-[1.03] tracking-normal text-[#0C354C]">
            Nuestro{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              alcance
            </span>{' '}
            social
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl mx-auto leading-[1.6]">
            Datos reales calculados directamente de nuestro directorio verificado en México para
            garantizar total transparencia en nuestra labor comunitaria.
          </p>
        </GsapReveal>

        <GsapReveal className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DFD5C0] bg-[#FAF7F0] px-4 py-1.5 text-xs text-[#0C354C]/70">
            <Clock className="size-3.5 text-[#16587B]" strokeWidth={1.5} />
            Datos reales del directorio · Actualizado {updatedLabel}
          </span>
        </GsapReveal>

        <ReachStatsGrid items={items} tone="light" />
      </div>
    </section>
  )
}

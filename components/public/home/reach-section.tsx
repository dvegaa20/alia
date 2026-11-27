import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
import { ReachStatsGrid, type ReachStatItem } from './features-grid'
import type { PublicImpactStats } from '@/server/data/public-stats'

interface ReachSectionProps {
  stats: PublicImpactStats
}

const verificationSteps = [
  {
    step: '01',
    title: 'Recibimos la sugerencia',
    description: 'Cualquier persona puede sugerir una ONG o iniciativa joven.',
  },
  {
    step: '02',
    title: 'Verificamos manualmente',
    description: 'Confirmamos su actividad real y su labor en la comunidad.',
  },
  {
    step: '03',
    title: 'Publicamos con transparencia',
    description: 'Solo publicamos lo que cumple nuestros criterios. Sin pago.',
  },
]

export function ReachSection({ stats }: ReachSectionProps) {
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
      label: 'Iniciativas Jóvenes',
      value: stats.youthInitiatives,
      href: '/directory?type=YOUTH_INITIATIVE',
    },
    {
      key: 'needs',
      icon: 'list',
      label: 'Necesidades activas',
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
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#F5EEDD] border-b border-[#DFD5C0] py-20 lg:py-24"
    >
      <SectionTransition>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <GsapReveal className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3 text-left">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Datos reales del directorio
              </p>
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-normal text-[#0C354C]">
                Nuestro{' '}
                <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                  alcance
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl leading-[1.55]">
                Cifras calculadas directamente de las causas publicadas y revisadas por nuestro
                equipo en México.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#16587B] bg-transparent text-[#16587B] hover:bg-[#16587B] hover:text-white px-6 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto shadow-none transition-colors"
            >
              <Link href="/impact">
                Ver impacto completo
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </GsapReveal>

          <ReachStatsGrid items={items} tone="light" />

          <GsapReveal className="mt-14">
            <div className="rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0]/60 p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                  Cómo verificamos
                </p>
                <h3 className="font-sans font-light text-2xl sm:text-3xl leading-[1.15] text-[#0C354C]">
                  Tres pasos antes de{' '}
                  <span className="font-serif italic font-normal text-[#16587B]">publicar</span>
                </h3>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#16587B] hover:text-[#0C354C] transition-colors pt-1"
                >
                  <span>Conoce el proceso completo</span>
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {verificationSteps.map((item) => (
                  <div key={item.step} className="space-y-2">
                    <span className="block text-xs font-medium tabular-nums text-[#16587B]">
                      {item.step}
                    </span>
                    <h4 className="font-sans font-medium text-base text-[#0C354C]">{item.title}</h4>
                    <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GsapReveal>
        </div>
      </SectionTransition>
    </section>
  )
}

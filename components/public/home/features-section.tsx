import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getImpactMetrics } from '@/server/actions/analytics'
import { Button } from '@/components/ui/button'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
import { FeaturesSectionGrid } from './features-grid'

/**
 * FeaturesSection — Server Component
 *
 * Screen 3 (Deep Harbor): displays real GA4 impact statistics with GSAP animated counters.
 */
export async function FeaturesSection() {
  const metrics = await getImpactMetrics()

  return (
    <section
      data-nav-theme="dark"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#0C354C] text-[#F5EEDD] py-20 lg:py-24"
    >
      <SectionTransition>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <GsapReveal className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="text-left space-y-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
                Transparencia en vivo · Últimos 30 días
              </p>
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-normal text-white">
                Nuestro{' '}
                <span className="font-serif italic font-normal text-[#F5EEDD] text-[1.06em]">
                  alcance
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/80 max-w-2xl leading-[1.55]">
                Conectamos a personas con voluntad de ayudar con organizaciones verificadas para
                fortalecer comunidades en México.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#84B3CE] bg-transparent text-[#84B3CE] hover:bg-[#84B3CE]/15 hover:text-white px-6 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto shadow-none transition-colors"
            >
              <Link href="/impact">
                Explorar impacto
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </GsapReveal>

          <FeaturesSectionGrid metrics={metrics} />
        </div>
      </SectionTransition>
    </section>
  )
}

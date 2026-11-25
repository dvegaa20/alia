import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getImpactMetrics } from '@/server/actions/analytics'
import { Button } from '@/components/ui/button'
import { FeaturesSectionGrid } from './features-grid'

/**
 * FeaturesSection — Server Component
 *
 * Band 3 (Venice Blue): displays real GA4 impact statistics only.
 */
export async function FeaturesSection() {
  const metrics = await getImpactMetrics()

  return (
    <section className="w-full bg-band-dark text-band-dark-foreground py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="text-left space-y-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-rock-blue">
              Transparencia en vivo · Últimos 30 días
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.15] tracking-[-0.025em] text-white dark:text-merino">
              Nuestro alcance
            </h2>
            <p className="font-sans text-base sm:text-lg text-merino/85 max-w-2xl leading-[1.55]">
              Conectamos a personas con voluntad de ayudar con organizaciones verificadas para
              fortalecer comunidades en México.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-merino/50 bg-transparent text-merino hover:bg-white/10 hover:text-white hover:border-merino px-5 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto"
          >
            <Link href="/impact">
              Explorar impacto
              <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>

        <FeaturesSectionGrid metrics={metrics} />
      </div>
    </section>
  )
}

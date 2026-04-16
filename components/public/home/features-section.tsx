import Link from 'next/link'
import { getImpactMetrics } from '@/server/actions/analytics'
import { FeaturesSectionGrid } from './features-grid'

/**
 * FeaturesSection — Server Component
 *
 * Fetches real impact metrics from GA4 (cached 1h) and renders them
 * in a bento-grid layout via the FeaturesSectionGrid client component.
 */
export async function FeaturesSection() {
  const metrics = await getImpactMetrics()

  return (
    <section className="px-4 sm:px-8 py-20 bg-background">
      <div className="max-w-400 mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground mb-4">
              Nuestro <span className="text-primary">Alcance</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground w-full max-w-2xl">
              Conectamos a personas con voluntad de ayudar con iniciativas verificadas para fortalecer nuestra comunidad.
            </p>
          </div>

          {/* Link to full /impacto dashboard */}
          <Link
            href="/impacto"
            className="shrink-0 text-xs font-bold text-primary uppercase tracking-wider hover:underline underline-offset-4 flex items-center gap-1 transition-opacity opacity-70 hover:opacity-100"
          >
            Explora nuestro impacto →
          </Link>
        </div>

        <FeaturesSectionGrid metrics={metrics} />
      </div>
    </section>
  )
}

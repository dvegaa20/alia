import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import type { CategoryCoverage } from '@/server/data/public-stats'

interface ImpactCategoryCoverageProps {
  categories: CategoryCoverage[]
  youthCount: number
  totalPublished: number
}

export function ImpactCategoryCoverage({
  categories,
  youthCount,
  totalPublished,
}: ImpactCategoryCoverageProps) {
  const maxCount = categories[0]?.count || 1

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#EAE1CD]/60 border-y border-[#DFD5C0] py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <GsapReveal className="text-center mb-14 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Cobertura del directorio
          </p>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C]">
            Causas por{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              categoría
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-xl mx-auto leading-[1.6]">
            Número de organizaciones e iniciativas publicadas en cada categoría.
          </p>
        </GsapReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <GsapReveal className="lg:col-span-8">
            <Card className="bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-2xl py-0">
              <CardContent className="p-6 lg:p-8">
                {categories.length === 0 ? (
                  <div className="py-10 text-center space-y-4">
                    <p className="font-sans text-base text-[#0C354C]/75">
                      Aún no hay categorías con causas publicadas.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-[#16587B] bg-transparent text-[#16587B] hover:bg-[#16587B] hover:text-white px-5 py-2 h-auto text-sm font-medium shadow-none"
                    >
                      <Link href="/directory">Explorar directorio</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#DFD5C0]/60">
                    {categories.map((cat) => {
                      const widthPercent = Math.max(4, Math.round((cat.count / maxCount) * 100))

                      return (
                        <Link
                          key={cat.slug}
                          href={`/directory?category=${cat.slug}`}
                          aria-label={`${cat.name}: ${cat.count} causas`}
                          className="group grid grid-cols-[minmax(0,9rem)_1fr_auto] sm:grid-cols-[minmax(0,14rem)_1fr_auto] items-center gap-4 py-2.5"
                        >
                          <span className="font-sans text-sm font-medium text-[#0C354C] group-hover:text-[#16587B] truncate transition-colors">
                            {cat.name}
                          </span>

                          <div className="h-2.5 rounded-full bg-[#EAE1CD] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#16587B] group-hover:bg-[#0C354C] transition-colors duration-200"
                              style={{ width: `${widthPercent}%` }}
                            />
                          </div>

                          <span className="inline-flex items-center gap-2 text-sm font-medium tabular-nums text-[#0C354C]">
                            <span>{cat.count.toLocaleString('es-MX')}</span>
                            <ArrowRight
                              className="size-4 text-[#0C354C]/45 group-hover:text-[#16587B] group-hover:translate-x-0.5 transition-all"
                              strokeWidth={1.5}
                            />
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </GsapReveal>

          <GsapReveal className="lg:col-span-4">
            <div className="rounded-2xl bg-[#0C354C] text-[#F5EEDD] p-8 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#124866] text-[#84B3CE] px-3.5 py-1 text-xs font-medium uppercase tracking-[0.06em]">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                Iniciativa Joven
              </span>

              <div className="space-y-2">
                <p className="font-normal text-5xl sm:text-6xl leading-none tracking-[-0.02em] tabular-nums text-white">
                  {youthCount.toLocaleString('es-MX')}
                </p>
                <p className="font-sans text-lg font-light text-[#F5EEDD]">
                  iniciativas jóvenes activas en el directorio
                </p>
              </div>

              <p className="font-sans text-sm text-[#F5EEDD]/80 leading-relaxed">
                Proyectos impulsados por estudiantes y colectivos jóvenes que buscan aliados para
                multiplicar su impacto local.
              </p>

              <div className="pt-1 space-y-4">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#84B3CE] hover:bg-[#9AC3DA] text-[#0C354C] px-5 py-2.5 h-auto text-sm font-medium shadow-none transition-colors"
                >
                  <Link href="/directory?type=YOUTH_INITIATIVE">
                    Ver iniciativas jóvenes
                    <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                  </Link>
                </Button>

                <p className="text-xs text-[#A8CBE0]/85 tabular-nums">
                  De {totalPublished.toLocaleString('es-MX')} causas publicadas en total.
                </p>
              </div>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  )
}

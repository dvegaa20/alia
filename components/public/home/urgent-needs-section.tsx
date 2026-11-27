import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import type { CategoryCoverage, HomeSpotlight } from '@/server/data/public-stats'

interface UrgentNeedsSectionProps {
  spotlight: HomeSpotlight
  categories: CategoryCoverage[]
}

export function UrgentNeedsSection({ spotlight, categories }: UrgentNeedsSectionProps) {
  const isUrgent = spotlight.mode === 'urgent'
  const visibleCategories = categories.slice(0, 8)

  return (
    <section
      id="categorias"
      data-nav-theme="light"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#F5EEDD] border-b border-[#DFD5C0] py-20 lg:py-24 scroll-mt-0"
    >
      <SectionTransition>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <GsapReveal className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 text-left">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                {isUrgent ? 'Urgencias de la semana' : 'Recién verificadas'}
              </p>
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-normal text-[#0C354C]">
                {isUrgent ? (
                  <>
                    Dónde tu ayuda{' '}
                    <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                      hace falta hoy
                    </span>
                  </>
                ) : (
                  <>
                    Causas{' '}
                    <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                      recién verificadas
                    </span>
                  </>
                )}
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl leading-[1.55]">
                {isUrgent
                  ? 'Organizaciones publicadas que reportan necesidades prioritarias en este momento.'
                  : 'Iniciativas que completaron su verificación y están listas para recibir tu apoyo directo.'}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#16587B] bg-transparent text-[#16587B] hover:bg-[#16587B] hover:text-white px-6 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto shadow-none transition-colors"
            >
              <Link href="/directory">
                Ver directorio completo
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </GsapReveal>

          {spotlight.orgs.length > 0 ? (
            <GsapReveal
              staggerSelector="[data-reveal-card]"
              stagger={0.08}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {spotlight.orgs.map((org) => (
                <Link
                  key={org.slug}
                  href={`/directory/${org.slug}`}
                  data-reveal-card
                  className="group rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] hover:border-[#84B3CE] overflow-hidden flex flex-col transition-colors duration-200"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE1CD]">
                    <Image
                      src={org.coverImageUrl || '/images/landscape2.jpg'}
                      alt={org.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span
                      className={
                        org.urgentNeed
                          ? 'absolute top-3 left-3 inline-flex items-center rounded-full bg-urgency-coral text-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.05em]'
                          : 'absolute top-3 left-3 inline-flex items-center rounded-full bg-[#0C354C]/80 text-[#F5EEDD] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.05em]'
                      }
                    >
                      {org.urgentNeed ? 'Urgente' : 'Nueva'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#16587B] truncate">
                        {org.categories[0]}
                      </p>
                      <h3 className="font-sans font-medium text-lg text-[#0C354C] leading-snug line-clamp-2 group-hover:text-[#16587B] transition-colors">
                        {org.name}
                      </h3>

                      {org.urgentNeed ? (
                        <div className="rounded-xl border border-urgency-coral/25 bg-urgency-coral/10 p-3 text-sm text-[#0C354C]">
                          <p className="font-medium leading-snug line-clamp-2">
                            Necesita: {org.urgentNeed.title}
                          </p>
                          {org.urgentCount > 1 && (
                            <p className="text-xs text-urgency-coral mt-1 font-medium">
                              +{org.urgentCount - 1} más
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed line-clamp-3">
                          {org.shortDescription}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#DFD5C0]/70 flex items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-[#0C354C]/65 truncate">
                        <MapPin className="size-3.5 shrink-0 text-[#16587B]" strokeWidth={1.5} />
                        <span className="truncate">{org.location}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#16587B] shrink-0">
                        Cómo ayudar
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </GsapReveal>
          ) : (
            <GsapReveal>
              <div className="rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] p-8 sm:p-10 text-center space-y-4">
                <p className="font-sans text-base text-[#0C354C]/80 max-w-lg mx-auto">
                  Pronto verás aquí las necesidades de las organizaciones verificadas. ¿Conoces
                  una?
                </p>
                <SuggestOrgDialog>
                  <Button
                    type="button"
                    className="rounded-full bg-[#16587B] hover:bg-[#0C354C] text-white px-6 py-2.5 h-auto text-sm font-medium shadow-none"
                  >
                    Sugerir ONG
                  </Button>
                </SuggestOrgDialog>
              </div>
            </GsapReveal>
          )}

          {visibleCategories.length > 0 && (
            <GsapReveal className="mt-14 pt-10 border-t border-[#DFD5C0] space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Explora por categoría
              </p>
              <div className="flex flex-wrap gap-2.5">
                {visibleCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/directory?category=${cat.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#DFD5C0] bg-[#FAF7F0] px-4 py-2 text-sm text-[#0C354C] hover:border-[#16587B] hover:text-[#16587B] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs tabular-nums text-[#0C354C]/60">{cat.count}</span>
                  </Link>
                ))}
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#16587B]/35 bg-transparent px-4 py-2 text-sm font-medium text-[#16587B] hover:bg-[#16587B] hover:text-white transition-colors"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="size-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </GsapReveal>
          )}
        </div>
      </SectionTransition>
    </section>
  )
}

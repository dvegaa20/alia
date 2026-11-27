import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import type { FeaturedTestimony } from '@/server/data/public-stats'

interface CommunityCtaSectionProps {
  testimony: FeaturedTestimony | null
}

export function CommunityCtaSection({ testimony }: CommunityCtaSectionProps) {
  const imageSrc = testimony?.imageUrl || '/images/landscape5.jpg'
  const imageAlt = testimony
    ? `Trabajo en campo de ${testimony.orgName}`
    : 'Voluntarios clasificando donativos en comunidad'

  return (
    <section
      data-nav-theme="light"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#EAE1CD] py-20 lg:py-24"
    >
      <SectionTransition>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <GsapReveal className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#DFD5C0] bg-[#FAF7F0]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0C354C]/85 via-[#0C354C]/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col gap-1 text-white">
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
                    Comunidad en acción
                  </span>
                  {testimony && (
                    <p className="font-sans text-lg font-light text-[#F5EEDD]">
                      {testimony.orgName}
                    </p>
                  )}
                </div>
              </div>
            </GsapReveal>

            <GsapReveal className="lg:col-span-6 space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Comunidad en acción
              </p>

              <Quote className="size-8 text-[#16587B]/40" strokeWidth={1.5} aria-hidden="true" />

              {testimony ? (
                <figure className="space-y-4">
                  <blockquote className="font-serif italic text-2xl sm:text-3xl leading-[1.3] text-[#0C354C]">
                    &ldquo;{testimony.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#0C354C]/75">
                    <span className="font-medium text-[#0C354C]">{testimony.author}</span>
                    <span>·</span>
                    <span>{testimony.role}</span>
                    <span>·</span>
                    <Link
                      href={`/directory/${testimony.orgSlug}`}
                      className="font-medium text-[#16587B] hover:text-[#0C354C] underline-offset-4 hover:underline"
                    >
                      {testimony.orgName}
                    </Link>
                  </figcaption>
                </figure>
              ) : (
                <figure className="space-y-4">
                  <blockquote className="font-serif italic text-2xl sm:text-3xl leading-[1.3] text-[#0C354C]">
                    &ldquo;El compromiso social no requiere grandes recursos, sino una visión clara
                    y la determinación de ejecutarla.&rdquo;
                  </blockquote>
                  <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#0C354C]/75">
                    <span className="font-medium text-[#0C354C]">Sofía Vega</span>
                    <span>·</span>
                    <span>Fundadora &amp; Directora de Alia</span>
                  </figcaption>
                </figure>
              )}

              <div className="pt-10 mt-10 border-t border-[#0C354C]/15 space-y-5">
                <h2 className="font-sans font-light text-3xl sm:text-4xl leading-[1.08] tracking-normal text-[#0C354C]">
                  ¿Listo para hacer una verdadera{' '}
                  <span className="font-serif italic font-normal text-[#16587B]">diferencia</span>?
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#0C354C]/80 leading-relaxed max-w-xl">
                  Explora nuestro directorio verificado de organizaciones sociales o comparte una
                  iniciativa de tu comunidad para sumarla.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button
                    asChild
                    className="rounded-full bg-[#16587B] hover:bg-[#0C354C] text-white px-6 py-2.5 h-auto text-sm font-medium shadow-none transition-colors"
                  >
                    <Link href="/directory">
                      Explorar Directorio
                      <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                    </Link>
                  </Button>

                  <SuggestOrgDialog>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full border-[#16587B] text-[#16587B] bg-transparent hover:bg-[#16587B] hover:text-white px-6 py-2.5 h-auto text-sm font-medium shadow-none transition-colors"
                    >
                      Sugerir ONG
                    </Button>
                  </SuggestOrgDialog>
                </div>
              </div>
            </GsapReveal>
          </div>
        </div>
      </SectionTransition>
    </section>
  )
}

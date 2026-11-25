'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrganizationCard } from '@/components/public/directory/organization-card'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import type { OrganizationCardProps } from '@/types'

interface TrustSectionProps {
  youthInitiatives?: OrganizationCardProps[]
}

export function TrustSection({ youthInitiatives = [] }: TrustSectionProps) {
  return (
    <section className="w-full bg-background py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Part 1 — Puente de Confianza */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
              Puente de confianza
            </p>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-[-0.025em] text-foreground">
              Por un ecosistema social transparente y accesible.
            </h2>
            <p className="font-sans text-base sm:text-lg text-foreground-secondary leading-[1.6]">
              No somos una plataforma de recaudación, somos un puente. Creemos que la transformación
              social ocurre cuando las personas saben exactamente dónde y cómo su apoyo genera
              impacto real.
            </p>

            {/* Clean White Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Card className="bg-surface border border-border ring-0 rounded-[20px] py-0">
                <CardContent className="p-6 space-y-3">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-semibold text-base text-foreground">
                    Red de confianza
                  </h3>
                  <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
                    Revisamos y validamos cada iniciativa para asegurar que tu apoyo llegue a quien
                    lo necesita.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border border-border ring-0 rounded-[20px] py-0">
                <CardContent className="p-6 space-y-3">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <HeartHandshake className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-semibold text-base text-foreground">
                    Vínculo directo
                  </h3>
                  <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
                    Conecta sin intermediarios ni comisiones con las personas que lideran cada
                    proyecto.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border bg-surface">
              <Image
                alt="Trabajo colaborativo en comunidad"
                src="/images/landscape2.jpg"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Part 2 — Iniciativas Jóvenes */}
        <div className="pt-16 border-t border-border space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rock-blue/25 text-deep-harbor dark:bg-rock-blue/20 dark:text-rock-blue border border-rock-blue/40 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.04em]">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                Iniciativa Joven
              </span>
              <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-foreground">
                ¿Te gusta esta iniciativa? ¡Hay que hacerla real!
              </h2>
              <p className="font-sans text-sm sm:text-base text-foreground-secondary leading-[1.55]">
                Proyectos liderados por jóvenes y comunidades escolares que están transformando su
                entorno desde hoy.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary/5 px-5 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto"
            >
              <Link href="/directory">
                Ver todas
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {youthInitiatives.map((org) => (
                <OrganizationCard key={`home-youth-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-border bg-surface p-8 text-center space-y-4">
              <p className="font-sans text-base text-foreground-secondary max-w-lg mx-auto">
                Próximamente verás aquí iniciativas lideradas por jóvenes y proyectos escolares en
                México. ¿Conoces una?
              </p>
              <SuggestOrgDialog>
                <Button
                  type="button"
                  className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-2.5 h-auto text-sm font-medium"
                >
                  Sugerir iniciativa joven
                </Button>
              </SuggestOrgDialog>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

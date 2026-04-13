'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, ShieldCheck, Eye, Users } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export function FeaturesSection() {
  return (
    <section className="px-4 sm:px-8 py-20 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground mb-4">
            Nuestro <span className="text-primary">Impacto</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground w-full max-w-2xl">
            Conectamos donantes con organizaciones verificadas para crear un cambio real y sostenible.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 — Image + Badge (tall) */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="relative bg-card rounded-2xl overflow-hidden min-h-[280px] md:row-span-2 group"
          >
            {/* Placeholder image */}
            <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2 opacity-40">
                  <div className="size-12 rounded-full bg-base-300/50 mx-auto flex items-center justify-center">
                    <Eye className="size-5 text-base-400" />
                  </div>
                  <p className="text-base-400 text-xs font-medium uppercase tracking-wider">
                    Imagen
                  </p>
                </div>
              </div>
            </div>

            {/* Floating brand badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="bg-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2 border border-border/40">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="size-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-foreground font-headline">Alia</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Compassion-Driven Support */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
          >
            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <HeartHandshake className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground font-headline leading-snug mb-3">
                Apoyo Basado en
                <br />
                Compasión
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conectamos personas con organizaciones que brindan ayuda esencial a familias con
                cuidado, respeto y dignidad.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Transparent & Trusted */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
          >
            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground font-headline leading-snug mb-3">
                Transparente y Confiable
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cada organización es verificada y curada. Con reportes claros y actualizaciones
                reales de impacto.
              </p>
            </div>
          </motion.div>

          {/* Card 4 — Stat: Active Orgs + Community Programs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl font-bold text-foreground font-headline">200+</span>
              <span className="text-sm text-muted-foreground font-medium">
                Organizaciones Activas
              </span>
            </div>

            <div className="mt-auto pt-6">
              <h3 className="text-lg font-bold text-foreground font-headline leading-snug mb-2">
                Programas Comunitarios
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nuestras iniciativas empoderan comunidades locales a través de educación, salud y
                apoyo sustentable.
              </p>
            </div>
          </motion.div>

          {/* Card 5 — Stat: People Impacted */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-card rounded-2xl p-8 flex flex-col justify-center min-h-[180px] border border-border/60 shadow-sm"
          >
            <span className="text-4xl font-bold text-foreground font-headline mb-2">50,000+</span>
            <span className="text-base text-muted-foreground font-medium">Personas Impactadas</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

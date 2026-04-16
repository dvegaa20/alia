'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Database, Zap } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

interface ImpactTransparencyProps {
  lastUpdated: string
}

export function ImpactTransparency({ lastUpdated }: ImpactTransparencyProps) {
  const items = [
    {
      icon: <Database className="size-5 text-primary" />,
      title: 'Origen de los datos',
      description:
        'Nuestros registros se basan en la interacción genuina de las personas con la plataforma, garantizando que cada número represente un interés real.',
    },
    {
      icon: <Clock className="size-5 text-primary" />,
      title: 'Actualización periódica',
      description:
        'Consultamos y actualizamos la información constantemente para ofrecer una visión clara y honesta del alcance del proyecto en tiempo real.',
    },
    {
      icon: <ShieldCheck className="size-5 text-primary" />,
      title: 'Datos verificables',
      description:
        'Mostramos la actividad real sin ajustes ni estimaciones, excluyendo visitas técnicas para mantener la integridad de la información ciudadana.',
    },
    {
      icon: <Zap className="size-5 text-primary" />,
      title: 'Vínculos genuinos',
      description:
        'Cada "vínculo" representa un paso hacia la colaboración: descubrir una iniciativa, visitar su labor o compartir su impacto con otros.',
    },
  ]

  return (
    <section className="px-4 sm:px-8 py-20 bg-background">
      <div className="max-w-400 mx-auto">

        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-12">
          <h2 className="text-2xl md:text-4xl font-bold font-headline text-foreground mb-3">
            Compromiso con la transparencia
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Creemos que la confianza se construye con datos verificables. Aquí explicamos de dónde
            vienen los números y cómo los obtenemos.
          </p>
        </motion.div>

        {/* Transparency cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border/50 rounded-2xl p-6"
            >
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-foreground font-headline mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Last updated footer */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border/40 pt-6"
        >
          <Clock className="size-3.5 shrink-0" />
          <span>Última actualización de datos: {formatDate(lastUpdated)}</span>
        </motion.div>
      </div>
    </section>
  )
}

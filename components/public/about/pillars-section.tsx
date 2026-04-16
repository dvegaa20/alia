'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const pillars = [
  {
    icon: 'volunteer_activism',
    title: 'Siempre Gratuito',
    description:
      'Sin costos, sin anuncios y sin rastreadores. Queremos que el vínculo entre las personas sea directo, genuino y sin barreras.',
    iconBg: 'bg-primary/20 dark:bg-primary-200/20',
    iconColor: 'text-primary-900 dark:text-primary-200',
  },
  {
    icon: 'verified_user',
    title: 'Revisión Humana',
    description:
      'Cada proyecto es verificado personalmente por nuestro equipo para construir una red de confianza. Conocemos las historias detrás de cada causa.',
    iconBg: 'bg-secondary dark:bg-secondary/50',
    iconColor: 'text-secondary-foreground',
  },
  {
    icon: 'public',
    title: 'Compromiso Social',
    description:
      'No buscamos beneficios económicos. Este es nuestro aporte al bienestar común, construido con voluntad y tiempo de nuestra comunidad.',
    iconBg: 'bg-chart-1/20',
    iconColor: 'text-chart-1',
  },
]

export function PillarsSection() {
  return (
    <section className="px-8 py-28 max-w-400 mx-auto overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="font-headline font-bold text-4xl text-foreground mb-4">Nuestros Pilares</h2>
        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
          >
            <Card className="h-full p-10 ring-0 shadow-[0_20px_40px_rgba(26,28,28,0.04)] hover:shadow-[0_20px_40px_rgba(26,28,28,0.08)] transition-all duration-300 flex flex-col items-center text-center group">
              <CardContent className="flex flex-col items-center text-center p-0">
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${pillar.iconBg} rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
                >
                  <span className={`material-symbols-outlined ${pillar.iconColor} text-3xl`}>
                    {pillar.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-bold text-2xl mb-4">{pillar.title}</h3>

                {/* Description */}
                <p className="font-body text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

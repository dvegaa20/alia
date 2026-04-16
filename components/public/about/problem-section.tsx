'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function ProblemSection() {
  return (
    <section className="px-8 py-20 bg-muted/50 overflow-hidden">
      <div className="max-w-400 mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 space-y-8"
        >
          <h2 className="font-headline font-bold text-4xl text-primary-900 dark:text-primary-200">
            Por qué decidimos actuar
          </h2>
          <div className="space-y-6 font-body text-lg text-muted-foreground leading-loose">
            <p>
              En un mundo saturado de información, encontrar iniciativas honestas y cercanas se ha
              vuelto una tarea compleja. A menudo, los proyectos locales quedan invisibilizados por
              la falta de recursos digitales, mientras que las personas con ganas de sumar no saben
              por dónde empezar.
            </p>
            <p>
              Notamos que las redes existentes solían ser comerciales o enfocarse solo en grandes
              estructuras. Hacía falta un puente humano, transparente y gratuito que pusiera en valor
              el trabajo de quienes transforman nuestra realidad cada día, desde el territorio.
            </p>
          </div>
        </motion.div>

        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="aspect-4/5 rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              alt="Voluntarios trabajando juntos"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU3XvkKQaeT9fD1SsYXd6PKBjNwZTNHq2ZZ-WMeJNtKuJMJZvtPgqIHJ-8WVZ52YzdnU-xiM1zDGOVvt1CMXZL7iKBACJ-zN6WvkH7FjpnbRSH0PpyKcSvv5RjmrCiXyPAYS-S0Q3-1bhYnvopgNw5ju9mdXaHtSRpKwGUUmffhiEN7rMKQ7IF6l0RK0HzuZh7C30ecNe_VtawlIR18G__U4jnTZT7Bxyn6idLkjQhZsQcXCzKPMVpG9r4rPjsNMMbg14tK33wxK0"
              width={800}
              height={1000}
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full opacity-20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}

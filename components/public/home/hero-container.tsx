'use client'

import { motion } from 'framer-motion'

export function HeroContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {/* Glow Effect — positioned at the boundary between Hero and Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute left-1/4 bottom-1/2 -translate-x-1/2 w-200 h-150 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--color-ds-primary-fixed) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        className="absolute left-1/3 bottom-[40%] -translate-x-1/3 w-125 h-100 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, var(--color-ds-tertiary-container) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {children}
    </div>
  )
}

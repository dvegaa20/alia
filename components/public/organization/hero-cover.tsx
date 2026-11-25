'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroCoverProps {
  coverImageUrl: string
  logoUrl: string
  name: string
}

export function HeroCover({ coverImageUrl, logoUrl, name }: HeroCoverProps) {
  return (
    <section className="relative">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-64 sm:h-80 md:h-[400px] w-full rounded-2xl overflow-hidden relative border border-border bg-surface-subtle"
      >
        <Image
          src={coverImageUrl || '/images/landscape3.jpg'}
          alt={`${name} portada`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </motion.div>

      {/* Logo Overlay */}
      <motion.div
        initial={{ scale: 0.9, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="absolute -bottom-14 left-6 md:left-10"
      >
        <div className="size-24 md:size-28 rounded-2xl bg-surface p-2 overflow-hidden border-4 border-background ring-1 ring-border flex items-center justify-center">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              width={112}
              height={112}
              className="size-full object-contain rounded-xl"
            />
          ) : (
            <span className="font-sans font-semibold text-2xl text-primary bg-primary/10 size-full rounded-xl flex items-center justify-center">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </motion.div>
    </section>
  )
}

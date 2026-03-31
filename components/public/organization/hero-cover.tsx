"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroCoverProps {
  coverImageUrl: string;
  logoUrl: string;
  name: string;
}

export function HeroCover({ coverImageUrl, logoUrl, name }: HeroCoverProps) {
  return (
    <section className="relative">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-75 md:h-112.5 w-full rounded-xl overflow-hidden relative"
      >
        <Image
          src={coverImageUrl}
          alt={`${name} cover photo`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </motion.div>

      {/* Logo Overlay */}
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        className="absolute -bottom-16 left-6 md:left-12"
      >
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-background p-1 shadow-lg overflow-hidden border-4 border-background">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

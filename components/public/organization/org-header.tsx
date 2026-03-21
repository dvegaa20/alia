"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BadgeCheck } from "lucide-react";

interface OrgHeaderProps {
  name: string;
  verified: boolean;
  categories: { id: string; name: string }[];
}

export function OrgHeader({ name, verified, categories }: OrgHeaderProps) {
  return (
    <section className="mt-20 space-y-4">
      {/* Back to Directory */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-ds-primary transition-colors font-label text-sm font-bold uppercase tracking-wider group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Volver al directorio
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-4">
          {/* Name + Verified badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground">
              {name}
            </h1>
            {verified && (
              <Badge className="bg-ds-primary-fixed text-ds-on-primary-fixed border-none px-3 py-1 rounded-full text-xs font-bold font-label uppercase tracking-wider h-auto gap-1">
                <BadgeCheck className="size-3.5" />
                Verificada
              </Badge>
            )}
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                className="bg-ds-tertiary-container text-ds-on-tertiary-container border-none px-4 py-1.5 rounded-full text-sm font-medium font-label h-auto"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

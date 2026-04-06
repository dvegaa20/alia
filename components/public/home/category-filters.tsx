"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, GraduationCap, HeartPulse, Home, Scale, Baby, Grid2X2 } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, any> = {
  "medio-ambiente": Leaf,
  educacion: GraduationCap,
  salud: HeartPulse,
  vivienda: Home,
  infancia: Baby,
  "derechos-humanos": Scale,
};

interface CategoryFiltersProps {
  categories: any[];
  activeCategorySlug: string;
}

export function CategoryFilters({ categories, activeCategorySlug }: CategoryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Category Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] || Leaf;
          const isActive = cat.slug === activeCategorySlug;
          return (
            <Link key={cat.id} href={`/?category=${cat.slug}`} scroll={false} prefetch={true}>
              <Button
                variant="ghost"
                className={`px-6 py-3 h-auto rounded-full font-label font-medium flex items-center gap-2 transition-colors ${isActive
                  ? "bg-primary/20 text-primary dark:bg-primary/80 dark:text-primary-foreground hover:bg-ds-primary-fixed/80 dark:hover:bg-ds-primary-container/80"
                  : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
              >
                <Icon className="size-4" />
                {cat.name}
              </Button>
            </Link>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/directory">
          <Button variant="ghost" className="px-6 py-3 h-auto rounded-full font-label font-medium items-center gap-2 transition-colors bg-muted text-muted-foreground hover:bg-accent hidden md:flex">
            <Grid2X2 className="size-4" />
            Ver más categorías
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

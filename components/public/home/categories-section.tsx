"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, HeartPulse, GraduationCap, PawPrint, Scale, Grid2X2 } from "lucide-react";
import { Feature, type CampaignItem } from "@/components/ui/feature-with-image-carousel";
import Link from "next/link";
import { Organization, Location, Category } from "@/prisma/generated/client";

// Define a type for our dynamic data
export type DynamicCategoryData = Category & {
  organizations: (Organization & { location: Location | null })[];
};

interface CategoriesSectionProps {
  categories: DynamicCategoryData[];
}

// Fallback icons map based on common slugs
const categoryIcons: Record<string, React.ElementType> = {
  "medio-ambiente": Leaf,
  "salud": HeartPulse,
  "educacion": GraduationCap,
  "animales": PawPrint,
  "justicia-social": Scale,
};

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || "");
  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

  if (!activeCategory) return null;

  const ActiveIcon = categoryIcons[activeCategory.slug] || Leaf;

  const activeCategoryData = {
    badge: activeCategory.name,
    title: `Descubre más sobre ${activeCategory.name.toLowerCase()}`,
    description: activeCategory.description || "Explora las organizaciones que están haciendo la diferencia en esta categoría.",
    items: (activeCategory.organizations || []).map(org => ({
      slug: org.slug,
      name: org.name,
      description: org.shortDescription,
      location: org.location ? `${org.location.city}, ${org.location.state}` : "Ubicación no especificada",
      tag: activeCategory.name,
      image: org.coverImageUrl || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80",
      logo: org.logoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(org.name) + "&background=random",
    })) as CampaignItem[]
  };

  return (
    <section className="px-8 py-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
              return (
                <Button
                  key={cat.id}
                  variant="ghost"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`px-6 py-3 h-auto rounded-full font-label font-medium flex items-center gap-2 transition-colors ${cat.id === activeCategoryId
                    ? "bg-ds-primary-fixed text-ds-on-primary-fixed dark:bg-ds-primary-container dark:text-ds-on-primary hover:bg-ds-primary-fixed/80 dark:hover:bg-ds-primary-container/80"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                >
                  <Icon className="size-4" />
                  {cat.name}
                </Button>
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

        {/* Campaign Carousel for Active Category */}
        <motion.div
          key={activeCategoryId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <Feature
            badge={activeCategoryData.badge}
            title={activeCategoryData.title}
            description={activeCategoryData.description}
            items={activeCategoryData.items}
          />
        </motion.div>
      </div>
    </section>
  );
}

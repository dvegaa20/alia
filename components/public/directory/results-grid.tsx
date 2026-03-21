"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  OrganizationCard,
  type OrganizationCardProps,
} from "./organization-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const sampleOrganizations: OrganizationCardProps[] = [
  {
    name: "Reforesta Verde",
    description:
      "Recuperamos ecosistemas locales a través de la plantación estratégica de especies nativas y educación ambiental.",
    category: "Medio Ambiente",
    location: "Galicia, España",
    coverImage: "/images/directorio/card-forest.jpg",
    logoImage: "/images/directorio/logo-forest.jpg",
    verified: true,
  },
  {
    name: "Letras para el Futuro",
    description:
      "Programa de alfabetización digital y apoyo escolar para niños en zonas rurales de difícil acceso.",
    category: "Educación",
    location: "Sevilla, España",
    coverImage: "/images/directorio/card-education.jpg",
    logoImage: "/images/directorio/logo-education.jpg",
    verified: true,
  },
  {
    name: "Asistencia Solidaria",
    description:
      "Red de asistencia médica gratuita y acompañamiento psicológico para familias vulnerables.",
    category: "Salud",
    location: "Madrid, España",
    coverImage: "/images/directorio/card-health.jpg",
    logoImage: "/images/directorio/logo-health.jpg",
    verified: false,
  },
];

export function ResultsGrid() {
  return (
    <section className="flex-1 min-w-0">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight font-headline mb-2">
            Resultados
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground font-medium">
            <span className="text-ds-primary dark:text-ds-primary-fixed font-bold">
              124
            </span>
            <span>organizaciones encontradas</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm font-medium">
          <span className="text-muted-foreground">Ordenar por:</span>
          <Button
            variant="ghost"
            className="flex items-center space-x-1 text-foreground hover:text-ds-primary dark:hover:text-ds-primary-fixed p-0 h-auto font-medium"
          >
            <span>Relevancia</span>
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </motion.header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sampleOrganizations.map((org, idx) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <OrganizationCard {...org} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="Anterior" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="Siguiente" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </motion.footer>
    </section>
  );
}

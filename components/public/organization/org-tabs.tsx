"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutContent } from "./about-content";
import { ContactSidebar } from "./contact-sidebar";

interface OrgTabsProps {
  name: string;
  fullDescription: string | null;
  galleryImages: string[];
  email: string;
  phone?: string | null;
  website?: string | null;
  location?: string;
}

export function OrgTabs({
  name,
  fullDescription,
  galleryImages,
  email,
  phone,
  website,
  location,
}: OrgTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Tabs defaultValue="sobre" className="mt-12">
        {/* Tab Navigation */}
        <TabsList className="bg-transparent border-b border-border/30 rounded-none w-full justify-start gap-10 h-auto p-0">
        <TabsTrigger
          value="sobre"
          className="rounded-none border-b-4 border-transparent data-[state=active]:border-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Sobre nosotros
        </TabsTrigger>
        <TabsTrigger
          value="explorar"
          className="rounded-none border-b-4 border-transparent data-[state=active]:border-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Explorar
        </TabsTrigger>
        <TabsTrigger
          value="impacto"
          className="rounded-none border-b-4 border-transparent data-[state=active]:border-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Impacto
        </TabsTrigger>
        <TabsTrigger
          value="contacto"
          className="rounded-none border-b-4 border-transparent data-[state=active]:border-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Contacto
        </TabsTrigger>
        <TabsTrigger
          value="donar"
          className="rounded-none border-b-4 border-transparent data-[state=active]:border-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Donar
        </TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="sobre" className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Left Column: Story */}
          <AboutContent
            name={name}
            fullDescription={fullDescription}
            galleryImages={galleryImages}
          />

          {/* Right Column: Sidebar */}
          <ContactSidebar
            location={location}
            email={email}
            phone={phone}
            website={website}
          />
        </div>
      </TabsContent>

      <TabsContent value="explorar" className="mt-12">
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-2">
            Aquí podrás explorar los proyectos y actividades de esta
            organización.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="impacto" className="mt-12">
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-2">
            Métricas de impacto y reportes estarán disponibles aquí.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="contacto" className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">Próximamente</p>
            <p className="text-sm mt-2">
              Formulario de contacto directo disponible próximamente.
            </p>
          </div>
          <ContactSidebar
            location={location}
            email={email}
            phone={phone}
            website={website}
          />
        </div>
      </TabsContent>

      <TabsContent value="donar" className="mt-12">
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-2">
            Opciones de donación estarán disponibles aquí.
          </p>
        </div>
      </TabsContent>
    </Tabs>
    </motion.div>
  );
}

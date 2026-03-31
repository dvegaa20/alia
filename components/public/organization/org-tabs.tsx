"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTab from "./tabs/about-tab";
import ExploreTab from "./tabs/explore-tab";
import ImpactTab from "./tabs/impact-tab";
import ContactTab from "./tabs/contact-tab";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface OrgTabsProps {
  name: string;
  fullDescription: string | null;
  galleryImages: string[];
  email: string;
  phone?: string | null;
  website?: string | null;
  location?: string;
  googleMapsUrl?: string | null;
  // Impact sidebar
  impactCurrent?: number | null;
  impactGoal?: number | null;
  impactType?: string | null;
  // Explore tab
  relevantLinks: string[];
  // Impact tab
  featuredFact?: any;
  secondaryFacts?: any;
  testimony?: any;
  milestone?: any;
  foundedYear?: number | null;
  verified?: boolean;
  // Contact tab
  officeHours?: any;
}

export function OrgTabs({
  name,
  fullDescription,
  galleryImages,
  email,
  phone,
  website,
  location,
  googleMapsUrl,
  impactCurrent,
  impactGoal,
  impactType,
  relevantLinks,
  featuredFact,
  secondaryFacts,
  testimony,
  milestone,
  foundedYear,
  verified,
  officeHours,
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
          className="rounded-none border-0 border-b-4 border-transparent data-[state=active]:border-b-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent! dark:data-[state=active]:bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Sobre nosotros
        </TabsTrigger>
        <TabsTrigger
          value="explorar"
          className="rounded-none border-0 border-b-4 border-transparent data-[state=active]:border-b-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent! dark:data-[state=active]:bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Explorar
        </TabsTrigger>
        <TabsTrigger
          value="impacto"
          className="rounded-none border-0 border-b-4 border-transparent data-[state=active]:border-b-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent! dark:data-[state=active]:bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Impacto
        </TabsTrigger>
        <TabsTrigger
          value="contacto"
          className="rounded-none border-0 border-b-4 border-transparent data-[state=active]:border-b-ds-primary data-[state=active]:text-ds-primary data-[state=active]:font-bold data-[state=active]:shadow-none text-muted-foreground font-medium tracking-tight pb-4 px-0 bg-transparent! dark:data-[state=active]:bg-transparent hover:text-ds-primary transition-colors cursor-pointer"
        >
          Contacto
        </TabsTrigger>
        </TabsList>

      {/* Tab Content */}
      <TabsContent value="sobre" className="mt-12">
        <AboutTab
          name={name}
          fullDescription={fullDescription}
          galleryImages={galleryImages}
          email={email}
          phone={phone}
          website={website}
          location={location}
          impactCurrent={impactCurrent}
          impactGoal={impactGoal}
          impactType={impactType}
        />
      </TabsContent>

      <TabsContent value="explorar" className="mt-12">
        <ExploreTab relevantLinks={relevantLinks} />
      </TabsContent>

      <TabsContent value="impacto" className="mt-12">
        <ImpactTab
          featuredFact={featuredFact}
          secondaryFacts={secondaryFacts}
          testimony={testimony}
          milestone={milestone}
          foundedYear={foundedYear}
          verified={verified}
        />
      </TabsContent>

      <TabsContent value="contacto" className="mt-12">
        <ContactTab
          email={email}
          phone={phone}
          location={location}
          googleMapsUrl={googleMapsUrl}
          officeHours={officeHours}
        />
      </TabsContent>

    </Tabs>
    </motion.div>
  );
}

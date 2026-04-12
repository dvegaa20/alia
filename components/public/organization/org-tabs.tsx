"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTab from "./tabs/about-tab";
import ExploreTab from "./tabs/explore-tab";
import NeedsTab from "./tabs/needs-tab";
import ImpactTab from "./tabs/impact-tab";
import ContactTab from "./tabs/contact-tab";

import { TAB_TRIGGER_CX } from '@/lib/styles';
import type { OrgTabsProps } from '@/types'

export function OrgTabs({
  name,
  fullDescription,
  galleryImages,
  email,
  phone,
  website,
  location,
  googleMapsUrl,
  coordinates,
  impactCurrent,
  impactGoal,
  impactType,
  relevantLinks,
  needs,
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
            className={TAB_TRIGGER_CX}
          >
            Sobre nosotros
          </TabsTrigger>
          <TabsTrigger
            value="explorar"
            className={TAB_TRIGGER_CX}
          >
            Explorar
          </TabsTrigger>
          <TabsTrigger
            value="necesidades"
            className={TAB_TRIGGER_CX}
          >
            Necesidades
          </TabsTrigger>
          <TabsTrigger
            value="impacto"
            className={TAB_TRIGGER_CX}
          >
            Impacto
          </TabsTrigger>
          <TabsTrigger
            value="contacto"
            className={TAB_TRIGGER_CX}
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

        <TabsContent value="necesidades" className="mt-12">
          <NeedsTab needs={needs} />
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
            coordinates={coordinates}
            officeHours={officeHours}
          />
        </TabsContent>

      </Tabs>
    </motion.div>
  );
}

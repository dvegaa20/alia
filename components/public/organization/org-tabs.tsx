'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AboutTab } from './tabs/about-tab'
import { ExploreTab } from './tabs/explore-tab'
import { NeedsTab } from './tabs/needs-tab'
import { ImpactTab } from './tabs/impact-tab'
import { ContactTab } from './tabs/contact-tab'

import { TAB_TRIGGER_CX } from '@/lib/styles'
import type { OrgTabsProps } from '@/types'

export function OrgTabs({
  name,
  fullDescription,
  galleryImages,
  email,
  phone,
  whatsapp,
  address,
  website,
  location,
  googleMapsUrl,
  coordinates,
  impactCurrent,
  impactGoal,
  impactType,
  relevantLinks,
  needs,
  howToDonate,
  isDonatariaAutorizada,
  volunteering,
  events,
  impactHighlights,
  impactTestimony,
  foundedYear,
  verified,
  officeHours,
}: OrgTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Tabs defaultValue="sobre" className="mt-10">
        {/* Tab Navigation */}
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-6 sm:gap-8 h-auto p-0 overflow-x-auto scrollbar-none">
          <TabsTrigger value="sobre" className={TAB_TRIGGER_CX}>
            Sobre nosotros
          </TabsTrigger>
          <TabsTrigger value="explorar" className={TAB_TRIGGER_CX}>
            Explorar
          </TabsTrigger>
          <TabsTrigger value="necesidades" className={TAB_TRIGGER_CX}>
            Necesidades
          </TabsTrigger>
          <TabsTrigger value="impacto" className={TAB_TRIGGER_CX}>
            Impacto
          </TabsTrigger>
          <TabsTrigger value="contacto" className={TAB_TRIGGER_CX}>
            Contacto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sobre" className="mt-10">
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

        <TabsContent value="explorar" className="mt-10">
          <ExploreTab relevantLinks={relevantLinks} />
        </TabsContent>

        <TabsContent value="necesidades" className="mt-10">
          <NeedsTab
            needs={needs}
            howToDonate={howToDonate}
            isDonatariaAutorizada={isDonatariaAutorizada}
            volunteering={volunteering}
            events={events}
            whatsapp={whatsapp}
            orgName={name}
          />
        </TabsContent>

        <TabsContent value="impacto" className="mt-10">
          <ImpactTab
            impactHighlights={impactHighlights}
            impactTestimony={impactTestimony}
            foundedYear={foundedYear}
            verified={verified}
          />
        </TabsContent>

        <TabsContent value="contacto" className="mt-10">
          <ContactTab
            email={email}
            phone={phone}
            whatsapp={whatsapp}
            address={address}
            location={location}
            googleMapsUrl={googleMapsUrl}
            coordinates={coordinates}
            officeHours={officeHours}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

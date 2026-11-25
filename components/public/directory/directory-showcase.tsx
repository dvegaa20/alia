'use client'

import { Sparkles, Clock, Rocket } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { OrganizationCard, type OrganizationCardProps } from './organization-card'

interface DirectoryShowcaseProps {
  youthInitiatives: OrganizationCardProps[]
  newAdditions: OrganizationCardProps[]
  children: React.ReactNode
}

export function DirectoryShowcase({
  youthInitiatives,
  newAdditions,
  children,
}: DirectoryShowcaseProps) {
  return (
    <Tabs defaultValue="all" className="w-full space-y-8">
      {/* Top Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TabsList className="bg-[#FAF7F0] border border-[#DFD5C0] rounded-[4px] p-1 h-auto flex flex-wrap gap-1 w-full sm:w-fit">
          <TabsTrigger
            value="all"
            className="rounded-[4px] px-4 py-2 text-sm font-medium text-[#0C354C]/75 data-[state=active]:bg-[#16587B] data-[state=active]:text-white data-[state=active]:shadow-none transition-colors"
          >
            Directorio completo
          </TabsTrigger>
          <TabsTrigger
            value="youth"
            className="group rounded-[4px] px-4 py-2 text-sm font-medium text-[#0C354C]/75 data-[state=active]:bg-[#16587B] data-[state=active]:text-white data-[state=active]:shadow-none gap-2 transition-colors"
          >
            <Sparkles className="size-3.5" strokeWidth={1.5} />
            Iniciativas jóvenes
            {youthInitiatives.length > 0 && (
              <Badge className="rounded-[4px] bg-[#124866] text-[#84B3CE] group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white border-none px-1.5 py-0 font-mono text-[10px] font-medium tabular-nums">
                {youthInitiatives.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-[4px] px-4 py-2 text-sm font-medium text-[#0C354C]/75 data-[state=active]:bg-[#16587B] data-[state=active]:text-white data-[state=active]:shadow-none gap-2 transition-colors"
          >
            <Clock className="size-3.5" strokeWidth={1.5} />
            Nuevas adiciones
          </TabsTrigger>
        </TabsList>
      </div>

      {/* TAB 1: All Directory + Highlights */}
      <TabsContent value="all" className="space-y-10 mt-0">
        {newAdditions.length > 0 && (
          <section className="rounded-[8px] border border-[#DFD5C0] bg-[#EAE1CD]/60 p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Recién sumadas
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-light tracking-normal text-[#0C354C]">
                Nuevas{' '}
                <span className="font-serif italic font-normal text-[#16587B]">adiciones</span>
              </h2>
              <p className="font-sans text-sm text-[#0C354C]/75">
                Las causas y organizaciones más recientes que se han integrado a Alia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {newAdditions.slice(0, 3).map((org) => (
                <OrganizationCard key={`new-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          </section>
        )}

        {/* Youth Initiatives Highlight Block */}
        <section className="rounded-[8px] border border-[#84B3CE]/45 bg-[#84B3CE]/12 p-6 md:p-8 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <Badge className="rounded-[4px] bg-[#124866] text-[#84B3CE] border border-[#124866] px-2.5 py-1 h-auto font-mono text-[11px] font-medium uppercase tracking-[0.06em] gap-1.5">
              <Rocket className="size-3.5" strokeWidth={1.5} />
              Iniciativa Joven · Escolares
            </Badge>
            <h2 className="font-sans text-2xl md:text-3xl font-light tracking-normal text-[#0C354C]">
              ¿Te gusta esta iniciativa? ¡Hay que hacerla{' '}
              <span className="font-serif italic font-normal text-[#16587B]">real</span>!
            </h2>
            <p className="font-sans text-sm md:text-base text-[#0C354C]/75">
              Iniciativas de jóvenes que quieren generar un impacto real en su comunidad.
            </p>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {youthInitiatives.slice(0, 3).map((org) => (
                <OrganizationCard key={`youth-top-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="rounded-[8px] border border-dashed border-[#DFD5C0] bg-[#FAF7F0] p-6 text-center text-sm text-[#0C354C]/65">
              Próximamente verás aquí las iniciativas lideradas por jóvenes y comunidades escolares.
            </div>
          )}
        </section>

        {/* Main ResultsGrid */}
        {children}
      </TabsContent>

      {/* TAB 2: Iniciativas Jóvenes */}
      <TabsContent value="youth" className="space-y-8 mt-0">
        <section className="rounded-[8px] border border-[#84B3CE]/45 bg-[#84B3CE]/12 p-6 md:p-8 space-y-8">
          <div className="space-y-2.5 max-w-2xl">
            <Badge className="rounded-[4px] bg-[#124866] text-[#84B3CE] border border-[#124866] px-2.5 py-1 h-auto font-mono text-[11px] font-medium uppercase tracking-[0.06em] gap-1.5">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Iniciativa Joven
            </Badge>
            <h2 className="font-sans text-3xl font-light tracking-normal text-[#0C354C]">
              ¿Te gusta esta iniciativa? ¡Hay que hacerla{' '}
              <span className="font-serif italic font-normal text-[#16587B]">real</span>!
            </h2>
            <p className="font-sans text-base text-[#0C354C]/75">
              Iniciativas de jóvenes que quieren hacer un impacto real.
            </p>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {youthInitiatives.map((org) => (
                <OrganizationCard key={`youth-tab-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-[8px] border border-dashed border-[#DFD5C0] bg-[#FAF7F0] space-y-2 px-6">
              <Rocket className="size-9 mx-auto text-[#16587B] mb-2" strokeWidth={1.5} />
              <p className="font-sans text-lg font-medium text-[#0C354C]">
                Aún no hay iniciativas jóvenes publicadas
              </p>
              <p className="font-sans text-sm text-[#0C354C]/75 max-w-md mx-auto">
                Cuando se publiquen causas con el tipo &ldquo;Iniciativa Joven / Escolar&rdquo;,
                aparecerán en esta sección.
              </p>
            </div>
          )}
        </section>
      </TabsContent>

      {/* TAB 3: Nuevas Adiciones */}
      <TabsContent value="new" className="space-y-8 mt-0">
        <section className="rounded-[8px] border border-[#DFD5C0] bg-[#EAE1CD]/60 p-6 md:p-8 space-y-8">
          <div className="space-y-2">
            <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#16587B]">
              Ordenadas por fecha de registro
            </span>
            <h2 className="font-sans text-3xl font-light tracking-normal text-[#0C354C]">
              Nuevas{' '}
              <span className="font-serif italic font-normal text-[#16587B]">adiciones</span>
            </h2>
            <p className="font-sans text-sm text-[#0C354C]/75">
              Conoce las organizaciones y proyectos sociales que se sumaron recientemente a Alia.
            </p>
          </div>

          {newAdditions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {newAdditions.map((org) => (
                <OrganizationCard key={`new-tab-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-[#0C354C]/60">
              No hay organizaciones registradas todavía.
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  )
}

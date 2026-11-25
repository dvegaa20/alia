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
      {/* Top Tab Bar (Pill Container) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TabsList className="bg-surface border border-border rounded-full p-1.5 h-auto flex flex-wrap gap-1 w-full sm:w-fit">
          <TabsTrigger
            value="all"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none transition-colors"
          >
            Directorio completo
          </TabsTrigger>
          <TabsTrigger
            value="youth"
            className="group rounded-full px-4 py-2 text-sm font-medium text-foreground-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none gap-2 transition-colors"
          >
            <Sparkles className="size-3.5" strokeWidth={1.5} />
            Iniciativas jóvenes
            {youthInitiatives.length > 0 && (
              <Badge className="rounded-full bg-rock-blue/25 text-deep-harbor dark:bg-rock-blue/25 dark:text-rock-blue group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white dark:group-data-[state=active]:bg-midnight-harbor/25 dark:group-data-[state=active]:text-midnight-harbor border-none px-2 py-0 font-mono text-[10px] font-medium tabular-nums">
                {youthInitiatives.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none gap-2 transition-colors"
          >
            <Clock className="size-3.5" strokeWidth={1.5} />
            Nuevas adiciones
          </TabsTrigger>
        </TabsList>
      </div>

      {/* TAB 1: All Directory + Highlights */}
      <TabsContent value="all" className="space-y-10 mt-0">
        {newAdditions.length > 0 && (
          <section className="rounded-[20px] border border-border bg-surface-subtle/60 dark:bg-surface/40 p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-primary">
                Recién sumadas
              </span>
              <h2 className="font-sans text-2xl font-medium tracking-[-0.02em] text-foreground">
                Nuevas adiciones
              </h2>
              <p className="font-sans text-sm text-foreground-secondary">
                Las causas y organizaciones más recientes que se han integrado a Alia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {newAdditions.slice(0, 3).map((org) => (
                <OrganizationCard key={`new-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          </section>
        )}

        {/* Youth Initiatives Highlight Block */}
        <section className="rounded-[20px] border border-rock-blue/50 bg-rock-blue/10 dark:bg-dark-surface p-6 md:p-8 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <Badge className="rounded-full bg-rock-blue/25 text-deep-harbor dark:bg-rock-blue/20 dark:text-rock-blue border border-rock-blue/40 px-3 py-1 h-auto font-mono text-[11px] font-medium uppercase tracking-[0.04em] gap-1.5">
              <Rocket className="size-3.5" strokeWidth={1.5} />
              Iniciativa Joven · Escolares
            </Badge>
            <h2 className="font-sans text-2xl md:text-3xl font-medium tracking-[-0.02em] text-foreground">
              ¿Te gusta esta iniciativa? ¡Hay que hacerla real!
            </h2>
            <p className="font-sans text-sm md:text-base text-foreground-secondary">
              Iniciativas de jóvenes que quieren generar un impacto real en su comunidad.
            </p>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {youthInitiatives.slice(0, 3).map((org) => (
                <OrganizationCard key={`youth-top-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm text-foreground-muted">
              Próximamente verás aquí las iniciativas lideradas por jóvenes y comunidades escolares.
            </div>
          )}
        </section>

        {/* Main ResultsGrid */}
        {children}
      </TabsContent>

      {/* TAB 2: Iniciativas Jóvenes */}
      <TabsContent value="youth" className="space-y-8 mt-0">
        <section className="rounded-[20px] border border-rock-blue/50 bg-rock-blue/10 dark:bg-dark-surface p-6 md:p-8 space-y-8">
          <div className="space-y-2.5 max-w-2xl">
            <Badge className="rounded-full bg-rock-blue/25 text-deep-harbor dark:bg-rock-blue/20 dark:text-rock-blue border border-rock-blue/40 px-3 py-1 h-auto font-mono text-[11px] font-medium uppercase tracking-[0.04em] gap-1.5">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Iniciativa Joven
            </Badge>
            <h2 className="font-sans text-3xl font-medium tracking-[-0.02em] text-foreground">
              ¿Te gusta esta iniciativa? ¡Hay que hacerla real!
            </h2>
            <p className="font-sans text-base text-foreground-secondary">
              Iniciativas de jóvenes que quieren hacer un impacto real.
            </p>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {youthInitiatives.map((org) => (
                <OrganizationCard key={`youth-tab-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-surface space-y-2 px-6">
              <Rocket className="size-9 mx-auto text-primary mb-2" strokeWidth={1.5} />
              <p className="font-sans text-lg font-semibold text-foreground">
                Aún no hay iniciativas jóvenes publicadas
              </p>
              <p className="font-sans text-sm text-foreground-secondary max-w-md mx-auto">
                Cuando se publiquen causas con el tipo &ldquo;Iniciativa Joven / Escolar&rdquo;,
                aparecerán en esta sección.
              </p>
            </div>
          )}
        </section>
      </TabsContent>

      {/* TAB 3: Nuevas Adiciones */}
      <TabsContent value="new" className="space-y-8 mt-0">
        <section className="rounded-[20px] border border-border bg-surface-subtle/60 dark:bg-surface/40 p-6 md:p-8 space-y-8">
          <div className="space-y-2">
            <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-primary">
              Ordenadas por fecha de registro
            </span>
            <h2 className="font-sans text-3xl font-medium tracking-[-0.02em] text-foreground">
              Nuevas adiciones
            </h2>
            <p className="font-sans text-sm text-foreground-secondary">
              Conoce las organizaciones y proyectos sociales que se sumaron recientemente a Alia.
            </p>
          </div>

          {newAdditions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {newAdditions.map((org) => (
                <OrganizationCard key={`new-tab-${org.slug}`} {...org} surface="on-merino" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-foreground-muted">
              No hay organizaciones registradas todavía.
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  )
}

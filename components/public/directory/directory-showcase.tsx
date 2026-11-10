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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
        <TabsList className="bg-transparent p-0 h-auto flex flex-wrap gap-1.5">
          <TabsTrigger
            value="all"
            className="rounded-xl px-4 py-2.5 text-sm font-bold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Directorio Completo
          </TabsTrigger>
          <TabsTrigger
            value="youth"
            className="rounded-xl px-4 py-2.5 text-sm font-bold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
          >
            <Sparkles className="size-4 text-amber-500" />
            Iniciativas Jóvenes
            {youthInitiatives.length > 0 && (
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-none px-2 py-0 text-[10px]">
                {youthInitiatives.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-xl px-4 py-2.5 text-sm font-bold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
          >
            <Clock className="size-4 text-primary" />
            Nuevas Adiciones
          </TabsTrigger>
        </TabsList>
      </div>

      {/* TAB 1: All Directory + Top Highlights */}
      <TabsContent value="all" className="space-y-10 mt-0">
        {/* Fila de Nuevas Adiciones */}
        {newAdditions.length > 0 && (
          <section className="bg-slate-50/40 dark:bg-zinc-900/20 p-6 md:p-8 rounded-3xl border border-border/30 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/15 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Recién sumadas
                  </Badge>
                </div>
                <h2 className="text-2xl font-extrabold font-headline text-foreground tracking-tight">
                  Nuevas adiciones
                </h2>
                <p className="text-sm text-muted-foreground font-medium">
                  Las causas y organizaciones más recientes que se han integrado a Alia.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {newAdditions.slice(0, 3).map((org) => (
                <OrganizationCard key={`new-${org.slug}`} {...org} />
              ))}
            </div>
          </section>
        )}

        {/* Bloque de Iniciativas Jóvenes en la parte superior */}
        <section className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-linear-to-br from-amber-500/10 via-primary/5 to-background p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Rocket className="size-3.5" />
                Iniciativas Jóvenes y Escolares
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-foreground tracking-tight">
                ¿Te gusta esta iniciativa? ¡Hay que hacerla real!
              </h2>
              <p className="text-muted-foreground font-medium text-sm md:text-base">
                Iniciativas de jóvenes que quieren hacer un impacto real.
              </p>
            </div>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {youthInitiatives.slice(0, 3).map((org) => (
                <OrganizationCard key={`youth-top-${org.slug}`} {...org} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-amber-500/30 bg-background/60 p-6 text-center text-sm text-muted-foreground">
              Próximamente verás aquí las iniciativas lideradas por jóvenes y comunidades escolares.
            </div>
          )}
        </section>

        {/* Main ResultsGrid */}
        {children}
      </TabsContent>

      {/* TAB 2: Iniciativas Jóvenes */}
      <TabsContent value="youth" className="space-y-8 mt-0">
        <section className="rounded-3xl border border-amber-500/25 bg-linear-to-br from-amber-500/10 via-primary/5 to-background p-6 md:p-10 space-y-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              Impulso Joven
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-foreground tracking-tight">
              ¿Te gusta esta iniciativa? ¡Hay que hacerla real!
            </h2>
            <p className="text-muted-foreground font-medium text-base">
              Iniciativas de jóvenes que quieren hacer un impacto real.
            </p>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {youthInitiatives.map((org) => (
                <OrganizationCard key={`youth-tab-${org.slug}`} {...org} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-background/60 space-y-2">
              <Rocket className="size-10 mx-auto text-amber-500/60 mb-2" />
              <p className="text-lg font-bold text-foreground">
                Aún no hay iniciativas jóvenes publicadas
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Cuando se publiquen causas con el tipo &ldquo;Iniciativa Joven / Escolar&rdquo;,
                aparecerán en esta sección.
              </p>
            </div>
          )}
        </section>
      </TabsContent>

      {/* TAB 3: Nuevas Adiciones */}
      <TabsContent value="new" className="space-y-8 mt-0">
        <section className="bg-slate-50/40 dark:bg-zinc-900/20 p-6 md:p-8 rounded-3xl border border-border/30 space-y-8">
          <div className="space-y-2">
            <Badge className="bg-primary/15 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
              Ordenadas por fecha de registro
            </Badge>
            <h2 className="text-3xl font-extrabold font-headline text-foreground tracking-tight">
              Nuevas adiciones
            </h2>
            <p className="text-muted-foreground font-medium text-sm">
              Conoce las organizaciones y proyectos sociales que se sumaron recientemente a Alia.
            </p>
          </div>

          {newAdditions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {newAdditions.map((org) => (
                <OrganizationCard key={`new-tab-${org.slug}`} {...org} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              No hay organizaciones registradas todavía.
            </div>
          )}
        </section>
      </TabsContent>
    </Tabs>
  )
}

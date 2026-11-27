import Link from 'next/link'
import { AlertCircle, ArrowUpRight, Info, ShieldAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminAnalyticsResult } from '@/server/admin/ga4'

interface AnalyticsPanelProps {
  result: AdminAnalyticsResult
}

function formatUpdatedDate(iso: string): string {
  return new Date(iso).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  })
}

export function AnalyticsPanel({ result }: AnalyticsPanelProps) {
  const report =
    result.status === 'ok' || result.status === 'empty' ? result.report : undefined

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analítica (GA4)</h1>
          <p className="text-sm text-muted-foreground">
            Tráfico de los últimos 30 días · Solo visible para administradores
          </p>
        </div>
        {report && (
          <p className="text-xs text-muted-foreground tabular-nums">
            Actualizado: {formatUpdatedDate(report.fetchedAt)}
          </p>
        )}
      </div>

      {result.status === 'not_configured' && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>GA4 no configurado</AlertTitle>
          <AlertDescription className="space-y-1">
            <p>{result.message}</p>
            <p className="text-xs text-muted-foreground">
              Las páginas públicas no dependen de estos datos.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {result.status === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al conectar con GA4</AlertTitle>
          <AlertDescription className="space-y-1">
            <p>{result.message}</p>
            <p className="text-xs">Las páginas públicas no dependen de estos datos.</p>
          </AlertDescription>
        </Alert>
      )}

      {result.status === 'unauthorized' && (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>No autorizado</AlertTitle>
          <AlertDescription className="space-y-1">
            <p>{result.message}</p>
            <p className="text-xs">Las páginas públicas no dependen de estos datos.</p>
          </AlertDescription>
        </Alert>
      )}

      {!report ? null : (
        <>
          {result.status === 'empty' && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Sin datos recientes</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Usuarios únicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-card-foreground tabular-nums">
                  {report.activeUsers.toLocaleString('es-MX')}
                </span>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Páginas vistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-card-foreground tabular-nums">
                  {report.pageViews.toLocaleString('es-MX')}
                </span>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Vínculos directos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-card-foreground tabular-nums">
                    {report.socialLeads.toLocaleString('es-MX')}
                  </span>
                  <span className="text-[11px] text-muted-foreground">eventos social_lead</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Organizaciones más visitadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {report.topOrgs.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">
                  Sin visitas registradas a perfiles en este periodo.
                </p>
              ) : (
                <div className="space-y-4">
                  {report.topOrgs.map((org, idx) => {
                    const maxViews = report.topOrgs[0]?.views || 1
                    const widthPercent = Math.max(4, Math.round((org.views / maxViews) * 100))

                    return (
                      <div key={org.path} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs font-medium text-muted-foreground tabular-nums w-5 shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <Link
                              href={`/directory/${org.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-foreground hover:text-primary truncate inline-flex items-center gap-1"
                            >
                              <span className="truncate">{org.title}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            </Link>
                          </div>
                          <span className="text-xs font-medium text-muted-foreground tabular-nums shrink-0">
                            {org.views.toLocaleString('es-MX')} visitas
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

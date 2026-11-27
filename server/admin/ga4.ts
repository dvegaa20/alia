import { auth } from '@clerk/nextjs/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { unstable_cache } from 'next/cache'

export interface Ga4TopOrg {
  path: string
  title: string
  views: number
  slug: string
}

export interface Ga4Report {
  activeUsers: number
  pageViews: number
  socialLeads: number
  topOrgs: Ga4TopOrg[]
  fetchedAt: string
}

export type AdminAnalyticsResult =
  | { status: 'ok'; report: Ga4Report }
  | { status: 'empty'; report: Ga4Report; message: string }
  | { status: 'not_configured'; message: string; missing: string[] }
  | { status: 'error'; message: string }
  | { status: 'unauthorized'; message: string }

function createAnalyticsClient(): BetaAnalyticsDataClient {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
  })
}

async function fetchGa4Report(propertyId: string): Promise<Ga4Report> {
  const client = createAnalyticsClient()
  const property = `properties/${propertyId}`
  const dateRange = { startDate: '30daysAgo', endDate: 'today' }

  const [overviewRes, eventsRes, topOrgsRes] = await Promise.all([
    client.runReport({
      property,
      dateRanges: [dateRange],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    }),
    client.runReport({
      property,
      dateRanges: [dateRange],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: { value: 'social_lead' },
        },
      },
    }),
    client.runReport({
      property,
      dateRanges: [dateRange],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/directory/',
          },
        },
      },
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: '12',
    }),
  ])

  const overviewRow = overviewRes[0]?.rows?.[0]
  const activeUsers = parseInt(overviewRow?.metricValues?.[0]?.value ?? '0', 10)
  const pageViews = parseInt(overviewRow?.metricValues?.[1]?.value ?? '0', 10)

  const socialLeads =
    eventsRes[0]?.rows?.reduce((acc, row) => {
      return acc + parseInt(row.metricValues?.[0]?.value ?? '0', 10)
    }, 0) ?? 0

  const topOrgs: Ga4TopOrg[] = (topOrgsRes[0]?.rows ?? [])
    .map((row) => {
      const path = row.dimensionValues?.[0]?.value ?? ''
      const rawTitle = row.dimensionValues?.[1]?.value ?? ''
      const views = parseInt(row.metricValues?.[0]?.value ?? '0', 10)
      const slug = path.replace('/directory/', '').replace(/\/$/, '')
      const title = rawTitle.split(' | ')[0].trim() || slug

      return { path, title, views, slug }
    })
    .filter((org) => org.slug && org.slug !== '' && !org.path.includes('?'))
    .slice(0, 10)

  return {
    activeUsers,
    pageViews,
    socialLeads,
    topOrgs,
    fetchedAt: new Date().toISOString(),
  }
}

const getCachedGa4Report = unstable_cache(fetchGa4Report, ['admin-ga4-report'], {
  revalidate: 3600,
  tags: ['admin-ga4-report'],
})

export async function getAdminAnalytics(): Promise<AdminAnalyticsResult> {
  const { userId } = await auth()
  if (!userId) {
    return {
      status: 'unauthorized',
      message: 'Debes iniciar sesión como administrador para consultar la analítica.',
    }
  }

  const missing: string[] = []
  if (!process.env.GA4_PROPERTY_ID) missing.push('GA4_PROPERTY_ID')
  if (!process.env.GOOGLE_CLIENT_EMAIL) missing.push('GOOGLE_CLIENT_EMAIL')
  if (!process.env.GOOGLE_PRIVATE_KEY) missing.push('GOOGLE_PRIVATE_KEY')

  if (missing.length > 0) {
    return {
      status: 'not_configured',
      missing,
      message: `Faltan variables de entorno: ${missing.join(', ')}`,
    }
  }

  try {
    const report = await getCachedGa4Report(process.env.GA4_PROPERTY_ID!)

    if (
      report.activeUsers === 0 &&
      report.pageViews === 0 &&
      report.socialLeads === 0 &&
      report.topOrgs.length === 0
    ) {
      return {
        status: 'empty',
        report,
        message:
          'GA4 respondió sin datos en los últimos 30 días. Verifica el ID de propiedad y que el tag (NEXT_PUBLIC_GA_ID) esté registrando visitas.',
      }
    }

    return { status: 'ok', report }
  } catch (error) {
    console.error('[getAdminAnalytics] GA4 API error:', error)
    const message = (error instanceof Error ? error.message : String(error)).slice(0, 300)
    return { status: 'error', message }
  }
}

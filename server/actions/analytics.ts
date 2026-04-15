'use server'

import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { unstable_cache } from 'next/cache'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopOrg {
  /** e.g. "/directory/fundacion-xyz" */
  path: string
  /** Page title as recorded by GA4 */
  title: string
  /** screenPageViews in the last 30 days */
  views: number
  /** Slug extracted from path for linking */
  slug: string
}

export interface ImpactMetrics {
  /** Unique users in the last 30 days (GA4 activeUsers) */
  communityReach: number
  /** Count of custom `social_lead` events in the last 30 days */
  realConnections: number
  /** Total page views in the last 30 days */
  pageViews: number
  /** Top 10 most visited organization profiles */
  topOrgs: TopOrg[]
  /** ISO timestamp of when this data was fetched (for display in UI) */
  lastUpdated: string
}

// ─── GA4 Client Factory ───────────────────────────────────────────────────────

function createAnalyticsClient(): BetaAnalyticsDataClient {
  // The private key in .env.local has literal `\n` — convert to actual newlines
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
  })
}

// ─── Core Fetch (not exported directly — wrapped in cache below) ──────────────

async function fetchImpactMetrics(): Promise<ImpactMetrics> {
  const propertyId = process.env.GA4_PROPERTY_ID

  if (!propertyId) {
    console.warn('[fetchImpactMetrics] GA4_PROPERTY_ID not set — returning zeros')
    return buildFallback()
  }

  const client = createAnalyticsClient()
  const property = `properties/${propertyId}`
  const dateRange = { startDate: '30daysAgo', endDate: 'today' }

  try {
    const [overviewRes, eventsRes, topOrgsRes] = await Promise.all([
      // 1. Overall reach metrics
      client.runReport({
        property,
        dateRanges: [dateRange],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      }),

      // 2. Custom social_lead event count
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

      // 3. Top 10 most visited organization profiles
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
        limit: '12', // fetch a few extra to filter out non-org paths
      }),
    ])

    // Parse overview metrics
    const overviewRow = overviewRes[0]?.rows?.[0]
    const communityReach = parseInt(overviewRow?.metricValues?.[0]?.value ?? '0', 10)
    const pageViews = parseInt(overviewRow?.metricValues?.[1]?.value ?? '0', 10)

    // Sum all social_lead event rows
    const realConnections =
      eventsRes[0]?.rows?.reduce((acc, row) => {
        return acc + parseInt(row.metricValues?.[0]?.value ?? '0', 10)
      }, 0) ?? 0

    // Build top orgs list — filter out directory index pages
    const topOrgs: TopOrg[] = (topOrgsRes[0]?.rows ?? [])
      .map((row) => {
        const path = row.dimensionValues?.[0]?.value ?? ''
        const rawTitle = row.dimensionValues?.[1]?.value ?? ''
        const views = parseInt(row.metricValues?.[0]?.value ?? '0', 10)
        // Extract slug from path: "/directory/my-org" → "my-org"
        const slug = path.replace('/directory/', '').replace(/\/$/, '')
        // Clean the title: "Org Name | Alia" → "Org Name"
        const title = rawTitle.split(' | ')[0].trim() || slug

        return { path, title, views, slug }
      })
      // Only keep actual org profiles (slug must be non-empty and not "page" params)
      .filter((org) => org.slug && org.slug !== '' && !org.path.includes('?'))
      .slice(0, 10)

    return {
      communityReach,
      realConnections,
      pageViews,
      topOrgs,
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error('[fetchImpactMetrics] GA4 API error:', error)
    return buildFallback()
  }
}

function buildFallback(): ImpactMetrics {
  return {
    communityReach: 0,
    realConnections: 0,
    pageViews: 0,
    topOrgs: [],
    lastUpdated: new Date().toISOString(),
  }
}

// ─── Exported Cached Action ───────────────────────────────────────────────────
//
// GA4 Free Tier: 25,000 tokens/day
// With revalidate: 3600 (1 hour) → max 24 calls/day ≈ 0.2% of free quota
// Cost: $0.00
//
export const getImpactMetrics = unstable_cache(fetchImpactMetrics, ['ga4-impact-metrics'], {
  revalidate: 3600,
  tags: ['impact-metrics'],
})

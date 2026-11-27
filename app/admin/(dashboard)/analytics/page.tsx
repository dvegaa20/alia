import { type Metadata } from 'next'
import { getAdminAnalytics } from '@/server/admin/ga4'
import { AnalyticsPanel } from '@/components/admin/analytics-panel'

export const metadata: Metadata = {
  title: 'Analítica (GA4)',
}

export const dynamic = 'force-dynamic'

export default async function AdminAnalyticsPage() {
  const result = await getAdminAnalytics()
  return <AnalyticsPanel result={result} />
}

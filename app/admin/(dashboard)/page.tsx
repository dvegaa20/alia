import { Suspense } from 'react'
import { StatsGrid } from '@/components/admin/stats-grid'
import { OrganizationsTable } from '@/components/admin/organizations-table'
import { getAdminOrganizations, getAdminCategories } from '@/server/actions'
import type { OrganizationStatus } from '@/prisma/generated/enums'

type SearchParams = Promise<{
  q?: string
  status?: string
  page?: string
  sort?: string
  order?: 'asc' | 'desc'
}>

export default async function AdminDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams

  const [result, categoriesResult] = await Promise.all([
    getAdminOrganizations({
      query: params.q,
      status: params.status as OrganizationStatus | undefined,
      page: params.page ? Number(params.page) : 1,
      limit: 10,
      sort: params.sort,
      order: params.order,
    }),
    getAdminCategories(),
  ])

  const organizations = result.data ?? []
  const meta = result.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 }
  const categories = categoriesResult.data ?? []

  return (
    <div className="space-y-10">
      <Suspense fallback={null}>
        <StatsGrid />
      </Suspense>
      <OrganizationsTable organizations={organizations} meta={meta} categories={categories} />
    </div>
  )
}

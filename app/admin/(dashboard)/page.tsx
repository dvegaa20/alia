import { Suspense } from "react"
import { StatsGrid } from "@/components/admin/stats-grid"
import { OrganizationsTable } from "@/components/admin/organizations-table"
import { getAdminOrganizations } from "@/server/actions"
import type { OrganizationStatus } from "@/prisma/generated/client"

type SearchParams = Promise<{
  q?: string
  status?: string
  page?: string
  sort?: string
  order?: "asc" | "desc"
}>

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams

  const result = await getAdminOrganizations({
    query: params.q,
    status: params.status as OrganizationStatus | undefined,
    page: params.page ? Number(params.page) : 1,
    limit: 10,
    sort: params.sort,
    order: params.order,
  })

  const organizations = result.data ?? []
  const meta = result.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 }

  return (
    <div className="space-y-10">
      <Suspense fallback={null}>
        <StatsGrid />
      </Suspense>
      <OrganizationsTable organizations={organizations} meta={meta} />
    </div>
  )
}

import { StatsGrid } from "@/components/admin/stats-grid"
import { InsightCard } from "@/components/admin/insight-card"
import { OrganizationsTable } from "@/components/admin/organizations-table"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <StatsGrid />
      <OrganizationsTable />
      <InsightCard />
    </div>
  )
}

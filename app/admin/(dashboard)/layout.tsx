import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { getPendingSuggestionsCount } from "@/server/actions"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const countResult = await getPendingSuggestionsCount()
  const pendingCount = countResult.data ?? 0

  return (
    <SidebarProvider>
      <AdminSidebar pendingCount={pendingCount} />
      <SidebarInset className="bg-background min-h-screen">
        <AdminHeader />
        <main className="p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

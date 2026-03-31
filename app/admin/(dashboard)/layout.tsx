import { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { OrganizationFormSheet } from "@/components/admin/organization-form-sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background min-h-screen">
        <Suspense fallback={<AdminHeader />}>
          <AdminHeader />
        </Suspense>
        <main className="p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Suspense fallback={null}>
          <OrganizationFormSheet />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}

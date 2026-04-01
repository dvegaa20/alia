"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton, useUser } from "@clerk/nextjs"
import {
  LayoutDashboard,
  Tags,
  ClipboardList,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar({ pendingCount = 0 }: { pendingCount?: number }) {
  const { user } = useUser()
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Categorías",
      icon: Tags,
      href: "/admin/categories",
    },
    {
      label: "Sugerencias",
      icon: ClipboardList,
      href: "/admin/suggestions",
      badge: pendingCount,
    },
  ]

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="px-6 py-8 flex flex-col gap-1">
        <span className="text-lg font-bold text-sidebar-foreground">
          Admin Panel
        </span>
        <span className="text-xs font-medium text-sidebar-foreground/70 tracking-wide uppercase truncate">
          {user?.fullName || user?.firstName || "Digital Curator"}
        </span>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="flex flex-col gap-1">
          {routes.map((route) => {
            const isActive = pathname === route.href || (route.href !== "/admin" && pathname?.startsWith(route.href))

            return (
              <SidebarMenuItem key={route.href}>
                <Link
                  href={route.href}
                  className={
                    isActive
                      ? "flex w-full items-center gap-3 px-4 py-3 text-sidebar-accent-foreground font-semibold border-r-4 border-sidebar-primary bg-sidebar-accent rounded-lg text-sm"
                      : "flex w-full items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-lg font-medium text-sm"
                  }
                >
                  <route.icon className="h-5 w-5" />
                  <span className="flex-1">{route.label}</span>
                  {"badge" in route && route.badge !== undefined && route.badge > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full animate-pulse">
                      {route.badge > 99 ? "99+" : route.badge}
                    </span>
                  )}
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border bg-sidebar-accent/30">
        <SidebarMenu className="flex flex-col gap-1">
          <SidebarMenuItem>
            <SignOutButton redirectUrl="/">
              <button className="flex w-full items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-lg font-medium text-sm">
                <LogOut className="h-5 w-5" />
                Cerrar Sesión
              </button>
            </SignOutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

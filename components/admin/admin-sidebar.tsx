"use client"

import * as React from "react"
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"
import {
  LayoutDashboard,
  Building2,
  Tags,
  ClipboardList,
  UserCircle,
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

export function AdminSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="px-6 py-8 flex flex-col gap-1">
        <span className="text-lg font-bold text-sidebar-foreground">
          Admin Panel
        </span>
        <span className="text-xs font-medium text-sidebar-foreground/70 tracking-wide uppercase">
          Digital Curator
        </span>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu className="flex flex-col gap-1">
          <SidebarMenuItem>
            <Link
              href="#"
              className="flex w-full items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-lg font-medium text-sm"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="#"
              className="flex w-full items-center gap-3 px-4 py-3 text-sidebar-accent-foreground font-semibold border-r-4 border-sidebar-primary bg-sidebar-accent rounded-lg text-sm"
            >
              <Building2 className="h-5 w-5" />
              Organizaciones
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="#"
              className="flex w-full items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-lg font-medium text-sm"
            >
              <Tags className="h-5 w-5" />
              Categorías
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="#"
              className="flex w-full items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-lg font-medium text-sm"
            >
              <ClipboardList className="h-5 w-5" />
              Sugerencias Pendientes
            </Link>
          </SidebarMenuItem>
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

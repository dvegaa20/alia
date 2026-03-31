import { UserButton } from "@clerk/nextjs"
import { Suspense } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "../mode-toggle"
import { NewOrgButton } from "./new-org-button"

export function AdminHeader() {
  return (
    <header className="flex justify-between items-center px-8 sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-md font-bold text-foreground">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-6">
        <Suspense fallback={null}>
          <NewOrgButton />
        </Suspense>
        <div className="flex items-center gap-4 text-muted-foreground">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <ModeToggle size="icon-sm" />
        </div>
      </div>
    </header>
  )
}

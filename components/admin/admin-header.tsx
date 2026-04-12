import { Plus } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Button } from '../ui/button'
import Link from 'next/link'

export function AdminHeader() {
  return (
    <header className="flex justify-between items-center px-8 sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-md font-bold text-foreground">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-6">
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold transition-transform active:translate-y-0.5 flex items-center gap-2"
        >
          <Link href="?action=new-org">
            <Plus className="h-4 w-4" />
            New Organization
          </Link>
        </Button>
        <div className="flex items-center gap-4 text-muted-foreground">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
              },
            }}
          />
          <ModeToggle size="icon-sm" />
        </div>
      </div>
    </header>
  )
}

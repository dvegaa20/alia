"use client"

import { Plus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export function NewOrgButton() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("orgSheet", "create")
    router.push(`?${params.toString()}`)
  }

  return (
    <Button
      onClick={onClick}
      className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold transition-transform active:translate-y-0.5 flex items-center gap-2"
    >
      <Plus className="h-4 w-4" />
      New Organization
    </Button>
  )
}

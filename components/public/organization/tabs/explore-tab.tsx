'use client'

import { useEffect, useState } from 'react'
import { Link2, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface LinkPreviewData {
  title?: string
  description?: string
  image?: string
  url: string
}

function LinkCard({ url }: { url: string }) {
  const [data, setData] = useState<LinkPreviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function fetchPreview() {
      try {
        const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
        const json = await res.json()

        if (mounted && json.status === 'success') {
          setData({
            title: json.data.title,
            description: json.data.description,
            image: json.data.image?.url || json.data.logo?.url,
            url: json.data.url || url,
          })
        } else if (mounted) {
          setData({ url })
        }
      } catch {
        if (mounted) setData({ url })
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchPreview()
    return () => {
      mounted = false
    }
  }, [url])

  if (loading) {
    return (
      <Card className="rounded-[20px] overflow-hidden border border-border bg-surface h-80 flex flex-col py-0">
        <Skeleton className="h-40 w-full rounded-none" />
        <CardContent className="flex-1 space-y-3 pt-6">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    )
  }

  const title = data?.title || url.replace(/^https?:\/\//, '')

  return (
    <a
      href={data?.url || url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <Card className="rounded-[20px] overflow-hidden border border-border bg-surface h-full flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-rock-blue py-0">
        {/* Cover Image */}
        <div className="h-40 overflow-hidden relative bg-surface-subtle flex items-center justify-center border-b border-border shrink-0">
          {data?.image ? (
            <Image
              src={data.image}
              alt={title}
              width={500}
              height={500}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Link2 className="size-8 text-foreground-muted/50" strokeWidth={1.5} />
          )}
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-sans text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {data?.description && (
              <p className="font-sans text-foreground-secondary text-sm leading-relaxed line-clamp-3">
                {data.description}
              </p>
            )}
          </div>
        </CardContent>

        <Separator className="bg-border" />

        <CardFooter className="px-5 py-3.5 flex items-center justify-between text-foreground-muted text-xs">
          <div className="flex items-center flex-1 mr-4 overflow-hidden">
            <Link2 className="size-3.5 mr-1.5 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="font-mono text-[11px] truncate">
              {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          </div>
          <span className="text-primary font-medium text-xs group-hover:underline underline-offset-4 flex items-center shrink-0">
            Visitar
            <ExternalLink className="size-3 ml-1" strokeWidth={1.5} />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}

export function ExploreTab({ relevantLinks }: { relevantLinks: string[] }) {
  const links = relevantLinks.length > 0 ? relevantLinks : []

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="mb-8">
        <h2 className="font-sans text-2xl font-semibold text-foreground">
          Explora nuestros recursos
        </h2>
        <p className="font-sans text-foreground-secondary mt-1.5 text-sm max-w-2xl">
          Descubre artículos, noticias, proyectos y material relevante sobre nuestra misión.
        </p>
      </div>

      {links.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {links.map((url, idx) => (
            <LinkCard key={idx} url={url} />
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 text-center text-foreground-muted border border-dashed border-border rounded-[20px] bg-surface">
          <p className="font-sans text-base font-medium text-foreground">Sin recursos por ahora</p>
          <p className="font-sans text-sm mt-1.5 max-w-sm mx-auto text-foreground-secondary">
            Esta organización aún no ha compartido enlaces relevantes.
          </p>
        </div>
      )}
    </div>
  )
}

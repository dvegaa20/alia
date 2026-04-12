"use client";

import { useEffect, useState } from "react";
import { Link2, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface LinkPreviewData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

function LinkCard({ url }: { url: string }) {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchPreview() {
      try {
        const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const json = await res.json();

        if (mounted && json.status === "success") {
          setData({
            title: json.data.title,
            description: json.data.description,
            image: json.data.image?.url || json.data.logo?.url,
            url: json.data.url || url,
          });
        } else if (mounted) {
          setData({ url });
        }
      } catch {
        if (mounted) setData({ url });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchPreview();
    return () => { mounted = false; };
  }, [url]);

  if (loading) {
    return (
      <Card className="rounded-xl overflow-hidden border-border/50 h-85 flex flex-col">
        <Skeleton className="h-40 w-full rounded-none" />
        <CardContent className="flex-1 space-y-3 pt-6">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }

  const title = data?.title || url.replace(/^https?:\/\//, "");

  return (
    <a href={data?.url || url} target="_blank" rel="noopener noreferrer" className="block h-full group">
      <Card className="rounded-xl overflow-hidden border-border/50 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,28,28,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] py-0">
        {/* Cover Image */}
        <div className="h-40 overflow-hidden relative bg-muted flex items-center justify-center border-b border-border/50 shrink-0">
          {data?.image ? (
            <Image
              src={data.image}
              alt={title}
              width={500}
              height={500}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <Link2 className="size-10 text-muted-foreground/30" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col pt-6">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2 font-headline">
              {title}
            </h3>
            {data?.description && (
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
                {data.description}
              </p>
            )}
          </div>
        </CardContent>

        <Separator className="opacity-50" />

        <CardFooter className="px-6 py-4 flex items-center justify-between text-muted-foreground text-xs font-medium">
          <div className="flex items-center flex-1 mr-4 overflow-hidden">
            <Link2 className="size-3.5 mr-1.5 shrink-0" />
            <span className="truncate">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          </div>
          <span className="text-primary dark:text-ds-primary-fixed font-bold text-[11px] uppercase tracking-wider hover:underline underline-offset-4 flex items-center shrink-0">
            Visitar <ExternalLink className="size-3 ml-1" />
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}

export function ExploreTab({ relevantLinks }: { relevantLinks: string[] }) {
  const links = relevantLinks.length > 0 ? relevantLinks : [];

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-headline text-foreground">Explora nuestros recursos</h2>
        <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
          Descubre artículos, noticias, proyectos y material relevante sobre nuestra misión.
        </p>
      </div>

      {links.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {links.map((url, idx) => (
            <LinkCard key={idx} url={url} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-muted/20">
          <p className="text-lg font-medium">Sin recursos por ahora</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">
            Esta organización aún no ha compartido enlaces relevantes.
          </p>
        </div>
      )}
    </div>
  );
}
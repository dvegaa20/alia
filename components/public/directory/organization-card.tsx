import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BadgeCheck } from "lucide-react";

export interface OrganizationCardProps {
  slug: string;
  name: string;
  description: string;
  category: string;
  location: string;
  coverImage: string;
  logoImage: string;
  verified?: boolean;
}

export function OrganizationCard({
  slug,
  name,
  description,
  category,
  location,
  coverImage,
  logoImage,
  verified = false,
}: OrganizationCardProps) {
  return (
    <Link href={`/directory/${slug}`} className="block">
    <article className="group relative bg-background rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,28,28,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-border/50">
      {/* Cover Image */}
      <div className="h-40 overflow-hidden relative">
        <Image
          src={coverImage}
          alt={`${name} cover`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 pb-8 pt-10 relative">
        {/* Overlapping Logo */}
        <div className="absolute -top-8 left-6 w-16 h-16 bg-background rounded-xl shadow-lg flex items-center justify-center p-2 border-4 border-background">
          <Image
            src={logoImage}
            alt={`${name} logo`}
            width={48}
            height={48}
            className="object-contain rounded-md"
          />
        </div>

        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-4 right-6">
            <Badge className="bg-ds-primary-fixed text-ds-on-primary-fixed border-none px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm h-auto gap-1">
              <BadgeCheck className="size-3" />
              VERIFICADA
            </Badge>
          </div>
        )}

        <div className="space-y-3">
          {/* Category */}
          <div className="flex items-center space-x-2">
            <Badge className="bg-ds-tertiary-fixed text-ds-on-tertiary-container border-none px-3 py-0.5 rounded-full text-[11px] font-bold tracking-tight h-auto">
              {category}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground leading-tight font-headline">
            {name}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-medium">
            {description}
          </p>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-border/50">
            <div className="flex items-center text-muted-foreground text-sm font-medium">
              <MapPin className="size-4 mr-1" />
              <span>{location}</span>
            </div>
            <span
              className="text-ds-primary dark:text-ds-primary-fixed font-bold text-sm hover:underline underline-offset-4"
            >
              Ver perfil
            </span>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
}

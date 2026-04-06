"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export interface CampaignItem {
  slug: string;
  name: string;
  description: string;
  location: string;
  tag: string;
  image: string;
  logo: string;
}

interface FeatureProps {
  badge: string;
  title: string;
  description: string;
  items: CampaignItem[];
}

function Feature({ badge, title, description, items }: FeatureProps) {
  return (
    <div className="w-full pt-10 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10">
        {/* Left: Text Content */}
        <div className="flex gap-4 flex-col items-start">
          <Badge className="bg-ds-tertiary-container text-ds-on-tertiary-container border-none px-3 py-1 h-auto rounded-full text-xs font-bold uppercase tracking-wider">
            {badge}
          </Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-xl md:text-3xl lg:text-4xl tracking-tighter lg:max-w-xl font-headline font-bold text-foreground text-left">
              {title}
            </h2>
            <p className="text-base max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left font-body">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Campaign Cards Carousel */}
        <div className="w-full max-w-full px-6">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item.name}>
                  <Link href={`/directory/${item.slug}`} className="block h-full">
                    <Card className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border-none ring-0 py-0 gap-0 h-full">
                      {/* Cover Image */}
                      <div className="h-48 overflow-hidden relative">
                        <Image
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={item.image}
                          width={400}
                          height={300}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-ds-tertiary-container text-ds-on-tertiary-container border-none px-3 py-1 h-auto rounded-full text-xs font-bold uppercase tracking-wider">
                            {item.tag}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 pt-12 relative">
                        {/* Logo overlapping the image */}
                        <div className="absolute -top-8 left-6 w-16 h-16 bg-card rounded-xl shadow-lg flex items-center justify-center p-2">
                          <Image
                            alt={`Logo ${item.name}`}
                            className="w-full h-full rounded-md object-cover"
                            src={item.logo}
                            width={64}
                            height={64}
                          />
                        </div>

                        <h3 className="font-headline font-bold text-xl mb-2 text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="px-6 pb-6 flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground text-xs font-medium gap-1">
                          <MapPin className="size-3.5" />
                          {item.location}
                        </div>
                        <Badge className="bg-ds-primary-fixed text-ds-on-primary-fixed-variant dark:bg-ds-primary-container dark:text-ds-on-primary border-none px-3 py-1 h-auto rounded-full text-[10px] font-bold">
                          VERIFICADA
                        </Badge>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Feature };

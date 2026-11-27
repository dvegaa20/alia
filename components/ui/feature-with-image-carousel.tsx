'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, BadgeCheck, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export interface CampaignItem {
  slug: string
  name: string
  description: string
  location: string
  tag: string
  image: string
  logo: string
  isVerified?: boolean
}

interface FeatureProps {
  badge: string
  title: string
  description: string
  items: CampaignItem[]
}

function Feature({ badge, title, description, items }: FeatureProps) {
  return (
    <div className="w-full pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
        {/* Left: Text Content */}
        <div className="lg:col-span-4 flex flex-col items-start gap-3">
          <span className=" text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            {badge}
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-light tracking-normal text-[#0C354C] leading-[1.15]">
            {title}
          </h3>
          <p className="font-sans text-base leading-[1.6] text-[#0C354C]/80 max-w-md">
            {description}
          </p>
        </div>

        {/* Right: Campaign Cards Carousel */}
        <div className="lg:col-span-8 w-full max-w-full px-10">
          <Carousel>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem key={item.slug || item.name} className="md:basis-1/2">
                  <Link href={`/directory/${item.slug}`} className="block h-full group">
                    <Card className="relative bg-[#FAF7F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#84B3CE] border border-[#DFD5C0] ring-0 shadow-none py-0 gap-0 h-full flex flex-col">
                      {/* Cover Image */}
                      <div className="h-44 overflow-hidden relative bg-[#EAE1CD]">
                        <Image
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={item.image || '/images/landscape3.jpg'}
                          width={480}
                          height={320}
                        />
                        <div className="absolute top-3.5 left-3.5">
                          <Badge className="bg-[#0C354C]/85 text-[#F5EEDD] border border-[#84B3CE]/30 px-3 py-1 h-auto rounded-full  text-[10px] font-medium uppercase tracking-[0.06em]">
                            {item.tag}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 pt-10 relative flex-1">
                        {/* Logo overlapping */}
                        <div className="absolute -top-7 left-6 size-14 bg-[#FAF7F0] rounded-2xl border border-[#DFD5C0] flex items-center justify-center p-1.5 overflow-hidden">
                          {item.logo ? (
                            <Image
                              alt={`Logo ${item.name}`}
                              className="size-full rounded-lg object-contain"
                              src={item.logo}
                              width={48}
                              height={48}
                            />
                          ) : (
                            <span className="font-sans font-semibold text-base text-[#16587B] bg-[#16587B]/10 size-full rounded-lg flex items-center justify-center">
                              {item.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 mb-2">
                          <h4 className="font-sans font-medium text-lg text-[#0C354C] group-hover:text-[#16587B] transition-colors line-clamp-1">
                            {item.name}
                          </h4>
                          {item.isVerified && (
                            <BadgeCheck
                              className="size-4 text-[#1E8E68] shrink-0"
                              strokeWidth={1.75}
                            />
                          )}
                        </div>
                        <p className="font-sans text-[#0C354C]/75 text-sm line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="px-6 py-3.5 border-t border-[#DFD5C0] flex items-center justify-between gap-2">
                        <div className="flex items-center text-[#0C354C]/60 text-xs gap-1.5 min-w-0">
                          <MapPin className="size-3.5 shrink-0 text-[#16587B]" strokeWidth={1.5} />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#16587B] shrink-0">
                          Ver perfil
                          <ArrowRight className="size-3.5" strokeWidth={1.5} />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="rounded-full border-[#DFD5C0] bg-[#FAF7F0] text-[#0C354C] hover:border-[#16587B] hover:text-[#16587B]" />
            <CarouselNext className="rounded-full border-[#DFD5C0] bg-[#FAF7F0] text-[#0C354C] hover:border-[#16587B] hover:text-[#16587B]" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export { Feature }

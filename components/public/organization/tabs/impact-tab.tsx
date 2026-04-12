"use client";

import {
  TreePine,
  Droplet,
  Users,
  Globe,
  TrendingUp,
  Quote,
  Leaf,
  Calendar,
  Award,
  Home,
  Heart,
  Megaphone,
  FileText,
  Target,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import type { ImpactTabProps, SecondaryFact, MilestoneStat } from '@/types'

// ─── Icon mapping (string key from JSON → Lucide component) ──────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  "tree-pine": TreePine,
  droplet: Droplet,
  users: Users,
  globe: Globe,
  leaf: Leaf,
  home: Home,
  heart: Heart,
  megaphone: Megaphone,
  "file-text": FileText,
  target: Target,
  book: BookOpen,
};

const COLOR_MAP: Record<string, { text: string; bg: string }> = {
  sky: { text: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/40" },
  violet: { text: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
  emerald: { text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  rose: { text: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function ImpactTab({
  featuredFact,
  secondaryFacts,
  testimony,
  milestone,
  foundedYear,
  verified,
}: ImpactTabProps) {
  // Parse JSON fields safely
  const facts: SecondaryFact[] = Array.isArray(secondaryFacts) ? secondaryFacts : [];

  if (!featuredFact) {
    return (
      <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="py-20 text-center text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-muted/20">
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">
            Estamos trabajando para mostrarte métricas de impacto detalladas en esta sección.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

      {/* ── 1. FEATURED FACT (full-width hero card) ── */}
      <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden py-0">
        <CardContent className="p-8 md:p-10 flex flex-col gap-4">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 self-start bg-[#1e4a23]/10 dark:bg-[#4ade80]/10 text-[#1e4a23] dark:text-[#4ade80] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            <TrendingUp className="size-3" />
            {featuredFact.badge || "Logro principal"}
          </span>

          {/* Big number */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-6xl md:text-7xl font-black text-foreground tracking-tight leading-none">
              {featuredFact.value}
            </span>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {featuredFact.unit}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {featuredFact.label}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            {featuredFact.description}
          </p>
        </CardContent>
      </Card>

      {/* ── 2. MIDDLE SECTION: Milestone card + Testimony ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Milestone Card */}
        {milestone && (
          <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden py-0">
            <CardContent className="p-8 h-full flex flex-col justify-between gap-8 relative overflow-hidden">

              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[#1e4a23]/5 dark:bg-[#4ade80]/5 pointer-events-none" />
              <div className="absolute -bottom-12 -left-8 w-56 h-56 rounded-full bg-emerald-100/40 dark:bg-emerald-900/10 pointer-events-none" />

              {/* Header */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#1e4a23]/10 dark:bg-[#4ade80]/10 flex items-center justify-center">
                    <Leaf className="size-5 text-[#1e4a23] dark:text-[#4ade80]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      Identidad
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {milestone.category}
                    </p>
                  </div>
                </div>

                {/* Year founded */}
                {foundedYear && (
                  <div className="flex items-end gap-3 mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="size-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Fundada en
                      </span>
                    </div>
                    <span className="text-5xl font-black text-foreground leading-none">
                      {foundedYear}
                    </span>
                  </div>
                )}

                <p className="text-muted-foreground text-sm font-medium mt-1">
                  {milestone.tagline}
                </p>
              </div>

              {/* Stats */}
              {milestone.stats && (
                <div className="relative grid grid-cols-2 gap-4">
                  {milestone.stats.map((stat: any) => (
                    <div
                      key={stat.label}
                      className="bg-muted/50 dark:bg-muted/30 rounded-2xl p-5"
                    >
                      <p className="text-2xl font-black text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Verified badge */}
              {verified && (
                <div className="relative flex items-center gap-2 self-start bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-4 py-2.5 rounded-2xl">
                  <Award className="size-4" />
                  <span className="text-xs font-bold">Organización verificada por Alia</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Testimony card */}
        {testimony && (
          <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-[#fdf0eb] dark:bg-[#2a1a14] overflow-hidden py-0">
            <CardContent className="p-8 md:p-10 h-full flex flex-col justify-between gap-8 relative">
              {/* Big decorative quote icon */}
              <Quote
                className="absolute top-6 right-8 size-20 text-[#b94a1d]/10 dark:text-[#f97316]/10"
                strokeWidth={1}
              />

              <div className="relative">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#b94a1d] dark:text-orange-400 mb-6">
                  Testimonio
                </p>
                <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed italic">
                  &quot;{testimony.quote}&quot;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md shrink-0">
                  <Image
                    src={testimony.avatarUrl || `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(testimony.author)}`}
                    alt={testimony.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {testimony.author}
                  </p>
                  <p className="text-xs text-[#b94a1d] dark:text-orange-400 font-semibold">
                    {testimony.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── 3. SECONDARY FACTS (3-column grid) ── */}
      {facts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {facts.map((fact: any) => {
            const Icon = ICON_MAP[fact.icon] || Globe;
            const colors = COLOR_MAP[fact.color] || COLOR_MAP.emerald;
            return (
              <Card
                key={fact.label}
                className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-0"
              >
                <CardContent className="p-7 flex flex-col items-center text-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.bg}`}
                  >
                    <Icon className={`size-6 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-3xl font-black text-foreground">
                        {fact.value}
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {fact.unit}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                      {fact.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
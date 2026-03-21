"use client";

import { motion } from "framer-motion";
import { Search, Grid2x2, GraduationCap, TreePine, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { label: "Todas las causas", icon: Grid2x2, active: true },
  { label: "Educación", icon: GraduationCap, active: false },
  { label: "Medio Ambiente", icon: TreePine, active: false },
  { label: "Salud", icon: Stethoscope, active: false },
];

export function SidebarFilters() {
  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:block w-64 h-[calc(100vh-8rem)] sticky top-28 overflow-y-auto scrollbar-none"
    >
      <div className="flex flex-col space-y-8">
        {/* Filter Header */}
        <div>
          <h2 className="text-lg font-bold text-ds-primary dark:text-ds-primary-fixed font-headline">
            Filtros
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Explorar por categoría
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            className="pl-10 pr-4 py-3 h-auto bg-ds-surface-container-highest border-none rounded-lg focus-visible:ring-2 focus-visible:ring-ds-primary/20 focus-visible:bg-background text-sm font-medium placeholder:text-muted-foreground"
            placeholder="Buscar ONG..."
            type="text"
          />
        </div>

        {/* Category Links */}
        <nav className="flex flex-col space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <a
                key={category.label}
                href="#"
                className={`rounded-xl px-4 py-3 flex items-center space-x-3 transition-all duration-200 ${
                  category.active
                    ? "bg-ds-primary-fixed/30 dark:bg-ds-primary-fixed/15 text-ds-primary dark:text-ds-primary-fixed"
                    : "text-muted-foreground hover:bg-muted/50 active:translate-x-1"
                }`}
              >
                <Icon
                  className="size-5"
                  {...(category.active
                    ? { fill: "currentColor", strokeWidth: 0 }
                    : {})}
                />
                <span className="font-headline text-sm font-medium">
                  {category.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Additional Filters */}
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Location Dropdown */}
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4">
              Ubicación
            </Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full bg-ds-surface-container-low border-none rounded-lg text-sm font-medium">
                <SelectValue placeholder="Todo el país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo el país</SelectItem>
                <SelectItem value="madrid">Madrid</SelectItem>
                <SelectItem value="barcelona">Barcelona</SelectItem>
                <SelectItem value="valencia">Valencia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toggle Verified */}
          <div className="px-4 flex items-center justify-between">
            <Label
              htmlFor="verified-toggle"
              className="text-sm font-medium text-muted-foreground cursor-pointer"
            >
              Solo verificadas
            </Label>
            <Switch id="verified-toggle" />
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button className="w-full bg-ds-primary hover:bg-ds-primary/90 text-white py-4 h-auto rounded-xl font-bold text-sm tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95">
          Aplicar Filtros
        </Button>
      </div>
    </motion.aside>
  );
}

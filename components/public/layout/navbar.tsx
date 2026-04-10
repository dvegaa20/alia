"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SuggestOrgDialog } from "@/components/public/suggest/suggest-org-dialog";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/directory", label: "Todas las causas" },
  { href: "/about", label: "Sobre el proyecto" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full px-8 py-6 max-w-360 mx-auto">
        <div className="flex justify-start">
          <Link
            href="/"
            className="text-2xl font-bold text-primary dark:text-ds-primary-fixed font-headline tracking-tight"
          >
            Alia
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? "text-primary dark:text-ds-primary-fixed font-bold border-b-2 border-ds-primary dark:border-ds-primary-fixed pb-1 font-headline text-base transition-all duration-300"
                    : "text-muted-foreground font-medium font-headline text-base hover:text-primary dark:hover:text-ds-primary-fixed transition-all duration-300"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex justify-end items-center space-x-4">
          <SuggestOrgDialog>
            <Button className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group px-6 bg-linear-to-r from-ds-primary to-ds-primary-container hover:from-ds-primary/90 hover:to-ds-primary-container/90" asChild>
              <span className="relative z-10 flex items-center gap-2">
                Sugerir ONG
              </span>
            </Button>
          </SuggestOrgDialog>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

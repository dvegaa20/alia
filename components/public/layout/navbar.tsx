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
            className="text-2xl font-bold text-ds-primary dark:text-ds-primary-fixed font-headline tracking-tight"
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
                    ? "text-ds-primary dark:text-ds-primary-fixed font-bold border-b-2 border-ds-primary dark:border-ds-primary-fixed pb-1 font-headline text-base transition-all duration-300"
                    : "text-muted-foreground font-medium font-headline text-base hover:text-ds-primary dark:hover:text-ds-primary-fixed transition-all duration-300"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex justify-end items-center space-x-4">
          <SuggestOrgDialog>
            <Button className="bg-gradient-to-r from-ds-primary to-ds-primary-container text-ds-on-primary px-6 py-3 h-auto rounded-xl font-semibold active:scale-95 transition-transform">
              Sugerir ONG
            </Button>
          </SuggestOrgDialog>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

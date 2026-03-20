import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-ds-primary dark:text-ds-primary-fixed font-headline tracking-tight"
        >
          Directorio Social
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link
            href="#"
            className="text-ds-primary dark:text-ds-primary-fixed font-bold border-b-2 border-ds-primary dark:border-ds-primary-fixed pb-1 font-headline text-base transition-all duration-300"
          >
            Todas las causas
          </Link>
          <Link
            href="#"
            className="text-muted-foreground font-medium font-headline text-base hover:text-ds-primary dark:hover:text-ds-primary-fixed transition-all duration-300"
          >
            Sobre el proyecto
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-gradient-to-r from-ds-primary to-ds-primary-container text-ds-on-primary px-6 py-3 h-auto rounded-xl font-semibold active:scale-95 transition-transform">
            Sugerir ONG
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

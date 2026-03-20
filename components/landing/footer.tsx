import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-bold text-ds-primary dark:text-ds-primary-fixed font-headline">
            Directorio Social
          </div>
          <p className="font-headline text-sm leading-relaxed text-muted-foreground mt-2">
            Hecho con amor por una familia
          </p>
        </div>

        <div className="flex items-center space-x-8">
          <Link
            href="#"
            className="text-muted-foreground hover:text-ds-primary dark:hover:text-ds-primary-fixed transition-colors font-headline text-sm"
          >
            Datos abiertos
          </Link>
          <Link
            href="#"
            className="text-ds-primary dark:text-ds-primary-fixed underline underline-offset-4 font-headline text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            Principios
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <Separator className="bg-border" />
        <div className="pt-8 text-center md:text-left">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-label">
            © 2024 DIRECTORIO SOCIAL · PROYECTO CIUDADANO
          </p>
        </div>
      </div>
    </footer>
  );
}

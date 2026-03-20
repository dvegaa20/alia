import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function HeroSection() {
  return (
    <section className="relative px-8 pt-20 pb-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-headline font-bold text-5xl md:text-7xl text-foreground tracking-tight leading-[1.1] mb-8">
            Encuentra y apoya causas que{" "}
            <span className="text-ds-primary dark:text-ds-primary-fixed italic">importan</span>.
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <InputGroup className="h-16 rounded-xl border-none bg-muted editorial-shadow focus-within:ring-2 focus-within:ring-ds-primary dark:focus-within:ring-ds-primary-fixed focus-within:bg-background transition-all duration-300">
              <InputGroupAddon align="inline-start" className="pl-6">
                <Search className="size-5 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Buscar por causa, ONG o ciudad..."
                className="text-lg h-16 placeholder:text-muted-foreground"
              />
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Background Decorative Image */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <div className="w-full h-full bg-gradient-to-l from-transparent via-background to-background absolute inset-0 z-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Comunidad trabajando en un huerto"
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3sLIFr3POSlhNULvxil1ByEPfFf6V-HU4AJo5Ae46wRatSi8jv6JsqYCj_hHstXL3th29sKhjIrYsSiKcEB1fOdVjbbU0Q7p2yb54_JRrRJb5PFeKVW9lcGQLnJMRSuOLiB2XBStcEHsw_OULANswyWXPkPXdnEkzZkqPY8dFsDJXVOIBn1tX_KUW7ZYj14Yd6w5R7VnwwGooxrwlVQ4dfEeodyFUN2b5GSg-pny4V4qEPCfRN8ROzwTZV-IQ9kJOb-CZ01ge2W8"
        />
      </div>
    </section>
  );
}

"use client";

import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

type SimpleNavbarProps = {
  title: string;
  userName?: string;
  userImage?: string;
};

export function SimpleNavbar({ title, userName, userImage }: SimpleNavbarProps) {
  const pathname = usePathname();
  // Allowlist for paths where the profile info should be visible
  const isProfileAllowed = pathname?.startsWith("/adm/alia");

  return (
    <nav className="relative border-b h-16 flex items-center justify-between px-4 overflow-hidden bg-background/50 backdrop-blur-md">
      <div className="min-h-full -z-10 w-full bg-transparent absolute top-0 left-0">
        {/* Diagonal Fade Grid Background - Top Left */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, var(--muted) 1px, transparent 1px),
        linear-gradient(to bottom, var(--muted) 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          }}
        />
        {/* Your Content/Components */}
      </div>

      <div className="z-10 flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tighter uppercase italic">
          {title}
        </h1>
      </div>

      <div className="z-10 flex items-center gap-3">
        {isProfileAllowed && (
          <>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-foreground font-semibold uppercase">
                {userName}
              </span>
              <span className="text-[0.6rem] text-muted-foreground uppercase opacity-70 tracking-widest">
                Active Now
              </span>
            </div>
            <Avatar className="size-10 border p-0.5 bg-background">
              <AvatarImage
                src={
                  userImage ||
                  "https://m.media-amazon.com/images/I/31sDQI7yfDL._AC_UF894,1000_QL80_.jpg"
                }
                alt="profile"
                className="rounded-full object-cover"
              />
              <AvatarFallback className="rounded-full text-xs font-bold uppercase">
                {userName?.slice(0, 2) || "US"}
              </AvatarFallback>
            </Avatar>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}

type NavLinkType = {
  name: string;
  href: string;
};

type SecondaryNavbarProps = {
  links: NavLinkType[];
  currentPath: string;
};

export function SecondaryNavbar({
  links,
  currentPath,
}: SecondaryNavbarProps) {
  return (
    <div className="relative border-b bg-muted/30 group">
      <div className="flex items-center">
        <div className="flex flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          {links.map((l, index) => {
            const isActive = currentPath === l.href;

            return (
              <NextLink
                key={index}
                href={l.href}
                className={
                  "text-[0.65rem] md:text-xs p-3 px-5 md:px-7 cursor-pointer border-r font-extrabold uppercase tracking-widest transition-colors shrink-0 flex items-center justify-center min-w-fit " +
                  (isActive
                    ? "bg-accent/20 text-primary border-b-2 border-b-primary"
                    : "text-muted-foreground hover:bg-accent/10")
                }
              >
                {l.name}
              </NextLink>
            );
          })}
        </div>
      </div>

      <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

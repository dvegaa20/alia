import { getFeaturedOrganizations } from "@/server/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function FeaturedGrid() {
  const { data: featuredOrgs } = await getFeaturedOrganizations();

  // Handle empty state beautifully
  if (!featuredOrgs || featuredOrgs.length === 0) {
    return (
      <section className="px-8 py-20 bg-muted">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
            Organizaciones destacadas
          </h2>
          <p className="text-muted-foreground font-body">
            Pronto añadiremos organizaciones destacadas aquí.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-20 bg-muted">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline font-bold text-3xl text-foreground">
              Organizaciones destacadas
            </h2>
            <p className="text-muted-foreground mt-2 font-body">
              Proyectos locales verificados que están transformando realidades hoy.
            </p>
          </div>
          <Link
            href="/directory"
            className="text-ds-primary dark:text-ds-primary-fixed font-bold flex items-center gap-1 group"
          >
            Ver todas
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* NGO Cards Grid (Responsive CSS Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredOrgs.map((org) => (
            <Card
              key={org.id}
              className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border-none ring-0 py-0 gap-0"
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative">
                <Image
                  alt={org.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={org.coverImageUrl || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"}
                  width={400}
                  height={300}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-ds-tertiary-container text-ds-on-tertiary-container border-none px-3 py-1 h-auto rounded-full text-xs font-bold uppercase tracking-wider">
                    {org.categories?.[0]?.name || "Destacada"}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 pt-12 relative">
                {/* Logo overlapping the image */}
                <div className="absolute -top-8 left-6 w-16 h-16 bg-card rounded-xl shadow-lg flex items-center justify-center p-2">
                  <Image
                    alt={`Logo ${org.name}`}
                    className="w-full h-full rounded-md object-cover"
                    src={org.logoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(org.name) + "&background=random"}
                    width={64}
                    height={64}
                  />
                </div>

                <h3 className="font-headline font-bold text-xl mb-2 text-foreground line-clamp-1">
                  {org.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                  {org.shortDescription}
                </p>
              </CardContent>

              {/* Footer */}
              <CardFooter className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-xs font-medium gap-1">
                  <MapPin className="size-3.5" />
                  {org.location ? `${org.location.city}, ${org.location.state}` : "Ubicación no especificada"}
                </div>
                {org.verified && (
                  <Badge className="bg-ds-primary-fixed text-ds-on-primary-fixed-variant dark:bg-ds-primary-container dark:text-ds-on-primary border-none px-3 py-1 h-auto rounded-full text-[10px] font-bold">
                    VERIFICADA
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

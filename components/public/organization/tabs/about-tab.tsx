import { AboutContent } from "../about-content";
import { ContactSidebar } from "../contact-sidebar";

export interface AboutTabProps {
  name: string;
  fullDescription: string | null;
  galleryImages: string[];
  email: string;
  phone?: string | null;
  website?: string | null;
  location?: string | null;
  impactCurrent?: number | null;
  impactGoal?: number | null;
  impactType?: string | null;
}

export function AboutTab({
  name,
  fullDescription,
  galleryImages,
  email,
  phone,
  website,
  location,
  impactCurrent,
  impactGoal,
  impactType,
}: AboutTabProps) {
  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-headline text-foreground">Sobre nosotros</h2>
        <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
          Conoce nuestra historia, misión y la ubicación de nuestra sede principal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
        <AboutContent
          name={name}
          fullDescription={fullDescription}
          galleryImages={galleryImages}
        />
        <ContactSidebar
          location={location || undefined}
          email={email}
          phone={phone}
          website={website}
          impactCurrent={impactCurrent}
          impactGoal={impactGoal}
          impactType={impactType}
        />
      </div>
    </div>
  );
}

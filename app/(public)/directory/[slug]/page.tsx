import { notFound } from "next/navigation";
import { HeroCover, OrgHeader, OrgTabs } from "@/components/public";

// Placeholder data for visual verification — replace with Prisma query later
const PLACEHOLDER_ORG = {
  slug: "sembrando-esperanza",
  name: "Sembrando Esperanza",
  shortDescription:
    "Transformando Bogotá en un pulmón urbano vibrante, un árbol a la vez.",
  fullDescription: `En Sembrando Esperanza, creemos que el futuro de nuestras ciudades reside en el equilibrio entre el concreto y la clorofila. Nuestra misión es transformar Bogotá en un pulmón urbano vibrante, un árbol a la vez.
Desde 2018, hemos liderado esfuerzos de reforestación en zonas marginadas, involucrando activamente a la comunidad local. No solo plantamos árboles nativos; cultivamos conciencia. A través de nuestros programas educativos, enseñamos a niños y jóvenes sobre la importancia de la biodiversidad, el ciclo del agua y las prácticas de sostenibilidad diaria.
Cada proyecto es una oportunidad para que los ciudadanos se reconecten con la tierra, creando espacios verdes que no solo purifican el aire, sino que también fortalecen el tejido social de nuestros barrios.`,
  logoUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfq5s4lu5VdpspVCiZ4ILI_1aEzjtlwGhAbc03ZvrOYa3GPYqkHzGpy2N1c3KDq76lvOOXgPKFG03oxWR0hl4aH3-NcL9NGQuSJ2vpKVmpsvJ0_Lh-A_NHCiQoXM20lCmISxfSD1lr8FoS4-7tYJhAgz-IBazelZnB3cdmYFINGAUkRRlS3ejy0Lad1Zm1TJsQzKUQlCcv9A7pFy26qQY6ptE64oLuCJbV9yb0OW4s6mtogtRebw-wIYPEu61mkqo0EfvNeKs9ooA",
  coverImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBUPWFTkAwZTNvu-vd4Z34oaBryH5LBSbL9DkP9ld8eTlu-ZQwsn3lrWcmE20yn2xYcBrdir_-xIKM-Nfd7RJ_OfS79MCMTJWPp7HBjpdSyNIP4ykw86EThw_8-LrPiDLWn72lVM_3_i-3uNKiUdJ5uVaIQ2sSCh833z4xTnTrue1MI0Qst0EmIcFVfVykIDt3_HZjMcIH4YlzKNev8I2H02ZJ8ZKlce3z-TtCKHmtRQSxMot2WLTfLj3PzCMEJljbIR6rApg7qBg",
  verified: true,
  email: "contacto@sembrando.org",
  phone: "+57 300 123 4567",
  website: "https://sembrando.org",
  categories: [
    { id: "1", name: "Medio Ambiente" },
    { id: "2", name: "Educación" },
  ],
  location: "Bogotá, Colombia",
  galleryImages: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCusN_PoaxRUrnRIiueykfZu2jJVKF6h_qyI91Q140gUkFVGIVSs9C8j6f4ugs8yRhE2wL63-N7OQGX6J6bbfhe1D5bKylnpA5y2KCJnv5K8NnlW3FWRCOiRC4DMyEyWbHX8xrA7xPGy5OvtfN_FML5Yl2BgGO406XtHc7WUGXMenkou1-bTYInxVtTfdPuoDskgvoGz77qJ516Myu7oWJ4Uq6zBwLUVA0d92MR5bfWZoZqMcXwusgfMswAep-GulwTmbMdfWC4WvM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAa6jdgKfodtGT3aycR-5fT3FIKNhHd8PFMHihATW2vJmM1M1RJLeLkeS_KwjdQ6f3CqeWO1XPxfOrLcZtnpymPtxM-lw6QmNqH-NzIz_GiACZrC3V19koHK1VPqrqWKQwcaZRF9SHJDCQwbvZbfTyPRamqmJoBZXZTuOCMaeAhZVwQXzUO9SpCRXFkHoZNK8bz_sNBfs-UilEwIZv6SykWU23UeA_ocnp9eUmJ7Y0MAeLZog0o1i8Nfx_d2OGH3Y4jPWEvfJqkTEs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDB7n1Xq4eK3z9XD9L9YNTZFd3_7EuQmZf87FEhJSGtSgipFpSQZsB3GqTJvPfxj_P0LWwX7llcSrSbSrkY05OJc7OZv0SubGuTqnnGt-D4HnsdUoJD8I3kVUI_HVyREFQZe24Z5Vm5lvbVmI_M-pDD3j-ibqcOeL7HD_50wa-O2aqtwU812RaivkFG-LHl4CVUxw3coJP5D9tZl6PXSX39NrN4YZeYPzH6W9NqsPjYppdXdSRl1Qp37C3OO3HGFA1m9lEMHXStyzw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCHYjm87kdg7W5O0aYpXsO6ngJEX-c_BC99vo5DzxCkAhD-zsHeRXaRDcaQ3qJ-gmVSic6sM3tzJm3hejEX6IuboWk1HfOKzFYusQ_h9E8O3tnyOtAvs_14jeI-LynMw1uAZvUOubCEiPv6YjYQs32WFjoJjXCL-J-YebX9v7XaQ0XcFjG3q-Odt8QRDFpB4suoLCCo0k7SVxnVUfnhPDTZvoEhbGRA-5xHBQHOZ1FszKXWIDi420Ypwnvz-9P1h7wdapT1xfbrci8",
  ],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganizationProfilePage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Replace with Prisma query
  // const org = await prisma.organization.findUnique({
  //   where: { slug },
  //   include: { categories: true, location: true, socialLinks: true },
  // });
  const org = slug === "sembrando-esperanza" ? PLACEHOLDER_ORG : null;

  if (!org) {
    notFound();
  }

  return (
    <div className="pt-4 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
      <HeroCover
        coverImageUrl={org.coverImageUrl}
        logoUrl={org.logoUrl}
        name={org.name}
      />

      <OrgHeader
        name={org.name}
        verified={org.verified}
        categories={org.categories}
      />

      <OrgTabs
        name={org.name}
        fullDescription={org.fullDescription}
        galleryImages={org.galleryImages}
        email={org.email}
        phone={org.phone}
        website={org.website}
        location={org.location}
      />
    </div>
  );
}

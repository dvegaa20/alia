import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";

const ngos = [
  {
    name: "Red de Apoyo Escolar",
    description:
      "Brindamos refuerzo educativo y nutricional a niños en zonas vulnerables de la periferia.",
    location: "Bogotá, Colombia",
    tag: "Impact",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
  },
  {
    name: "Huellas de Libertad",
    description:
      "Refugio dedicado al rescate, rehabilitación y adopción responsable de animales domésticos.",
    location: "Medellín, Colombia",
    tag: "Local",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlmeDvcYwDW-9Zd4NbHOwOYRIfeihBEcBWHyhveBiTVKhzE1O7Jr-_hkxQ_dG01m336uR56P_fU7nSpip_KL14zOEqlmLsezE1NuMsYGe5FcyEp7-0E6q6vdjIfr5Gankmc5S001VjJRP_Q_SCc38Zj8yPKiBJRhHtstTTvheM-fN8_BZUwpBXZ1Duj8boh3ID9ezzSS7P2TuuJajgQ1MWfxcoUG9WsbpHIzbQnDw6eX3SGwgw60CAYj3tgoM_JAd3oKO006X4Ho",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvGmZUa68qKUKC-FmqImP4Wl6FcCjaGHgrSknQQIZ9mJyxjVy9N5UYRzxaonQwUPYveVS68qcs58BSwzdWafICvmkFo8TJcHzG7-QJduGFPxVhgw9nKoU46F0SRUvw28CkpNw2v9_Nd8tLX5YxcydRf62lAsRMyhm92uSrS7sTuOT14FUlLRCaQdbVGlBUDdznCnEmjnBv0hTaDiglU5RpBHqXb_T_ZXXNDGynvH1evUK6O1chw4rKajdVS-IqTylmLSwFk7jpNI",
  },
  {
    name: "Fundación Planeta Vivo",
    description:
      "Reforestación nativa y educación ambiental para frenar el impacto del cambio climático.",
    location: "Cali, Colombia",
    tag: "Planet",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
  },
];

export function FeaturedSection() {
  return (
    <section className="px-8 py-20 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline font-bold text-3xl text-foreground">
              Organizaciones destacadas
            </h2>
            <p className="text-muted-foreground mt-2 font-body">
              Proyectos locales que están transformando realidades hoy.
            </p>
          </div>
          <Link
            href="#"
            className="text-ds-primary dark:text-ds-primary-fixed font-bold flex items-center gap-1 group"
          >
            Ver todas
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* NGO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ngos.map((ngo) => (
            <Card
              key={ngo.name}
              className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border-none ring-0 py-0 gap-0"
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={ngo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={ngo.image}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-ds-tertiary-container text-ds-on-tertiary-container border-none px-3 py-1 h-auto rounded-full text-xs font-bold uppercase tracking-wider">
                    {ngo.tag}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6 pt-12 relative">
                {/* Logo overlapping the image */}
                <div className="absolute -top-8 left-6 w-16 h-16 bg-card rounded-xl shadow-lg flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`Logo ${ngo.name}`}
                    className="w-full h-full rounded-md object-cover"
                    src={ngo.logo}
                  />
                </div>

                <h3 className="font-headline font-bold text-xl mb-2 text-foreground">
                  {ngo.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                  {ngo.description}
                </p>
              </CardContent>

              {/* Footer */}
              <CardFooter className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-xs font-medium gap-1">
                  <MapPin className="size-3.5" />
                  {ngo.location}
                </div>
                <Badge className="bg-ds-primary-fixed text-ds-on-primary-fixed-variant dark:bg-ds-primary-container dark:text-ds-on-primary border-none px-3 py-1 h-auto rounded-full text-[10px] font-bold">
                  VERIFICADA
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

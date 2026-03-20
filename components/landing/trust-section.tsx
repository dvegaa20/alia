import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export function TrustSection() {
  return (
    <section className="px-8 py-32 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        {/* Image Side */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-ds-secondary-fixed rounded-full opacity-30 blur-3xl" />
          <div className="bg-muted rounded-xl overflow-hidden p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Equipo trabajando feliz"
              className="rounded-lg shadow-xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmLNwGqAQzMm-LKHgcfEvO-Rrp1G47w1Rq-biYHrpnUz8IuBbQyeMw6FE4nGGWMcOd8fCtB9MBRByPGbulBSL6U_f4wJUW2mbVbtEQ6z9w3whts_sICK5RyK5UzlsmyBSdLvMdPehxOtwQV6i1yFc9avfn68rU7jTUnAg2G_x9rTFNUBoxs_8T41Vgo-j5egk7hzq9n1uHrYMimkdDTbXZLh_tspxQCwwp9oaJIUmho0a5iYSFtENdxzsksnoEYDIpGA74j2FJzoM"
            />
          </div>
        </div>

        {/* Text Side */}
        <div className="lg:w-1/2">
          <h2 className="font-headline font-bold text-4xl mb-6 text-foreground leading-tight">
            Por un ecosistema social transparente y accesible.
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            No somos una plataforma de recaudación, somos un puente. Creemos que
            la transformación social ocurre cuando las personas saben exactamente
            dónde y cómo su ayuda puede tener el mayor impacto.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-muted border-none ring-0 rounded-xl py-0">
              <CardContent className="p-6">
                <ShieldCheck className="size-8 text-ds-primary dark:text-ds-primary-fixed mb-3" />
                <h4 className="font-bold text-foreground mb-1 text-base">
                  Organizaciones Curadas
                </h4>
                <p className="text-sm text-muted-foreground">
                  Verificamos la existencia y legalidad de cada ONG antes de
                  listarla.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted border-none ring-0 rounded-xl py-0">
              <CardContent className="p-6">
                <HeartHandshake className="size-8 text-ds-secondary dark:text-ds-secondary-fixed mb-3" />
                <h4 className="font-bold text-foreground mb-1 text-base">
                  Impacto Real
                </h4>
                <p className="text-sm text-muted-foreground">
                  Conecta directamente con los líderes de cada proyecto sin
                  intermediarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

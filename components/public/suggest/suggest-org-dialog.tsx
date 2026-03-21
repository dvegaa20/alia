"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Info, Link as LinkIcon, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

/* ── Zod schema ─────────────────────────────────────── */
const suggestSchema = z.object({
  orgName: z.string().min(2, "El nombre es obligatorio."),
  category: z.string().min(1, "Selecciona una categoría."),
  location: z.string().min(2, "La ubicación es obligatoria."),
  description: z.string().min(10, "Escribe al menos 10 caracteres."),
  url: z.string().url("Introduce una URL válida."),
});

type SuggestValues = z.infer<typeof suggestSchema>;

/* ── Shared styles ──────────────────────────────────── */
const labelCx =
  "font-label text-[11px] font-medium uppercase tracking-wider text-ds-on-surface-variant";

const inputCx =
  "w-full bg-ds-surface-container-highest border-none rounded-lg px-4 py-3 h-auto focus-visible:ring-2 focus-visible:ring-ds-primary/20 focus-visible:bg-white dark:focus-visible:bg-card transition-all duration-300 font-body text-ds-on-surface placeholder:text-ds-on-surface-variant/50";

/* ── Component ──────────────────────────────────────── */
export function SuggestOrgDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<SuggestValues>({
    resolver: zodResolver(suggestSchema),
    defaultValues: {
      orgName: "",
      category: "",
      location: "",
      description: "",
      url: "",
    },
  });

  function onSubmit(data: SuggestValues) {
    // TODO: wire to server action
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        data-lenis-prevent
        className="sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl p-0"
      >
        {/* ── Header ──────────────────────────────── */}
        <DialogHeader className="px-8 pt-8 pb-0 text-center">
          <DialogTitle className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-ds-primary">
            Sugerir una Organización
          </DialogTitle>
          <DialogDescription className="font-body text-ds-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
            Ayúdanos a ampliar nuestra red conectando a más personas con causas
            que importan.
          </DialogDescription>
        </DialogHeader>

        {/* ── Body ────────────────────────────────── */}
        <div className="px-8 pb-8 space-y-6">
          {/* Info callout */}
          <Alert className="rounded-xl border-none border-l-4 border-l-ds-primary/20 bg-ds-surface-container-low p-4">
            <Info className="size-4 text-ds-primary mt-0.5" />
            <AlertDescription className="font-body text-ds-on-surface-variant text-xs leading-relaxed">
              Todas las sugerencias son revisadas manualmente por nuestro equipo
              antes de ser publicadas para garantizar la calidad del directorio.
            </AlertDescription>
          </Alert>

          {/* Form */}
          <form
            id="suggest-org-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              {/* Nombre de la Organización */}
              <Controller
                name="orgName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="orgName" className={labelCx}>
                      Nombre de la Organización
                    </FieldLabel>
                    <Input
                      {...field}
                      id="orgName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ej. Fundación Vida Verde"
                      autoComplete="off"
                      className={inputCx}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Categoría & Ubicación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="category" className={labelCx}>
                        Categoría Principal
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          id="category"
                          aria-invalid={fieldState.invalid}
                          className={inputCx}
                        >
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medio-ambiente">
                            Medio Ambiente
                          </SelectItem>
                          <SelectItem value="salud">Salud</SelectItem>
                          <SelectItem value="educacion">Educación</SelectItem>
                          <SelectItem value="animales">
                            Bienestar Animal
                          </SelectItem>
                          <SelectItem value="social">Acción Social</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Ciudad / Estado */}
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="location" className={labelCx}>
                        Ciudad / Estado
                      </FieldLabel>
                      <Input
                        {...field}
                        id="location"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ej. Madrid, España"
                        autoComplete="off"
                        className={inputCx}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Breve descripción */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description" className={labelCx}>
                      Breve descripción
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      rows={4}
                      aria-invalid={fieldState.invalid}
                      placeholder="¿Qué hace esta organización por su comunidad?"
                      className={`${inputCx} min-h-[100px]`}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* URL */}
              <Controller
                name="url"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="url" className={labelCx}>
                      URL del sitio web o red social
                    </FieldLabel>
                    <InputGroup className="bg-ds-surface-container-highest border-none rounded-lg h-auto focus-within:ring-2 focus-within:ring-ds-primary/20 focus-within:bg-white dark:focus-within:bg-card transition-all duration-300">
                      <InputGroupAddon align="inline-start">
                        <LinkIcon className="size-4 text-ds-on-surface-variant/60" />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="url"
                        type="url"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://www.organizacion.org"
                        className="font-body text-ds-on-surface placeholder:text-ds-on-surface-variant/50 py-3"
                      />
                    </InputGroup>
                    <p className="font-label text-[10px] text-ds-on-surface-variant/70 italic mt-1">
                      Utilizamos este enlace para verificar la autenticidad de
                      la ONG.
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-ds-primary to-ds-primary-container text-ds-on-primary font-headline font-bold py-4 h-auto rounded-lg shadow-lg shadow-ds-primary/10 hover:shadow-ds-primary/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-base border-none"
              >
                <span>Enviar Sugerencia</span>
                <Send className="size-4" />
              </Button>
            </div>
          </form>

          {/* Secondary CTA */}
          <div className="text-center">
            <p className="text-ds-on-surface-variant font-body text-xs">
              ¿Tienes dudas sobre los criterios de inclusión?{" "}
              <a
                href="#"
                className="text-ds-primary font-semibold underline underline-offset-4 hover:text-ds-primary-container transition-colors"
              >
                Consulta nuestras guías
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

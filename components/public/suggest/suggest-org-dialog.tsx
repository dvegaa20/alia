'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Info, Link as LinkIcon, Send, Loader2, Check, X } from 'lucide-react'
import { submitSuggestion, getPublicCategories } from '@/server/actions'
import { trackSocialLead } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { MEXICO_STATES } from '@/lib/mexico-states'

/* ── Zod schema ─────────────────────────────────────── */
const suggestSchema = z.object({
  orgName: z.string().min(2, 'El nombre es obligatorio.'),
  category: z.string().min(1, 'Selecciona una categoría.'),
  location: z.string().min(2, 'La ubicación es obligatoria.'),
  description: z.string().min(10, 'Escribe al menos 10 caracteres.'),
  url: z.string().url('Introduce una URL válida.'),
})

type SuggestValues = z.infer<typeof suggestSchema>

import type { SubmitState } from '@/types'
import { LABEL_CX, INPUT_CX } from '@/lib/styles'

/* ── Button content map ─────────────────────────────── */
const BUTTON_STATES: Record<
  SubmitState,
  { text: string; icon: React.ReactNode; className: string }
> = {
  idle: {
    text: 'Enviar Sugerencia',
    icon: <Send className="size-4" />,
    className:
      'bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5',
  },
  loading: {
    text: 'Enviando...',
    icon: <Loader2 className="size-4 animate-spin" />,
    className: 'bg-primary text-primary-foreground opacity-90 cursor-wait',
  },
  success: {
    text: '¡Enviado con éxito!',
    icon: <Check className="size-4" />,
    className: 'bg-gradient-to-r from-emerald-500 to-emerald-600  shadow-lg shadow-emerald-500/20',
  },
  error: {
    text: 'Error al enviar',
    icon: <X className="size-4" />,
    className: 'bg-gradient-to-r from-red-500 to-red-600  shadow-lg shadow-red-500/20',
  },
}

/* ── Component ──────────────────────────────────────── */
export function SuggestOrgDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  // Fetch categories when dialog opens
  useEffect(() => {
    if (open && categories.length === 0) {
      getPublicCategories().then((res) => {
        if (res.success && res.data) {
          setCategories(res.data)
        }
      })
    }
  }, [open, categories.length])

  const form = useForm<SuggestValues>({
    resolver: zodResolver(suggestSchema),
    defaultValues: {
      orgName: '',
      category: '',
      location: '',
      description: '',
      url: '',
    },
  })

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSubmitState('idle')
      form.reset()
    }
  }, [open, form])

  async function onSubmit(data: SuggestValues) {
    setSubmitState('loading')

    try {
      const result = await submitSuggestion(data)

      if (result.success) {
        trackSocialLead('suggest_org', data.orgName)
        setSubmitState('success')
        // Close dialog after showing success
        setTimeout(() => {
          setOpen(false)
        }, 1500)
      } else {
        setSubmitState('error')
        setTimeout(() => setSubmitState('idle'), 2500)
      }
    } catch {
      setSubmitState('error')
      setTimeout(() => setSubmitState('idle'), 2500)
    }
  }

  const btnState = BUTTON_STATES[submitState]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        data-lenis-prevent
        className="sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl p-0"
      >
        {/* ── Header ──────────────────────────────── */}
        <DialogHeader className="px-8 pt-8 pb-0 text-center">
          <DialogTitle className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Sugerir una Organización
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Ayúdanos a ampliar nuestra red conectando a más personas con causas que importan.
          </DialogDescription>
        </DialogHeader>

        {/* ── Body ────────────────────────────────── */}
        <div className="px-8 pb-8 space-y-6">
          {/* Info callout */}
          <Alert className="rounded-xl border-none border-l-4 border-l-primary/20 bg-muted/50 p-4">
            <Info className="size-4 text-primary mt-0.5" />
            <AlertDescription className="font-body text-muted-foreground text-xs leading-relaxed">
              Todas las sugerencias son revisadas manualmente por nuestro equipo antes de ser
              publicadas para garantizar la calidad del directorio.
            </AlertDescription>
          </Alert>

          {/* Form */}
          <form id="suggest-org-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              {/* Nombre de la Organización */}
              <Controller
                name="orgName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="orgName" className={LABEL_CX}>
                      Nombre de la Organización
                    </FieldLabel>
                    <Input
                      {...field}
                      id="orgName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ej. Fundación Vida Verde"
                      autoComplete="off"
                      className={INPUT_CX}
                      disabled={submitState !== 'idle'}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                      <FieldLabel htmlFor="category" className={LABEL_CX}>
                        Categoría Principal
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={submitState !== 'idle'}
                      >
                        <SelectTrigger
                          id="category"
                          aria-invalid={fieldState.invalid}
                          className={INPUT_CX}
                        >
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent data-lenis-prevent>
                          {categories.length > 0 ? (
                            categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.name}>
                                {cat.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>
                              Cargando...
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Estado */}
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="location" className={LABEL_CX}>
                        Estado
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={submitState !== 'idle'}
                      >
                        <SelectTrigger
                          id="location"
                          aria-invalid={fieldState.invalid}
                          className={INPUT_CX}
                        >
                          <SelectValue placeholder="Seleccionar estado..." />
                        </SelectTrigger>
                        <SelectContent data-lenis-prevent>
                          {MEXICO_STATES.map((state) => (
                            <SelectItem key={state.slug} value={state.name}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    <FieldLabel htmlFor="description" className={LABEL_CX}>
                      Breve descripción
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      rows={4}
                      aria-invalid={fieldState.invalid}
                      placeholder="¿Qué hace esta organización por su comunidad?"
                      className={`${INPUT_CX} min-h-[100px]`}
                      disabled={submitState !== 'idle'}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* URL */}
              <Controller
                name="url"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="url" className={LABEL_CX}>
                      URL del sitio web o red social
                    </FieldLabel>
                    <InputGroup className="bg-muted border-none rounded-lg h-auto focus-within:ring-2 focus-within:ring-ring focus-within:bg-background transition-all duration-300">
                      <InputGroupAddon align="inline-start">
                        <LinkIcon className="size-4 text-muted-foreground/60" />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="url"
                        type="url"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://www.organizacion.org"
                        className="font-body text-foreground placeholder:text-muted-foreground/50 py-3"
                        disabled={submitState !== 'idle'}
                      />
                    </InputGroup>
                    <p className="font-label text-[10px] text-muted-foreground/70 italic mt-1">
                      Utilizamos este enlace para verificar la autenticidad de la ONG.
                    </p>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitState === 'loading' || submitState === 'success'}
                className={`w-full font-headline font-bold py-4 h-auto rounded-lg active:scale-[0.98] transition-all duration-500 text-base border-none ${btnState.className}`}
              >
                <span
                  className="inline-flex items-center gap-2 transition-all duration-300 animate-fade-slide-in"
                  key={submitState}
                >
                  {btnState.icon}
                  <span>{btnState.text}</span>
                </span>
              </Button>
            </div>
          </form>

          {/* Secondary CTA */}
          <div className="text-center">
            <p className="text-muted-foreground font-body text-xs">
              ¿Tienes dudas sobre los criterios de inclusión?{' '}
              <a
                href="#"
                className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Consulta nuestras guías
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import type { SubmitState } from '@/types'
import { LABEL_CX, INPUT_CX } from '@/lib/styles'

/* ── Zod schema ─────────────────────────────────────── */
const suggestSchema = z.object({
  orgName: z.string().min(2, 'El nombre es obligatorio.'),
  category: z.string().min(1, 'Selecciona una categoría.'),
  location: z.string().min(2, 'La ubicación es obligatoria.'),
  description: z.string().min(10, 'Escribe al menos 10 caracteres.'),
  url: z.string().url('Introduce una URL válida.'),
})

type SuggestValues = z.infer<typeof suggestSchema>

/* ── Button content map ─────────────────────────────── */
const BUTTON_STATES: Record<
  SubmitState,
  { text: string; icon: React.ReactNode; className: string }
> = {
  idle: {
    text: 'Enviar Sugerencia',
    icon: <Send className="size-4" strokeWidth={1.5} />,
    className: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  },
  loading: {
    text: 'Enviando...',
    icon: <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />,
    className: 'bg-primary text-primary-foreground opacity-90 cursor-wait',
  },
  success: {
    text: '¡Enviado con éxito!',
    icon: <Check className="size-4" strokeWidth={1.5} />,
    className: 'bg-verified-emerald text-white',
  },
  error: {
    text: 'Error al enviar',
    icon: <X className="size-4" strokeWidth={1.5} />,
    className: 'bg-urgency-coral text-white',
  },
}

interface SuggestOrgDialogProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/* ── Component ──────────────────────────────────────── */
export function SuggestOrgDialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: SuggestOrgDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    controlledOnOpenChange?.(nextOpen)
  }

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

  // Reset state when dialog opens
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
        setTimeout(() => {
          handleOpenChange(false)
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent
        data-lenis-prevent
        className="sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-[20px] border border-border bg-surface p-0 shadow-none ring-0"
      >
        {/* ── Header ──────────────────────────────── */}
        <DialogHeader className="px-6 sm:px-8 pt-8 pb-0 text-left sm:text-center">
          <DialogTitle className="font-sans text-2xl md:text-[28px] font-semibold tracking-[-0.02em] text-foreground">
            Sugerir una Organización
          </DialogTitle>
          <DialogDescription className="font-sans text-foreground-secondary text-sm max-w-md sm:mx-auto leading-relaxed">
            Ayúdanos a ampliar nuestra red conectando a más personas con causas que importan.
          </DialogDescription>
        </DialogHeader>

        {/* ── Body ────────────────────────────────── */}
        <div className="px-6 sm:px-8 pb-8 space-y-6">
          {/* Info callout */}
          <Alert className="rounded-xl border border-border bg-background p-4">
            <Info className="size-4 text-primary mt-0.5" strokeWidth={1.5} />
            <AlertDescription className="font-sans text-foreground-secondary text-xs leading-relaxed">
              Todas las sugerencias son revisadas manualmente por nuestro equipo antes de ser
              publicadas para garantizar la calidad del directorio.
            </AlertDescription>
          </Alert>

          {/* Form */}
          <form id="suggest-org-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <InputGroup className="bg-surface border border-border hover:border-rock-blue rounded-xl h-auto focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all duration-200">
                      <InputGroupAddon align="inline-start">
                        <LinkIcon className="size-4 text-foreground-muted" strokeWidth={1.5} />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="url"
                        type="url"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://www.organizacion.org"
                        className="font-sans text-sm text-foreground placeholder:text-foreground-muted py-3"
                        disabled={submitState !== 'idle'}
                      />
                    </InputGroup>
                    <p className=" text-[11px] text-foreground-muted mt-1">
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
                className={`w-full rounded-full py-3.5 h-auto text-[15px] font-medium transition-all duration-200 border-none ${btnState.className}`}
              >
                <span
                  className="inline-flex items-center gap-2 transition-all duration-200 animate-fade-slide-in"
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
            <p className="text-foreground-muted font-sans text-xs">
              ¿Tienes dudas sobre los criterios de inclusión?{' '}
              <Link
                href="/about#verificacion"
                onClick={() => handleOpenChange(false)}
                className="text-primary font-medium underline underline-offset-4 hover:text-primary-hover transition-colors"
              >
                Consulta nuestras guías
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { orgFormSchema, type OrgFormValues } from '@/lib/schemas'
import { MEXICO_STATES } from '@/lib/mexico-states'
import { slugify } from '@/lib/utils'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

export type OrgWithAllRelations = {
  id: string
  [key: string]: any // simplify for props, fully typed usage below
}

interface OrganizationSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organization?: OrgWithAllRelations | null
  isLoading?: boolean
  categories: { id: string; name: string }[]
  onSave: (data: OrgFormValues, id?: string) => Promise<{ success: boolean; error?: string }>
}

const DEFAULT_OFFICE_HOURS = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: null,
  sunday: null,
}

/* ── Shared styles ──────────────────────────────────── */
const labelCx =
  'font-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground pointer-events-none'

const inputCx =
  'w-full bg-muted/50 border border-transparent hover:bg-muted rounded-lg px-4 py-2.5 h-auto min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-input focus-visible:bg-background transition-all duration-300 font-body text-foreground placeholder:text-muted-foreground/70'

export function OrganizationSheet({
  open,
  onOpenChange,
  organization,
  isLoading = false,
  categories,
  onSave,
}: OrganizationSheetProps) {
  const [isPending, setIsPending] = React.useState(false)
  const [savedSuccess, setSavedSuccess] = React.useState(false)

  const defaultValues: Partial<OrgFormValues> = React.useMemo(() => {
    if (!organization) {
      return {
        name: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        status: 'DRAFT',
        featured: false,
        verified: false,
        email: '',
        galleryImages: ['', '', '', ''],
        relevantLinks: [''],
        socialLinks: [],
        categoryIds: [],
        needs: [],
        officeHours: DEFAULT_OFFICE_HOURS,
      }
    }

    // Map organization to form values
    return {
      ...organization,
      categoryIds: organization.categories?.map((c: any) => c.id) || [],
      location: organization.location || undefined,
      socialLinks: organization.socialLinks || [],
      galleryImages: organization.galleryImages?.length
        ? [
          ...organization.galleryImages,
          ...Array(Math.max(0, 4 - organization.galleryImages.length)).fill(''),
        ] // Ensure 4 inputs
        : ['', '', '', ''],
      relevantLinks: organization.relevantLinks?.length ? organization.relevantLinks : [''],
      needs: organization.needs || [],
      officeHours: organization.officeHours || DEFAULT_OFFICE_HOURS,
    }
  }, [organization])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<OrgFormValues>({
    resolver: zodResolver(orgFormSchema) as any,
    defaultValues: defaultValues as any,
    mode: 'onTouched',
  })

  // Auto-generate slug when creating
  const nameValue = watch('name')
  React.useEffect(() => {
    if (!organization?.id && nameValue) {
      setValue('slug', slugify(nameValue), { shouldValidate: true })
    }
  }, [nameValue, organization?.id, setValue])

  // Reset form when organization changes or sheet closes/opens
  React.useEffect(() => {
    if (open) {
      reset(defaultValues)
      setSavedSuccess(false)
    }
  }, [open, defaultValues, reset])

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: 'socialLinks',
  })

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'relevantLinks' as any, // using any because react-hook-form string array mapping
  })

  const {
    fields: secondaryFactsFields,
    append: appendFact,
    remove: removeFact,
  } = useFieldArray({
    control,
    name: 'secondaryFacts' as any,
  })

  const {
    fields: needsFields,
    append: appendNeed,
    remove: removeNeed,
  } = useFieldArray({
    control,
    name: 'needs' as any,
  })

  // Helper: map error field keys to tab names for feedback
  const TAB_FIELD_MAP: Record<string, string> = {
    name: 'sobre', slug: 'sobre', shortDescription: 'sobre', fullDescription: 'sobre',
    logoUrl: 'sobre', coverImageUrl: 'sobre', foundedYear: 'sobre', status: 'sobre',
    featured: 'sobre', verified: 'sobre', categoryIds: 'sobre', galleryImages: 'sobre',
    relevantLinks: 'explorar',
    needs: 'necesidades',
    impactCurrent: 'impacto', impactGoal: 'impacto', impactType: 'impacto',
    featuredFact: 'impacto', secondaryFacts: 'impacto', testimony: 'impacto', milestone: 'impacto',
    email: 'contacto', phone: 'contacto', website: 'contacto', donationLink: 'contacto',
    location: 'contacto', socialLinks: 'contacto', officeHours: 'contacto',
  }

  const TAB_LABELS: Record<string, string> = {
    sobre: 'Sobre nosotros',
    explorar: 'Explorar',
    necesidades: 'Necesidades',
    impacto: 'Impacto',
    contacto: 'Contacto',
  }

  function onFormError(formErrors: Record<string, any>) {
    // Group errors by tab
    const tabsWithErrors = new Set<string>()
    Object.keys(formErrors).forEach((key) => {
      const tab = TAB_FIELD_MAP[key]
      if (tab) tabsWithErrors.add(tab)
    })

    const tabNames = Array.from(tabsWithErrors).map((t) => TAB_LABELS[t] || t)

    toast.error('Hay errores en el formulario', {
      description: tabNames.length > 0
        ? `Revisa los campos en: ${tabNames.join(', ')}`
        : 'Revisa los campos marcados en rojo.',
      duration: 5000,
    })
  }

  async function onSubmit(data: OrgFormValues) {
    setIsPending(true)
    setSavedSuccess(false)

    // Clean up empty gallery images
    const cleanedData = {
      ...data,
      galleryImages: data.galleryImages.filter(Boolean),
      relevantLinks: data.relevantLinks.filter(Boolean),
    }

    const result = await onSave(cleanedData, organization?.id)
    setIsPending(false)

    if (result.success) {
      setSavedSuccess(true)
      toast.success(organization ? 'Cambios guardados correctamente' : 'Organización creada correctamente', {
        duration: 3000,
      })
      // Reset the success checkmark after 2.5s
      setTimeout(() => setSavedSuccess(false), 2500)
    } else {
      console.error(result.error)
      toast.error('Error al guardar', {
        description: result.error || 'Algo salió mal. Intenta de nuevo.',
        duration: 5000,
      })
    }
  }

  const officeHoursWatch = watch('officeHours') || {}

  const DAYS = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-lenis-prevent
        className="w-full sm:max-w-4xl h-full flex flex-col p-0"
      >
        <SheetHeader className="px-8 py-6 border-b shrink-0">
          <SheetTitle>{organization ? 'Editar Organización' : 'Nueva Organización'}</SheetTitle>
          <SheetDescription>
            {organization
              ? 'Modifica los datos de la organización.'
              : 'Completa el formulario para registrar una nueva organización.'}
          </SheetDescription>
        </SheetHeader>

        <form
          id="org-form"
          onSubmit={handleSubmit(onSubmit as any, onFormError)}
          className="flex-1 overflow-hidden flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              /* ─── Skeleton while org data loads ─── */
              <div className="p-8 space-y-8">
                {/* Tab bar placeholder */}
                <div className="flex gap-2">
                  {[120, 90, 80, 90].map((w, i) => (
                    <Skeleton key={i} className="h-9 rounded-lg" style={{ width: w }} />
                  ))}
                </div>
                {/* Grid of field skeletons */}
                <div className="grid grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-11 w-full rounded-lg" />
                    </div>
                  ))}
                  <div className="col-span-2 space-y-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </div>
                </div>
                {/* Media section */}
                <div className="pt-6 border-t space-y-4">
                  <Skeleton className="h-4 w-28" />
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <Tabs defaultValue="sobre" className="w-full">
                  {/* Compute error counts per tab */}
                  {(() => {
                    const errorKeys = Object.keys(errors)
                    const tabErrors: Record<string, number> = { sobre: 0, explorar: 0, necesidades: 0, impacto: 0, contacto: 0 }
                    errorKeys.forEach((key) => {
                      const tab = TAB_FIELD_MAP[key]
                      if (tab && tab in tabErrors) tabErrors[tab]++
                    })
                    return (
                      <TabsList className="mb-8 p-1 flex w-fit bg-muted/70 rounded-xl">
                        {([
                          { value: 'sobre', label: 'Sobre nosotros' },
                          { value: 'explorar', label: 'Explorar' },
                          { value: 'necesidades', label: 'Necesidades' },
                          { value: 'impacto', label: 'Impacto' },
                          { value: 'contacto', label: 'Contacto' },
                        ] as const).map((tab) => (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="relative rounded-lg px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
                          >
                            {tab.label}
                            {tabErrors[tab.value] > 0 && (
                              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground px-1">
                                {tabErrors[tab.value]}
                              </span>
                            )}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    )
                  })()}

                  <div className="max-w-6xl">
                    {/* TAB 1: GENERAL (Sobre nosotros) + Galería */}
                    <TabsContent value="sobre" className="space-y-8 mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                          <FieldLabel className={labelCx}>Nombre</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="Ej. TECHO México"
                              {...register('name')}
                            />
                            <FieldError errors={[errors.name]} />
                          </FieldContent>
                        </Field>

                        <Field>
                          <FieldLabel className={labelCx}>Slug (URL amigable)</FieldLabel>
                          <FieldContent>
                            <Input
                              placeholder="techo-mexico"
                              {...register('slug')}
                              readOnly
                              className={`${inputCx} bg-muted opacity-70 cursor-not-allowed`}
                            />
                            <FieldError errors={[errors.slug]} />
                          </FieldContent>
                        </Field>

                        <Field className="md:col-span-2">
                          <FieldLabel className={labelCx}>Descripción Corta</FieldLabel>
                          <FieldContent>
                            <Textarea
                              placeholder="Resumen de máximo 160 caracteres..."
                              {...register('shortDescription')}
                              maxLength={160}
                              className={inputCx}
                            />
                            <FieldError errors={[errors.shortDescription]} />
                          </FieldContent>
                        </Field>

                        <Field className="md:col-span-2">
                          <FieldLabel className={labelCx}>Descripción Completa</FieldLabel>
                          <FieldContent>
                            <Textarea
                              placeholder="Descripción detallada de la organización..."
                              className={`${inputCx} min-h-32`}
                              {...register('fullDescription')}
                            />
                            <FieldError errors={[errors.fullDescription]} />
                          </FieldContent>
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/50">
                        <Field>
                          <FieldLabel className={labelCx}>URL del Logo</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="https://..."
                              {...register('logoUrl')}
                            />
                            <FieldError errors={[errors.logoUrl]} />
                          </FieldContent>
                        </Field>

                        <Field>
                          <FieldLabel className={labelCx}>URL Imagen de Portada</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="https://..."
                              {...register('coverImageUrl')}
                            />
                            <FieldError errors={[errors.coverImageUrl]} />
                          </FieldContent>
                        </Field>

                        <Field>
                          <FieldLabel className={labelCx}>Año de fundación</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              type="number"
                              placeholder="Ej. 1990"
                              {...register('foundedYear')}
                            />
                            <FieldError errors={[errors.foundedYear]} />
                          </FieldContent>
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
                        <Field>
                          <FieldLabel>Estado</FieldLabel>
                          <FieldContent>
                            <Controller
                              control={control}
                              name="status"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="DRAFT">En Revisión (DRAFT)</SelectItem>
                                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                                    <SelectItem value="ARCHIVED">Inactivo (ARCHIVED)</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FieldContent>
                        </Field>

                        <Field orientation="horizontal" className="bg-muted/30 p-4 rounded-xl border">
                          <FieldContent>
                            <FieldLabel className="pointer-events-none p-0 border-none bg-transparent gap-1.5 flex-row items-center font-bold text-sm">
                              Destacado
                            </FieldLabel>
                            <FieldDescription className="text-xs">
                              Aparecerá en el inicio de Alia.
                            </FieldDescription>
                          </FieldContent>
                          <Controller
                            control={control}
                            name="featured"
                            render={({ field }) => (
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}
                          />
                        </Field>

                        <Field orientation="horizontal" className="bg-muted/30 p-4 rounded-xl border">
                          <FieldContent>
                            <FieldLabel className="pointer-events-none p-0 border-none bg-transparent gap-1.5 flex-row items-center font-bold text-sm">
                              Verificado
                            </FieldLabel>
                            <FieldDescription className="text-xs">
                              Muestra el badge de verificación.
                            </FieldDescription>
                          </FieldContent>
                          <Controller
                            control={control}
                            name="verified"
                            render={({ field }) => (
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}
                          />
                        </Field>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold mb-4">Categorías</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {categories.map((cat) => (
                            <Controller
                              key={cat.id}
                              control={control}
                              name="categoryIds"
                              render={({ field }) => {
                                const checked = field.value?.includes(cat.id)
                                return (
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`cat-${cat.id}`}
                                      checked={checked}
                                      onCheckedChange={(isChecked) => {
                                        if (isChecked) {
                                          field.onChange([...(field.value || []), cat.id])
                                        } else {
                                          field.onChange(field.value?.filter((id) => id !== cat.id))
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`cat-${cat.id}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {cat.name}
                                    </label>
                                  </div>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold mb-4">Galería de Imágenes</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Ingresa hasta 4 URLs de imágenes para la galería en el perfil.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[0, 1, 2, 3].map((index) => (
                            <Field key={index}>
                              <FieldLabel>Imagen {index + 1}</FieldLabel>
                              <FieldContent>
                                <Input
                                  placeholder="https://..."
                                  {...register(`galleryImages.${index}`)}
                                />
                              </FieldContent>
                            </Field>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* TAB 2: EXPLORAR */}
                    <TabsContent value="explorar" className="space-y-8 mt-0">
                      <div>
                        <h3 className="text-lg font-bold mb-4">Links Relevantes</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Enlaces atractivos que aparecen en la pestaña Explorar (Ej. "Conoce nuestro
                          informe 2024", "Regístrate como voluntario").
                        </p>

                        <div className="space-y-4">
                          {linkFields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-3">
                              <Input
                                placeholder="https://..."
                                {...register(`relevantLinks.${index}`)}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLink(index)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendLink('')}
                            className="mt-2"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar Link
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* TAB 3: NECESIDADES */}
                    <TabsContent value="necesidades" className="space-y-8 mt-0">
                      <div>
                        <h3 className="text-lg font-bold mb-4">Necesidades de la Organización</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Registra materiales, recursos económicos, voluntariado o servicios que necesita la organización actualmente.
                        </p>

                        <div className="space-y-6">
                          {needsFields.map((field, index) => (
                            <div key={field.id} className="p-4 bg-muted/30 rounded-xl relative border space-y-4">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 z-10"
                                onClick={() => removeNeed(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field>
                                  <FieldLabel>Categoría</FieldLabel>
                                  <Controller
                                    control={control}
                                    name={`needs.${index}.category` as const}
                                    render={({ field }) => (
                                      <Select onValueChange={field.onChange} value={field.value || 'otro'}>
                                        <SelectTrigger className={inputCx}>
                                          <SelectValue placeholder="Selecciona..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="material">Donación Material</SelectItem>
                                          <SelectItem value="voluntariado">Voluntariado</SelectItem>
                                          <SelectItem value="economica">Apoyo Económico</SelectItem>
                                          <SelectItem value="alimentos">Alimentos</SelectItem>
                                          <SelectItem value="servicios">Servicios Profesionales</SelectItem>
                                          <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </Field>

                                <Field>
                                  <FieldLabel>Urgencia</FieldLabel>
                                  <Controller
                                    control={control}
                                    name={`needs.${index}.urgency` as const}
                                    render={({ field }) => (
                                      <Select onValueChange={field.onChange} value={field.value || 'media'}>
                                        <SelectTrigger className={inputCx}>
                                          <SelectValue placeholder="Selecciona..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="alta">Alta</SelectItem>
                                          <SelectItem value="media">Media</SelectItem>
                                          <SelectItem value="baja">Baja</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </Field>

                                <Field className="md:col-span-2">
                                  <FieldLabel>Título de la Necesidad</FieldLabel>
                                  <Input className={inputCx} placeholder="Ej. Cobijas e insumos de invierno" {...register(`needs.${index}.title` as const)} />
                                </Field>

                                <Field className="md:col-span-2">
                                  <FieldLabel>Descripción</FieldLabel>
                                  <Textarea className={`${inputCx} min-h-24`} placeholder="Ej. Necesitamos 200 cobertores en buen estado para albergues..." {...register(`needs.${index}.description` as const)} />
                                </Field>

                                <Field className="md:col-span-2">
                                  <FieldLabel>Cantidad Esperada (Opcional)</FieldLabel>
                                  <Input className={inputCx} placeholder="Ej. 200 piezas / $10,000 MXN / 15 voluntarios" {...register(`needs.${index}.quantity` as const)} />
                                </Field>
                              </div>
                            </div>
                          ))}

                          {needsFields.length < 6 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => appendNeed({ category: 'material', urgency: 'media', title: '', description: '', quantity: '' })}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Agregar Necesidad
                            </Button>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* TAB 4: IMPACTO */}
                    <TabsContent value="impacto" className="space-y-8 mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Field>
                          <FieldLabel className={labelCx}>Impacto Actual (Progreso)</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              type="number"
                              {...register('impactCurrent')}
                            />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel className={labelCx}>Impacto Meta (Goal)</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              type="number"
                              {...register('impactGoal')}
                            />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel className={labelCx}>Tipo de Impacto (Unidad)</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="Ej. Niños beneficiados"
                              {...register('impactType')}
                            />
                          </FieldContent>
                        </Field>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold mb-4">Dato Destacado (Featured Fact)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Field>
                            <FieldLabel className={labelCx}>Valor (Ej. 8,500)</FieldLabel>
                            <Input className={inputCx} {...register('featuredFact.value')} />
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Unidad (Ej. viviendas)</FieldLabel>
                            <Input className={inputCx} {...register('featuredFact.unit')} />
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Label (Ej. construidas)</FieldLabel>
                            <Input className={inputCx} {...register('featuredFact.label')} />
                          </Field>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Field>
                            <FieldLabel className={labelCx}>Descripción</FieldLabel>
                            <Textarea
                              className={`${inputCx} min-h-[100px]`}
                              {...register('featuredFact.description')}
                            />
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Badge (Ej. Logro principal)</FieldLabel>
                            <Input className={inputCx} {...register('featuredFact.badge')} />
                          </Field>
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold mb-4">Datos Secundarios (Hasta 3)</h3>
                        <div className="space-y-6">
                          {secondaryFactsFields.map((field, index) => (
                            <div
                              key={field.id}
                              className="p-4 bg-muted/30 rounded-xl relative border"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="absolute top-2 right-2 text-muted-foreground hover:text-red-500"
                                onClick={() => removeFact(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <Field>
                                  <FieldLabel>Valor</FieldLabel>
                                  <Input {...register(`secondaryFacts.${index}.value` as const)} />
                                </Field>
                                <Field>
                                  <FieldLabel>Unidad</FieldLabel>
                                  <Input {...register(`secondaryFacts.${index}.unit` as const)} />
                                </Field>
                                <Field>
                                  <FieldLabel>Label</FieldLabel>
                                  <Input {...register(`secondaryFacts.${index}.label` as const)} />
                                </Field>
                                <Field>
                                  <FieldLabel>Icono (lucide)</FieldLabel>
                                  <Input {...register(`secondaryFacts.${index}.icon` as const)} />
                                </Field>
                                <Field>
                                  <FieldLabel>Color (tw)</FieldLabel>
                                  <Input {...register(`secondaryFacts.${index}.color` as const)} />
                                </Field>
                              </div>
                            </div>
                          ))}
                          {secondaryFactsFields.length < 3 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                appendFact({ value: '', unit: '', label: '', icon: '', color: '' })
                              }
                            >
                              <Plus className="mr-2 h-4 w-4" /> Agregar Dato Secundario
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-bold mb-4">Testimonio</h3>
                          <div className="space-y-4">
                            <Field>
                              <FieldLabel className={labelCx}>Cita</FieldLabel>
                              <Textarea
                                className={`${inputCx} min-h-[100px]`}
                                {...register('testimony.quote')}
                              />
                            </Field>
                            <Field>
                              <FieldLabel className={labelCx}>Autor</FieldLabel>
                              <Input className={inputCx} {...register('testimony.author')} />
                            </Field>
                            <Field>
                              <FieldLabel className={labelCx}>Rol</FieldLabel>
                              <Input className={inputCx} {...register('testimony.role')} />
                            </Field>
                            <Field>
                              <FieldLabel className={labelCx}>Avatar URL</FieldLabel>
                              <Input className={inputCx} {...register('testimony.avatarUrl')} />
                            </Field>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-4">Milestone (Hito de trayectoria)</h3>
                          <div className="space-y-4">
                            <Field>
                              <FieldLabel className={labelCx}>
                                Categoría (Ej. Medio ambiente)
                              </FieldLabel>
                              <Input className={inputCx} {...register('milestone.category')} />
                            </Field>
                            <Field>
                              <FieldLabel className={labelCx}>
                                Tagline (Ej. 31 años defendiendo...)
                              </FieldLabel>
                              <Input className={inputCx} {...register('milestone.tagline')} />
                            </Field>
                            <p className="font-semibold text-sm mt-4 text-muted-foreground">Stat 1</p>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                className={inputCx}
                                placeholder="Label"
                                {...register('milestone.stats.0.label')}
                              />
                              <Input
                                className={inputCx}
                                placeholder="Value"
                                {...register('milestone.stats.0.value')}
                              />
                            </div>
                            <p className="font-semibold text-sm mt-2 text-muted-foreground">Stat 2</p>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                className={inputCx}
                                placeholder="Label"
                                {...register('milestone.stats.1.label')}
                              />
                              <Input
                                className={inputCx}
                                placeholder="Value"
                                {...register('milestone.stats.1.value')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* TAB 4: CONTACTO */}
                    <TabsContent value="contacto" className="space-y-8 mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                          <FieldLabel className={labelCx}>Email Principal</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              type="email"
                              placeholder="contacto@..."
                              {...register('email')}
                            />
                            <FieldError errors={[errors.email]} />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel className={labelCx}>Teléfono</FieldLabel>
                          <FieldContent>
                            <Input className={inputCx} placeholder="+52..." {...register('phone')} />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel className={labelCx}>Sitio Web</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="https://..."
                              {...register('website')}
                            />
                            <FieldError errors={[errors.website]} />
                          </FieldContent>
                        </Field>
                        <Field>
                          <FieldLabel className={labelCx}>Link de Donación</FieldLabel>
                          <FieldContent>
                            <Input
                              className={inputCx}
                              placeholder="https://..."
                              {...register('donationLink')}
                            />
                            <FieldError errors={[errors.donationLink]} />
                          </FieldContent>
                        </Field>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <h3 className="text-lg font-bold mb-4">Ubicación Físca</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Field>
                            <FieldLabel className={labelCx}>Estado</FieldLabel>
                            <FieldContent>
                              <Controller
                                control={control}
                                name="location.state"
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value || ''}>
                                    <SelectTrigger className={inputCx}>
                                      <SelectValue placeholder="Selecciona estado..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {MEXICO_STATES.map((state) => (
                                        <SelectItem key={state.slug} value={state.name}>
                                          {state.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <FieldError errors={[errors.location?.state]} />
                            </FieldContent>
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Ciudad/Municipio</FieldLabel>
                            <FieldContent>
                              <Input className={inputCx} {...register('location.city')} />
                              <FieldError errors={[errors.location?.city]} />
                            </FieldContent>
                          </Field>
                          <Field className="md:col-span-2">
                            <FieldLabel className={labelCx}>Google Maps URL</FieldLabel>
                            <FieldContent>
                              <Input
                                className={inputCx}
                                placeholder="https://maps.app.goo.gl/..."
                                {...register('location.googleMapsUrl')}
                              />
                              <FieldError errors={[errors.location?.googleMapsUrl]} />
                            </FieldContent>
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Latitud</FieldLabel>
                            <FieldContent>
                              <Input
                                className={inputCx}
                                type="number"
                                step="any"
                                placeholder="Ej. 20.6597"
                                {...register('location.latitude', { valueAsNumber: true })}
                              />
                              <FieldDescription className="text-[10px] text-muted-foreground/70">
                                Coordenada para el mapa (-90 a 90)
                              </FieldDescription>
                              <FieldError errors={[errors.location?.latitude]} />
                            </FieldContent>
                          </Field>
                          <Field>
                            <FieldLabel className={labelCx}>Longitud</FieldLabel>
                            <FieldContent>
                              <Input
                                className={inputCx}
                                type="number"
                                step="any"
                                placeholder="Ej. -103.3496"
                                {...register('location.longitude', { valueAsNumber: true })}
                              />
                              <FieldDescription className="text-[10px] text-muted-foreground/70">
                                Coordenada para el mapa (-180 a 180)
                              </FieldDescription>
                              <FieldError errors={[errors.location?.longitude]} />
                            </FieldContent>
                          </Field>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <h3 className="text-lg font-bold mb-4">Redes Sociales</h3>
                        <div className="space-y-4">
                          {socialFields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-3">
                              <Controller
                                control={control}
                                name={`socialLinks.${index}.platform`}
                                render={({ field: f }) => (
                                  <Select onValueChange={f.onChange} value={f.value}>
                                    <SelectTrigger className={`w-40 ${inputCx}`}>
                                      <SelectValue placeholder="Plataforma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="FACEBOOK">Facebook</SelectItem>
                                      <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                                      <SelectItem value="TIKTOK">TikTok</SelectItem>
                                      <SelectItem value="X">X (Twitter)</SelectItem>
                                      <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                                      <SelectItem value="YOUTUBE">YouTube</SelectItem>
                                      <SelectItem value="OTHER">Otro</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              <Input
                                className={inputCx}
                                placeholder="https://..."
                                {...register(`socialLinks.${index}.url`)}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocial(index)}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendSocial({ platform: 'FACEBOOK' as any, url: '' })}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Agregar Red Social
                          </Button>
                        </div>
                      </div>

                      <div className="pt-6 border-t pb-8">
                        <h3 className="text-lg font-bold mb-4">Horarios de Oficina</h3>
                        <div className="space-y-4 max-w-2xl">
                          {DAYS.map((day) => {
                            const isOpen =
                              officeHoursWatch[day.key as keyof typeof officeHoursWatch] !== null
                            return (
                              <div key={day.key} className="flex items-center gap-4">
                                <span className="w-24 font-medium text-sm">{day.label}</span>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={isOpen}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setValue(`officeHours.${day.key}`, {
                                          open: '09:00',
                                          close: '18:00',
                                        })
                                      } else {
                                        setValue(`officeHours.${day.key}`, null)
                                      }
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground w-16">
                                    {isOpen ? 'Abierto' : 'Cerrado'}
                                  </span>
                                </div>
                                {isOpen && (
                                  <div className="flex items-center gap-2 flex-1">
                                    <Input
                                      type="time"
                                      {...register(`officeHours.${day.key}.open` as const)}
                                      className="w-32"
                                    />
                                    <span className="text-muted-foreground">a</span>
                                    <Input
                                      type="time"
                                      {...register(`officeHours.${day.key}.close` as const)}
                                      className="w-32"
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )} {/* end !isLoading */}
          </div>

          <SheetFooter className="flex-row items-center justify-end gap-3 px-8 py-4 border-t shrink-0 bg-background/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending || isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending || isLoading}
              className={`min-w-[180px] transition-all duration-300 ${savedSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-600 '
                  : 'bg-primary hover:bg-primary/90'
                }`}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {savedSuccess && <CheckCircle2 className="mr-2 h-4 w-4" />}
              {isPending
                ? 'Guardando...'
                : savedSuccess
                  ? '¡Guardado!'
                  : organization
                    ? 'Guardar Cambios'
                    : 'Crear Organización'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

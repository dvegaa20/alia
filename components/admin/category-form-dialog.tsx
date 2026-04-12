'use client'

import { useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { upsertAdminCategory } from '@/server/actions'

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: CategoryFormValues | null
}

export function CategoryFormDialog({ open, onOpenChange, initialData }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: initialData?.id || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
    // Reset form when initialData changes
    values: initialData || { id: '', name: '', description: '' },
  })

  function onSubmit(data: CategoryFormValues) {
    setError(null)
    startTransition(async () => {
      const res = await upsertAdminCategory(data)
      if (!res.success) {
        // If it's a unique constraint error on slug, we could catch it specially,
        // but for now display the generic message
        setError(
          'Ocurrió un error al guardar la categoría. (Es posible que el nombre/slug ya exista)'
        )
        return
      }
      form.reset()
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Modifica los detalles de la categoría. El slug se actualizará automáticamente.'
              : 'Ingresa el nombre de la nueva categoría. El slug se generará automáticamente.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category-name">Nombre *</FieldLabel>
                  <Input
                    placeholder="Ej. Medio Ambiente"
                    disabled={isPending}
                    {...field}
                    id="category-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category-description">Descripción (Opcional)</FieldLabel>
                  <Textarea
                    placeholder="Breve descripción de la categoría..."
                    className="resize-none"
                    disabled={isPending}
                    {...field}
                    id="category-description"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {initialData ? 'Guardar cambios' : 'Crear categoría'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

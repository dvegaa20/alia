"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { orgFormSchema, type OrgFormValues } from "@/lib/schemas"
import { getOrgById, upsertOrganization, getAdminCategories } from "@/server/actions"

export function OrganizationFormSheet() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const orgSheet = searchParams.get("orgSheet")
  const orgId = searchParams.get("orgId")

  const isOpen = orgSheet === "create" || orgSheet === "edit"
  const isEditing = orgSheet === "edit" && !!orgId

  const [isLoading, setIsLoading] = React.useState(false)
  const [categories, setCategories] = React.useState<any[]>([])

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      logoUrl: "",
      coverImageUrl: "",
      status: "DRAFT",
      featured: false,
      verified: false,
      website: "",
      email: "",
      phone: "",
      donationLink: "",
      galleryImages: [],
      relevantLinks: [],
      categoryIds: [],
      location: { city: "", state: "", googleMapsUrl: "" },
      socialLinks: [],
    },
  })

  const onClose = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("orgSheet")
    params.delete("orgId")
    router.push(`?${params.toString()}`)
    form.reset()
  }, [router, searchParams, form])

  React.useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const catsRes = await getAdminCategories()
        if (catsRes.success && catsRes.data) {
          setCategories(catsRes.data)
        }

        if (isEditing && orgId) {
          const orgRes = await getOrgById(orgId)
          if (orgRes.success && orgRes.data) {
            const org = orgRes.data
            form.reset({
              ...org,
              logoUrl: org.logoUrl || "",
              coverImageUrl: org.coverImageUrl || "",
              website: org.website || "",
              phone: org.phone || "",
              donationLink: org.donationLink || "",
              categoryIds: org.categories?.map((c: any) => c.id) || [],
              location: org.location || { city: "", state: "", googleMapsUrl: "" },
              socialLinks: org.socialLinks || [],
            })
          }
        } else {
          form.reset({
            name: "",
            slug: "",
            shortDescription: "",
            fullDescription: "",
            logoUrl: "",
            coverImageUrl: "",
            status: "DRAFT",
            featured: false,
            verified: false,
            website: "",
            email: "",
            phone: "",
            donationLink: "",
            galleryImages: [],
            relevantLinks: [],
            categoryIds: [],
            location: { city: "", state: "", googleMapsUrl: "" },
            socialLinks: [],
          })
        }
      } catch (err) {
        console.error("Failed to load data for form", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      loadData()
    }
  }, [isOpen, isEditing, orgId, form])

  const onSubmit = async (data: OrgFormValues) => {
    setIsLoading(true)
    try {
      const res = await upsertOrganization(data, isEditing ? orgId! : undefined)
      if (res.success) {
        onClose()
      } else {
        console.error("Failed to save org", res.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJsonFieldChange = (field: keyof OrgFormValues, val: string) => {
    try {
      if (!val.trim()) {
         form.setValue(field, undefined)
         return;
      }
      const parsed = JSON.parse(val)
      form.setValue(field, parsed)
    } catch(e) {
      // Keep string if JSON invalid while typing
    }
  }

  const getJsonString = (field: keyof OrgFormValues) => {
    const val = form.watch(field)
    if (val === undefined || val === null) return ""
    return typeof val === 'string' ? val : JSON.stringify(val, null, 2)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto p-0">
        <SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
          <SheetTitle>{isEditing ? "Editar Organización" : "Crear Organización"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Modifica los detalles de la organización. Recuerda guardar los cambios."
              : "Ingresa los datos para registrar una nueva organización en el directorio."}
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
            <Tabs defaultValue="sobre">
              <TabsList className="mb-4">
                <TabsTrigger value="sobre">Sobre nosotros</TabsTrigger>
                <TabsTrigger value="explorar">Explorar</TabsTrigger>
                <TabsTrigger value="impacto">Impacto</TabsTrigger>
                <TabsTrigger value="contacto">Contacto</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              {/* SOBRE NOSOTROS */}
              <TabsContent value="sobre" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" {...form.register("name")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...form.register("slug")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Descripción Corta (Max 160)</Label>
                  <Textarea id="shortDescription" {...form.register("shortDescription")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Descripción Completa</Label>
                  <Textarea id="fullDescription" className="min-h-[150px]" {...form.register("fullDescription")} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="logoUrl">URL Logo</Label>
                    <Input id="logoUrl" {...form.register("logoUrl")} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="coverImageUrl">URL Portada</Label>
                    <Input id="coverImageUrl" {...form.register("coverImageUrl")} />
                  </div>
                </div>

                 <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="impactCurrent">Impacto Actual</Label>
                    <Input type="number" id="impactCurrent" {...form.register("impactCurrent", { valueAsNumber: true })} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="impactGoal">Impacto Meta</Label>
                    <Input type="number" id="impactGoal" {...form.register("impactGoal", { valueAsNumber: true })} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="impactType">Tipo de Impacto</Label>
                    <Input id="impactType" {...form.register("impactType")} />
                  </div>
                </div>
              </TabsContent>

              {/* EXPLORAR */}
              <TabsContent value="explorar" className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="donationLink">URL Donación</Label>
                  <Input id="donationLink" {...form.register("donationLink")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relevantLinks">Enlaces Relevantes (JSON Array)</Label>
                  <Textarea
                     id="relevantLinks"
                     className="font-mono text-xs"
                     rows={5}
                     defaultValue={JSON.stringify(form.watch("relevantLinks") || [], null, 2)}
                     onChange={(e) => {
                       try {
                         form.setValue("relevantLinks", JSON.parse(e.target.value))
                       } catch(e) {}
                     }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="galleryImages">Imágenes de Galería (JSON Array URLs)</Label>
                  <Textarea
                     id="galleryImages"
                     className="font-mono text-xs"
                     rows={5}
                     defaultValue={JSON.stringify(form.watch("galleryImages") || [], null, 2)}
                     onChange={(e) => {
                       try {
                         form.setValue("galleryImages", JSON.parse(e.target.value))
                       } catch(e) {}
                     }}
                  />
                </div>
              </TabsContent>

              {/* IMPACTO */}
              <TabsContent value="impacto" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="foundedYear">Año de Fundación</Label>
                    <Input type="number" id="foundedYear" {...form.register("foundedYear", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featuredFact">Dato Destacado (JSON Object)</Label>
                  <Textarea
                    id="featuredFact"
                    className="font-mono text-xs"
                    rows={4}
                    defaultValue={getJsonString("featuredFact")}
                    onChange={(e) => handleJsonFieldChange("featuredFact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryFacts">Datos Secundarios (JSON Array)</Label>
                  <Textarea
                    id="secondaryFacts"
                    className="font-mono text-xs"
                    rows={4}
                    defaultValue={getJsonString("secondaryFacts")}
                    onChange={(e) => handleJsonFieldChange("secondaryFacts", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimony">Testimonio (JSON Object)</Label>
                  <Textarea
                    id="testimony"
                    className="font-mono text-xs"
                    rows={4}
                    defaultValue={getJsonString("testimony")}
                    onChange={(e) => handleJsonFieldChange("testimony", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="milestone">Hito (JSON Object)</Label>
                  <Textarea
                    id="milestone"
                    className="font-mono text-xs"
                    rows={4}
                    defaultValue={getJsonString("milestone")}
                    onChange={(e) => handleJsonFieldChange("milestone", e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* CONTACTO */}
              <TabsContent value="contacto" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" {...form.register("email")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" {...form.register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input id="website" {...form.register("website")} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
                   <h3 className="col-span-2 font-medium">Ubicación</h3>
                   <div className="space-y-2">
                    <Label htmlFor="location.city">Ciudad</Label>
                    <Input id="location.city" {...form.register("location.city")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location.state">Estado</Label>
                    <Input id="location.state" {...form.register("location.state")} />
                  </div>
                   <div className="space-y-2 col-span-2">
                    <Label htmlFor="location.googleMapsUrl">URL Google Maps</Label>
                    <Input id="location.googleMapsUrl" {...form.register("location.googleMapsUrl")} />
                  </div>
                </div>

                 <div className="space-y-2">
                  <Label htmlFor="officeHours">Horario de Oficina (JSON Object)</Label>
                  <Textarea
                    id="officeHours"
                    className="font-mono text-xs"
                    rows={4}
                    defaultValue={getJsonString("officeHours")}
                    onChange={(e) => handleJsonFieldChange("officeHours", e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* ADMIN */}
              <TabsContent value="admin" className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label>Estado</Label>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">En Revisión</SelectItem>
                            <SelectItem value="PUBLISHED">Publicada</SelectItem>
                            <SelectItem value="ARCHIVED">Inactiva</SelectItem>
                            <SelectItem value="REJECTED">Rechazada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                </div>

                <div className="flex gap-6 mt-4">
                  <Controller
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="featured">Destacada</Label>
                      </div>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="verified"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Switch id="verified" checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="verified">Verificada</Label>
                      </div>
                    )}
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label>Categorías</Label>
                  <Controller
                    control={form.control}
                    name="categoryIds"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2 border p-4 rounded-md">
                        {categories.map((cat) => (
                          <div key={cat.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat.id}`}
                              checked={field.value.includes(cat.id)}
                              onCheckedChange={(checked) => {
                                const current = new Set(field.value)
                                if (checked) current.add(cat.id)
                                else current.delete(cat.id)
                                field.onChange(Array.from(current))
                              }}
                            />
                            <Label htmlFor={`cat-${cat.id}`}>{cat.name}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 sticky bottom-0 bg-background pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}

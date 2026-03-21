"use client"

import { Search, Filter, MoreVertical } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NGOs = [
  {
    id: 1,
    name: "EcoWorld Foundation",
    website: "ecoworld.org",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD0nhdM1W_afnbIti-8aBcmT1FBuCjpiu9XIkTBsgHxgy6uHYJORiKuxQ5yE1m6LhnXHsxX3YDh1c5bAqkjyCYr8p3a3tq8lJvP82fuVEN3Bfa07iYQaGRv2NahludryBmxcaNul7DFWymascYQ6HGTojoi46u4BPW5Ee36j7a7DNmjrd1505ZpRE-71lafwnNFrZwSBj7P3b1SLhXYHF7ehddNoQbHIjd-X0PzLUKJuSC-agjgZh2dYQUpqUcI4LJYQwRNZ1xspU",
    logoBg: "bg-emerald-500/20",
    category: "Medio Ambiente",
    categoryBg: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    location: "Madrid, ES",
    status: "Publicado",
    statusColor: "bg-emerald-500",
    statusText: "text-emerald-700 dark:text-emerald-400",
  },
  {
    id: 2,
    name: "ChildHope Global",
    website: "childhope.intl",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhSSerksVnSsdpSuyefYFbzoBd74i9ljfebuyEKvDy8fPeidOW7K5SI4NGdRm-l8Q3m7NUHeMqp_DFxLvu1HZzJDpQeo6FwMVCdia5tdGAinCrelaCn_2JljiUbuAtLqxXYNWQc-twVyCKkxMTjrOZfrjuwvoOGz-sQYJ_Q21jDqHX3TNzYzRIIw0HCOMi2b50EBB3P_MTbHUtrrCuIfLetnpXfNrL7BWcfwyeR-Sf04CzZpHRrK6rCJPprdveoWu5sD4gxUMVoCI",
    logoBg: "bg-orange-500/20",
    category: "Social",
    categoryBg: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    location: "Lima, PE",
    status: "Borrador",
    statusColor: "bg-muted-foreground",
    statusText: "text-muted-foreground",
  },
  {
    id: 3,
    name: "EduTech Without Borders",
    website: "edutech.io",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxB52DgZl9OLfJcGnKYJe1jkkpA1tk_jLjezKz7Arh5oIV7E-qsBK5Xj4mRkXthWAFCeaQ2mtLDhCjixNFadEFRaN7za4w-B31pAEhmhHfproeb3YRkII0XRlMK-8M2WGZCv43fA4-63Q4QYM_mh60tBSxyO9U1wp60bOXAaUsbmC2c_M-c_IJ3difc3lRgSr-s9_-O7CaM6fvJis5t7MO6RoZ3xaQbLZwteB8trgRL7ch3KqoL7AOh8zeT6Zk2IJOVSnDSqXtkw0",
    logoBg: "bg-blue-500/20",
    category: "Educación",
    categoryBg: "bg-muted text-foreground",
    location: "Bogotá, CO",
    status: "Pendiente",
    statusColor: "bg-amber-500",
    statusText: "text-amber-700 dark:text-amber-400",
  },
  {
    id: 4,
    name: "ForestKeep Action",
    website: "forestkeep.ngo",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-s8L9GriFdYvRd9zyNC2qnEI6ZPT-pvK4BebiUjM-2IL9v7HFUbMh5YHVPFKfmUZnbcZWXIT_ZjlQs_hIiQuLXSnrfQ7uS2SNQi4lWZUofuIp6gov8qmt2CdviRLhG8mcFzN-8GPdUJIvDSKZXsAUWU-hq3CXLMEcAmHgzt-Q7bkUad3cbJ5MYGLQ3027Ue1ghlLFvmhBDhThgr8IaapaBKnHxivTewfE9eWMmfkwzPa9F401paGpnXPc7O7CNzor8Ingc2fiFlM",
    logoBg: "bg-emerald-500/20",
    category: "Medio Ambiente",
    categoryBg: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    location: "Berlin, DE",
    status: "Publicado",
    statusColor: "bg-emerald-500",
    statusText: "text-emerald-700 dark:text-emerald-400",
  },
]

export function OrganizationsTable() {
  return (
    <section className="bg-card rounded-lg overflow-hidden border shadow-sm">
      {/* Table Header Actions */}
      <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-transparent">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-card-foreground">Gestión de Organizaciones</h2>
          <p className="text-sm text-muted-foreground">
            Visualiza y administra el directorio de ONGs activas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 pr-4 py-2 bg-muted border-none rounded-md text-sm w-full focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 transition-all"
              placeholder="Filtrar por nombre..."
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-muted hover:bg-muted/80 text-foreground rounded-md transition-colors"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Organización
              </TableHead>
              <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Categoría
              </TableHead>
              <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Ubicación
              </TableHead>
              <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Estado
              </TableHead>
              <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NGOs.map((ngo, index) => (
              <TableRow
                key={ngo.id}
                className="group"
              >
                <TableCell className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg ${ngo.logoBg} flex items-center justify-center overflow-hidden`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ngo.logo}
                        alt={`${ngo.name} Logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-foreground">
                        {ngo.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{ngo.website}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <span
                    className={`px-3 py-1 ${ngo.categoryBg} text-[11px] font-bold rounded-full uppercase tracking-tighter`}
                  >
                    {ngo.category}
                  </span>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <span className="text-sm text-muted-foreground">{ngo.location}</span>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${ngo.statusColor}`}
                    ></span>
                    <span className={`text-sm font-medium ${ngo.statusText}`}>
                      {ngo.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-5 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="px-8 py-4 flex items-center justify-between border-t border-border">
        <span className="text-xs text-muted-foreground">
          Mostrando 1 a 4 de 124 resultados
        </span>
        <div className="flex items-center gap-2">
          {/* We emulate the HTML exactly but with standard semantic colors */}
          <button className="px-3 py-1 rounded border-none bg-muted text-muted-foreground cursor-not-allowed text-xs">
            &lt;
          </button>
          <button className="px-3 py-1 rounded border-none bg-muted hover:bg-muted/80 text-foreground transition-colors font-bold text-xs">
            1
          </button>
          <button className="px-3 py-1 rounded border-none text-muted-foreground hover:bg-muted transition-colors text-xs">
            2
          </button>
          <button className="px-3 py-1 rounded border-none text-muted-foreground hover:bg-muted transition-colors text-xs">
            3
          </button>
          <button className="px-3 py-1 rounded border-none bg-muted hover:bg-muted/80 text-foreground transition-colors text-xs">
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}

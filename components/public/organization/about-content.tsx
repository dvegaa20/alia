import Image from 'next/image'

interface AboutContentProps {
  name: string
  fullDescription: string | null
  galleryImages?: string[]
}

export function AboutContent({ name, fullDescription, galleryImages = [] }: AboutContentProps) {
  return (
    <div className="space-y-12">
      {/* Description Prose */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-headline text-foreground sr-only">Sobre nosotros</h2>
        <div className="prose prose-stone prose-lg max-w-none text-muted-foreground font-body leading-relaxed space-y-4 dark:prose-invert">
          {fullDescription ? (
            fullDescription.split('\n').map((paragraph, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(name, `<strong>${name}</strong>`),
                }}
              />
            ))
          ) : (
            <p className="italic text-muted-foreground/60">
              Esta organización aún no ha agregado una descripción.
            </p>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-100">
          {galleryImages[0] && (
            <div className="col-span-1 row-span-2 overflow-hidden rounded-lg">
              <Image
                src={galleryImages[0]}
                alt={`${name} gallery 1`}
                width={400}
                height={800}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
          {galleryImages[1] && (
            <div className="col-span-1 overflow-hidden rounded-lg">
              <Image
                src={galleryImages[1]}
                alt={`${name} gallery 2`}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
          {galleryImages[2] && (
            <div className="col-span-1 row-span-2 overflow-hidden rounded-lg hidden md:block">
              <Image
                src={galleryImages[2]}
                alt={`${name} gallery 3`}
                width={400}
                height={800}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
          {galleryImages[3] && (
            <div className="col-span-1 overflow-hidden rounded-lg">
              <Image
                src={galleryImages[3]}
                alt={`${name} gallery 4`}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

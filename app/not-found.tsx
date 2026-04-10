'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Compass, MapPinOff, ArrowRight } from 'lucide-react'

export default function NotFound() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        if (countdown <= 0) {
            router.push('/')
            return
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [countdown, router])

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <style jsx>{`
                .organic-shape {
                    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
                }
            `}</style>
            <main className="grow flex items-center justify-center px-4 md:px-8 py-6 md:py-10">
                <div className="max-w-3xl w-full flex flex-col items-center text-center">
                    {/* Illustration Area */}
                    <div className="relative mb-6 md:mb-8">
                        {/* Background organic shape decorative element */}
                        <div className="absolute inset-0 bg-ds-primary/20 blur-2xl organic-shape -z-10 transform scale-125 md:scale-150"></div>

                        <div className="relative flex flex-col items-center">
                            <div className="w-40 h-40 md:w-48 md:h-48 bg-background rounded-2xl md:rounded-[1.5rem] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden border">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-ds-primary)_1.5px,transparent_1.5px)] bg-size-[20px_20px]"></div>

                                {/* Symbolic Compass/Map Illustration */}
                                <div className="relative z-10 flex flex-col items-center gap-3">
                                    <Compass className="text-primary w-16 h-16 md:w-20 md:h-20" strokeWidth={1} />
                                    <div className="flex gap-1.5 md:gap-2">
                                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ds-secondary"></span>
                                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ds-primary/30"></span>
                                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-ds-primary/30"></span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -right-3 md:-right-6 bg-accent px-4 py-1.5 md:py-2 rounded-full shadow-lg text-[10px] md:text-xs font-semibold flex items-center gap-1.5">
                                <MapPinOff className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>Ruta no encontrada</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-xl">
                        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-2 md:mb-3 block">Error 404</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-3 md:mb-4">
                            Parece que te perdiste buscando buenas causas.
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8">
                            No podemos encontrar la página u organización que buscas. Es posible que el enlace sea incorrecto o la información haya sido movida. Pero no te detengas, hay muchas causas esperando tu apoyo.
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <Button className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group px-6 bg-linear-to-r from-ds-primary to-ds-primary-container hover:from-ds-primary/90 hover:to-ds-primary-container/90" asChild>
                                <Link href="/directory">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Volver al Directorio
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </Button>

                            <Button variant="outline" className="rounded-xl border-ds-primary/20 text-primary hover:bg-muted hover:text-primary transition-colors duration-300 px-6" asChild>
                                <Link href="/">
                                    Ir al Inicio ({countdown}s)
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Suggestion Content */}
                    <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border w-full max-w-md">
                        <p className="text-xs text-muted-foreground mb-3 font-medium">¿Buscabas algo específico?</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Badge variant="secondary" className="px-3 py-1 text-[10px] md:text-xs rounded-full font-semibold">Medio Ambiente</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-[10px] md:text-xs rounded-full font-semibold">Educación</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-[10px] md:text-xs rounded-full font-semibold">Salud</Badge>
                            <Badge variant="secondary" className="px-3 py-1 text-[10px] md:text-xs rounded-full font-semibold">Derechos Humanos</Badge>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

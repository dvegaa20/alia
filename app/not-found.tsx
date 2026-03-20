'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 max-w-md px-6">
                <div className="space-y-2">
                    <h1 className="text-6xl font-bold tracking-tight">404</h1>
                    <h2 className="text-2xl font-semibold">
                        Página no encontrada
                    </h2>
                    <p className="text-muted-foreground">
                        La página que buscas no existe o ha sido movida.
                    </p>
                </div>

                <p className="text-sm text-muted-foreground">
                    Serás redirigido al inicio en{' '}
                    <span className="font-medium">{countdown}</span> segundos...
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                    Ir al inicio ahora
                </Link>
            </div>
        </div>
    )
}

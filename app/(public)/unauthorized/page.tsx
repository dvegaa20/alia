import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 max-w-md px-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Acceso Denegado
                    </h1>
                    <p className="text-muted-foreground">
                        Tu cuenta no tiene permisos para acceder al panel de
                        administración. Si crees que esto es un error, contacta
                        al administrador.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}

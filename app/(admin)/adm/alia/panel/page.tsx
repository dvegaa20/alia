export default function AdminPanelPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    Panel de Administración
                </h2>
                <p className="text-muted-foreground mt-2">
                    Bienvenido al panel de administración de Alia.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Organizaciones</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gestiona las organizaciones sociales registradas.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Proyectos</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Administra los proyectos sociales activos.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Configuración</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Ajustes generales del sitio.
                    </p>
                </div>
            </div>
        </div>
    )
}

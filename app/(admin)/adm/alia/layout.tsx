import { ClerkProvider, UserButton } from '@clerk/nextjs'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <div className="min-h-screen bg-background">
                <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                    <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-semibold tracking-tight">
                                Alia Admin
                            </h1>
                        </div>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: 'w-9 h-9',
                                },
                            }}
                        />
                    </div>
                </nav>
                <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
            </div>
        </ClerkProvider>
    )
}

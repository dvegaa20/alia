import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: 'mx-auto',
                        card: 'shadow-lg',
                    },
                }}
                routing="path"
                path="/adm/alia/sign-in"
                signUpUrl="/adm/alia/sign-in"
            />
        </div>
    )
}

import React from 'react'
import { Toaster } from 'sonner'
import RegisterForm from '../components/RegisterForm'

const Register = () => {

    return (
        <section className="bg-background min-h-screen flex items-center justify-center px-4">
            <Toaster position='top-center' richColors />
            <div className="w-full max-w-sm bg-card border border-border rounded-lg shadow p-6">

                <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
                    Create your account
                </h2>

                <RegisterForm />
            </div>
        </section>
    )
}

export default Register

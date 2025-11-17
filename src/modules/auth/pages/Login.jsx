import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useCookie from 'react-use-cookie'
import LoginForm from '../components/LoginForm'
import { Toaster } from 'sonner'

const Login = () => {
    return (
        <section className="bg-background min-h-screen flex items-center justify-center px-4">
            <Toaster position='top-center' richColors />
            <div className="w-full max-w-sm bg-card rounded-lg shadow border border-border p-6">

                <h2 className="text-lg font-semibold text-foreground text-center mb-4">
                    Sign in to your account
                </h2>

                <LoginForm />
            </div>
        </section>
    )
}

export default Login

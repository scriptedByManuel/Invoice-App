import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useCookie from 'react-use-cookie'
import { toast } from 'sonner'
const Login = () => {
   
    const navigate = useNavigate()
    const [token, setToken] = useCookie('my_token')
    const [userCookie, setUserCookie] = useCookie('user')

    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [])

    const { register, handleSubmit, formState: { error } } = useForm()

    const handleLogin = async (data) => {
        const res = await fetch(import.meta.env.VITE_URL_API + "/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
        const json = await res.json();
        if (res.status === 200) {
            toast.success("Login Successfully")
            setToken(json.token)
            setUserCookie(JSON.stringify(json.user))
            navigate('/dashboard')
        } else {
            toast.error(json.message)
        }
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-xl font-bold text-blue-600 text-center mb-4">
                    MMS Solutions
                </h1>

                <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
                    Sign in to your account
                </h2>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Your Email
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-100 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm outline-none"
                            placeholder="name@gmail.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-100 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm outline-none"
                            required
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            required
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 rounded bg-gray-100 focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="remember" className="ml-2 text-xs text-gray-500">
                            Remember me
                        </label>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2 transition"
                    >
                        Sign in
                    </button>

                    {/* Register Redirect */}
                    <p className="text-xs text-gray-500 text-center">
                        Don’t have an account yet?{' '}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login

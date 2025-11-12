import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useCookie from 'react-use-cookie'
import { toast, Toaster } from 'sonner'

const Register = () => {
    const navigate = useNavigate()

    const [token, setToken] = useCookie('my_token')
    const [userCookie, setUserCookie] = useCookie('user')

    const { register, handleSubmit, formState: { error } } = useForm()

    const handleRegister = async (data) => {
        const res = await fetch(import.meta.env.VITE_URL_API + "/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
        const json = await res.json();

        if (res.status === 200) {
            toast.success("Registered Successfully")
            setToken(json.token)
            setUserCookie(JSON.stringify(json.user))
            navigate('/dashboard')
        } else {
            toast.error(json.message)
        }

    }
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
            <Toaster richColors />
            <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
                <h1 className="text-xl font-bold text-blue-600 text-center mb-4">
                    MMS Solutions
                </h1>

                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Create your account
                </h2>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            {...register('name')}
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-100 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm outline-none"
                            placeholder="John Doe"
                            required
                        />
                    </div>

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
                            placeholder="name@company.com"
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

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            {...register('password_confirmation')}
                            type="password"
                            name="password_confirmation"
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-gray-100 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm outline-none"
                            required
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-center">
                        <input
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4 rounded bg-gray-100 focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2 transition"
                    >
                        Register
                    </button>

                    {/* Already have account */}
                    <p className="text-xs text-gray-500 text-center">
                        Already have an account?{" "}
                        <Link to={'/'} className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register

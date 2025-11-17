import React from 'react'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import { lineSpinner } from "ldrs";

lineSpinner.register(); 

const LoginForm = () => {
    const { handleLogin, handleSubmit, register, isSubmitting } = useLogin()

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-secondary"
                >
                    Your Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="bg-input text-foreground border border-border rounded-md focus:ring-primary focus:border-primary block w-full p-2 text-sm outline-none"
                    placeholder="name@gmail.com"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-secondary"
                >
                    Password
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-input text-foreground border border-border rounded-md focus:ring-primary focus:border-primary block w-full p-2 text-sm outline-none"
                    required
                />
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <input
                    required
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded bg-input border border-border focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 text-xs text-secondary">
                    Remember me
                </label>
            </div>

            {/* Sign In Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-2 text-background bg-primary font-medium rounded-md text-sm px-4 py-2 transition
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
            >
                {isSubmitting ? (
                    <l-line-spinner
                        size="18"
                        stroke="2"
                        speed="1.3"
                        color="white"
                    ></l-line-spinner>
                ) : (
                    "Sign in"
                )}
            </button>

            {/* Sign Up link */}
            <p className="text-xs text-secondary text-center">
                Don’t have an account yet?{" "}
                <Link
                    to="/register"
                    className="font-medium text-primary hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </form>
    )
}

export default LoginForm

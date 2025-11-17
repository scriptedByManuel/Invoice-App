import React from 'react'
import useRegister from '../hooks/useRegister'
import { Link } from 'react-router-dom'
import { lineSpinner } from "ldrs";

lineSpinner.register(); 

const RegisterForm = () => {
    const { register, handleSubmit, handleRegister, isSubmitting } = useRegister()

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">

            {/* Full Name */}
            <div>
                <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-secondary"
                >
                    Full Name
                </label>
                <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="bg-input text-foreground border border-border rounded-md focus:ring-primary focus:border-primary block w-full p-2 text-sm outline-none"
                    placeholder="John Doe"
                    required
                />
            </div>

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
                    placeholder="name@company.com"
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

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="block mb-1 text-sm font-medium text-secondary"
                >
                    Confirm Password
                </label>
                <input
                    {...register('password_confirmation')}
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-input text-foreground border border-border rounded-md focus:ring-primary focus:border-primary block w-full p-2 text-sm outline-none"
                    required
                />
            </div>

            {/* Terms */}
            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 rounded bg-input border border-border focus:ring-primary"
                    required
                />
                <label htmlFor="terms" className="ml-2 text-xs text-secondary">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                        Terms and Conditions
                    </a>
                </label>
            </div>

            {/* Register Button */}
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
                    "Register"
                )}
            </button>

            {/* Already have an account */}
            <p className="text-xs text-secondary text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Sign in
                </Link>
            </p>

        </form>
    )
}

export default RegisterForm

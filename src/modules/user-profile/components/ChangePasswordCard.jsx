import { lineSpinner } from "ldrs"
import useChangePassword from '../hooks/useChangePassword'

lineSpinner.register()

const ChangePasswordCard = () => {

    const { register, errors, handleSubmit, handleChangePassword, isSending } = useChangePassword()

    const inputBaseClasses =
        "w-full bg-gray-50 border text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none"

    return (
        <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="p-10 flex flex-col gap-6 bg-white rounded-2xl shadow-sm w-[50%]"
        >
            {/* Current Password */}
            <div>
                <label
                    htmlFor="old_password"
                    className={`block mb-2 text-sm font-medium ${errors.old_password ? 'text-red-500' : 'text-gray-900'
                        }`}
                >
                    Current Password
                </label>
                <input
                    type="password"
                    {...register('old_password', { required: true, minLength: 8 })}
                    className={`${inputBaseClasses} ${errors.old_password
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                        }`}
                    placeholder="Enter your current password"
                />
                {errors.old_password && (
                    <p className="text-red-500 text-sm mt-1">
                        Current password is required
                    </p>
                )}
            </div>

            {/* New Password */}
            <div>
                <label
                    htmlFor="new_password"
                    className={`block mb-2 text-sm font-medium ${errors.new_password ? 'text-red-500' : 'text-gray-900'
                        }`}
                >
                    New Password
                </label>
                <input
                    type="password"
                    {...register('new_password', { required: true, minLength: 8 })}
                    className={`${inputBaseClasses} ${errors.new_password
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                        }`}
                    placeholder="Enter a new password"
                />
                {errors.new_password && (
                    <p className="text-red-500 text-sm mt-1">
                        New password must be at least 8 characters
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="new_password_confirmation"
                    className={`block mb-2 text-sm font-medium ${errors.new_password_confirmation ? 'text-red-500' : 'text-gray-900'
                        }`}
                >
                    Confirm New Password
                </label>
                <input
                    type="password"
                    {...register('new_password_confirmation', { required: true, minLength: 8 })}
                    className={`${inputBaseClasses} ${errors.new_password_confirmation
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                        }`}
                    placeholder="Re-enter your new password"
                />
                {errors.new_password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">
                        Please confirm your new password
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSending}
                className="inline-flex gap-3 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:bg-primary/60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/40 transition"
            >
                {isSending ? (
                    <div className="flex items-center gap-2">
                        <span>Updating...</span>
                        <l-line-spinner
                            size="18"
                            stroke="2"
                            speed="1"
                            color="white"
                        ></l-line-spinner>
                    </div>
                ) : (
                    "Update Password"
                )}
            </button>
        </form>
    )
}

export default ChangePasswordCard

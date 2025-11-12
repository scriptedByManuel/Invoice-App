import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useForm } from 'react-hook-form'
import useCookie from 'react-use-cookie'
import { toast } from 'sonner'


const UserChangePassword = () => {
  const [token] = useCookie('my_token')


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleChangePassword = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_URL_API}/user-profile/change-password`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    const json = await res.json()

    if (res.status === 200) {
      toast.success(json.message)
      reset()
    } else {
      toast.error(json.message)
    }
  }

  return (
    <section>
      <Container>
        <BreadCrumb
          links={[{ title: 'User Profile', path: '/dashboard/user-profile' }]}
          currentPageTitle="Change Password"
        />

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
              className={`w-full bg-gray-50 border ${errors.old_password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } text-gray-900 text-sm rounded-lg block p-2.5`}
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
              {...register('new_password', { required: true, minLength: 6 })}
              className={`w-full bg-gray-50 border ${errors.new_password
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } text-gray-900 text-sm rounded-lg block p-2.5`}
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
              className={`w-full bg-gray-50 border ${errors.new_password_confirmation
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } text-gray-900 text-sm rounded-lg block p-2.5`}
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
            className="inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          >
            Update Password
          </button>
        </form>
      </Container>
    </section>
  )
}

export default UserChangePassword

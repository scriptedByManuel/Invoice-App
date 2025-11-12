import React from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useForm } from 'react-hook-form'
import useCookie from 'react-use-cookie'
import { toast } from 'sonner'
import useUserStore from '../stores/useUserStore'

const UserChangeName = () => {
    const [token] = useCookie('my_token')
    const [userCookie, setUserCookie] = useCookie('user')

    const {setUser} = useUserStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const handleUpdateName = async (data) => {
        const res = await fetch(`${import.meta.env.VITE_URL_API}/user-profile/change-name`, {
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
            setUserCookie(JSON.stringify(json.user))
            setUser(json.user)
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
                    currentPageTitle="Change Name"
                />

                <form
                    onSubmit={handleSubmit(handleUpdateName)}
                    className="p-10 flex gap-5 items-end bg-white rounded-2xl shadow-sm w-[50%]"
                >
                    <div className="flex-1">
                        <label
                            htmlFor="first_name"
                            className={`block mb-2 text-sm font-medium ${errors.name ? 'text-red-500' : 'text-gray-900'
                                }`}
                        >
                            Update Your Name
                        </label>
                        <input
                            type="text"
                            {...register('name', {
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                            })}
                            className={`w-full bg-gray-50 border ${errors.name
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                } text-gray-900 text-sm rounded-lg block p-2.5`}
                            placeholder="e.g. John Doe"
                        />
                        {errors.name?.type === 'required' && (
                            <p className="text-red-500 text-sm mt-1">
                                Name is required
                            </p>
                        )}
                        {errors.name?.type === 'minLength' && (
                            <p className="text-red-500 text-sm mt-1">
                                Name must be greater than 3 characters
                            </p>
                        )}
                        {errors.name?.type === 'maxLength' && (
                            <p className="text-red-500 text-sm mt-1">
                                Name must be less than 20 characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                    >
                        Update
                    </button>
                </form>
            </Container>
        </section>
    )
}

export default UserChangeName

import { LockIcon, LogOutIcon, PencilIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import useUserStore from '../stores/useUserStore'
import useCookie, { removeCookie } from 'react-use-cookie'

const UserProfile = () => {
    const navigate = useNavigate()
    const {
        user: { name, email, profile_image },
        removeUser
    } = useUserStore()

    const handleLogout = () => {
        removeCookie('my_token')
        removeUser()
        navigate('/')
    }

    
    return (
        <section>
            <Container>
                <BreadCrumb currentPageTitle="User Profile" />

                {/* Borderless card with light mode only */}
                <div className="p-10 w-[50%] flex flex-col gap-8 bg-white rounded-2xl shadow-sm">
                    {/* Profile Header */}
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                className="size-32 rounded-lg object-cover"
                                src={
                                    profile_image
                                        ? profile_image
                                        : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                                 }
                                alt="user photo"
                            />

                            <Link
                                to="change-image"
                                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-6 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
                            >
                                <PencilIcon size={10} />
                            </Link>
                        </div>

                        {/* Info Box (Username + Email) */}
                        <div className="flex flex-col gap-3 bg-blue-50 p-5 rounded-xl w-full sm:w-auto">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                                <Link
                                    to="change-name"
                                    className="size-6 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
                                >
                                    <PencilIcon size={10} />
                                </Link>
                            </div>
                            <p className="text-gray-700 text-sm">{email}</p>
                        </div>
                    </div>

                  
                    <div className='flex gap-2 items-center'>
                        <Link
                            to={'change-password'}
                            className="flex-1 inline-flex gap-3 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto transition"
                        >
                            <LockIcon /> Change Password
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex-1 inline-flex gap-3 items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
                        >
                            <LogOutIcon /> Logout
                        </button>
                   </div>
                </div>
            </Container>
        </section>
    )
}

export default UserProfile

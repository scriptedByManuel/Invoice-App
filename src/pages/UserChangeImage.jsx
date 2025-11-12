import React, { useRef, useState } from 'react'
import useUserStore from '../stores/useUserStore'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import useCookie from 'react-use-cookie'
import { toast } from 'sonner'
import { lineSpinner } from 'ldrs'
lineSpinner.register()

const UserChangeImage = () => {
    const [token] = useCookie('my_token')
    const [userCookie, setUserCookie] = useCookie('user')
    const { user, setUser } = useUserStore()

    const fileInputRef = useRef(null)
    const [isSending, setIsSending] = useState(false)

    const handleUpdateImage = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsSending(true)

        try {
            // Step 1: Upload image
            const formData = new FormData()
            formData.append('image', file)

            const resUpload = await fetch(`${import.meta.env.VITE_URL_API}/media`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const jsonUpload = await resUpload.json()
            if (!resUpload.ok) throw new Error(jsonUpload.message)

            // Step 2: Update user profile image
            const updateData = { profile_image: jsonUpload.data.path }

            const resUpdate = await fetch(
                `${import.meta.env.VITE_URL_API}/user-profile/change-profile-image`,
                {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updateData),
                }
            )

            const jsonUpdate = await resUpdate.json()
            if (!resUpdate.ok) throw new Error(jsonUpdate.message)

            toast.success(jsonUpdate.message)
            setUserCookie(JSON.stringify(jsonUpdate.user))
            setUser(jsonUpdate.user)
        } catch (error) {
            toast.error(error.message || 'Failed to upload image')
        } finally {
            setIsSending(false)
        }
    }

    const handleImageUploader = () => {
        if (!isSending) fileInputRef.current.click()
    }

    return (
        <section>
            <Container>
                <BreadCrumb
                    links={[{ title: 'User Profile', path: '/dashboard/user-profile' }]}
                    currentPageTitle="Change Photo"
                />

                <div className="p-10 bg-white rounded-2xl shadow-sm w-[50%]">
                    <div className="inline-block mb-5 space-y-3 text-center">
                        <img
                            className="size-32 rounded-lg mb-5 object-cover mx-auto"
                            src={
                                user.profile_image
                                    ? user.profile_image
                                    : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                            }
                            alt="user photo"
                        />

                        {/* Upload button with spinner */}
                        <button
                            type="button"
                            onClick={handleImageUploader}
                            disabled={isSending}
                            className={`cursor-pointer w-full px-4 py-2 rounded-lg text-white transition ${isSending
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSending ? (
                                <div className="flex items-center justify-center gap-3">
                                    <p>Uploading</p>
                                    <l-line-spinner
                                        size="16"
                                        stroke="1"
                                        speed="1"
                                        color="white"
                                    ></l-line-spinner>
                                </div>
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </div>

                    <input
                        onChange={handleUpdateImage}
                        ref={fileInputRef}
                        className="hidden"
                        type="file"
                        id="profile_image"
                    />
                </div>
            </Container>
        </section>
    )
}

export default UserChangeImage

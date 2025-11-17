import { useRef, useState } from "react"
import { changeProfileImage, uploadImageToStorage } from "../../../services/profile"
import { toast } from "sonner"
import useCookie from 'react-use-cookie'
import useUserStore from "../../../stores/useUserStore"

const useChangeImage = () => {
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

            const resUpload = await uploadImageToStorage(formData)
            const jsonUpload = await resUpload.json()

            if (!resUpload.ok) throw new Error(jsonUpload.message)

            // Step 2: Update user profile image
            const updateData = { profile_image: jsonUpload.data.path }

            const resUpdate = await changeProfileImage(updateData)

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
    
    return {user, fileInputRef, handleUpdateImage, handleImageUploader, isSending }
}

export default useChangeImage
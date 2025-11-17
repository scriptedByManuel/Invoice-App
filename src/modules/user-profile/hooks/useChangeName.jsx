import { useNavigate } from "react-router-dom"
import useCookie from 'react-use-cookie'
import useUserStore from "../../../stores/useUserStore"
import { useForm } from "react-hook-form"
import { changeName } from "../../../services/profile"
import { toast } from "sonner"


const useChangeName = () => {
    const navigate = useNavigate()
    const [userCookie, setUserCookie] = useCookie('user')

    const { setUser } = useUserStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const handleUpdateName = async (data) => {
        const res = await changeName(data)
        const json = await res.json()

        if (res.status === 200) {
            toast.success(json.message)
            setUserCookie(JSON.stringify(json.user))
            setUser(json.user)
            reset()
            navigate('/dashboard/user-profile')
        } else {
            toast.error(json.message)
        }
    }
    return {register, handleSubmit, errors, handleUpdateName}
}

export default useChangeName
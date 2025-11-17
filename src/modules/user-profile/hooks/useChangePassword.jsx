import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../services/profile"
import { toast } from "sonner"

const useChangePassword = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const handleChangePassword = async (data) => {
        const res = await changePassword(data)
        const json = await res.json()

        if (res.status === 200) {
            toast.success(json.message)
            reset()
            navigate('/')
        } else {
            toast.error(json.message)
        }
    }

    return {register, handleSubmit, errors, handleChangePassword}
}

export default useChangePassword
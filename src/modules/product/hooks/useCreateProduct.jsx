import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { storeProduct } from "../../../services/product"
import { toast } from "sonner"

const useCreateProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate()
    const [isSending, setIsSending] = useState(false)

    const handleCreateProduct = async (data) => {
        setIsSending(true)
        const res = await storeProduct(data.product_name, data.price)
        const json = await res.json();

        if (!res.status) {
            toast.error(json.message);
            return;
        }

        setIsSending(false)
        reset()
        if (data.go_back_after_save) navigate('/dashboard/product')
        toast.success('Product created successfully')
    }

    return {register, handleSubmit, errors, isSending, handleCreateProduct}
}

export default useCreateProduct
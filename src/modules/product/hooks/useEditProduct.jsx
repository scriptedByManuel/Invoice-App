import { useForm } from "react-hook-form";
import { fetchProducts, updateProduct } from "../../../services/product";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { toast } from "sonner";


const useEditProduct = () => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useSWR(`${import.meta.env.VITE_URL_API}/products/${id}`, fetchProducts);
    const { mutate } = useSWRConfig();

    const [isSending, setIsSending] = useState(false);

    const handleEditProduct = async (formData) => {
        setIsSending(true);

        const res = await updateProduct(id, formData.product_name, formData.price)
        const json = await res.json();

        if (!res.status) {
            toast.error(json.message);
            return;
        }

        mutate(`${import.meta.env.VITE_URL_API}/products/`);
        mutate(`${import.meta.env.VITE_URL_API}/products/${id}`);
        setIsSending(false);
        reset();
        toast.success("Product updated successfully");
        navigate("/dashboard/product");
    };

    return {data, isLoading, errors, isSending, register, handleSubmit, handleEditProduct }
}

export default useEditProduct
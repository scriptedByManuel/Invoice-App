import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as accountRegister } from "../../../services/auth";

const useRegister = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const handleRegister = async (data) => {

        const res = await accountRegister(data);

        const json = await res.json();

        if (res.status === 200) {
            toast.success("Register Successfully");
            navigate("/dashboard");
        } else {
            toast.error(json.message);
        }
    };

    return {
        register,
        handleSubmit,
        handleRegister,
        isSubmitting,
    };
};

export default useRegister;
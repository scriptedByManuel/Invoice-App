import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as accountRegister } from "../../../services/auth";
import { toast } from "sonner";
import useCookie from "react-use-cookie";


const useRegister = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const [token, setToken] = useCookie("my_token");
    const [userCookie, setUserCookie] = useCookie("user");

    const handleRegister = async (data) => {

        const res = await accountRegister(data);

        const json = await res.json();

        if (res.status === 200) {
            toast.success("Register Successfully");
            setToken(json.token);
            setUserCookie(JSON.stringify(json.user));
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
import { Suspense, lazy } from "react";
import PageLoading from "../components/PageLoading";

const Login = lazy(() => import("../modules/auth/pages/Login"));
const Register = lazy(() => import("../modules/auth/pages/Register"));

const AuthRoute = [
    {
        path: "login",
        element: (
            <Suspense fallback={<PageLoading />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: "register",
        element: (
            <Suspense fallback={<PageLoading />}>
                <Register />
            </Suspense>
        ),
    },
];

export default AuthRoute;

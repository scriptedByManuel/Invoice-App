import { createBrowserRouter } from "react-router-dom";
// import NotFound from "../pages/NotFound";
// import Layout from "../components/Layout";
// import Dashboard from "../pages/Dashboard";
// import Sale from "../pages/Sale";
// import Voucher from "../pages/Voucher";
// import Product from "../pages/Product";
// import ProductCreate from "../pages/ProductCreate";
// import ProductEdit from "../pages/ProductEdit";
// import VoucherDetail from "../pages/VoucherDetail";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import UserProfile from "../pages/UserProfile";
// import UserChangeName from "../pages/UserChangeName";
// import UserChangePassword from "../pages/UserChangePassword";
// import UserChangeImage from "../pages/UserChangeImage";
import Home from "../modules/public/pages/Home";
import NotFound from "../components/NotFound";
import AuthRoute from "./AuthRoute";
import DashboardRoute from "./DashboardRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    ...AuthRoute,
    ...DashboardRoute
    
])

export default router
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Sale from "../pages/Sale";
import Voucher from "../pages/Voucher";
import Product from "../pages/Product";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";
import VoucherDetail from "../pages/VoucherDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";
import UserChangeName from "../pages/UserChangeName";
import UserChangePassword from "../pages/UserChangePassword";
import UserChangeImage from "../pages/UserChangeImage";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: 'product',
                        element: <Product />
                    },
                    {
                        path: 'product/edit/:id',
                        element: <ProductEdit />
                    },
                    {
                        path: 'product/create',
                        element: <ProductCreate />
                    },
                    {
                        path: 'sale',
                        element: <Sale />
                    },
                    {
                        path: 'voucher',
                        element: <Voucher />
                    },
                    {
                        path: 'voucher/voucher-detail/:id',
                        element: <VoucherDetail />
                    },
                    {
                        path: 'user-profile',
                        children: [
                            {
                                index: true,
                                element: <UserProfile />
                            },
                            {
                                path: 'change-name',
                                element: <UserChangeName />
                            },
                            {
                                path: 'change-password',
                                element: <UserChangePassword />
                            },
                            {
                                path: 'change-image',
                                element: <UserChangeImage />
                            },
                        ]
                    },
                ]
            }, 
        ]
    }
])

export default router
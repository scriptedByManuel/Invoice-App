import DashboardLayout from "../modules/dashboard/components/DashboardLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductRoute from "./ProductRoute";
import SaleRoute from "./SaleRoute";
import UserProfileRoute from "./UserProfileRoute";
import VoucherRoute from "./VoucherRoute";

const DashboardRoute = [
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            ...ProductRoute,
            ...SaleRoute,
            ...VoucherRoute,
            ...UserProfileRoute
        ],
    },
]

export default DashboardRoute
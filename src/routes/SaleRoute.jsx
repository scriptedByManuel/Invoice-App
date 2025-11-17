import { Suspense, lazy } from "react";
import PageLoading from "../components/PageLoading";

const Sale = lazy(() => import("../modules/sale/pages/Sale"));

const SaleRoute = [
    {
        path: "sale",
        element: (
            <Suspense fallback={<PageLoading />}>
                <Sale />
            </Suspense>
        ),
    },
];

export default SaleRoute;

import { Suspense, lazy } from "react";
import PageLoading from "../components/PageLoading";

const Voucher = lazy(() => import("../modules/voucher/pages/Voucher"));
const VoucherDetail = lazy(() => import("../modules/voucher/pages/VoucherDetail"));

const VoucherRoute = [
    {
        path: "voucher",
        element: (
            <Suspense fallback={<PageLoading />}>
                <Voucher />
            </Suspense>
        ),
    },
    {
        path: "voucher/voucher-detail/:id",
        element: (
            <Suspense fallback={<PageLoading />}>
                <VoucherDetail />
            </Suspense>
        ),
    },
];

export default VoucherRoute;

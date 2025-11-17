import { Suspense, lazy } from "react";
import PageLoading from "../components/PageLoading";

const Product = lazy(() => import("../modules/product/pages/Product"));
const ProductCreate = lazy(() => import("../modules/product/pages/ProductCreate"));
const ProductEdit = lazy(() => import("../modules/product/pages/ProductEdit"));

const ProductRoute = [
    {
        path: "product",
        element: (
            <Suspense fallback={<PageLoading />}>
                <Product />
            </Suspense>
        ),
    },
    {
        path: "product/edit/:id",
        element: (
            <Suspense fallback={<PageLoading />}>
                <ProductEdit />
            </Suspense>
        ),
    },
    {
        path: "product/create",
        element: (
            <Suspense fallback={<PageLoading />}>
                <ProductCreate />
            </Suspense>
        ),
    },
];

export default ProductRoute;

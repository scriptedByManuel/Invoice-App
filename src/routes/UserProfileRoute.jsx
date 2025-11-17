import { Suspense, lazy } from "react";
import PageLoading from "../components/PageLoading";

const UserProfile = lazy(() => import("../modules/user-profile/pages/UserProfile"));
const UserChangeName = lazy(() => import("../modules/user-profile/pages/UserChangeName"));
const UserChangePassword = lazy(() => import("../modules/user-profile/pages/UserChangePassword"));
const UserChangeImage = lazy(() => import("../modules/user-profile/pages/UserChangeImage"));

const UserProfileRoute = [
    {
        path: "user-profile",
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoading />}>
                        <UserProfile />
                    </Suspense>
                ),
            },
            {
                path: "change-name",
                element: (
                    <Suspense fallback={<PageLoading />}>
                        <UserChangeName />
                    </Suspense>
                ),
            },
            {
                path: "change-password",
                element: (
                    <Suspense fallback={<PageLoading />}>
                        <UserChangePassword />
                    </Suspense>
                ),
            },
            {
                path: "change-image",
                element: (
                    <Suspense fallback={<PageLoading />}>
                        <UserChangeImage />
                    </Suspense>
                ),
            },
        ],
    },
];

export default UserProfileRoute;

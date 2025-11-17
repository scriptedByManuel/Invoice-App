import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import useCookie from 'react-use-cookie'
import useUserStore from '../../../stores/useUserStore'
import Header from './Header'

const DashboardLayout = () => {
    const [token] = useCookie('my_token')
    const [userCookie] = useCookie('user')
    const { setUser } = useUserStore()

    useEffect(() => {
        if (userCookie) {
            try {
                setUser(JSON.parse(userCookie))
            } catch {
                console.warn('Invalid user cookie')
            }
        }
    }, [userCookie, setUser])

    if (!token) {
        return <Navigate to="/" replace />
    }

    return (
        <main className="flex flex-col min-h-screen bg-background p-6">
            <Header />
            <div className="flex-1 mt-6">
                <Outlet />
            </div>
            <Toaster position="top-center" richColors />
        </main>
    )
}

export default DashboardLayout

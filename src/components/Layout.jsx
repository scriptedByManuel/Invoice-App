import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
import { Toaster } from 'sonner'
import useCookie from 'react-use-cookie'
import useUserStore from '../stores/useUserStore'

const Layout = () => {
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
    <main className="flex flex-col min-h-screen p-5 bg-gray-50">
      <Header />
      <Outlet />
      <Toaster position="top-right" richColors />
    </main>
  )
}

export default Layout

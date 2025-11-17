import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Go Back
      </Link>
    </div>
  )
}

export default NotFound

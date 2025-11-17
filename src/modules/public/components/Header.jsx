import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <nav className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Pixel Solutions</h1>
              <div className="flex gap-4">
                  <Link
                      to="/login"
                      className="px-6 py-2 text-foreground hover:bg-card rounded-lg transition"
                  >
                      Sign In
                  </Link>
                  <Link
                      to="/register"
                      className="px-6 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition"
                  >
                      Get Started
                  </Link>
              </div>
          </div>
      </nav>
  )
}

export default Header
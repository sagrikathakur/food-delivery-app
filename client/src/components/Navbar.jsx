import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ onOpenAuthModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-gray-900">
            Auth<span className="text-blue-600">App</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#about" className="hover:text-gray-900 transition-colors">
              About
            </a>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 font-medium">
                  Hi, <span className="text-blue-600">{user.name || user.email}</span>
                </span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('login')}
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pt-2 pb-4 space-y-2">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
            Home
          </a>
          <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
            Features
          </a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
            About
          </a>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-3 py-1 text-sm text-gray-600">
                  Logged in as <span className="font-semibold text-gray-900">{user.name || user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onOpenAuthModal('login')
                }}
                className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

import React from 'react'
import { useAuth } from '../context/AuthContext'

const Hero = ({ onOpenAuthModal }) => {
  const { user } = useAuth()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
        Secure Authentication <span className="text-blue-600">Made Simple</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        A lightweight and robust user authentication starter built with Express, JWT, PostgreSQL, and React.
      </p>

      {user ? (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
          <p className="text-blue-900 font-semibold text-lg">Welcome back, {user.name}!</p>
          <p className="text-blue-700 text-sm mt-1">Your session is active and connected to the backend server.</p>
        </div>
      ) : (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => onOpenAuthModal('register')}
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
          >
            Get Started
          </button>
          <button
            onClick={() => onOpenAuthModal('login')}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  )
}

export default Hero

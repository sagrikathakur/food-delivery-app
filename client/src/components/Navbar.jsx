import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ onOpenAuthModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  // Extract user initials
  const getInitials = (nameOrEmail = '') => {
    if (!nameOrEmail) return 'U'
    const parts = nameOrEmail.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return nameOrEmail.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="absolute top-0 left-0 w-full z-40 bg-transparent transition-all text-white border-b border-white/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-serif tracking-wider text-white uppercase">
              Ocean<span className="text-xs tracking-widest text-stone-300 uppercase font-sans font-light">Parfums</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium uppercase text-stone-200">
            <a href="#fragrances" className="hover:text-white transition-colors">
              Fragrances
            </a>
            <a href="#collections" className="hover:text-white transition-colors">
              Collections
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About Us
            </a>
          </div>

          {/* Single Action Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-xs tracking-wider uppercase font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 transition-colors border border-white/30 rounded-md"
              >
                <span className="w-5 h-5 rounded-full bg-white text-stone-900 flex items-center justify-center text-[10px] font-bold">
                  {getInitials(user.name || user.email)}
                </span>
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuthModal('login')}
                className="text-xs tracking-widest uppercase font-medium text-stone-900 bg-white hover:bg-stone-100 px-5 py-2.5 transition-all rounded-md shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 transition-colors rounded-md"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950/95 backdrop-blur-md px-6 pt-3 pb-5 space-y-3 text-white">
          <a
            href="#fragrances"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            Fragrances
          </a>
          <a
            href="#collections"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            Collections
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            About Us
          </a>
          <div className="pt-3 border-t border-stone-800">
            {user ? (
              <button
                onClick={() => {
                  setIsOpen(false)
                  logout()
                }}
                className="w-full text-center px-4 py-2.5 text-xs tracking-widest uppercase font-medium text-red-400 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 transition-colors rounded-md"
              >
                Sign Out ({user.name || user.email})
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onOpenAuthModal('login')
                }}
                className="w-full text-center px-4 py-2.5 text-xs tracking-widest uppercase font-medium text-stone-900 bg-white hover:bg-stone-100 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

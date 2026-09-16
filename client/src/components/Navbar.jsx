import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ onOpenAuthModal, currentView, onNavigate }) => {
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
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigate) onNavigate('home')
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-serif tracking-wider text-white uppercase">
              Ocean
              <span className="text-xs tracking-widest text-stone-300 uppercase font-sans font-light">
                Parfums
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium uppercase text-stone-200">
            <a
              href="#fragrances"
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-white transition-colors"
            >
              Fragrances
            </a>
            <a
              href="#collections"
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-white transition-colors"
            >
              Collections
            </a>
            <a
              href="#about"
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-white transition-colors"
            >
              About Us
            </a>

            {/* Admin Panel Link if User is Admin */}
            {user?.role === 'admin' && (
              <button
                onClick={() => onNavigate && onNavigate(currentView === 'admin' ? 'home' : 'admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                  currentView === 'admin'
                    ? 'bg-white text-stone-900 border-white'
                    : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{currentView === 'admin' ? 'View Store' : 'Admin Panel'}</span>
              </button>
            )}
          </div>

          {/* Single Action Button & User Info */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  <span className="w-5 h-5 rounded-full bg-white text-stone-900 flex items-center justify-center text-[10px] font-bold">
                    {getInitials(user.name || user.email)}
                  </span>
                  <span className="text-xs font-medium text-white">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="text-xs tracking-wider uppercase font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 transition-colors border border-white/30 rounded-md"
                >
                  Sign Out
                </button>
              </div>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
            onClick={() => {
              setIsOpen(false)
              if (onNavigate) onNavigate('home')
            }}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            Fragrances
          </a>
          <a
            href="#collections"
            onClick={() => {
              setIsOpen(false)
              if (onNavigate) onNavigate('home')
            }}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            Collections
          </a>
          <a
            href="#about"
            onClick={() => {
              setIsOpen(false)
              if (onNavigate) onNavigate('home')
            }}
            className="block px-3 py-2 text-xs tracking-widest uppercase text-stone-200 hover:bg-white/10"
          >
            About Us
          </a>

          {user?.role === 'admin' && (
            <button
              onClick={() => {
                setIsOpen(false)
                if (onNavigate) onNavigate(currentView === 'admin' ? 'home' : 'admin')
              }}
              className="w-full text-left px-3 py-2 text-xs tracking-widest uppercase text-white font-semibold bg-white/10 border border-white/20 rounded-md"
            >
              {currentView === 'admin' ? 'View Store' : 'Admin Panel'}
            </button>
          )}

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

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuthModal, currentView, onNavigate, cartCount = 2, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth ? useAuth() : { user: null, logout: () => {} };

  const getInitials = (nameOrEmail = '') => {
    if (!nameOrEmail) return 'U';
    const parts = nameOrEmail.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameOrEmail.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all text-stone-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-serif tracking-wider text-stone-900 uppercase">
              Ocean
              <span className="text-xs tracking-widest text-amber-700 uppercase font-sans font-light ml-1">
                Parfums
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium uppercase text-stone-600">
            <a
              href="#fragrances"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              className="hover:text-amber-800 transition-colors"
            >
              Fragrances
            </a>
            <a
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              className="hover:text-amber-800 transition-colors"
            >
              Collections
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('home');
              }}
              className="hover:text-amber-800 transition-colors"
            >
              About Us
            </a>
          </div>

          {/* Right Action Icons: Cart & Profile */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2 text-stone-700 hover:text-amber-800 transition-colors"
              title="Shopping Bag"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Account */}
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-stone-200">
                <div className="w-8 h-8 rounded-full bg-stone-100 text-amber-800 font-serif font-bold text-xs flex items-center justify-center border border-amber-200">
                  {getInitials(user.name || user.email)}
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
                  type="button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                type="button"
                className="px-5 py-2.5 bg-stone-900 hover:bg-amber-900 text-white text-xs font-medium uppercase tracking-widest rounded-md transition-all shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700"
              type="button"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 flex flex-col gap-3 text-xs tracking-widest font-medium uppercase text-stone-700">
            <a href="#fragrances" onClick={() => onNavigate && onNavigate('home')} className="hover:text-amber-800 py-1">
              Fragrances
            </a>
            <a href="#collections" onClick={() => onNavigate && onNavigate('home')} className="hover:text-amber-800 py-1">
              Collections
            </a>
            <a href="#about" onClick={() => onNavigate && onNavigate('home')} className="hover:text-amber-800 py-1">
              About Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

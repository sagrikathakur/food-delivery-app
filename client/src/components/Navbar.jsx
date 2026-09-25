import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenAuthModal, currentView, onNavigate, cartCount = 0, onOpenCart, transparent = false }) => {
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

  const isTransparent = transparent && currentView === 'home';

  return (
    <nav
      className={`${
        isTransparent
          ? 'absolute top-0 left-0 right-0 z-40 bg-transparent text-white transition-all'
          : 'sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all text-stone-800 shadow-xs'
      }`}
    >
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
            <span
              className={`text-xl font-serif tracking-wider uppercase ${
                isTransparent ? 'text-white' : 'text-stone-900'
              }`}
            >
              Ocean
              <span
                className={`text-xs tracking-widest uppercase font-sans font-light ml-1 ${
                  isTransparent ? 'text-amber-300' : 'text-amber-700'
                }`}
              >
                Parfums
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div
            className={`hidden md:flex items-center gap-8 text-xs tracking-widest font-medium uppercase ${
              isTransparent ? 'text-white/80' : 'text-stone-600'
            }`}
          >
            <a
              href="/fragrances"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/fragrances');
              }}
              className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-amber-800'}`}
            >
              Fragrances
            </a>
            <a
              href="/collections"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/collections');
              }}
              className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-amber-800'}`}
            >
              Collections
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('/about');
              }}
              className={`transition-colors ${isTransparent ? 'hover:text-white' : 'hover:text-amber-800'}`}
            >
              About Us
            </a>
            {user?.role === 'admin' && (
              <a
                href="/admin"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/admin');
                }}
                className={`transition-colors font-bold ${isTransparent ? 'text-amber-300 hover:text-white' : 'text-amber-800 hover:text-stone-900'}`}
              >
                Admin Panel
              </a>
            )}
          </div>

          {/* Right Action Icons: Cart & Profile */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              type="button"
              className={`relative p-2 transition-colors ${
                isTransparent ? 'text-white hover:text-amber-200' : 'text-stone-700 hover:text-amber-800'
              }`}
              title="Shopping Bag"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {user && cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Account */}
            {user ? (
              <div className={`flex items-center gap-3 pl-3 border-l ${isTransparent ? 'border-white/20' : 'border-stone-200'}`}>
                <button
                  onClick={() => onNavigate && onNavigate('/profile')}
                  className={`w-8 h-8 rounded-full font-serif font-bold text-xs flex items-center justify-center border hover:scale-105 transition-all ${
                    isTransparent
                      ? 'bg-white/20 text-white border-white/30 backdrop-blur-xs'
                      : 'bg-stone-100 text-amber-800 border-amber-200'
                  }`}
                  title="My Profile & Addresses"
                >
                  {getInitials(user.name || user.email)}
                </button>
                <button
                  onClick={logout}
                  className={`text-xs transition-colors ${
                    isTransparent ? 'text-white/80 hover:text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  type="button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                type="button"
                className={`px-5 py-2.5 text-xs font-medium uppercase tracking-widest rounded-md transition-all shadow-xs ${
                  isTransparent
                    ? 'bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-xs'
                    : 'bg-stone-900 hover:bg-amber-900 text-white'
                }`}
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isTransparent ? 'text-white' : 'text-stone-700'}`}
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
          <div
            className={`md:hidden py-4 border-t flex flex-col gap-3 text-xs tracking-widest font-medium uppercase ${
              isTransparent
                ? 'border-white/20 text-white bg-stone-950/80 backdrop-blur-md px-4 rounded-b-xl'
                : 'border-stone-200 text-stone-700'
            }`}
          >
            <a href="/fragrances" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/fragrances'); }} className="hover:text-amber-300 py-1">
              Fragrances
            </a>
            <a href="/collections" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/collections'); }} className="hover:text-amber-300 py-1">
              Collections
            </a>
            <a href="/about" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/about'); }} className="hover:text-amber-300 py-1">
              About Us
            </a>
            {user && (
              <a href="/profile" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/profile'); }} className="hover:text-amber-300 py-1">
                My Profile & Addresses
              </a>
            )}
            {user?.role === 'admin' && (
              <a href="/admin" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('/admin'); }} className="hover:text-amber-300 py-1">
                Admin Panel
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

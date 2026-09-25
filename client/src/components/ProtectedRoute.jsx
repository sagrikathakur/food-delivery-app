import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles, onOpenAuthModal, title = "Member Access", description = "Please sign in to access this page." }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-stone-50 text-center">
        <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-stone-200/80 space-y-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center mx-auto border border-amber-200/60 shadow-xs">
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
              Sign In Required
            </span>
            <h2 className="text-2xl font-serif text-stone-900 font-bold">{title}</h2>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              {description} Sign in to your account or create a new account to proceed.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
              className="flex-1 py-3 px-6 bg-stone-900 hover:bg-black text-white text-xs font-medium uppercase tracking-widest rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenAuthModal && onOpenAuthModal('register')}
              className="flex-1 py-3 px-6 border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-medium uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles && allowedRoles.length > 0 && user.role && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-stone-50 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-stone-200/80 space-y-4">
          <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
          <p className="text-xs text-stone-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

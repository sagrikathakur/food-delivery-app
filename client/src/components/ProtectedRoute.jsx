import React from 'react';

const ProtectedRoute = ({
  user = null,
  requiredRole = null,
  children,
  onOpenAuthModal,
}) => {
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-800 mx-auto flex items-center justify-center font-serif text-2xl">
            ✨
          </div>
          <h2 className="text-xl font-serif text-stone-900">Sign In to Continue</h2>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Please log in to your Ocean Parfums account to view your saved fragrances, bespoke orders, and checkout details.
          </p>
          <button
            onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
            type="button"
            className="w-full py-3 bg-stone-900 hover:bg-amber-900 text-white font-medium text-xs uppercase tracking-widest rounded-md transition-colors shadow-sm"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-rose-100 p-8 text-center shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center font-serif text-2xl">
            🔒
          </div>
          <h2 className="text-xl font-serif text-stone-900">Access Restricted</h2>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            You do not have administrative privileges to access this area.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

import React, { useState } from 'react';

const Banner = ({
  title = '✨ Complimentary Fragrance Discovery Sample',
  subtitle = 'Receive a hand-poured 2ml discovery vial with every order above $100. Wrapped in signature gift box.',
  actionText = 'Explore Scents',
  onAction,
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white shadow-lg border border-amber-900/30">
      {/* Background Decorative Ambient Blur */}
      <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-amber-600/10 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-32 h-32 rounded-full bg-stone-500/10 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-300">
            Exclusive Offer
          </span>
          <h3 className="text-xl md:text-2xl font-serif text-amber-50">{title}</h3>
          {subtitle && <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {actionText && (
            <button
              onClick={onAction}
              type="button"
              className="px-5 py-2.5 rounded-md bg-amber-700 hover:bg-amber-600 text-white font-medium text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              {actionText}
            </button>
          )}

          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
              title="Dismiss"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React, { useState } from 'react';

const Banner = ({
  title = 'Complimentary Scent Sample',
  subtitle = 'Every order includes a 2ml sample vial so you can test the fragrance at home before opening your main bottle.',
  actionText = 'Explore Fragrances',
  onAction,
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden rounded-xl p-6 bg-stone-900 text-white shadow-sm border border-stone-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-300">
            Included With Every Order
          </span>
          <h3 className="text-lg md:text-xl font-serif text-stone-100">{title}</h3>
          {subtitle && <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {actionText && (
            <button
              onClick={onAction}
              type="button"
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {actionText}
            </button>
          )}

          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Dismiss"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;


import React from 'react';

const Loading = ({
  size = 'md', // sm, md, lg
  text = 'Preparing your fragrance collection...',
  fullPage = false,
  variant = 'spinner', // spinner, dots, skeleton
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-2',
    lg: 'w-12 h-12 border-2',
  };

  const containerClasses = fullPage
    ? 'fixed inset-0 bg-white/90 backdrop-blur-xs z-50 flex flex-col items-center justify-center'
    : 'py-12 flex flex-col items-center justify-center';

  if (variant === 'skeleton') {
    return (
      <div className="w-full space-y-4 p-4 animate-pulse">
        <div className="h-64 bg-stone-100 rounded-2xl w-full" />
        <div className="h-5 bg-stone-100 rounded w-2/3" />
        <div className="h-4 bg-stone-100 rounded w-1/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-stone-100 rounded w-20" />
          <div className="h-8 bg-stone-100 rounded w-24" />
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={containerClasses}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-800 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-800 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-800 animate-bounce" />
        </div>
        {text && <p className="text-xs font-light text-stone-500 tracking-wider mt-3">{text}</p>}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-stone-200 border-t-amber-800 rounded-full animate-spin`}
      />
      {text && <p className="text-xs font-serif text-stone-600 tracking-widest mt-3">{text}</p>}
    </div>
  );
};

export default Loading;

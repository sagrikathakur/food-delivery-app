import React from 'react';

const CheckoutSteps = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, label: 'Selection' },
    { id: 2, label: 'Atelier Shipping' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Confirmation' },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2 z-0" />
        
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs transition-all ${
                  isCompleted
                    ? 'bg-amber-800 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-white border-2 border-amber-800 text-amber-900 shadow-sm ring-4 ring-amber-100'
                    : 'bg-white border border-stone-300 text-stone-400'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span
                className={`text-[11px] font-medium tracking-wider uppercase mt-2 ${
                  isCurrent
                    ? 'text-amber-900 font-semibold'
                    : isCompleted
                    ? 'text-stone-800'
                    : 'text-stone-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;

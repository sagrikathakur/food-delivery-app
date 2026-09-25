import React from 'react';

const DeliveryOptions = ({
  selectedOption = 'standard',
  onSelectOption,
}) => {
  const options = [
    {
      id: 'standard',
      name: 'Complimentary Insured Shipping',
      time: '2-4 Business Days',
      price: 'Free',
      badge: 'Popular',
      desc: 'Hand-packed in signature gift box with insured transit.',
    },
    {
      id: 'express',
      name: 'Express Air Courier',
      time: 'Next Day Dispatch',
      price: '$18.00',
      badge: 'Fastest',
      desc: 'Priority handling & expedited climate-controlled delivery.',
    },
    {
      id: 'pickup',
      name: 'Boutique Collection',
      time: 'Ready in 2 Hours',
      price: 'Free',
      badge: null,
      desc: 'Collect directly at Ocean Parfums Flagship Atelier.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
      <h3 className="font-serif text-stone-900 text-lg font-bold">
        Shipping & Dispatch Option
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption && onSelectOption(opt.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-50 border-stone-900 shadow-xs font-semibold'
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-serif font-semibold text-stone-900 text-xs">{opt.name}</h4>
                  {opt.badge && (
                    <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 font-light mt-1">{opt.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="font-light text-stone-600">{opt.time}</span>
                <span className="font-serif font-bold text-stone-900">{opt.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryOptions;

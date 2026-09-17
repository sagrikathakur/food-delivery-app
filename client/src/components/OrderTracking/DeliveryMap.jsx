import React from 'react';

const DeliveryMap = ({
  carrier = {
    name: 'FedEx Luxury Courier',
    trackingNumber: 'FX-8891-2309-US',
    estDelivery: 'Friday by 4:00 PM',
    supportPhone: '+1 (800) 463-3339',
  },
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
      {/* Visual Shipment Map Graphic */}
      <div className="relative h-64 w-full bg-stone-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full stroke-amber-800" fill="none">
          <path d="M 60 180 Q 220 70, 380 130 T 560 90" strokeWidth="3" strokeDasharray="5 5" />
        </svg>

        {/* Atelier Origin Pin */}
        <div className="absolute left-10 bottom-10 bg-white text-stone-900 px-3 py-1.5 rounded-lg shadow-md border border-stone-200 flex items-center gap-1.5 text-xs font-serif">
          <span>🏬</span> Ocean Parfums Atelier
        </div>

        {/* Transit Flight Pin */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 bg-amber-800 text-white p-2.5 rounded-full shadow-lg border-2 border-white animate-pulse flex items-center justify-center">
          <span className="text-base">✈️</span>
        </div>

        {/* Destination Pin */}
        <div className="absolute right-10 top-10 bg-stone-900 text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 text-xs font-serif">
          <span>🏠</span> Delivery Address
        </div>
      </div>

      {/* Courier Details Card */}
      <div className="p-6 bg-white border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Courier Partner</span>
          <h4 className="font-serif font-bold text-stone-900 text-base mt-0.5">{carrier.name}</h4>
          <p className="text-xs text-stone-500 font-mono mt-0.5">Waybill: {carrier.trackingNumber}</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={`tel:${carrier.supportPhone}`}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-stone-900 hover:bg-amber-900 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>📦</span> Track Courier Live
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;

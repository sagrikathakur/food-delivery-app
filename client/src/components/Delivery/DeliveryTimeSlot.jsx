import React, { useState } from 'react';

const DeliveryTimeSlot = ({ onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState('asap');

  const slots = [
    { id: 'asap', label: 'Earliest Available Dispatch' },
    { id: 'slot-1', label: 'Tomorrow Morning (9 AM - 12 PM)' },
    { id: 'slot-2', label: 'Tomorrow Afternoon (1 PM - 5 PM)' },
    { id: 'slot-3', label: 'Scheduled Weekend Delivery' },
  ];

  const handleSelect = (id) => {
    setSelectedSlot(id);
    if (onSelectSlot) onSelectSlot(id);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
      <h3 className="font-serif text-stone-900 text-lg flex items-center gap-2">
        <span>📅</span> Preferred Dispatch Schedule
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => handleSelect(slot.id)}
              className={`px-4 py-3 rounded-xl border text-xs transition-all text-left flex items-center justify-between ${
                isSelected
                  ? 'bg-amber-50/60 border-amber-800 text-amber-950 font-semibold ring-1 ring-amber-800/20'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{slot.label}</span>
              {isSelected && <span className="text-amber-800 font-bold">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTimeSlot;

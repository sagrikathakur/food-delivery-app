import React, { useState } from 'react';
import DeliveryOptions from './DeliveryOptions';
import DeliveryTimeSlot from './DeliveryTimeSlot';
import DeliveryInstructions from './DeliveryInstructions';

const Delivery = ({ onProceedToPayment }) => {
  const [selectedOption, setSelectedOption] = useState('standard');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('asap');
  const [instructions, setInstructions] = useState({ preset: 'Signature Ribbon Box', giftNote: '' });

  const handleSave = () => {
    if (onProceedToPayment) {
      onProceedToPayment({
        deliveryOption: selectedOption,
        timeSlot: selectedTimeSlot,
        instructions,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-stone-900">Atelier Delivery & Packaging</h2>
          <p className="text-xs text-stone-500 font-light mt-0.5">Customize your shipping, gift wrapping, and handwritten note preferences.</p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="px-6 py-2.5 bg-stone-900 hover:bg-amber-900 text-white font-medium text-xs uppercase tracking-widest rounded-md transition-all shadow-sm active:scale-95"
        >
          Confirm & Proceed
        </button>
      </div>

      <DeliveryOptions
        selectedOption={selectedOption}
        onSelectOption={(opt) => setSelectedOption(opt)}
      />

      <DeliveryTimeSlot
        onSelectSlot={(slot) => setSelectedTimeSlot(slot)}
      />

      <DeliveryInstructions
        onChangeInstructions={(inst) => setInstructions(inst)}
      />
    </div>
  );
};

export default Delivery;

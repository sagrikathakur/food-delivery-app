import React, { useState } from 'react';

const DeliveryInstructions = ({ onChangeInstructions }) => {
  const [selectedTag, setSelectedTag] = useState('Signature Ribbon Box');
  const [giftNote, setGiftNote] = useState('');

  const giftPackagingPresets = [
    'Signature Ribbon Box',
    'Bespoke Wax-Sealed Envelope',
    'Discreet Parcel Packaging',
    'Eco-conscious Recycled Kraft',
  ];

  const handleTagClick = (preset) => {
    setSelectedTag(preset);
    if (onChangeInstructions) {
      onChangeInstructions({ preset, giftNote });
    }
  };

  const handleNoteChange = (e) => {
    setGiftNote(e.target.value);
    if (onChangeInstructions) {
      onChangeInstructions({ preset: selectedTag, giftNote: e.target.value });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
      <h3 className="font-serif text-stone-900 text-lg flex items-center gap-2">
        <span>🎀</span> Gift Wrapping & Calligraphy Card
      </h3>

      {/* Packaging Preset Selectors */}
      <div className="flex flex-wrap gap-2">
        {giftPackagingPresets.map((preset) => {
          const isSelected = selectedTag === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => handleTagClick(preset)}
              className={`px-3.5 py-1.5 rounded-md text-xs transition-all ${
                isSelected
                  ? 'bg-amber-800 text-white font-medium shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {preset}
            </button>
          );
        })}
      </div>

      {/* Handwritten Gift Note */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-widest mb-1">
          Complimentary Hand-written Gift Note (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Enter a message to be hand-written on an embossed card included with your perfume..."
          value={giftNote}
          onChange={handleNoteChange}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 text-xs focus:outline-none focus:bg-white focus:border-amber-800 transition-all font-serif"
        />
      </div>
    </div>
  );
};

export default DeliveryInstructions;

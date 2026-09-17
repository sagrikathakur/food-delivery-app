import React from 'react';

const AddressCard = ({
  address = {
    id: '1',
    type: 'Home Atelier',
    street: '742 Evergreen Terrace, Suite 12',
    city: 'Beverly Hills, CA 90210',
    phone: '+1 (310) 555-0199',
    isDefault: true,
  },
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(address)}
      className={`relative rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'bg-amber-50/50 border-amber-700 shadow-sm ring-1 ring-amber-700/20'
          : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
              isSelected
                ? 'border-amber-800 bg-amber-800 text-white'
                : 'border-stone-300 bg-white'
            }`}
          >
            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </span>
          <h4 className="font-serif font-bold text-stone-900 text-sm">{address.type}</h4>
          {address.isDefault && (
            <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
              Primary Address
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <button
              onClick={() => onEdit(address)}
              className="p-1.5 rounded text-stone-400 hover:text-stone-700 transition-colors"
              title="Edit address"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(address.id)}
              className="p-1.5 rounded text-stone-400 hover:text-rose-600 transition-colors"
              title="Delete address"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="pl-6 space-y-1 text-xs text-stone-600 font-light">
        <p className="font-medium text-stone-800">{address.street}</p>
        <p>{address.city}</p>
        <p className="text-stone-400 pt-1">{address.phone}</p>
      </div>
    </div>
  );
};

export default AddressCard;

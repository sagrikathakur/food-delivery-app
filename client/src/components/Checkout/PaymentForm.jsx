import React, { useState } from 'react';

const PaymentForm = ({ onSubmitPayment, isProcessing = false }) => {
  const [method, setMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitPayment) {
      onSubmitPayment({ method, ...cardData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      <h3 className="font-serif text-stone-900 text-lg font-bold">Payment Details</h3>

      {/* Payment Tabs */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'card', label: 'Credit / Debit Card' },
          { id: 'express', label: 'Apple Pay / GPay' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMethod(tab.id)}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              method === tab.id
                ? 'bg-stone-900 border-stone-900 text-white font-medium'
                : 'border-stone-200 hover:bg-stone-50 text-stone-600'
            }`}
          >
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {method === 'card' && (
        <div className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-widest mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="E.g. Eleanor Vance"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:border-stone-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-widest mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="•••• •••• •••• 4242"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:border-stone-900 font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-widest mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:border-stone-900 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-widest mb-1">
                Security Code (CVV)
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:border-stone-900 font-mono"
                required
              />
            </div>
          </div>
        </div>
      )}

      {method === 'express' && (
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-center space-y-2">
          <p className="text-xs font-medium text-stone-800">Express One-Touch Checkout</p>
          <p className="text-[11px] text-stone-500 font-light">Confirm payment via biometric verification upon placing order.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3.5 bg-stone-900 hover:bg-black disabled:opacity-50 text-white font-medium text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
      >
        {isProcessing ? 'Processing Bespoke Order...' : 'Place Fragrance Order'}
      </button>
    </form>
  );
};

export default PaymentForm;

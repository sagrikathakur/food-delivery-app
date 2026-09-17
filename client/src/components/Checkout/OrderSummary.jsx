import React from 'react';

const OrderSummary = ({
  items = [
    { id: '1', name: 'Oceanic Breeze Eau de Parfum', price: 135.00, quantity: 1, size: '100 ml' },
    { id: '2', name: 'Velvet Amber & Vanilla', price: 95.00, quantity: 1, size: '50 ml' },
  ],
  shippingFee = 0,
  taxRate = 0.08,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
      <h3 className="font-serif text-stone-900 text-lg pb-3 border-b border-stone-100 flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-xs font-sans text-stone-400 font-light">{items.length} items</span>
      </h3>

      {/* Items list */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-xs">
            <div>
              <p className="font-serif text-stone-900 font-medium">{item.name}</p>
              <p className="text-[11px] text-stone-400 font-light">Qty: {item.quantity} • {item.size}</p>
            </div>
            <span className="font-serif font-bold text-stone-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Complimentary Extras */}
      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900 font-light space-y-1">
        <p className="font-medium text-amber-950 flex items-center gap-1">
          <span>✨</span> Complimentary Add-ons Included:
        </p>
        <p>• 2ml Discovery Vial (Wild Iris)</p>
        <p>• Signature Luxury Gift Box & Ribbon</p>
      </div>

      {/* Financial breakdown */}
      <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600 font-light">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-stone-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Courier Shipping</span>
          <span className="text-emerald-700 font-medium">Complimentary</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Taxes</span>
          <span className="font-medium text-stone-800">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-base font-serif font-bold text-stone-900">
          <span>Total Amount</span>
          <span className="text-amber-900 text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

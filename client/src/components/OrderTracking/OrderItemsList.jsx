import React from 'react';

const OrderItemsList = ({
  items = [
    { id: '1', name: 'Oceanic Breeze Eau de Parfum', price: 135.00, quantity: 1, size: '100 ml' },
    { id: '2', name: 'Velvet Amber & Vanilla', price: 95.00, quantity: 1, size: '50 ml' },
  ],
  deliveryAddress = '742 Evergreen Terrace, Suite 12, Beverly Hills, CA 90210',
  paymentMethod = 'Credit Card (••4242)',
  subtotal = 230.00,
  tax = 18.40,
}) => {
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      <h3 className="font-serif text-stone-900 text-lg flex items-center gap-2">
        <span>📄</span> Invoice & Receipt
      </h3>

      {/* Address & Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100 text-xs">
        <div>
          <span className="font-semibold text-stone-700 block mb-1">Shipping Address:</span>
          <p className="text-stone-600 font-light leading-relaxed">{deliveryAddress}</p>
        </div>
        <div>
          <span className="font-semibold text-stone-700 block mb-1">Payment Method:</span>
          <p className="text-stone-600 font-light">{paymentMethod}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
            Payment Settled
          </span>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="space-y-3">
        <h4 className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Fragrance Items</h4>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-xs py-1.5 border-b border-stone-100 last:border-none">
            <div>
              <p className="font-serif text-stone-900 font-medium">{item.name}</p>
              <p className="text-[11px] text-stone-400 font-light">Qty: {item.quantity} • {item.size}</p>
            </div>
            <span className="font-serif font-bold text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600 font-light">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Insured Shipping</span>
          <span className="text-emerald-700 font-medium">Complimentary</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-serif font-bold text-stone-900 border-t border-stone-200 pt-2 mt-2">
          <span>Total Paid</span>
          <span className="text-amber-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsList;

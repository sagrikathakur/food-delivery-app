import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckoutPage({ cartItems = [], onOrderCompleted }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryOption: 'standard', // 'standard' or 'express'
  });

  const defaultItems = [
    { id: '1', name: 'Oceanic Breeze Eau de Parfum', price: 135.00, quantity: 1, size: '100 ml', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300' },
    { id: '2', name: 'Velvet Amber & Vanilla', price: 95.00, quantity: 1, size: '50 ml', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=300' },
  ];

  const checkoutItems = cartItems.length > 0 ? cartItems : defaultItems;

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shippingFee = formData.deliveryOption === 'express' ? 12.00 : 0.00;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      toast.success('Order placed successfully!');
      if (onOrderCompleted) {
        onOrderCompleted({ items: checkoutItems, formData, total, paymentMethod: 'Cash on Delivery' });
      }
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 pt-28 pb-20 px-4">
        <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mx-auto border border-stone-200 font-bold text-xl">
            ✓
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-900 font-semibold">Order Confirmed</span>
            <h1 className="text-2xl font-serif text-stone-900 font-bold">Thank You For Your Order</h1>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Your order has been placed with Cash on Delivery (COD). You will pay <span className="font-semibold text-stone-900">${total.toFixed(2)}</span> upon delivery.
            </p>
          </div>
          <button
            onClick={() => navigate('/tracking')}
            className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Track Order Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Simple Header */}
        <div className="border-b border-stone-200 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-900 font-semibold">Checkout</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">Shipping & Payment</h1>
          </div>
          <button
            onClick={() => navigate('/fragrances')}
            className="text-xs text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1 cursor-pointer"
          >
            &larr; Return to Shopping
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Contact & Shipping Details */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                1. Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Sagrika Thakur"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="text-xs space-y-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sagrika@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="House / Flat / Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Postal / Pincode</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Options */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                2. Delivery Options
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  formData.deliveryOption === 'standard' ? 'border-stone-900 bg-stone-50 font-semibold' : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={formData.deliveryOption === 'standard'}
                      onChange={handleInputChange}
                      className="accent-stone-900"
                    />
                    <div>
                      <span className="block font-serif text-stone-900 text-sm">Standard Delivery</span>
                      <span className="text-[11px] text-stone-500 font-light">3-5 Business Days</span>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold">Free</span>
                </label>

                <label className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  formData.deliveryOption === 'express' ? 'border-stone-900 bg-stone-50 font-semibold' : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="express"
                      checked={formData.deliveryOption === 'express'}
                      onChange={handleInputChange}
                      className="accent-stone-900"
                    />
                    <div>
                      <span className="block font-serif text-stone-900 text-sm">Express Courier</span>
                      <span className="text-[11px] text-stone-500 font-light">1-2 Business Days</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">$12.00</span>
                </label>
              </div>
            </div>

            {/* 3. Payment Method: Cash on Delivery (COD) Only */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                3. Payment Method
              </h2>

              <div className="p-4 rounded-xl border border-stone-900 bg-stone-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="block font-semibold text-stone-900 text-sm">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-stone-500 font-light">Pay with cash when your package is delivered.</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-stone-200">
                  Active
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Side Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-5 sticky top-24">
            <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 flex justify-between items-center">
              <span>Order Summary</span>
              <span className="text-xs font-sans text-stone-500 font-normal">{checkoutItems.length} items</span>
            </h2>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-stone-100">
              {checkoutItems.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-serif font-semibold text-stone-900">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">Qty: {item.quantity || 1} • {item.size}</p>
                  </div>
                  <span className="font-serif font-bold text-stone-900">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-stone-900">{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-base font-serif font-bold text-stone-900">
                <span>Total Pay on Delivery</span>
                <span className="text-amber-900 text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md disabled:opacity-50"
            >
              {isProcessing ? 'Placing Order...' : 'Place Order with Cash on Delivery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

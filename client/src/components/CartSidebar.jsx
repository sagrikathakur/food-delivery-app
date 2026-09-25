import React, { useState } from 'react';

const CartSidebar = ({
  isOpen = false,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onOpenAuthModal,
  user = null,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12.00;
  const total = Math.max(0, subtotal + shipping - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'OCEAN10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.trim().length > 0) {
      alert('Invalid promo code. Try "OCEAN10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
            <div>
              <h2 className="text-lg font-serif text-stone-900">Your Shopping Bag</h2>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                {items.length} {items.length === 1 ? 'fragrance' : 'fragrances'} selected
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Guest User Banner if not logged in */}
          {!user && (
            <div className="bg-amber-50/80 border-b border-amber-200/60 p-4 px-6 flex items-center justify-between gap-3 text-xs text-amber-950">
              <div className="space-y-0.5">
                <p className="font-medium">Have an account?</p>
                <p className="text-[11px] text-amber-800 font-light">Sign in to save your bag and access member perks.</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenAuthModal) onOpenAuthModal('login');
                }}
                className="px-3 py-1.5 bg-amber-800 hover:bg-black text-white rounded-md text-[11px] font-medium shrink-0 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-6">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto border border-stone-200/60 text-stone-400">
                  <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-serif text-stone-900 font-semibold">
                    Your Shopping Bag is empty
                  </h3>
                  <p className="text-xs text-stone-500 font-light max-w-xs mx-auto leading-relaxed">
                    Explore our fragrance collection to add scents to your bag.
                  </p>
                </div>

                {!user && (
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenAuthModal) onOpenAuthModal('login');
                      }}
                      className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black text-white font-medium text-xs rounded-lg transition-all shadow-xs cursor-pointer"
                    >
                      Sign in to your account
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenAuthModal) onOpenAuthModal('register');
                      }}
                      className="w-full py-2.5 px-4 border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-xs rounded-lg transition-all cursor-pointer"
                    >
                      Sign up now
                    </button>
                  </div>
                )}
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-white hover:border-stone-300 transition-all"
                >
                  <div className="w-20 h-20 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden shrink-0 border border-stone-200/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-stone-900 text-sm line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem && onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          type="button"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">{item.size}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif font-bold text-stone-900 text-sm">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-100 text-xs transition-colors cursor-pointer"
                          type="button"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 text-xs font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-100 text-xs transition-colors cursor-pointer"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/80 space-y-4">
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. OCEAN10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md text-xs border border-stone-200 bg-white focus:outline-none focus:border-amber-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-md text-xs uppercase font-medium tracking-wider hover:bg-black transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Complimentary Gift Box</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-stone-900">
                    {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-serif font-bold text-stone-900 border-t border-stone-200 pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-amber-900 text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                type="button"
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;

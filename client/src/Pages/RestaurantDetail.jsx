import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RestaurantDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');

  const restaurant = {
    name: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Le Gourmet Bistro',
    cuisine: 'French Fine Dining',
    rating: 4.9,
    reviewsCount: 128,
    address: '142 Grand Avenue, Downtown Center',
    price: '$$$$',
    hours: '5:00 PM - 11:00 PM',
    description: 'Experience authentic French culinary art with contemporary touches. Prepared by award-winning chefs using local organic ingredients.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    menuItems: [
      { id: 1, name: 'Filet Mignon au Poivre', price: '$48', desc: 'Prime beef tenderloin, green peppercorn sauce, truffle puree.' },
      { id: 2, name: 'Pan-Seared Duck Breast', price: '$42', desc: 'Spiced honey glaze, roasted beets, blackberry reduction.' },
      { id: 3, name: 'Lobster Bisque', price: '$24', desc: 'Maine lobster, cognac cream, fresh chives, tarragon oil.' },
      { id: 4, name: 'Soufflé au Chocolat', price: '$18', desc: 'Valrhona dark chocolate, Grand Marnier ice cream.' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#121313] text-stone-100 font-sans pb-16">
      {/* Hero Banner */}
      <div className="relative h-80 sm:h-96 w-full">
        <img src={restaurant.heroImage} alt={restaurant.name} className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121313] via-transparent to-black/40" />
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {restaurant.cuisine}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mt-2">{restaurant.name}</h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 flex items-center gap-2">
              <span className="text-amber-400 font-bold">★ {restaurant.rating}</span> ({restaurant.reviewsCount} reviews) • {restaurant.address}
            </p>
          </div>
          <button
            onClick={() => navigate(`/booking/${slug || 'le-gourmet-bistro'}`)}
            className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Book A Table Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-white/10 gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('menu')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'menu' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Chef's Menu
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Overview & Details
            </button>
          </div>

          {activeTab === 'menu' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-white">Signature Dishes</h3>
              <div className="grid grid-cols-1 gap-4">
                {restaurant.menuItems.map((item) => (
                  <div key={item.id} className="bg-[#1a1c1c] p-4 rounded-xl border border-white/10 flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <span className="text-xs text-amber-400 font-mono font-bold">{item.price}</span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toast.success(`Added ${item.name} to order!`)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-amber-400 text-xs rounded-lg border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1c1c] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold font-serif text-white">About the Restaurant</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{restaurant.description}</p>
              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10 text-stone-400">
                <div>
                  <span className="block text-stone-500">Opening Hours</span>
                  <span className="text-white font-medium">{restaurant.hours}</span>
                </div>
                <div>
                  <span className="block text-stone-500">Price Category</span>
                  <span className="text-white font-medium">{restaurant.price}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reservation Sidebar */}
        <div className="bg-[#1a1c1c] p-6 rounded-2xl border border-white/10 h-fit space-y-6">
          <h3 className="text-base font-bold font-serif text-white">Quick Table Booking</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-400 mb-1">Guests</label>
              <select className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:outline-none">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6 Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Date</label>
              <input type="date" defaultValue="2026-09-26" className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:outline-none" />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Time Slot</label>
              <select className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:outline-none">
                <option>7:00 PM</option>
                <option>7:30 PM</option>
                <option>8:00 PM</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => navigate(`/booking/${slug || 'le-gourmet-bistro'}`)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
}

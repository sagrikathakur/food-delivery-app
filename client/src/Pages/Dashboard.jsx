import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockBookings = [
  {
    id: 'RES-89421',
    restaurant: 'Le Gourmet Bistro',
    date: '2026-09-26',
    time: '7:30 PM',
    guests: 2,
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'RES-77103',
    restaurant: 'Sakura Japanese Dining',
    date: '2026-09-18',
    time: '8:00 PM',
    guests: 4,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121313] text-stone-100 font-sans pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">User Dashboard</span>
            <h1 className="text-3xl font-bold font-serif text-white mt-1">My Reservations & Orders</h1>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
          >
            + New Reservation
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Total Bookings</span>
            <p className="text-2xl font-bold font-serif text-white">12</p>
          </div>
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Upcoming Reservations</span>
            <p className="text-2xl font-bold font-serif text-amber-400">1 Active</p>
          </div>
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Saved Favorites</span>
            <p className="text-2xl font-bold font-serif text-white">5 Places</p>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-serif text-white">Your Bookings</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockBookings.map((b) => (
              <div key={b.id} className="bg-[#1a1c1c] p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={b.image} alt={b.restaurant} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                  <div>
                    <h3 className="font-bold text-white text-base font-serif">{b.restaurant}</h3>
                    <p className="text-xs text-stone-400">{b.date} at {b.time} • {b.guests} Guests</p>
                    <span className="text-[10px] text-amber-400 font-mono mt-1 inline-block">ID: {b.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-stone-400 border border-white/10'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

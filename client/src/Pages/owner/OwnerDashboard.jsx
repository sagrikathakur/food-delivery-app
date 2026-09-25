import React, { useState } from 'react';
import toast from 'react-hot-toast';

const mockBookings = [
  { id: 'RES-89421', customer: 'John Doe', table: 'T-04', guests: 2, time: '7:30 PM', status: 'Confirmed' },
  { id: 'RES-89422', customer: 'Sarah Smith', table: 'T-02', guests: 4, time: '8:00 PM', status: 'Pending' },
  { id: 'RES-89423', customer: 'Michael Brown', table: 'T-08', guests: 6, time: '8:30 PM', status: 'Confirmed' },
];

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState(mockBookings);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking ${id} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-[#121313] text-stone-100 font-sans pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Management Portal
            </span>
            <h1 className="text-3xl font-bold font-serif text-white mt-2">Restaurant Owner Dashboard</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Today's Revenue</span>
            <p className="text-2xl font-bold font-serif text-amber-400">$3,420</p>
          </div>
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Bookings Today</span>
            <p className="text-2xl font-bold font-serif text-white">18 Tables</p>
          </div>
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Active Guests</span>
            <p className="text-2xl font-bold font-serif text-white">42 People</p>
          </div>
          <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-xs text-stone-400">Average Rating</span>
            <p className="text-2xl font-bold font-serif text-amber-400">4.9 ★</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-[#1a1c1c] p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-lg font-bold font-serif text-white">Today's Table Reservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#121313] text-stone-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Table</th>
                  <th className="p-3">Guests</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5">
                    <td className="p-3 font-mono font-semibold text-amber-400">{b.id}</td>
                    <td className="p-3 font-medium text-white">{b.customer}</td>
                    <td className="p-3">{b.table}</td>
                    <td className="p-3">{b.guests} Guests</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleStatusChange(b.id, 'Confirmed')}
                        className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'Cancelled')}
                        className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function BookingConfirmation() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('2026-09-26');
  const [time, setTime] = useState('19:30');
  const [specialRequest, setSpecialRequest] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setConfirmed(true);
    toast.success('Reservation confirmed successfully!');
  };

  return (
    <div className="min-h-screen bg-[#121313] text-stone-100 font-sans pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Table Reservation
          </span>
          <h1 className="text-3xl font-bold font-serif text-white">
            {confirmed ? 'Booking Confirmed!' : 'Confirm Reservation Details'}
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm">
            {slug ? slug.replace(/-/g, ' ').toUpperCase() : 'LE GOURMET BISTRO'}
          </p>
        </div>

        {confirmed ? (
          <div className="bg-[#1a1c1c] p-8 rounded-2xl border border-amber-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white font-serif">Reservation Code: #RES-89421</h2>
              <p className="text-xs text-stone-400">A confirmation email and SMS have been sent to your account.</p>
            </div>
            <div className="bg-[#121313] p-4 rounded-xl border border-white/10 text-xs space-y-2 text-left">
              <div className="flex justify-between text-stone-300"><span>Guests:</span><span className="font-semibold text-white">{guests} People</span></div>
              <div className="flex justify-between text-stone-300"><span>Date:</span><span className="font-semibold text-white">{date}</span></div>
              <div className="flex justify-between text-stone-300"><span>Time:</span><span className="font-semibold text-white">{time} PM</span></div>
              {specialRequest && <div className="flex justify-between text-stone-300"><span>Notes:</span><span className="font-semibold text-white">{specialRequest}</span></div>}
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
            >
              View My Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="bg-[#1a1c1c] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="4">4 People</option>
                  <option value="6">6 People</option>
                  <option value="8">8+ People (Party)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none"
                >
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Seating Preference</label>
                <select className="w-full bg-[#121313] text-white p-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none">
                  <option>Main Dining Room</option>
                  <option>Patio / Outdoor</option>
                  <option>Bar Counter</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 text-xs mb-1">Special Requests (Optional)</label>
              <textarea
                rows="3"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Anniversaries, birthdays, dietary restrictions..."
                className="w-full bg-[#121313] text-white p-3 text-xs rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              Complete Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockRestaurants = [
  {
    id: 1,
    name: 'Le Gourmet Bistro',
    slug: 'le-gourmet-bistro',
    cuisine: 'French Fine Dining',
    rating: 4.9,
    priceRange: '$$$$',
    location: 'Downtown Center',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Outdoor Seating', 'Wine Bar', 'Michelin Guide'],
  },
  {
    id: 2,
    name: 'Sakura Japanese Dining',
    slug: 'sakura-japanese',
    cuisine: 'Japanese & Omakase',
    rating: 4.8,
    priceRange: '$$$',
    location: 'Westside Marina',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tags: ['Fresh Sushi', 'Private Dining', 'Cocktails'],
  },
  {
    id: 3,
    name: 'Toscana Trattoria',
    slug: 'toscana-trattoria',
    cuisine: 'Italian & Woodfired Pizza',
    rating: 4.7,
    priceRange: '$$',
    location: 'Old Town Square',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80',
    tags: ['Handmade Pasta', 'Family Friendly', 'Terrace'],
  },
  {
    id: 4,
    name: 'El Fuego Steakhouse',
    slug: 'el-fuego-steakhouse',
    cuisine: 'Steakhouse & Grill',
    rating: 4.9,
    priceRange: '$$$$',
    location: 'Financial District',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Dry-Aged Beef', 'Rooftop Bar', 'Live Jazz'],
  }
];

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const filteredRestaurants = mockRestaurants.filter((res) => {
    const matchesQuery = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || res.cuisine.includes(selectedCuisine);
    return matchesQuery && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-[#121313] text-stone-100 font-sans pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Discover & Reserve
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">Find Your Perfect Dining Experience</h1>
          <p className="text-stone-400 text-sm">Explore top-rated restaurants, curations, and table availability in real-time.</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#1a1c1c] p-4 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by restaurant, cuisine, or location..."
                className="w-full bg-[#121313] text-white placeholder-stone-500 pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-amber-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Cuisine Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'French', 'Japanese', 'Italian', 'Steakhouse'].map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCuisine === cuisine
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                    : 'bg-[#121313] text-stone-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredRestaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(`/restaurant/${res.slug}`)}
              className="group bg-[#1a1c1c] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer shadow-lg flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-amber-400 font-semibold border border-white/10">
                  ★ {res.rating}
                </span>
              </div>
              <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-serif">{res.name}</h3>
                    <span className="text-xs text-stone-400 font-mono">{res.priceRange}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{res.cuisine} • {res.location}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {res.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-[#121313] text-stone-400 px-2 py-0.5 rounded-md border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booking/${res.slug}`);
                  }}
                  className="w-full py-2.5 bg-[#1a1c1c] hover:bg-black text-amber-400 hover:text-white border border-amber-500/30 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

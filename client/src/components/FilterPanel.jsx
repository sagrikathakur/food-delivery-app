import React, { useState } from 'react';

const FilterPanel = ({
  onApplyFilters,
  onResetFilters,
}) => {
  const [selectedFamily, setSelectedFamily] = useState('All');
  const [selectedConcentration, setSelectedConcentration] = useState('All');
  const [priceRange, setPriceRange] = useState(250);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  const fragranceFamilies = ['All', 'Floral', 'Woody & Earthy', 'Amber & Spice', 'Fresh & Citrus', 'Aquatic'];
  const concentrations = ['All', 'Eau de Parfum', 'Eau de Toilette', 'Extrait de Parfum', 'Elixir'];
  const popularNotes = ['Bergamot', 'Vanilla', 'Sandalwood', 'Rose', 'Jasmine', 'Ambergris', 'Cedarwood', 'Oud'];

  const toggleNote = (note) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleReset = () => {
    setSelectedFamily('All');
    setSelectedConcentration('All');
    setPriceRange(250);
    setSelectedNotes([]);
    setSortBy('popular');
    if (onResetFilters) onResetFilters();
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        family: selectedFamily,
        concentration: selectedConcentration,
        maxPrice: priceRange,
        notes: selectedNotes,
        sortBy,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-800 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="font-serif text-stone-900 text-base">Filter Fragrances</h3>
        </div>

        <button
          onClick={handleReset}
          type="button"
          className="text-xs font-medium text-stone-400 hover:text-amber-800 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 text-xs focus:outline-none focus:border-amber-700"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">New Arrivals</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Fragrance Family */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Fragrance Family</label>
        <div className="flex flex-wrap gap-1.5">
          {fragranceFamilies.map((fam) => (
            <button
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              type="button"
              className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                selectedFamily === fam
                  ? 'bg-amber-800 text-white shadow-xs font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>
      </div>

      {/* Concentration */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Concentration</label>
        <div className="grid grid-cols-2 gap-2">
          {concentrations.map((conc) => (
            <button
              key={conc}
              onClick={() => setSelectedConcentration(conc)}
              type="button"
              className={`py-2 px-2.5 rounded-md text-xs border text-center transition-all ${
                selectedConcentration === conc
                  ? 'bg-amber-50 border-amber-600 text-amber-900 font-semibold'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {conc}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-semibold text-stone-700 uppercase tracking-widest">
          <span>Max Price</span>
          <span className="text-amber-800 font-serif font-bold text-sm">${priceRange}</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-amber-800 cursor-pointer"
        />
      </div>

      {/* Specific Scent Notes */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Key Scent Notes</label>
        <div className="grid grid-cols-2 gap-2">
          {popularNotes.map((note) => (
            <label
              key={note}
              className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none hover:text-stone-900"
            >
              <input
                type="checkbox"
                checked={selectedNotes.includes(note)}
                onChange={() => toggleNote(note)}
                className="w-3.5 h-3.5 rounded text-amber-800 border-stone-300 focus:ring-amber-700"
              />
              <span>{note}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        type="button"
        className="w-full py-3 bg-stone-900 hover:bg-amber-900 text-white font-medium text-xs uppercase tracking-widest rounded-md transition-colors shadow-sm"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;

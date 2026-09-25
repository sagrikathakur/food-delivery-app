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
    <div className="space-y-6 text-xs text-stone-700">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <h3 className="font-serif font-bold text-stone-900 text-base">Filters</h3>
        <button
          onClick={handleReset}
          type="button"
          className="text-xs text-stone-500 hover:text-stone-900 underline transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-800 uppercase tracking-wider block">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:outline-none focus:border-stone-900"
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
        <label className="text-[11px] font-semibold text-stone-800 uppercase tracking-wider block">Fragrance Family</label>
        <div className="space-y-1.5 pt-1">
          {fragranceFamilies.map((fam) => (
            <label
              key={fam}
              onClick={() => setSelectedFamily(fam)}
              className={`flex items-center justify-between py-1 px-2 rounded-md cursor-pointer transition-colors ${
                selectedFamily === fam
                  ? 'bg-stone-100 font-semibold text-stone-900'
                  : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              <span>{fam}</span>
              {selectedFamily === fam && <span className="text-stone-900 font-bold">✓</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Concentration */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-800 uppercase tracking-wider block">Concentration</label>
        <div className="space-y-1.5 pt-1">
          {concentrations.map((conc) => (
            <label
              key={conc}
              onClick={() => setSelectedConcentration(conc)}
              className={`flex items-center justify-between py-1 px-2 rounded-md cursor-pointer transition-colors ${
                selectedConcentration === conc
                  ? 'bg-stone-100 font-semibold text-stone-900'
                  : 'hover:bg-stone-50 text-stone-600'
              }`}
            >
              <span>{conc}</span>
              {selectedConcentration === conc && <span className="text-stone-900 font-bold">✓</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-semibold text-stone-800 uppercase tracking-wider">
          <span>Max Price</span>
          <span className="font-serif font-bold text-stone-900 text-sm">${priceRange}</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-stone-900 cursor-pointer"
        />
      </div>

      {/* Scent Notes */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-stone-800 uppercase tracking-wider block">Scent Notes</label>
        <div className="grid grid-cols-2 gap-2 pt-1">
          {popularNotes.map((note) => (
            <label
              key={note}
              className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer hover:text-stone-900"
            >
              <input
                type="checkbox"
                checked={selectedNotes.includes(note)}
                onChange={() => toggleNote(note)}
                className="w-3.5 h-3.5 rounded text-stone-900 border-stone-300 focus:ring-stone-900"
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
        className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;


import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cars, allBrands, allCategories, allFuelTypes } from '@/data';
import { Search, X, Heart, Users, Star, SlidersHorizontal } from 'lucide-react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Fleet() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark } = useTheme();
  const { isWishlisted, toggle: toggleWishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 3000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length) result = result.filter((c) => selectedBrands.includes(c.brand));
    if (selectedCategories.length) result = result.filter((c) => selectedCategories.includes(c.category));
    if (selectedFuel.length) result = result.filter((c) => selectedFuel.includes(c.fuelType));
    if (selectedSeats) result = result.filter((c) => c.seats === parseInt(selectedSeats));
    result = result.filter((c) => c.pricePerDay >= priceRange[0] && c.pricePerDay <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case 'price-desc': result.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [searchQuery, selectedBrands, selectedCategories, selectedFuel, selectedSeats, priceRange, sortBy]);

  const hasFilters = selectedBrands.length || selectedCategories.length || selectedFuel.length || selectedSeats || priceRange[0] > 200 || priceRange[1] < 3000;

  const toggleBrand = (b: string) => setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  const toggleCategory = (c: string) => setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleFuel = (f: string) => setSelectedFuel((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const clearAll = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedFuel([]);
    setSelectedSeats('');
    setPriceRange([200, 3000]);
    setSortBy('popular');
  };

  const inputCls = `px-3 py-2.5 rounded-xl text-sm focus:outline-none transition-all ${
    isDark
      ? 'bg-[#111] border border-[rgba(255,255,255,0.06)] text-[#9CA3AF] focus:border-[#006B5E]'
      : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#374151] focus:border-[#006B5E]'
  }`;

  const handleHeart = (e: React.MouseEvent, carId: string) => {
    e.stopPropagation();
    if (isSignedIn) toggleWishlist(carId);
  };

  return (
    <div className={`min-h-screen pt-20 overflow-x-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <img src="/images/hero-car.jpg" alt="Fleet" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" style={{ filter: isDark ? 'brightness(0.4) saturate(1.1)' : 'brightness(0.7)' }} />
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-[rgba(5,5,5,0.6)] to-[#050505]'
            : 'bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-white'
        }`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#006B5E] opacity-[0.07] blur-[150px]" />
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#006B5E]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">LUXDRIVE COLLECTION</span>
            <div className="h-px w-8 bg-[#006B5E]" />
          </div>
          <h1 className={`text-5xl md:text-7xl font-black tracking-tight leading-[0.95] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Our Exclusive <span style={{ color: '#006B5E' }}>Fleet</span>
          </h1>
          <p className={`mt-5 max-w-lg mx-auto leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
            {cars.length}+ meticulously maintained ultra-luxury vehicles awaiting your command.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={`sticky top-20 z-40 backdrop-blur-[16px] border-b ${
        isDark ? 'bg-[rgba(5,5,5,0.95)] border-[rgba(0,107,94,0.12)]' : 'bg-[rgba(255,255,255,0.92)] border-[rgba(0,107,94,0.12)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-[280px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search by brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputCls} w-full pl-10`}
              />
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                isDark
                  ? 'bg-[#111] border border-[rgba(255,255,255,0.06)] text-[#9CA3AF] hover:border-[rgba(0,107,94,0.35)]'
                  : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)]'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Desktop filters */}
            <div className="hidden md:flex items-center gap-3 flex-wrap">
              <select value={selectedBrands.join(',') || ''} onChange={(e) => { if (e.target.value) toggleBrand(e.target.value); }} className={inputCls}>
                <option value="">Brand</option>
                {allBrands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={selectedCategories.join(',') || ''} onChange={(e) => { if (e.target.value) toggleCategory(e.target.value); }} className={inputCls}>
                <option value="">Type</option>
                {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={selectedSeats} onChange={(e) => setSelectedSeats(e.target.value)} className={inputCls}>
                <option value="">Seats</option>
                {[2, 4, 5, 7].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <select value={selectedFuel.join(',') || ''} onChange={(e) => { if (e.target.value) toggleFuel(e.target.value); }} className={inputCls}>
                <option value="">Fuel</option>
                {allFuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <div className={inputCls}>${priceRange[0]} — ${priceRange[1]}</div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputCls}>
                <option value="popular">Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {hasFilters && (
              <button onClick={clearAll} className="text-sm text-[#006B5E] hover:text-[#008C79] transition-colors font-semibold">
                Clear All
              </button>
            )}
          </div>

          {/* Mobile filters panel */}
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="md:hidden mt-4 grid grid-cols-2 gap-3 overflow-hidden">
              <select value={selectedBrands[0] || ''} onChange={(e) => setSelectedBrands(e.target.value ? [e.target.value] : [])} className={inputCls}>
                <option value="">Brand</option>
                {allBrands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={selectedCategories[0] || ''} onChange={(e) => setSelectedCategories(e.target.value ? [e.target.value] : [])} className={inputCls}>
                <option value="">Type</option>
                {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={selectedSeats} onChange={(e) => setSelectedSeats(e.target.value)} className={inputCls}>
                <option value="">Seats</option>
                {[2, 4, 5, 7].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <select value={selectedFuel[0] || ''} onChange={(e) => setSelectedFuel(e.target.value ? [e.target.value] : [])} className={inputCls}>
                <option value="">Fuel</option>
                {allFuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`${inputCls} col-span-2`}>
                <option value="popular">Sort by Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </motion.div>
          )}

          {/* Active filter pills */}
          {hasFilters ? (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {selectedBrands.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,107,94,0.1)] text-[#006B5E] text-xs rounded-full border border-[rgba(0,107,94,0.3)] font-semibold">
                  {b}
                  <button onClick={() => toggleBrand(b)}><X size={12} /></button>
                </span>
              ))}
              {selectedCategories.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,107,94,0.1)] text-[#006B5E] text-xs rounded-full border border-[rgba(0,107,94,0.3)] font-semibold">
                  {c}
                  <button onClick={() => toggleCategory(c)}><X size={12} /></button>
                </span>
              ))}
              {selectedFuel.map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,107,94,0.1)] text-[#006B5E] text-xs rounded-full border border-[rgba(0,107,94,0.3)] font-semibold">
                  {f}
                  <button onClick={() => toggleFuel(f)}><X size={12} /></button>
                </span>
              ))}
              {selectedSeats && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,107,94,0.1)] text-[#006B5E] text-xs rounded-full border border-[rgba(0,107,94,0.3)] font-semibold">
                  {selectedSeats} Seats
                  <button onClick={() => setSelectedSeats('')}><X size={12} /></button>
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">
        <p className={`text-xs mb-6 uppercase tracking-widest font-semibold ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>
          Showing <span className="text-[#006B5E]">{filteredCars.length}</span> of {cars.length} vehicles
        </p>

        {filteredCars.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto rounded-full bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center mb-5">
              <Search size={40} className="text-[#006B5E]" />
            </div>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>No vehicles match your criteria</h3>
            <p className={`mt-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>Adjust your filters to discover more.</p>
            <button
              onClick={clearAll}
              className={`mt-6 px-6 py-3 border text-sm font-semibold rounded-full transition-all ${
                isDark
                  ? 'border-[rgba(255,255,255,0.08)] text-white hover:border-[#006B5E] hover:text-[#00B899]'
                  : 'border-[rgba(0,0,0,0.08)] text-[#0A0A0A] hover:border-[#006B5E] hover:text-[#006B5E]'
              }`}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, i) => {
              const wishlisted = isWishlisted(car.id);
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,107,94,0.35)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.18)]'
                      : 'bg-white border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.1)]'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => navigate(`/fleet/${car.id}`)}>
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.85)] via-[rgba(5,5,5,0.1)] to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#006B5E] text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-[0_2px_10px_rgba(0,107,94,0.4)]">
                      {car.category}
                    </span>
                    {/* Wishlist heart */}
                    {isSignedIn ? (
                      <button
                        onClick={(e) => handleHeart(e, car.id)}
                        className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                          wishlisted
                            ? 'bg-[#006B5E] text-white shadow-[0_4px_15px_rgba(0,107,94,0.5)]'
                            : 'bg-[rgba(0,0,0,0.5)] text-white hover:bg-[#006B5E]'
                        }`}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={15} className={wishlisted ? 'fill-white' : ''} />
                      </button>
                    ) : (
                      <SignInButton mode="modal">
                        <button onClick={(e) => e.stopPropagation()} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#006B5E] transition-all" aria-label="Sign in to wishlist">
                          <Heart size={15} />
                        </button>
                      </SignInButton>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{car.brand}</p>
                        <h3 className={`text-base font-bold mt-0.5 leading-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star size={11} className="text-[#006B5E] fill-[#006B5E]" />
                          <span className={`text-xs ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>{car.rating}</span>
                        </div>
                        <span className="text-xl font-black text-[#006B5E]">${car.pricePerDay}</span>
                        <p className={`text-[10px] ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>/day</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 mt-3 pb-4 border-b ${isDark ? 'border-[rgba(255,255,255,0.04)]' : 'border-[rgba(0,0,0,0.05)]'}`}>
                      <span className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}><Users size={11} /> {car.seats}</span>
                      <span className={`text-[11px] ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>{car.transmission}</span>
                      <span className={`text-[11px] ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>{car.fuelType}</span>
                      <span className={`text-[11px] ml-auto ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>{car.specs.power}</span>
                    </div>
                    <div className="pt-4 flex gap-2">
                      {isSignedIn ? (
                        <button
                          onClick={() => navigate(`/booking/${car.id}`)}
                          className="flex-1 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-xs font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,107,94,0.4)] transition-all"
                        >
                          Book Now
                        </button>
                      ) : (
                        <SignInButton mode="modal">
                          <button className="flex-1 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-xs font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,107,94,0.4)] transition-all">
                            Sign In to Book
                          </button>
                        </SignInButton>
                      )}
                      <button
                        onClick={() => navigate(`/fleet/${car.id}`)}
                        className={`px-4 py-2.5 border text-xs rounded-xl transition-all ${
                          isDark
                            ? 'border-[rgba(255,255,255,0.07)] text-[#9CA3AF] hover:border-[rgba(0,107,94,0.4)] hover:text-[#00B899]'
                            : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
                        }`}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

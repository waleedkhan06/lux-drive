import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { cars, testimonials, cities, fleetCategories } from '@/data';
import {
  Search, MapPin, Calendar, Users, ArrowRight, Heart,
  Shield, Headphones, Plane, Sparkles, Clock,
  Star, ChevronLeft, ChevronRight, Repeat
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';

/* ─── Hero Carousel Cars ─── */

const heroCars = [
  { name: 'Audi R8 GT', src: '/images/audi r8 gtbg.png', topSpeed: 320, accel: 3.3, carId: 'audi-r8-gt' },
  { name: 'Bugatti Chiron', src: '/images/bugatibg.png', topSpeed: 420, accel: 2.4, carId: 'bugatti-chiron' },
  { name: 'McLaren W1', src: '/images/mclerenwibg.png', topSpeed: 350, accel: 2.7, carId: 'mclaren-w1' },
  { name: 'Bentley Continental', src: '/images/bentlybg.png', topSpeed: 335, accel: 3.5, carId: 'bentley-continental-gt' },
  { name: 'Mercedes Maybach', src: '/images/mercmaybackbg.png', topSpeed: 209, accel: 4.4, carId: 'mercedes-maybach-s-class' },
  { name: 'Porsche Turbo S', src: '/images/porche turbobg.png', topSpeed: 330, accel: 2.6, carId: 'porsche-911-turbo-s' },
  { name: 'Toyota GR Supra', src: '/images/supragtbg.png', topSpeed: 250, accel: 3.9, carId: 'toyota-gr-supra' },
];

/* ─── Reusable Components ─── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-[#006B5E]" />
      <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">{children}</span>
    </div>
  );
}

function SectionTitle({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  const { isDark } = useTheme();
  return (
    <h2 className={`text-3xl md:text-5xl font-black tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-[#0A0A0A]'} ${centered ? 'text-center' : ''}`}>
      {children}
    </h2>
  );
}

function CarCard({ car, index }: { car: typeof cars[0]; index: number }) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark } = useTheme();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(car.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSignedIn) return;
    toggle(car.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }}
      onClick={() => navigate(`/fleet/${car.id}`)}
      className={`group rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer border ${
        isDark
          ? 'bg-[#111111] border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,107,94,0.4)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.15)]'
          : 'bg-white border-[rgba(0,0,0,0.06)] hover:border-[rgba(0,107,94,0.3)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.1)]'
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.9)] via-[rgba(5,5,5,0.2)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,107,94,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-[#006B5E] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
          {car.category}
        </span>
        {isSignedIn ? (
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
              wishlisted ? 'bg-[#006B5E] text-white' : 'bg-[rgba(0,0,0,0.5)] text-white hover:bg-[#006B5E]'
            }`}
          >
            <Heart size={15} className={wishlisted ? 'fill-white' : ''} />
          </button>
        ) : (
          <SignInButton mode="modal">
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#006B5E] transition-all duration-200"
            >
              <Heart size={15} />
            </button>
          </SignInButton>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className={i < car.rating ? 'text-[#00B899] fill-[#00B899]' : 'text-[#444]'} />
          ))}
          <span className="text-[10px] text-[#A0A0A0] ml-1">({car.reviewCount})</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>{car.brand}</p>
            <h3 className={`text-base font-bold mt-0.5 leading-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl font-black text-[#006B5E]">${car.pricePerDay}</span>
            <p className={`text-[10px] ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>/day</p>
          </div>
        </div>
        <div className={`flex items-center gap-3 mt-3 pb-4 border-b ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]'}`}>
          <span className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}><Users size={12} /> {car.seats}</span>
          <span className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>{car.transmission}</span>
          <span className={`text-[11px] ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>{car.fuelType}</span>
          <span className={`text-[11px] ml-auto ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>{car.specs.power}</span>
        </div>
        <div className="pt-4 flex gap-2">
          {isSignedIn ? (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/fleet/${car.id}`); }}
              className="flex-1 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-xs font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,107,94,0.4)] transition-all"
            >
              Book Now
            </button>
          ) : (
            <SignInButton mode="modal">
              <button onClick={(e) => e.stopPropagation()} className="flex-1 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-xs font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,107,94,0.4)] transition-all">
                Sign In to Book
              </button>
            </SignInButton>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/fleet/${car.id}`); }}
            className={`px-4 py-2.5 border text-xs rounded-xl transition-all ${
              isDark
                ? 'border-[rgba(255,255,255,0.08)] text-[#6B7280] hover:border-[rgba(0,107,94,0.4)] hover:text-[#006B5E]'
                : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
            }`}
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Sections ─── */

function Hero() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [activeCar, setActiveCar] = useState(0);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCar((prev) => (prev + 1) % heroCars.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentCar = heroCars[activeCar];

  const inputCls = `w-full pl-9 pr-3 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
    isDark
      ? 'bg-[#0E0E0E] border border-[rgba(255,255,255,0.07)] text-white placeholder:text-[#333] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.2)]'
      : 'bg-white border border-[rgba(0,0,0,0.1)] text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.15)]'
  }`;

  return (
    <section className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#006B5E] rounded-full blur-[200px] opacity-[0.08]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00B899] rounded-full blur-[160px] opacity-[0.05]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9F7] via-white to-[#E8F5F3]" />
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#006B5E] rounded-full blur-[200px] opacity-[0.06]" />
          </>
        )}
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(0,107,94,0.5)' : 'rgba(0,107,94,0.3)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(0,107,94,0.5)' : 'rgba(0,107,94,0.3)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Split layout: Text left, 3D right */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.2em] uppercase ${
                  isDark
                    ? 'border-[rgba(0,107,94,0.35)] bg-[rgba(0,107,94,0.1)] text-[#00B899]'
                    : 'border-[rgba(0,107,94,0.25)] bg-[rgba(0,107,94,0.07)] text-[#006B5E]'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B5E] animate-pulse" />
                  Premium Car Rental — Est. 2018
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
                className={`mt-6 text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.02em] ${
                  isDark ? 'text-white' : 'text-[#0A0A0A]'
                }`}
              >
                Drive
                <br />
                <span className="text-emerald-glow" style={{ color: '#006B5E' }}>Extraordinary</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className={`mt-6 text-base leading-relaxed max-w-md ${
                  isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'
                }`}
              >
                Experience the world's most exclusive fleet — Lamborghini, Ferrari, Bugatti, Rolls-Royce — delivered to your door.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate('/fleet')}
                  className="group px-8 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_35px_rgba(0,107,94,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 emerald-glow-sm"
                >
                  Explore Fleet
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className={`px-8 py-4 border text-sm font-bold rounded-full transition-all duration-300 ${
                    isDark
                      ? 'border-[rgba(255,255,255,0.12)] text-white hover:border-[rgba(0,107,94,0.5)] hover:text-[#00B899]'
                      : 'border-[rgba(0,0,0,0.12)] text-[#374151] hover:border-[rgba(0,107,94,0.4)] hover:text-[#006B5E]'
                  }`}
                >
                  Our Story
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mt-10 flex items-center gap-8"
              >
                {[
                  { num: '25+', label: 'Luxury Cars' },
                  { num: '4.9★', label: 'Avg Rating' },
                  { num: '10K+', label: 'Clients' },
                ].map((s, i) => (
                  <div key={s.label} className={`${i > 0 ? `pl-8 border-l ${isDark ? 'border-[rgba(255,255,255,0.07)]' : 'border-[rgba(0,0,0,0.07)]'}` : ''}`}>
                    <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{s.num}</p>
                    <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Car Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1.0 }}
              className="hidden lg:block relative h-[520px]"
            >
              {/* Clickable car name heading + counter */}
              <motion.div
                key={`name-${activeCar}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-2 left-2 z-20"
              >
                <p className="text-[10px] text-[#006B5E] uppercase tracking-[0.3em] font-bold mb-1">
                  Now Showing · {String(activeCar + 1).padStart(2, '0')} / {String(heroCars.length).padStart(2, '0')}
                </p>
                <Link
                  to={`/fleet/${currentCar.carId}`}
                  className={`group inline-flex items-center gap-2 text-lg font-black transition-colors ${
                    isDark ? 'text-white hover:text-[#00B899]' : 'text-[#0A0A0A] hover:text-[#006B5E]'
                  }`}
                >
                  {currentCar.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Carousel - cars with crossfade + slide animation, clickable */}
              <Link
                to={`/fleet/${currentCar.carId}`}
                className="absolute inset-0 flex items-center justify-center overflow-hidden cursor-pointer"
                aria-label={`View ${currentCar.name}`}
              >
                {heroCars.map((car, idx) => {
                  const isActive = idx === activeCar;
                  const isNext = idx === (activeCar + 1) % heroCars.length;
                  if (!isActive && !isNext) return null;
                  return (
                    <motion.img
                      key={car.name}
                      src={car.src}
                      alt={car.name}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding={idx === 0 ? 'sync' : 'async'}
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : 60,
                        scale: isActive ? 1 : 0.92,
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute w-full h-full object-contain"
                      style={{
                        filter: isDark
                          ? 'drop-shadow(0 20px 40px rgba(0,107,94,0.35)) drop-shadow(0 0 60px rgba(0,184,153,0.2)) brightness(1.05)'
                          : 'drop-shadow(0 25px 45px rgba(0,0,0,0.25))'
                      }}
                    />
                  );
                })}
              </Link>

              {/* Floating Top Speed badge - dynamic */}
              <motion.div
                key={`speed-${activeCar}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute top-8 right-2 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md z-10 pointer-events-none ${
                  isDark ? 'bg-[rgba(10,10,10,0.85)] border-[rgba(0,107,94,0.4)]' : 'bg-white/90 border-[rgba(0,107,94,0.2)] shadow-[0_8px_30px_rgba(0,107,94,0.15)]'
                }`}
              >
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest">Top Speed</p>
                <p className={`text-lg font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  {currentCar.topSpeed} <span className="text-[#006B5E] text-sm">km/h</span>
                </p>
              </motion.div>

              {/* Floating 0-100 badge - dynamic */}
              <motion.div
                key={`accel-${activeCar}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`absolute bottom-24 left-2 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md z-10 pointer-events-none ${
                  isDark ? 'bg-[rgba(10,10,10,0.85)] border-[rgba(0,107,94,0.4)]' : 'bg-white/90 border-[rgba(0,107,94,0.2)]'
                }`}
              >
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest">0 – 100</p>
                <p className={`text-lg font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  {currentCar.accel} <span className="text-[#006B5E] text-sm">sec</span>
                </p>
              </motion.div>

              {/* Prev / Next arrow buttons */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCar((prev) => (prev - 1 + heroCars.length) % heroCars.length);
                }}
                aria-label="Previous car"
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.7)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[#006B5E] hover:border-[#006B5E]'
                    : 'bg-white/80 border border-[rgba(0,0,0,0.08)] text-[#0A0A0A] hover:bg-[#006B5E] hover:text-white hover:border-[#006B5E]'
                } backdrop-blur-md shadow-lg`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCar((prev) => (prev + 1) % heroCars.length);
                }}
                aria-label="Next car"
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark
                    ? 'bg-[rgba(10,10,10,0.7)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[#006B5E] hover:border-[#006B5E]'
                    : 'bg-white/80 border border-[rgba(0,0,0,0.08)] text-[#0A0A0A] hover:bg-[#006B5E] hover:text-white hover:border-[#006B5E]'
                } backdrop-blur-md shadow-lg`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Progress bar at bottom */}
              <div className={`absolute bottom-2 left-12 right-12 h-0.5 rounded-full overflow-hidden z-20 ${
                isDark ? 'bg-white/10' : 'bg-black/10'
              }`}>
                <motion.div
                  key={activeCar}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-[#006B5E] to-[#00B899]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-12"
      >
        <div className={`backdrop-blur-[24px] rounded-3xl p-5 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border ${
          isDark
            ? 'bg-[rgba(8,8,8,0.95)] border-[rgba(0,107,94,0.18)]'
            : 'bg-white/95 border-[rgba(0,107,94,0.15)] shadow-[0_20px_60px_rgba(0,107,94,0.08)]'
        }`}>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-[#006B5E] to-transparent" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Find Your Vehicle</span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#006B5E] to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <label className={`block text-[9px] font-bold uppercase tracking-widest mb-1.5 pl-1 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>Pick-up Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
                <input type="text" placeholder="City or Airport" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="relative">
              <label className={`block text-[9px] font-bold uppercase tracking-widest mb-1.5 pl-1 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>Drop-off Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#008C79]" />
                <input type="text" placeholder="City or Airport" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="relative">
              <label className={`block text-[9px] font-bold uppercase tracking-widest mb-1.5 pl-1 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>Pick-up Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="relative">
              <label className={`block text-[9px] font-bold uppercase tracking-widest mb-1.5 pl-1 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>Return Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={`block text-[9px] font-bold uppercase tracking-widest pl-1 ${isDark ? 'text-[#555]' : 'text-[#9CA3AF]'}`}>Passengers</label>
              <div className="flex gap-2 flex-1">
                <div className="relative flex-1">
                  <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                  <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className={`${inputCls} appearance-none`}>
                    {[1,2,3,4,5,6,7].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => navigate('/fleet')}
                  className="px-4 py-3 bg-[#006B5E] hover:bg-[#008C79] text-white rounded-xl hover:shadow-[0_0_20px_rgba(0,107,94,0.5)] hover:scale-[1.05] active:scale-[0.95] transition-all duration-200"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BrandLogos() {
  const { isDark } = useTheme();
  const [activeLogo, setActiveLogo] = useState<number | null>(null);
  const logos = [
    { name: 'Ferrari', src: '/images/farari.png' },
    { name: 'Lamborghini', src: '/images/lamborghini.png' },
    { name: 'Bugatti', src: '/images/bugatilogo.png' },
    { name: 'Rolls-Royce', src: '/images/rolls.png' },
    { name: 'Bentley', src: '/images/bently.png' },
    { name: 'Porsche', src: '/images/porche.png' },
    { name: 'McLaren', src: '/images/mcleren.png' },
    { name: 'Aston Martin', src: '/images/astonmartin.png' },
    { name: 'Mercedes', src: '/images/mercedes.png' },
    { name: 'BMW', src: '/images/bmw.png' },
    { name: 'Audi', src: '/images/audi.png' },
    { name: 'Tesla', src: '/images/tesla.png' },
  ];
  const repeated = [...logos, ...logos, ...logos];

  return (
    <section className={`py-12 border-y overflow-hidden ${
      isDark ? 'bg-[#0A0A0A] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.05)]'
    }`}>
      <div className="relative">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${
          isDark ? 'bg-gradient-to-r from-[#0A0A0A] to-transparent' : 'bg-gradient-to-r from-[#F8F9FA] to-transparent'
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${
          isDark ? 'bg-gradient-to-l from-[#0A0A0A] to-transparent' : 'bg-gradient-to-l from-[#F8F9FA] to-transparent'
        }`} />

        <div className="flex gap-14 items-center animate-marquee" style={{ width: 'max-content' }}>
          {repeated.map((logo, i) => {
            const isActive = activeLogo === i;
            return (
              <div key={i} className="flex items-center gap-7 shrink-0">
                <button
                  onClick={() => setActiveLogo(isActive ? null : i)}
                  onMouseLeave={() => setActiveLogo(null)}
                  aria-label={logo.name}
                  className="group relative cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                    style={{
                      filter: isDark
                        ? isActive
                          ? 'brightness(1.15) contrast(1.05) saturate(1.1)' // Original colors enhanced when active
                          : 'brightness(1.1) contrast(1.0) saturate(0.9) opacity(0.85)' // Original colors with slight enhancement
                        : isActive
                          ? 'grayscale(0) opacity(1)' // Full color when active
                          : 'grayscale(1) opacity(0.7)', // Grayscale by default
                    }}
                  />
                </button>
                {/* Emerald glow dot separator */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#006B5E] shadow-[0_0_8px_rgba(0,107,94,0.6)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedFleet() {
  const { isDark } = useTheme();
  const featuredCars = cars.slice(0, 6);
  return (
    <section className={`py-24 lg:py-32 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <ScrollReveal><Eyebrow>OUR FLEET</Eyebrow></ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionTitle>Vehicles That Define<br />Excellence</SectionTitle>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <Link
              to="/fleet"
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors group border rounded-full px-6 py-2.5 ${
                isDark
                  ? 'text-[#9CA3AF] hover:text-[#00B899] border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,107,94,0.35)]'
                  : 'text-[#6B7280] hover:text-[#006B5E] border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,107,94,0.3)]'
              }`}
            >
              View All {cars.length}+ Cars
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, i: number) => <CarCard key={car.id} car={car} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { isDark } = useTheme();
  const steps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
    { num: '01', title: 'Browse & Select', desc: 'Explore our curated fleet of 25+ ultra-luxury vehicles and find your perfect match.', icon: Search },
    { num: '02', title: 'Book Online', desc: 'Reserve in minutes with our streamlined, secure booking process.', icon: Calendar },
    { num: '03', title: 'We Deliver', desc: 'Your immaculately prepared vehicle arrives at your location on time.', icon: Plane },
    { num: '04', title: 'Drive & Enjoy', desc: 'Experience unmatched performance, luxury, and pure driving pleasure.', icon: Sparkles },
  ];
  return (
    <section className={`py-24 lg:py-32 border-y ${
      isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.04)]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Eyebrow>PROCESS</Eyebrow>
            <SectionTitle centered>Four Steps to Extraordinary</SectionTitle>
            <p className={`mt-5 max-w-md mx-auto ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>Seamless from first click to final mile.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={i * 0.12}>
                <div className={`relative group p-6 rounded-2xl border transition-all duration-500 ${
                  isDark
                    ? 'border-[rgba(255,255,255,0.05)] bg-[#0F0F0F] hover:border-[rgba(0,107,94,0.3)] hover:bg-[#111]'
                    : 'border-[rgba(0,0,0,0.06)] bg-white hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
                }`}>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#006B5E] to-transparent z-10" />
                  )}
                  <span className="text-5xl font-black text-[#006B5E] opacity-15 leading-none">{step.num}</span>
                  <div className="mt-4 w-14 h-14 rounded-2xl border border-[rgba(0,107,94,0.2)] bg-[rgba(0,107,94,0.06)] flex items-center justify-center group-hover:border-[rgba(0,107,94,0.5)] group-hover:bg-[rgba(0,107,94,0.12)] transition-all duration-300">
                    <Icon size={24} className="text-[#006B5E]" />
                  </div>
                  <h4 className={`mt-5 text-base font-bold ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>{step.title}</h4>
                  <p className={`mt-2 text-sm leading-relaxed ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>{step.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { isDark } = useTheme();
  const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Repeat, title: 'Unlimited Kilometers', desc: 'Drive without boundaries. No mileage restrictions on any rental.' },
    { icon: Shield, title: 'Full Insurance Coverage', desc: 'Comprehensive protection included. Travel with total peace of mind.' },
    { icon: Headphones, title: '24/7 Concierge Support', desc: 'Round-the-clock assistance for any need, anywhere, anytime.' },
    { icon: Plane, title: 'Airport Delivery', desc: 'Your car awaits at arrivals. Seamless transition from flight to drive.' },
    { icon: Sparkles, title: 'Immaculate Condition', desc: 'Every vehicle detailed and inspected before each rental.' },
    { icon: Clock, title: 'Flexible Duration', desc: 'Rent for a day, a week, or months. Your schedule, your rules.' },
  ];
  return (
    <section className={`py-24 lg:py-32 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <Eyebrow>WHY LUXDRIVE</Eyebrow>
              <SectionTitle>The Emerald Standard in Luxury Rental</SectionTitle>
              <p className={`mt-6 leading-relaxed ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>
                We don't just rent cars. We curate extraordinary experiences. Every vehicle, every interaction, every mile is engineered to exceed expectations.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link
                to="/fleet"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] transition-all duration-300"
              >
                Browse Fleet <ArrowRight size={15} />
              </Link>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={b.title} delay={i * 0.08}>
                  <div className={`group flex gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                    isDark
                      ? 'border-[rgba(255,255,255,0.05)] bg-[#0F0F0F] hover:border-[rgba(0,107,94,0.25)] hover:bg-[#111]'
                      : 'border-[rgba(0,0,0,0.05)] bg-[#F8F9FA] hover:border-[rgba(0,107,94,0.2)] hover:shadow-[0_4px_20px_rgba(0,107,94,0.07)]'
                  }`}>
                    <div className="w-10 h-10 rounded-xl bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.15)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(0,107,94,0.15)] transition-colors">
                      <Icon size={18} className="text-[#006B5E]" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>{b.title}</h4>
                      <p className={`mt-1 text-xs leading-relaxed ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>{b.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className={`py-24 lg:py-32 border-y ${
      isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.04)]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Eyebrow>TESTIMONIALS</Eyebrow>
            <SectionTitle centered>What Our Clients Say</SectionTitle>
          </div>
        </ScrollReveal>
        <div className="relative overflow-hidden">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[
              testimonials[active],
              testimonials[(active+1)%testimonials.length],
              testimonials[(active+2)%testimonials.length],
            ].map((t, idx) => (
              <div key={t.id+idx} className={`rounded-2xl p-6 sm:p-8 border transition-all ${
                isDark
                  ? `bg-[#0F0F0F] ${idx===0?'border-[rgba(0,107,94,0.3)]':'border-[rgba(255,255,255,0.05)]'}`
                  : `bg-white ${idx===0?'border-[rgba(0,107,94,0.2)] shadow-[0_4px_20px_rgba(0,107,94,0.08)]':'border-[rgba(0,0,0,0.05)]'}`
              } ${idx===1?'hidden sm:block':''} ${idx===2?'hidden lg:block':''}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_,i) => <Star key={i} size={13} className={i<t.rating?'text-[#00B899] fill-[#00B899]':'text-[#333]'} />)}
                </div>
                <p className={`text-sm leading-relaxed italic ${ isDark ? 'text-[#C0C6C9]' : 'text-[#374151]' }`}>"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#006B5E] flex items-center justify-center text-white text-sm font-black">{t.author[0]}</div>
                  <div>
                    <p className={`text-sm font-bold ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>{t.author}</p>
                    <p className={`text-xs ${ isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]' }`}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => setActive((p)=>(p-1+testimonials.length)%testimonials.length)} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${ isDark ? 'border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:border-[#006B5E] hover:text-[#006B5E]' : 'border-[rgba(0,0,0,0.08)] text-[#9CA3AF] hover:border-[#006B5E] hover:text-[#006B5E]' }`}><ChevronLeft size={16} /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_,i: number) => <button key={i} onClick={()=>setActive(i)} className={`transition-all duration-300 rounded-full ${i===active?'w-6 h-2 bg-[#006B5E]':isDark?'w-2 h-2 bg-[#333] hover:bg-[#555]':'w-2 h-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'}`} />)}
            </div>
            <button onClick={() => setActive((p)=>(p+1)%testimonials.length)} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${ isDark ? 'border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:border-[#006B5E] hover:text-[#006B5E]' : 'border-[rgba(0,0,0,0.08)] text-[#9CA3AF] hover:border-[#006B5E] hover:text-[#006B5E]' }`}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularCities() {
  const { isDark } = useTheme();
  const displayCities = cities.slice(0, 4);
  return (
    <section className={`py-24 lg:py-32 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <ScrollReveal><Eyebrow>DESTINATIONS</Eyebrow></ScrollReveal>
            <ScrollReveal delay={0.1}><SectionTitle>Drive the World's<br />Finest Cities</SectionTitle></ScrollReveal>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayCities.map((city, i: number) => (
            <ScrollReveal key={city.id} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ aspectRatio: '4/5' }}>
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.95)] via-[rgba(5,5,5,0.3)] to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(0,107,94,0.15), transparent)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00B899]" />
                    <span className="text-[10px] font-bold text-[#00B899] uppercase tracking-widest">{city.carCount} Cars</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{city.name}</h3>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(0,107,94,0.3)] rounded-2xl transition-colors duration-400" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetCategories() {
  const { isDark } = useTheme();
  return (
    <section className={`py-24 lg:py-32 border-y ${
      isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.04)]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Eyebrow>CATEGORIES</Eyebrow>
            <SectionTitle centered>Explore By Category</SectionTitle>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fleetCategories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.07}>
              <Link to="/fleet" className="group block text-center">
                <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border transition-all duration-400 ${
                  isDark
                    ? 'border-[rgba(255,255,255,0.05)] group-hover:border-[rgba(0,107,94,0.4)] group-hover:shadow-[0_8px_30px_rgba(0,107,94,0.2)]'
                    : 'border-[rgba(0,0,0,0.06)] group-hover:border-[rgba(0,107,94,0.3)] group-hover:shadow-[0_8px_30px_rgba(0,107,94,0.12)]'
                }`}>
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.85)] to-transparent" />
                  <div className="absolute inset-0 bg-[rgba(0,107,94,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{cat.name}</h4>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark } = useTheme();
  return (
    <section className={`relative py-32 lg:py-40 overflow-hidden ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#006B5E] opacity-[0.06] blur-[150px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006B5E] to-transparent opacity-40" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <Eyebrow>READY TO DRIVE</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-6xl font-black leading-[1.05] ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}
          >
            Reserve Your Dream<br />
            <span style={{ color: '#006B5E' }}>Vehicle Today</span>
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className={`mt-6 max-w-lg mx-auto leading-relaxed ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>
            Join over 10,000 discerning clients who choose LUXDRIVE for the ultimate luxury car rental experience.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isSignedIn ? (
              <button
                onClick={() => navigate('/fleet')}
                className="group px-12 py-5 bg-[#006B5E] hover:bg-[#008C79] text-white text-base font-black rounded-full hover:shadow-[0_0_50px_rgba(0,107,94,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center gap-2"
              >
                Reserve Your Vehicle
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="group px-12 py-5 bg-[#006B5E] hover:bg-[#008C79] text-white text-base font-black rounded-full hover:shadow-[0_0_50px_rgba(0,107,94,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center gap-2">
                  Get Started — It's Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
            )}
            <a
              href="tel:+18005550000"
              className={`px-12 py-5 border text-base font-bold rounded-full transition-all duration-300 ${
                isDark
                  ? 'border-[rgba(0,107,94,0.3)] text-[#00B899] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.06)]'
                  : 'border-[rgba(0,107,94,0.25)] text-[#006B5E] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.05)]'
              }`}
            >
              Call Concierge
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */

export default function Home() {
  return (
    <div>
      <Hero />
      <BrandLogos />
      <FeaturedFleet />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <PopularCities />
      <FleetCategories />
      <CallToAction />
    </div>
  );
}
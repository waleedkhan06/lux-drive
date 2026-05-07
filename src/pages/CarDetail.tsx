import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { cars } from '@/data';
import {
  ChevronLeft, Heart, Star, Gauge, Fuel, Users, Settings,
  Check, Shield, ArrowRight
} from 'lucide-react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';

export default function CarDetail() {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark } = useTheme();
  const { isWishlisted, toggle: toggleWishlist } = useWishlist();
  const car = cars.find((c) => c.id === carId);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!car) {
    return (
      <div className={`min-h-screen pt-32 text-center ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <h1 className={`text-2xl ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Vehicle not found</h1>
        <Link to="/fleet" className="mt-4 inline-block text-[#006B5E] hover:text-[#008C79] hover:underline">
          Back to Fleet
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(car.id);
  const similarCars = cars.filter((c) => c.id !== car.id).slice(0, 4);
  const images = car.images || [car.image, car.image, car.image];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'features', label: 'Features' },
    { id: 'terms', label: 'Rental Terms' },
  ];

  const specsList = [
    { label: 'Acceleration', value: car.specs.acceleration, icon: Gauge },
    { label: 'Top Speed', value: car.specs.topSpeed, icon: Gauge },
    { label: 'Engine', value: car.specs.engine, icon: Settings },
    { label: 'Power', value: car.specs.power, icon: Gauge },
    { label: 'Seats', value: `${car.seats}`, icon: Users },
    { label: 'Transmission', value: car.transmission, icon: Settings },
    { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
    { label: 'Category', value: car.category, icon: Gauge },
  ];

  const handleWishlist = () => {
    if (isSignedIn) toggleWishlist(car.id);
  };

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
          <Link to="/" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#0A0A0A]'}`}>Home</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <Link to="/fleet" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#0A0A0A]'}`}>Fleet</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-[#006B5E] font-semibold">{car.name}</span>
        </div>
      </div>

      {/* Hero Gallery + Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={`relative aspect-[16/10] rounded-2xl overflow-hidden border ${
                isDark ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.05)]'
              }`}
            >
              <img src={images[activeImage]} alt={car.name} className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
            </motion.div>
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i ? 'border-[#006B5E] shadow-[0_0_12px_rgba(0,107,94,0.4)]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 bg-[#006B5E] text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-[0_2px_10px_rgba(0,107,94,0.35)]">
                {car.category}
              </span>
              <span className="px-3 py-1.5 bg-[rgba(0,184,153,0.1)] text-[#00B899] text-[10px] font-bold rounded-full border border-[rgba(0,184,153,0.25)]">
                Available Now
              </span>
            </div>

            <p className={`text-[11px] uppercase tracking-[0.2em] mb-1 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{car.brand}</p>
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < car.rating ? 'text-[#006B5E] fill-[#006B5E]' : isDark ? 'text-[#333]' : 'text-[#D1D5DB]'} />
                ))}
              </div>
              <span className={`text-sm ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>({car.reviewCount} reviews)</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <div>
                <span className="text-5xl font-black text-[#006B5E]">${car.pricePerDay}</span>
                <span className={`text-sm ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>/day</span>
              </div>
              {car.pricePerWeek && (
                <p className={`text-sm mb-1 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                  ${car.pricePerWeek.toLocaleString()}/week
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: Gauge, label: '0–100 km/h', value: car.specs.acceleration },
                { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
                { icon: Users, label: 'Seats', value: `${car.seats} Seats` },
                { icon: Settings, label: 'Transmission', value: car.transmission },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 p-3.5 rounded-2xl border ${
                  isDark ? 'bg-[rgba(0,107,94,0.05)] border-[rgba(0,107,94,0.15)]' : 'bg-[rgba(0,107,94,0.04)] border-[rgba(0,107,94,0.12)]'
                }`}>
                  <item.icon size={18} className="text-[#006B5E]" />
                  <div>
                    <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{item.label}</p>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {isSignedIn ? (
                <button
                  onClick={() => navigate(`/booking/${car.id}`)}
                  className="group flex-1 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-black rounded-2xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Reserve This Vehicle
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="group flex-1 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-black rounded-2xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                    Sign In to Reserve
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              )}
              {isSignedIn ? (
                <button
                  onClick={handleWishlist}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                    wishlisted
                      ? 'border-[#006B5E] bg-[rgba(0,107,94,0.15)] text-[#006B5E]'
                      : isDark
                      ? 'border-[rgba(255,255,255,0.07)] text-[#6B7280] hover:border-[rgba(0,107,94,0.4)] hover:text-[#006B5E]'
                      : 'border-[rgba(0,0,0,0.07)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} className={wishlisted ? 'fill-[#006B5E]' : ''} />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 ${
                    isDark ? 'border-[rgba(255,255,255,0.07)] text-[#6B7280] hover:border-[rgba(0,107,94,0.4)] hover:text-[#006B5E]' : 'border-[rgba(0,0,0,0.07)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
                  }`}>
                    <Heart size={20} />
                  </button>
                </SignInButton>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={`mt-16 border-y ${
        isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.05)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className={`flex items-center gap-1 border-b mb-8 overflow-x-auto ${
            isDark ? 'border-[rgba(255,255,255,0.06)]' : 'border-[rgba(0,0,0,0.06)]'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 pb-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab.id
                    ? isDark ? 'text-white' : 'text-[#0A0A0A]'
                    : isDark ? 'text-[#555] hover:text-[#9CA3AF]' : 'text-[#9CA3AF] hover:text-[#374151]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006B5E]" />}
              </button>
            ))}
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {activeTab === 'description' && (
              <div className="max-w-2xl">
                <p className={`leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>{car.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {specsList.map((spec) => (
                  <div key={spec.label} className={`flex items-center justify-between p-4 rounded-2xl border ${
                    isDark ? 'bg-[#0A0A0A] border-[rgba(255,255,255,0.05)]' : 'bg-white border-[rgba(0,0,0,0.05)]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <spec.icon size={16} className="text-[#006B5E]" />
                      <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{spec.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {car.features.map((feature) => (
                  <div key={feature} className={`flex items-center gap-3 p-3 rounded-xl border ${
                    isDark ? 'bg-[#0A0A0A] border-[rgba(255,255,255,0.04)]' : 'bg-white border-[rgba(0,0,0,0.05)]'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-[rgba(0,107,94,0.15)] border border-[rgba(0,107,94,0.25)] flex items-center justify-center shrink-0">
                      <Check size={11} className="text-[#006B5E]" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-[#C0C6C9]' : 'text-[#374151]'}`}>{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'terms' && (
              <div className="max-w-2xl space-y-3">
                {[
                  'Minimum driver age: 25 years with valid license',
                  'Security deposit required: $2,000 - $5,000 depending on vehicle',
                  'Unlimited kilometers included on all rentals',
                  'Full insurance coverage with $1,000 deductible',
                  'Late returns subject to additional daily charges',
                  'Fuel must be returned at same level as pickup',
                  'No smoking policy; cleaning fees apply for violations',
                  'Vehicle delivery available within 50km radius',
                ].map((term) => (
                  <div key={term} className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isDark ? 'bg-[#0A0A0A] border-[rgba(255,255,255,0.04)]' : 'bg-white border-[rgba(0,0,0,0.05)]'
                  }`}>
                    <Shield size={14} className="text-[#006B5E] mt-0.5 shrink-0" />
                    <span className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>{term}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Similar Cars */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#006B5E]" />
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>You May Also Like</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {similarCars.map((similar, i) => (
            <motion.div
              key={similar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-400 cursor-pointer hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,107,94,0.3)]'
                  : 'bg-white border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
              }`}
              onClick={() => navigate(`/fleet/${similar.id}`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={similar.image} alt={similar.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.85)] to-transparent" />
              </div>
              <div className="p-4">
                <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{similar.brand}</p>
                <h3 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{similar.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-black text-[#006B5E]">${similar.pricePerDay}</span>
                  <span className={`text-[10px] ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>/day</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

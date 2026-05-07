import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { cars } from '@/data';

export default function Wishlist() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark } = useTheme();
  const { wishlist, toggle } = useWishlist();

  const wislistedCars = cars.filter((c) => wishlist.includes(c.id));

  /* ── Not signed in ── */
  if (!isSignedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 pt-24 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center mx-auto mb-6">
            <Heart size={36} className="text-[#006B5E]" />
          </div>
          <h1 className={`text-3xl font-black mb-3 ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>Sign in to view Wishlist</h1>
          <p className={`mb-8 ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>
            Save your favourite luxury vehicles and access them anytime.
          </p>
          <SignInButton mode="modal">
            <button className="px-8 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all">
              Sign In
            </button>
          </SignInButton>
        </motion.div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (wislistedCars.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 pt-24 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="w-24 h-24 rounded-full bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.15)] flex items-center justify-center">
              <Heart size={40} className={isDark ? 'text-[#333]' : 'text-[#D1D5DB]'} />
            </div>
          </div>
          <h1 className={`text-3xl font-black mb-3 ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>Your wishlist is empty</h1>
          <p className={`mb-8 leading-relaxed ${ isDark ? 'text-[#6B7280]' : 'text-[#374151]' }`}>
            Browse our exclusive fleet and tap the heart icon to save vehicles you love.
          </p>
          <button
            onClick={() => navigate('/fleet')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] transition-all group"
          >
            Explore Fleet
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Wishlist grid ── */
  return (
    <div className={`min-h-screen pt-28 pb-24 ${ isDark ? 'bg-[#050505]' : 'bg-white' }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#006B5E]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Saved Vehicles</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}>
              My Wishlist
              <span className="ml-3 text-2xl font-bold text-[#006B5E]">({wislistedCars.length})</span>
            </h1>
            <button
              onClick={() => navigate('/fleet')}
              className={`hidden sm:inline-flex items-center gap-2 text-sm font-semibold border rounded-full px-5 py-2 transition-all group ${ isDark ? 'text-[#9CA3AF] border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,107,94,0.4)] hover:text-[#00B899]' : 'text-[#6B7280] border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]' }`}
            >
              Browse More
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {wislistedCars.map((car, i) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 ${ isDark ? 'bg-[#111111] border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,107,94,0.4)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.15)]' : 'bg-white border-[rgba(0,0,0,0.06)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_12px_50px_rgba(0,107,94,0.1)]' }`}
              >
                {/* Image */}
                <div
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/fleet/${car.id}`)}
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.85)] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#006B5E] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                    {car.category}
                  </span>
                  {/* Remove from wishlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(car.id); }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#006B5E] text-white flex items-center justify-center hover:bg-red-500 transition-colors group/btn"
                    title="Remove from wishlist"
                  >
                    <Heart size={15} className="fill-white group-hover/btn:fill-none transition-all" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-[10px] uppercase tracking-widest ${ isDark ? 'text-[#555]' : 'text-[#9CA3AF]' }`}>{car.brand}</p>
                      <h3
                        className={`text-base font-bold mt-0.5 leading-tight cursor-pointer hover:text-[#006B5E] transition-colors ${ isDark ? 'text-white' : 'text-[#0A0A0A]' }`}
                        onClick={() => navigate(`/fleet/${car.id}`)}
                      >
                        {car.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xl font-black text-[#006B5E]">${car.pricePerDay}</span>
                      <p className={`text-[10px] ${ isDark ? 'text-[#555]' : 'text-[#9CA3AF]' }`}>/day</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 mt-3 pt-3 border-t ${ isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]' }`}>
                    <span className={`text-[11px] ${ isDark ? 'text-[#555]' : 'text-[#9CA3AF]' }`}>{car.transmission}</span>
                    <span className={`text-[11px] ${ isDark ? 'text-[#555]' : 'text-[#9CA3AF]' }`}>{car.fuelType}</span>
                    <span className={`text-[11px] ml-auto ${ isDark ? 'text-[#555]' : 'text-[#9CA3AF]' }`}>{car.specs.power}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/booking/${car.id}`)}
                      className="flex-1 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-xs font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,107,94,0.4)] transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      Book Now
                    </button>
                    <button
                      onClick={() => toggle(car.id)}
                      className={`px-4 py-2.5 border text-xs rounded-xl transition-all flex items-center gap-1.5 ${ isDark ? 'border-[rgba(255,255,255,0.08)] text-[#6B7280] hover:border-red-500/40 hover:text-red-400' : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:border-red-400/40 hover:text-red-500' }`}
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

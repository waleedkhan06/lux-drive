import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Calendar, MapPin, ChevronRight, Clock, ShoppingBag, Sparkles, X, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cars } from '@/data';

type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  total: number;
  status: BookingStatus;
}

// Mock bookings using existing car IDs (first booking will use first car etc.)
const mockBookings: Booking[] = [
  {
    id: 'LXD-2026-78421',
    carId: cars[0]?.id ?? '1',
    pickupDate: '2026-05-15',
    returnDate: '2026-05-18',
    pickupLocation: 'New York – JFK Airport',
    total: 4350,
    status: 'upcoming',
  },
  {
    id: 'LXD-2026-65142',
    carId: cars[1]?.id ?? '2',
    pickupDate: '2026-05-08',
    returnDate: '2026-05-10',
    pickupLocation: 'Los Angeles – LAX',
    total: 2890,
    status: 'active',
  },
  {
    id: 'LXD-2025-31987',
    carId: cars[2]?.id ?? '3',
    pickupDate: '2025-12-22',
    returnDate: '2025-12-26',
    pickupLocation: 'Miami Beach',
    total: 5640,
    status: 'completed',
  },
  {
    id: 'LXD-2025-22155',
    carId: cars[3]?.id ?? '4',
    pickupDate: '2025-10-04',
    returnDate: '2025-10-06',
    pickupLocation: 'Las Vegas Strip',
    total: 1980,
    status: 'cancelled',
  },
];

const statusConfig: Record<BookingStatus, { label: string; color: string; bg: string; border: string }> = {
  upcoming: { label: 'Upcoming', color: 'text-[#006B5E]', bg: 'bg-[rgba(0,107,94,0.12)]', border: 'border-[rgba(0,107,94,0.3)]' },
  active: { label: 'Active', color: 'text-[#00B899]', bg: 'bg-[rgba(0,184,153,0.12)]', border: 'border-[rgba(0,184,153,0.3)]' },
  completed: { label: 'Completed', color: 'text-[#9CA3AF]', bg: 'bg-[rgba(156,163,175,0.12)]', border: 'border-[rgba(156,163,175,0.25)]' },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-[rgba(239,68,68,0.1)]', border: 'border-[rgba(239,68,68,0.25)]' },
};

function loadBookings(): Booking[] {
  try {
    const saved = JSON.parse(localStorage.getItem('luxdrive_bookings') || '[]') as Booking[];
    return [...saved, ...mockBookings];
  } catch {
    return mockBookings;
  }
}

export default function MyBookings() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);

  if (!isSignedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 pt-24 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.25)] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-[#006B5E]" />
          </div>
          <h1 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Sign in to view bookings</h1>
          <p className={`mb-8 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
            Manage all your reservations in one place — past, present, and future.
          </p>
          <SignInButton mode="modal">
            <button className="px-10 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all">
              Sign In
            </button>
          </SignInButton>
        </motion.div>
      </div>
    );
  }

  const cancelBooking = (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b);
    setBookings(updated);
    try {
      const savedIds = new Set(mockBookings.map((b) => b.id));
      const realOnly = updated.filter((b) => !savedIds.has(b.id));
      localStorage.setItem('luxdrive_bookings', JSON.stringify(realOnly));
    } catch {}
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);
  const counts = {
    all: bookings.length,
    upcoming: bookings.filter((b) => b.status === 'upcoming').length,
    active: bookings.filter((b) => b.status === 'active').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const filterTabs: { key: 'all' | BookingStatus; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
    { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className={`min-h-screen pt-28 pb-24 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#006B5E]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">My Account</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                {user?.firstName ? `${user.firstName}'s ` : 'My '}<span style={{ color: '#006B5E' }}>Bookings</span>
              </h1>
              <p className={`mt-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                Track and manage your reservations.
              </p>
            </div>
            <button
              onClick={() => navigate('/fleet')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,107,94,0.4)] transition-all group"
            >
              <Sparkles size={15} />
              New Booking
            </button>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className={`flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b ${isDark ? 'border-[rgba(255,255,255,0.06)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 whitespace-nowrap ${
                filter === tab.key
                  ? 'text-[#006B5E]'
                  : isDark ? 'text-[#6B7280] hover:text-[#9CA3AF]' : 'text-[#9CA3AF] hover:text-[#374151]'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filter === tab.key
                  ? 'bg-[#006B5E] text-white'
                  : isDark ? 'bg-[#1A1A1A] text-[#6B7280]' : 'bg-[#F3F4F6] text-[#9CA3AF]'
              }`}>
                {tab.count}
              </span>
              {filter === tab.key && (
                <motion.div layoutId="filterUnderline" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#006B5E]" />
              )}
            </button>
          ))}
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center mb-5">
              <AlertCircle size={36} className="text-[#006B5E]" />
            </div>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>No {filter === 'all' ? '' : filter} bookings</h3>
            <p className={`mt-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
              {filter === 'all' ? 'Time to plan your next luxury escape.' : `You have no ${filter} bookings.`}
            </p>
            <button
              onClick={() => navigate('/fleet')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all"
            >
              Browse Fleet
              <ChevronRight size={15} />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => {
              const car = cars.find((c) => c.id === booking.carId) ?? cars[0];
              const status = statusConfig[booking.status];
              const days = Math.max(1, Math.ceil((new Date(booking.returnDate).getTime() - new Date(booking.pickupDate).getTime()) / (1000 * 60 * 60 * 24)));

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`group rounded-2xl border overflow-hidden transition-all duration-400 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,107,94,0.3)] hover:shadow-[0_12px_40px_rgba(0,107,94,0.12)]'
                      : 'bg-white border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_12px_40px_rgba(0,107,94,0.1)]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-0">
                    {/* Image */}
                    <div className="relative h-44 md:h-auto overflow-hidden">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.7)] to-transparent md:bg-gradient-to-r" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide border ${status.color} ${status.bg} ${status.border}`}>
                        {status.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-5 md:p-6 flex flex-col gap-3">
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest font-mono ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{booking.id}</p>
                        <h3 className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h3>
                        <p className={`text-xs ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{car.brand} • {car.category}</p>
                      </div>

                      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#006B5E] shrink-0" />
                          <div>
                            <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Pickup</p>
                            <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{booking.pickupDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#006B5E] shrink-0" />
                          <div>
                            <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Duration</p>
                            <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{days} {days === 1 ? 'day' : 'days'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                          <MapPin size={14} className="text-[#006B5E] shrink-0" />
                          <div className="min-w-0">
                            <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Location</p>
                            <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{booking.pickupLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex md:flex-col items-stretch md:items-end justify-between md:justify-center gap-3 p-5 md:p-6 md:border-l ${isDark ? 'md:border-[rgba(255,255,255,0.05)]' : 'md:border-[rgba(0,0,0,0.05)]'}`}>
                      <div className="text-right">
                        <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Total</p>
                        <p className="text-2xl font-black text-[#006B5E]">${booking.total.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/fleet/${car.id}`)}
                          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                            isDark
                              ? 'border-[rgba(255,255,255,0.07)] text-[#9CA3AF] hover:border-[rgba(0,107,94,0.4)] hover:text-[#00B899]'
                              : 'border-[rgba(0,0,0,0.07)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
                          }`}
                        >
                          View Car
                        </button>
                        {booking.status === 'upcoming' && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className={`px-3 py-2 rounded-xl border transition-all ${
                              isDark ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-red-400/40 text-red-500 hover:bg-red-50'
                            }`}
                            aria-label="Cancel booking"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
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

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Heart } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/context/WishlistContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  const navBg = scrolled
    ? isDark
      ? 'rgba(5,5,5,0.95)'
      : 'rgba(255,255,255,0.95)'
    : 'transparent';

  const navBorder = scrolled
    ? isDark ? '1px solid rgba(0,107,94,0.2)' : '1px solid rgba(0,107,94,0.15)'
    : '1px solid transparent';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[105]"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          borderBottom: navBorder,
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/lux drive logo.png"
                alt="LuxDrive"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                width={36}
                height={36}
                className="h-9 w-9 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                style={{ filter: isDark ? 'brightness(1.1)' : 'none' }}
              />
              <span className={`text-xl font-black tracking-[0.15em] uppercase ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>LUX</span>
              <span className="text-xl font-black tracking-[0.15em] text-[#006B5E] uppercase">DRIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#006B5E] group-hover:scale-150 transition-transform duration-300" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-sm font-medium tracking-wide py-1 transition-colors duration-200 group ${
                      active
                        ? 'text-[#006B5E]'
                        : isDark ? 'text-[#9CA3AF] hover:text-white' : 'text-[#6B7280] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 w-full h-px bg-[#006B5E] transition-transform duration-300 origin-left"
                      style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#006B5E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-50" />
                  </Link>
                );
              })}
              {isSignedIn && (
                <Link
                  to="/my-bookings"
                  className={`text-sm font-medium tracking-wide py-1 transition-colors duration-200 ${
                    isDark ? 'text-[#9CA3AF] hover:text-[#006B5E]' : 'text-[#6B7280] hover:text-[#006B5E]'
                  }`}
                >
                  My Bookings
                </Link>
              )}
            </div>

            {/* Right side: theme toggle + wishlist + auth */}
            <div className="hidden md:flex items-center gap-2">

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-[rgba(0,107,94,0.1)] transition-colors group">
                <Heart
                  size={20}
                  className={wishlistCount > 0 ? 'text-[#006B5E] fill-[#006B5E]' : isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#006B5E] text-white text-[9px] font-black flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-[rgba(0,107,94,0.1)] ${
                  isDark ? 'text-[#9CA3AF] hover:text-[#00B899]' : 'text-[#6B7280] hover:text-[#006B5E]'
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Moon size={18} /> : <Sun size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Auth */}
              {isSignedIn ? (
                <>
                  <button
                    onClick={() => navigate('/fleet')}
                    className="ml-1 px-5 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(0,107,94,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Book Now
                  </button>
                  <span className="flex items-center">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-9 h-9 ring-2 ring-[#006B5E] ring-offset-1 ring-offset-transparent',
                          userButtonTrigger: 'flex items-center',
                        },
                      }}
                    />
                  </span>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                      isDark
                        ? 'text-[#9CA3AF] border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,107,94,0.5)] hover:text-white'
                        : 'text-[#374151] border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,107,94,0.4)] hover:text-[#006B5E]'
                    }`}>
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-5 py-2.5 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(0,107,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile icons */}
            <div className="md:hidden flex items-center gap-1">
              <Link to="/wishlist" className="relative p-2">
                <Heart size={20} className={wishlistCount > 0 ? 'text-[#006B5E] fill-[#006B5E]' : isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#006B5E] text-white text-[9px] font-black flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button onClick={toggleTheme} className={`p-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 transition-colors ${isDark ? 'text-[#9CA3AF] hover:text-white' : 'text-[#6B7280] hover:text-[#0A0A0A]'}`}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {scrolled && (
          <div className="h-px bg-gradient-to-r from-transparent via-[#006B5E] to-transparent opacity-30" />
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed inset-0 z-[110] flex flex-col overflow-x-hidden"
            style={{ background: isDark ? '#050505' : '#FFFFFF' }}
          >
            <div className={`flex items-center justify-between px-6 h-20 border-b ${isDark ? 'border-[rgba(255,255,255,0.06)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
              <span className="text-xl font-black tracking-[0.15em]">
                <span className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>LUX</span>
                <span className="text-[#006B5E]">DRIVE</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className={`p-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                <X size={26} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-8 gap-1 flex-1 overflow-y-auto">
              {[...navLinks, ...(isSignedIn ? [{ label: 'My Bookings', path: '/my-bookings' }, { label: 'Wishlist', path: '/wishlist' }] : [])].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 text-2xl font-bold border-b transition-colors ${
                      isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]'
                    } ${location.pathname === link.path ? 'text-[#006B5E]' : isDark ? 'text-white hover:text-[#00B899]' : 'text-[#0A0A0A] hover:text-[#006B5E]'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-6 pb-12 flex flex-col gap-3">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/fleet'); }}
                    className="flex-1 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-base font-bold rounded-2xl transition-colors"
                  >
                    Book a Car
                  </button>
                  <span className="flex items-center shrink-0">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-10 h-10 ring-2 ring-[#006B5E] ring-offset-1 ring-offset-transparent',
                          userButtonTrigger: 'flex items-center',
                        },
                      }}
                    />
                  </span>
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className={`w-full py-4 border text-base font-semibold rounded-2xl transition-all ${
                      isDark ? 'border-[rgba(255,255,255,0.15)] text-white hover:border-[#006B5E]' : 'border-[rgba(0,0,0,0.15)] text-[#0A0A0A] hover:border-[#006B5E]'
                    }`}>
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-base font-bold rounded-2xl transition-colors">
                      Get Started Free
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

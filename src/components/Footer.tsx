import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Heart, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`relative border-t ${
      isDark ? 'bg-[#070707] border-[rgba(255,255,255,0.05)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.06)]'
    }`}>
      {/* Top emerald accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#006B5E] to-transparent opacity-60" />

      {/* Decorative emerald glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#006B5E] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-4">
              <span className={`text-xl font-black tracking-[0.15em] uppercase ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>LUX</span>
              <span className="text-xl font-black tracking-[0.15em] text-[#006B5E] uppercase">DRIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00B899] ml-0.5 shadow-[0_0_8px_rgba(0,184,153,0.7)]" />
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#006B5E] mb-4">Drive Extraordinary</p>
            <p className={`text-sm leading-relaxed max-w-xs ${isDark ? 'text-[#6B7280]' : 'text-[#4B5563]'}`}>
              The world's most exclusive car rental experience. Handpicked luxury vehicles, delivered to your door.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark
                      ? 'bg-[#111] border border-[rgba(255,255,255,0.06)] text-[#6B7280] hover:border-[rgba(0,107,94,0.4)] hover:text-[#00B899] hover:bg-[rgba(0,107,94,0.08)]'
                      : 'bg-white border border-[rgba(0,0,0,0.06)] text-[#6B7280] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E] hover:bg-[rgba(0,107,94,0.04)]'
                  }`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-6 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Fleet', path: '/fleet' },
                { label: 'About', path: '/about' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Contact', path: '/contact' },
                { label: 'My Bookings', path: '/my-bookings' },
                { label: 'Wishlist', path: '/wishlist' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`text-sm transition-colors duration-200 flex items-center gap-2 group ${
                      isDark ? 'text-[#6B7280] hover:text-[#00B899]' : 'text-[#6B7280] hover:text-[#006B5E]'
                    }`}
                  >
                    <span className="w-3 h-px bg-[#006B5E] opacity-0 group-hover:opacity-100 group-hover:w-5 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-6 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Services
            </h4>
            <ul className="space-y-3">
              {['Airport Delivery', 'Hotel Pickup', 'Chauffeur Service', 'Long-term Rental', 'Corporate Accounts', 'Event Hire'].map((item) => (
                <li key={item}>
                  <span className={`text-sm transition-colors cursor-default ${isDark ? 'text-[#6B7280] hover:text-[#9CA3AF]' : 'text-[#6B7280] hover:text-[#374151]'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-6 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={13} className="text-[#006B5E]" />
                </div>
                <div>
                  <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${isDark ? 'text-[#444]' : 'text-[#9CA3AF]'}`}>Email</p>
                  <a href="mailto:concierge@luxdrive.com" className={`text-sm hover:text-[#006B5E] transition-colors ${isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>concierge@luxdrive.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={13} className="text-[#006B5E]" />
                </div>
                <div>
                  <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${isDark ? 'text-[#444]' : 'text-[#9CA3AF]'}`}>Phone</p>
                  <a href="tel:+18005555893" className={`text-sm hover:text-[#006B5E] transition-colors ${isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>+1 (800) 555-LUXE</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-[#006B5E]" />
                </div>
                <div>
                  <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${isDark ? 'text-[#444]' : 'text-[#9CA3AF]'}`}>Address</p>
                  <span className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>350 Fifth Ave, New York</span>
                </div>
              </li>
            </ul>

            {/* Newsletter mini-CTA */}
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#006B5E] hover:text-[#008C79] transition-colors group"
            >
              Get in touch
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-14 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.06)]'
        }`}>
          <p className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-[#3A3A3A]' : 'text-[#9CA3AF]'}`}>
            © {new Date().getFullYear()} <span className={isDark ? 'text-[#6B7280]' : 'text-[#374151]'}>LUXDRIVE</span>. Crafted with
            <Heart size={11} className="text-[#006B5E] fill-[#006B5E]" />
            for connoisseurs.
          </p>
          <div className="flex items-center gap-6">
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-xs transition-colors ${isDark ? 'text-[#3A3A3A] hover:text-[#9CA3AF]' : 'text-[#9CA3AF] hover:text-[#374151]'}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

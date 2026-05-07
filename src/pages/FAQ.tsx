import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { ScrollReveal } from '@/components/ScrollReveal';

const categories = [
  {
    label: 'Booking & Reservations',
    items: [
      {
        q: 'How do I make a booking?',
        a: 'Browse our fleet, select your vehicle, choose your dates and pick-up location, then complete the secure checkout. You will receive an instant confirmation email with all booking details.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'We recommend booking at least 48 hours in advance for standard vehicles and 5-7 days ahead for hypercars and limited-edition models. For peak seasons and special events, earlier is always better.',
      },
      {
        q: 'Can I modify or cancel my booking?',
        a: 'Bookings can be modified or cancelled up to 48 hours before the rental start time at no charge. Cancellations within 48 hours may incur a fee equivalent to one day\'s rental. Contact our concierge team to make any changes.',
      },
      {
        q: 'Is my booking confirmed immediately?',
        a: 'Yes. Once payment is processed you will receive an instant confirmation email. For certain hypercars, a brief manual review may take up to 2 hours, after which a final confirmation is sent.',
      },
    ],
  },
  {
    label: 'Requirements & Documents',
    items: [
      {
        q: 'What documents do I need to rent a car?',
        a: 'You need a valid driving licence held for at least 2 years, a government-issued photo ID or passport, and a credit card in the primary driver name for the security deposit. International drivers must also present an International Driving Permit.',
      },
      {
        q: 'Is there a minimum age requirement?',
        a: 'Renters must be at least 21 years old. Drivers under 25 may be subject to a Young Driver surcharge depending on the vehicle category. Some supercars require a minimum age of 25.',
      },
      {
        q: 'Can I add an additional driver?',
        a: 'Yes. Additional drivers can be added at checkout or at the time of vehicle handover. Each additional driver must present the same documents as the primary renter. A small daily fee applies per extra driver.',
      },
    ],
  },
  {
    label: 'Delivery & Collection',
    items: [
      {
        q: 'How does delivery and pick-up work?',
        a: 'We offer complimentary delivery and collection to any location within the city, including hotels, airports, and private residences. Simply provide your address at checkout and our concierge team will coordinate the handover at your preferred time.',
      },
      {
        q: 'Is airport delivery available?',
        a: 'Absolutely. We deliver directly to the arrivals terminal of all major airports across our service cities. Your vehicle will be immaculately prepared and waiting for you the moment you land.',
      },
      {
        q: 'What if I need the car outside normal hours?',
        a: 'We operate 24/7. Early morning or late-night deliveries are available at no extra charge. Simply select your preferred handover time during checkout.',
      },
    ],
  },
  {
    label: 'Pricing & Payments',
    items: [
      {
        q: 'What is included in the rental price?',
        a: 'All rentals include unlimited kilometres, comprehensive insurance, 24/7 roadside assistance, and a full tank of fuel. There are no hidden fees — the price you see is the price you pay.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards including Visa, Mastercard, and American Express. A security deposit is held on the card at the time of booking and released within 5-7 business days after a damage-free return.',
      },
      {
        q: 'Are there any mileage restrictions?',
        a: 'No. Every LUXDRIVE rental comes with truly unlimited kilometres. Drive as far as you want across all our available cities with zero mileage caps or overage charges.',
      },
      {
        q: 'Can I extend my rental period?',
        a: 'Yes. Contact our concierge team at any time during your rental and we will extend it subject to vehicle availability. Extensions are billed at the same daily rate as your original booking.',
      },
    ],
  },
  {
    label: 'Insurance & Damage',
    items: [
      {
        q: 'What insurance is included?',
        a: 'Every rental includes comprehensive third-party liability and collision damage coverage as standard. An excess amount applies in the event of a claim, which is detailed in your rental agreement before you sign.',
      },
      {
        q: 'What happens if the car is damaged?',
        a: 'Our comprehensive insurance covers most incidents. You are responsible for the agreed excess amount stated in your rental agreement. We recommend our optional Zero Excess upgrade at checkout for complete peace of mind.',
      },
      {
        q: 'What if the car breaks down?',
        a: '24/7 roadside assistance is included with every rental. If a mechanical fault occurs through no fault of yours, we will arrange a replacement vehicle at no additional cost.',
      },
    ],
  },
];

function AccordionItem({ q, a, index, openIndex, setOpenIndex }: {
  q: string; a: string; index: number;
  openIndex: number | null; setOpenIndex: (i: number | null) => void;
}) {
  const { isDark } = useTheme();
  const isOpen = openIndex === index;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
      isDark
        ? isOpen
          ? 'border-[rgba(0,107,94,0.45)] bg-[#0F0F0F]'
          : 'border-[rgba(255,255,255,0.05)] bg-[#0F0F0F] hover:border-[rgba(0,107,94,0.2)]'
        : isOpen
          ? 'border-[rgba(0,107,94,0.3)] bg-white shadow-[0_4px_24px_rgba(0,107,94,0.08)]'
          : 'border-[rgba(0,0,0,0.06)] bg-white hover:border-[rgba(0,107,94,0.2)]'
    }`}>
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm font-semibold leading-snug ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
          {q}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? 'bg-[#006B5E] border-[#006B5E] text-white'
            : isDark
              ? 'border-[rgba(255,255,255,0.1)] text-[#6B7280]'
              : 'border-[rgba(0,0,0,0.1)] text-[#9CA3AF]'
        }`}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="overflow-hidden"
      >
        <p className={`px-6 pb-5 text-sm leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState<{ cat: number; item: number } | null>(null);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>

      {/* Hero */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-[#070707]' : 'bg-[#F8F9FA]'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006B5E] to-transparent opacity-50" />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#006B5E] blur-[140px] ${isDark ? 'opacity-[0.07]' : 'opacity-[0.05]'}`} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#006B5E]" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Help Centre</span>
              <div className="h-px w-8 bg-[#006B5E]" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-[1.05] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Frequently Asked<br />
              <span style={{ color: '#006B5E' }}>Questions</span>
            </h1>
            <p className={`mt-6 text-base leading-relaxed max-w-xl mx-auto ${isDark ? 'text-[#6B7280]' : 'text-[#374151]'}`}>
              Everything you need to know before getting behind the wheel. Can't find your answer? Our concierge team is available around the clock.
            </p>
          </motion.div>

          {/* Quick contact badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="tel:+18005555893"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                isDark
                  ? 'border-[rgba(0,107,94,0.3)] text-[#00B899] hover:bg-[rgba(0,107,94,0.08)]'
                  : 'border-[rgba(0,107,94,0.25)] text-[#006B5E] hover:bg-[rgba(0,107,94,0.05)]'
              }`}
            >
              <Phone size={14} /> +1 (800) 555-LUXE
            </a>
            <a
              href="mailto:concierge@luxdrive.com"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                isDark
                  ? 'border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:border-[rgba(0,107,94,0.3)] hover:text-[#00B899]'
                  : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:border-[rgba(0,107,94,0.25)] hover:text-[#006B5E]'
              }`}
            >
              <Mail size={14} /> concierge@luxdrive.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-14">
          {categories.map((cat, ci) => {
            const globalBase = categories.slice(0, ci).reduce((s, c) => s + c.items.length, 0);
            return (
              <ScrollReveal key={cat.label}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 rounded-full bg-[#006B5E]" />
                    <h2 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                      {cat.label}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {cat.items.map((item, ii) => {
                      const globalIdx = globalBase + ii;
                      const flatOpen = openIndex ? openIndex.cat * 100 + openIndex.item : null;
                      const thisFlatOpen = ci * 100 + ii;
                      return (
                        <AccordionItem
                          key={ii}
                          q={item.q}
                          a={item.a}
                          index={globalIdx}
                          openIndex={flatOpen === thisFlatOpen ? globalIdx : null}
                          setOpenIndex={(val) => setOpenIndex(val !== null ? { cat: ci, item: ii } : null)}
                        />
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Still need help CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-[rgba(255,255,255,0.05)] bg-[#070707]' : 'border-[rgba(0,0,0,0.05)] bg-[#F8F9FA]'}`}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Still have questions?
            </h2>
            <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-[#6B7280]' : 'text-[#374151]'}`}>
              Our concierge team is available 24 hours a day, 7 days a week. We typically respond within minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] transition-all duration-300"
              >
                Contact Us
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+18005555893"
                className={`inline-flex items-center gap-2 px-8 py-4 border text-sm font-bold rounded-full transition-all duration-300 ${
                  isDark
                    ? 'border-[rgba(0,107,94,0.3)] text-[#00B899] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.06)]'
                    : 'border-[rgba(0,107,94,0.25)] text-[#006B5E] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.05)]'
                }`}
              >
                <Phone size={14} /> Call Concierge
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

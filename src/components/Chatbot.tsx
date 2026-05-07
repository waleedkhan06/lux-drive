import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';

/* ─── Knowledge Base ─── */

interface KBEntry {
  keywords: string[];
  answer: string;
  quickReplies?: string[];
}

const knowledgeBase: KBEntry[] = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hello! Welcome to LUXDRIVE. I\'m your personal concierge assistant. How can I help you today?',
    quickReplies: ['Browse Fleet', 'Pricing & Booking', 'Delivery Info', 'Contact Team'],
  },
  // Fleet / Inventory
  {
    keywords: ['fleet', 'cars', 'vehicles', 'inventory', 'available', 'collection', 'what cars'],
    answer: 'Our fleet features 20+ world-class luxury vehicles including Ferrari 488 GTB, Lamborghini Aventador, Bugatti Chiron, McLaren W1, Bentley Continental GT, Rolls-Royce Ghost, Porsche 911 Turbo S, Mercedes-Maybach S-Class, Aston Martin DB11, and more.',
    quickReplies: ['View Full Fleet', 'Filter by Category', 'Pricing'],
  },
  // Bugatti Chiron specs
  {
    keywords: ['bugatti', 'chiron', 'bugatti chiron'],
    answer: 'The Bugatti Chiron is the crown jewel of our hypercar collection.\n\n• Engine: 8.0L Quad-Turbo W16\n• Power: 1,479 HP\n• 0–100 km/h: 2.4 sec\n• Top Speed: 420 km/h\n• Rental from $3,500/day',
    quickReplies: ['Book Bugatti', 'View Fleet', 'Contact Sales'],
  },
  // Lamborghini specs
  {
    keywords: ['lamborghini', 'aventador', 'lambo'],
    answer: 'The Lamborghini Aventador SVJ is raw Italian fury.\n\n• Engine: 6.5L V12 Naturally Aspirated\n• Power: 770 HP\n• 0–100 km/h: 2.8 sec\n• Top Speed: 351 km/h\n• Rental from $2,200/day',
    quickReplies: ['Book Lamborghini', 'Compare Cars', 'View Fleet'],
  },
  // Ferrari specs
  {
    keywords: ['ferrari', '488', 'ferrari 488'],
    answer: 'The Ferrari 488 GTB is pure racing DNA made road-legal.\n\n• Engine: 3.9L Twin-Turbo V8\n• Power: 660 HP\n• 0–100 km/h: 3.0 sec\n• Top Speed: 330 km/h\n• Rental from $1,800/day',
    quickReplies: ['Book Ferrari', 'View Fleet', 'Pricing'],
  },
  // McLaren W1
  {
    keywords: ['mclaren', 'w1', 'mclaren w1'],
    answer: 'The McLaren W1 is the successor to the legendary F1.\n\n• Engine: 4.0L Twin-Turbo V8 Hybrid\n• Power: 1,275 HP combined\n• 0–100 km/h: 2.7 sec\n• Top Speed: 350 km/h\n• Rental from $3,000/day',
    quickReplies: ['Book McLaren', 'Hypercar Fleet', 'Contact Sales'],
  },
  // Porsche
  {
    keywords: ['porsche', '911', 'turbo s', 'porsche 911'],
    answer: 'The Porsche 911 Turbo S — everyday supercar perfection.\n\n• Engine: 3.8L Twin-Turbo Flat-6\n• Power: 650 HP\n• 0–100 km/h: 2.6 sec\n• Top Speed: 330 km/h\n• Rental from $1,400/day',
    quickReplies: ['Book Porsche', 'View Fleet', 'Pricing'],
  },
  // Bentley
  {
    keywords: ['bentley', 'continental', 'continental gt'],
    answer: 'The Bentley Continental GT — British grand touring mastery.\n\n• Engine: 6.0L Twin-Turbo W12\n• Power: 626 HP\n• 0–100 km/h: 3.5 sec\n• Top Speed: 335 km/h\n• Rental from $1,500/day',
    quickReplies: ['Book Bentley', 'Luxury Fleet', 'Pricing'],
  },
  // Rolls-Royce
  {
    keywords: ['rolls', 'royce', 'rolls-royce', 'ghost', 'phantom', 'rolls royce'],
    answer: 'The Rolls-Royce Ghost is the pinnacle of automotive luxury.\n\n• Engine: 6.75L Twin-Turbo V12\n• Power: 563 HP\n• 0–100 km/h: 4.8 sec\n• Top Speed: 250 km/h (electronically limited)\n• Rental from $1,800/day',
    quickReplies: ['Book Rolls-Royce', 'Luxury Fleet', 'Chauffeur Option'],
  },
  // Mercedes-Maybach
  {
    keywords: ['mercedes', 'maybach', 's-class', 'mercedes-maybach'],
    answer: 'The Mercedes-Maybach S-Class — a private sanctuary on wheels.\n\n• Engine: 6.0L V12 Biturbo\n• Power: 621 HP\n• 0–100 km/h: 4.4 sec\n• Top Speed: 209 km/h\n• Rental from $1,200/day',
    quickReplies: ['Book Mercedes', 'Luxury Fleet', 'Chauffeur Service'],
  },
  // Audi R8
  {
    keywords: ['audi', 'r8', 'audi r8'],
    answer: 'The Audi R8 GT — German precision at its thrilling best.\n\n• Engine: 5.2L V10 FSI\n• Power: 620 HP\n• 0–100 km/h: 3.3 sec\n• Top Speed: 320 km/h\n• Rental from $950/day',
    quickReplies: ['Book Audi R8', 'View Fleet', 'Pricing'],
  },
  // Toyota Supra
  {
    keywords: ['supra', 'toyota', 'gr supra'],
    answer: 'The Toyota GR Supra — iconic Japanese sports car legend.\n\n• Engine: 3.0L Inline-6 Turbo\n• Power: 387 HP\n• 0–100 km/h: 3.9 sec\n• Top Speed: 250 km/h\n• Rental from $450/day',
    quickReplies: ['Book Supra', 'View Fleet', 'Budget Options'],
  },
  // Pricing
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'rates', 'daily rate', 'per day', 'cheap', 'expensive', 'afford'],
    answer: 'Our rental rates span a wide range to suit every occasion:\n\n• Sports Cars: from $450/day\n• Grand Tourers: from $950/day\n• Luxury Saloons: from $1,200/day\n• Hypercars: from $2,200/day\n\nWeekly rates offer up to 20% saving. All prices include insurance, unlimited km, and 24/7 support.',
    quickReplies: ['Weekly Rates', 'View Fleet', 'Book Now'],
  },
  // Weekly rates
  {
    keywords: ['weekly', 'week', 'long term', 'monthly', 'month', 'extended'],
    answer: 'Weekly and long-term rentals enjoy significant discounts:\n\n• 7 days: save up to 20%\n• 14 days: save up to 28%\n• 30+ days: save up to 35% — contact our team for a custom quote.\n\nAll long-term rentals include the same full suite of services.',
    quickReplies: ['Get a Quote', 'Contact Sales', 'View Fleet'],
  },
  // Booking process
  {
    keywords: ['book', 'booking', 'reserve', 'reservation', 'how to book', 'rent'],
    answer: 'Booking with LUXDRIVE is simple:\n\n1. Browse our fleet and pick your car\n2. Select your dates and pick-up location\n3. Complete secure checkout (takes ~2 min)\n4. Receive instant confirmation\n\nYour car will be delivered to your chosen location, immaculate and ready.',
    quickReplies: ['Browse Fleet', 'Delivery Info', 'FAQs'],
  },
  // Documents
  {
    keywords: ['document', 'documents', 'licence', 'license', 'id', 'passport', 'requirements', 'need to bring'],
    answer: 'To complete your rental you will need:\n\n• Valid driving licence (held 2+ years)\n• Government photo ID or passport\n• Credit card in the driver\'s name\n• International Driving Permit (for non-local licences)\n\nMinimum age is 21. Some hypercars require 25+.',
    quickReplies: ['Age Requirements', 'Book Now', 'FAQs'],
  },
  // Age
  {
    keywords: ['age', 'minimum age', 'how old', 'young driver'],
    answer: 'Minimum rental age is 21 years old. Drivers aged 21–24 may incur a Young Driver surcharge. For hypercars like the Bugatti Chiron and McLaren W1, the minimum age is 25.',
    quickReplies: ['View Hypercars', 'Standard Fleet', 'Book Now'],
  },
  // Delivery
  {
    keywords: ['deliver', 'delivery', 'pick up', 'pickup', 'drop off', 'dropoff', 'location', 'where', 'hotel', 'airport'],
    answer: 'We offer complimentary delivery and collection to any location:\n\n• Hotels and residences\n• Airport arrivals terminals\n• Business addresses\n\nDelivery is available 24/7 at no extra charge. Simply enter your address at checkout.',
    quickReplies: ['Available Cities', 'Book Now', 'Contact Team'],
  },
  // Cities
  {
    keywords: ['city', 'cities', 'where available', 'location', 'new york', 'dubai', 'london', 'monaco', 'available in'],
    answer: 'LUXDRIVE currently operates in:\n\n• New York\n• Dubai\n• London\n• Monaco\n\nWe are expanding to additional cities. Contact our concierge team to enquire about a specific location.',
    quickReplies: ['Book Now', 'Contact Team', 'Full Fleet'],
  },
  // Insurance
  {
    keywords: ['insurance', 'insured', 'covered', 'coverage', 'damage', 'accident', 'zero excess'],
    answer: 'All rentals include comprehensive insurance as standard:\n\n• Third-party liability cover\n• Collision Damage Waiver (CDW)\n• 24/7 roadside assistance\n\nAn excess applies in the event of a claim. Upgrade to our Zero Excess package at checkout for complete peace of mind.',
    quickReplies: ['Zero Excess Info', 'Book Now', 'FAQs'],
  },
  // Mileage
  {
    keywords: ['mileage', 'km', 'kilometres', 'miles', 'unlimited', 'limit'],
    answer: 'Every LUXDRIVE rental includes truly unlimited kilometres — no caps, no overage charges, ever. Drive as far as you want.',
    quickReplies: ['Book Now', 'View Fleet', 'Pricing'],
  },
  // Extension
  {
    keywords: ['extend', 'extension', 'longer', 'keep longer', 'return late'],
    answer: 'You can extend your rental at any time by contacting our concierge team. Extensions are subject to availability and billed at the same daily rate as your original booking.',
    quickReplies: ['Contact Concierge', 'Book Now'],
  },
  // Chauffeur
  {
    keywords: ['chauffeur', 'driver', 'driven', 'with driver'],
    answer: 'Our chauffeur service pairs you with a professional, uniformed driver for a truly effortless experience. Available for airport transfers, events, city tours, and full-day hire.\n\nContact our concierge team for chauffeur availability and pricing.',
    quickReplies: ['Contact Concierge', 'View Fleet', 'Book Now'],
  },
  // Electric / Hybrid
  {
    keywords: ['electric', 'hybrid', 'ev', 'tesla', 'eco', 'green', 'sustainable'],
    answer: 'We offer electric and hybrid options in our fleet:\n\n• Tesla Model S Plaid — 1,020 HP, 0–100 in 2.1 sec\n• McLaren W1 — Hybrid V8, 1,275 HP combined\n\nMore EV models are being added. Contact us for the latest availability.',
    quickReplies: ['View EV Fleet', 'Hybrid Options', 'Book Now'],
  },
  // Contact / Human
  {
    keywords: ['speak', 'human', 'agent', 'person', 'representative', 'call', 'phone', 'email', 'contact', 'team', 'sales'],
    answer: 'Our concierge team is available 24/7 and would love to assist you:\n\n📞 +1 (800) 555-LUXE\n✉️ concierge@luxdrive.com\n\nOr visit our Contact page for a direct message.',
    quickReplies: ['Call Now', 'Email Us', 'Contact Page'],
  },
  // Cancellation
  {
    keywords: ['cancel', 'cancellation', 'refund', 'change', 'modify'],
    answer: 'Bookings can be cancelled or modified free of charge up to 48 hours before your rental start time. Cancellations within 48 hours may incur a fee of one day\'s rental rate.',
    quickReplies: ['Contact Concierge', 'FAQs', 'Book Now'],
  },
  // About LuxDrive
  {
    keywords: ['about', 'who are you', 'luxdrive', 'company', 'history', 'founded', 'established'],
    answer: 'LUXDRIVE was founded in 2018 with one mission: to make extraordinary car experiences accessible. We have served over 10,000 discerning clients across 4 global cities, maintaining a perfect 4.9-star rating.\n\nEvery car is handpicked, immaculately maintained, and delivered to your door.',
    quickReplies: ['Our Story', 'View Fleet', 'Contact Us'],
  },
  // Thank you
  {
    keywords: ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful'],
    answer: 'It\'s our pleasure! Is there anything else I can help you with? Our team is always here if you need personal assistance.',
    quickReplies: ['Browse Fleet', 'Book Now', 'Contact Team'],
  },
  // Fallback handled in component
];

/* ─── Quick Reply Actions ─── */

const quickReplyActions: Record<string, { label: string; action: 'navigate' | 'message'; target: string }> = {
  'Browse Fleet': { label: 'Browse Fleet', action: 'navigate', target: '/fleet' },
  'View Fleet': { label: 'View Fleet', action: 'navigate', target: '/fleet' },
  'Full Fleet': { label: 'Full Fleet', action: 'navigate', target: '/fleet' },
  'View Full Fleet': { label: 'View Full Fleet', action: 'navigate', target: '/fleet' },
  'Hypercar Fleet': { label: 'Hypercar Fleet', action: 'navigate', target: '/fleet' },
  'Luxury Fleet': { label: 'Luxury Fleet', action: 'navigate', target: '/fleet' },
  'View EV Fleet': { label: 'View EV Fleet', action: 'navigate', target: '/fleet' },
  'Contact Page': { label: 'Contact Page', action: 'navigate', target: '/contact' },
  'Contact Sales': { label: 'Contact Sales', action: 'navigate', target: '/contact' },
  'Contact Team': { label: 'Contact Team', action: 'navigate', target: '/contact' },
  'Contact Concierge': { label: 'Contact Concierge', action: 'navigate', target: '/contact' },
  'Our Story': { label: 'Our Story', action: 'navigate', target: '/about' },
  'FAQs': { label: 'FAQs', action: 'navigate', target: '/faq' },
  'Book Now': { label: 'Book Now', action: 'navigate', target: '/fleet' },
  'Pricing': { label: 'Pricing', action: 'message', target: 'pricing' },
  'Pricing & Booking': { label: 'Pricing & Booking', action: 'message', target: 'price' },
  'Delivery Info': { label: 'Delivery Info', action: 'message', target: 'delivery' },
  'Call Now': { label: 'Call Now', action: 'navigate', target: 'tel:+18005555893' },
  'Email Us': { label: 'Email Us', action: 'navigate', target: 'mailto:concierge@luxdrive.com' },
};

/* ─── Helpers ─── */

function findAnswer(input: string): { answer: string; quickReplies?: string[] } {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { answer: entry.answer, quickReplies: entry.quickReplies };
    }
  }
  const fallbacks = [
    {
      answer: 'That\'s a little outside my lane — and I prefer fast ones! I\'m best with luxury cars, bookings, and all things LUXDRIVE.\n\nPerhaps I can help you find your perfect vehicle instead?',
      quickReplies: ['Browse Fleet', 'Pricing & Booking', 'Contact Team'],
    },
    {
      answer: 'Hmm, I\'m not quite sure about that — my expertise is in the finer things: Ferraris, Lamborghinis, and flawless service.\n\nIs there anything car-related I can help with?',
      quickReplies: ['View Fleet', 'Delivery Info', 'FAQs'],
    },
    {
      answer: 'I\'m afraid that\'s beyond my expertise! But if it involves a luxury car, a seamless booking, or world-class concierge service — I\'m your guide.\n\nOur team is also available 24/7 at +1 (800) 555-LUXE if you need a real human touch.',
      quickReplies: ['Contact Team', 'Browse Fleet', 'Pricing & Booking'],
    },
  ];
  return fallbacks[Math.floor(input.length % fallbacks.length)];
}

/* ─── Types ─── */

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
}

/* ─── Component ─── */

export default function Chatbot() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: 'Welcome to LUXDRIVE! I\'m your personal concierge assistant, here to help you find your perfect luxury car. How can I assist you today?',
      quickReplies: ['Browse Fleet', 'Pricing & Booking', 'Delivery Info', 'Contact Team'],
    },
  ]);
  const [input, setInput] = useState('');
  const msgIdRef = useRef(1);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const uid = ++msgIdRef.current;
    const userMsg: Message = { id: uid, role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const { answer, quickReplies } = findAnswer(text);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: ++msgIdRef.current, role: 'bot', text: answer, quickReplies },
      ]);
    }, 900);
  };

  const handleQuickReply = (label: string) => {
    const action = quickReplyActions[label];
    if (!action) { sendMessage(label); return; }
    if (action.action === 'navigate') {
      if (action.target.startsWith('tel:') || action.target.startsWith('mailto:')) {
        const a = document.createElement('a');
        a.href = action.target;
        a.click();
      } else {
        navigate(action.target);
        setOpen(false);
      }
    } else {
      sendMessage(action.target);
    }
  };

  const bg = isDark ? '#0A0A0A' : '#FFFFFF';
  const border = isDark ? 'rgba(0,107,94,0.25)' : 'rgba(0,107,94,0.15)';
  const headerBg = isDark ? '#0F0F0F' : '#FAFAFA';
  const botBubble = isDark ? '#161616' : '#F3F4F6';
  const botText = isDark ? '#E5E7EB' : '#111827';
  const userBubble = '#006B5E';
  const inputBg = isDark ? '#111111' : '#F9FAFB';
  const inputBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const subText = isDark ? '#6B7280' : '#9CA3AF';

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-[#006B5E] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,107,94,0.45)] hover:bg-[#008C79] transition-colors"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.div>
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00B899] border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed bottom-24 right-6 z-[100] w-[360px] max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: headerBg, borderBottom: `1px solid ${border}` }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[#006B5E] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,107,94,0.5)]">
                  <img src="/images/lux drive logo.png" alt="LuxDrive" className="w-6 h-6 object-contain rounded-full" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00B899] border-2"
                    style={{ borderColor: headerBg }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: botText }}>LUXDRIVE Concierge</p>
                  <p className="text-[11px]" style={{ color: subText }}>Online · Typically replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="tel:+18005555893"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(0,107,94,0.1)]"
                  style={{ color: subText }}
                  aria-label="Call concierge"
                >
                  <Phone size={15} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[rgba(0,107,94,0.1)]"
                  style={{ color: subText }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex flex-col gap-4 px-4 py-4 overflow-y-auto"
              style={{ height: 380, background: bg }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className="max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                    style={{
                      background: msg.role === 'user' ? userBubble : botBubble,
                      color: msg.role === 'user' ? '#FFFFFF' : botText,
                      borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                      borderBottomLeftRadius: msg.role === 'bot' ? 4 : 16,
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr}
                          onClick={() => handleQuickReply(qr)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all hover:scale-[1.03] active:scale-[0.97]"
                          style={{
                            borderColor: isDark ? 'rgba(0,107,94,0.4)' : 'rgba(0,107,94,0.3)',
                            color: isDark ? '#00B899' : '#006B5E',
                            background: isDark ? 'rgba(0,107,94,0.08)' : 'rgba(0,107,94,0.05)',
                          }}
                        >
                          {(qr === 'Browse Fleet' || qr === 'View Fleet' || qr === 'Full Fleet' || qr === 'Book Now') && (
                            <ExternalLink size={10} />
                          )}
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-[4px] flex items-center gap-1.5"
                    style={{ background: botBubble }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#006B5E]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ background: headerBg, borderTop: `1px solid ${border}` }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about our fleet, pricing..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: botText,
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-[#006B5E] hover:bg-[#008C79] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all hover:shadow-[0_0_16px_rgba(0,107,94,0.5)] hover:scale-[1.05] active:scale-[0.95]"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Footer note */}
            <p className="text-center text-[10px] pb-2.5" style={{ color: subText }}>
              LUXDRIVE Concierge · Available 24/7
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

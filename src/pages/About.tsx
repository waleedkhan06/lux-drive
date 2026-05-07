import { useInView, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Award, Heart, Shield, ArrowRight, Sparkles, Target } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const { isDark } = useTheme();

  const values = [
    { icon: Award, title: 'Excellence', desc: 'Every detail matters. From vehicle selection to customer service, we accept only the exceptional.' },
    { icon: Heart, title: 'Passion', desc: 'We are car people. We understand the emotion behind every drive and honor it in our service.' },
    { icon: Shield, title: 'Trust', desc: 'Transparency, reliability, and discretion. The pillars of every relationship we build.' },
    { icon: Sparkles, title: 'Innovation', desc: 'Pioneering the future of luxury mobility through technology, sustainability and design.' },
  ];

  const stats = [
    { value: 25, label: 'Premium Vehicles', suffix: '+' },
    { value: 10000, label: 'Happy Clients', suffix: '+' },
    { value: 12, label: 'Cities Served', suffix: '' },
    { value: 99, label: 'Satisfaction', suffix: '%' },
  ];

  const milestones = [
    { year: '2018', title: 'Founded in NYC', desc: 'Started with a single Lamborghini and a vision.' },
    { year: '2020', title: 'Global Expansion', desc: 'Opened locations across major luxury hubs worldwide.' },
    { year: '2023', title: 'Concierge Platform', desc: 'Launched 24/7 personal concierge service for clients.' },
    { year: '2025', title: 'Sustainable Fleet', desc: 'Introduced electric hypercars to our exclusive collection.' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <img
          src="/images/about-showroom.jpg"
          alt="LUXDRIVE Showroom"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-[rgba(5,5,5,0.7)] via-[rgba(5,5,5,0.85)] to-[#050505]'
            : 'bg-gradient-to-b from-[rgba(255,255,255,0.4)] via-[rgba(248,249,250,0.85)] to-white'
        }`} />
        {/* Emerald glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006B5E] opacity-[0.07] blur-[200px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 pt-20"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#006B5E]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">About LuxDrive</span>
            <div className="h-px w-8 bg-[#006B5E]" />
          </div>
          <h1 className={`mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Redefining<br />
            <span style={{ color: '#006B5E' }}>Luxury Mobility</span>
          </h1>
          <p className={`mt-6 max-w-xl mx-auto leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#374151]'}`}>
            Founded on a passion for exceptional automobiles and an unwavering commitment to extraordinary service.
          </p>
        </motion.div>
      </div>

      {/* Our Story */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="/images/about-showroom.jpg" alt="Our showroom" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,107,94,0.3)] to-transparent" />
                {/* Floating badge */}
                <div className={`absolute bottom-6 left-6 px-5 py-3 rounded-2xl backdrop-blur-md border ${
                  isDark ? 'bg-[rgba(8,8,8,0.85)] border-[rgba(0,107,94,0.3)]' : 'bg-white/90 border-[rgba(0,107,94,0.2)]'
                }`}>
                  <p className="text-[10px] uppercase tracking-widest text-[#9CA3AF]">Est. 2018</p>
                  <p className={`text-base font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>NYC Headquarters</p>
                </div>
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-[#006B5E]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Our Story</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-4xl md:text-5xl font-black tracking-tight leading-[1.05] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  Built on Passion,<br />
                  <span style={{ color: '#006B5E' }}>Driven by Excellence</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className={`mt-6 space-y-4 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                  <p>
                    LUXDRIVE was born from a simple belief: that the world's finest automobiles should be accessible to those who truly appreciate them. What began as a curated collection for close friends has grown into a global luxury mobility platform.
                  </p>
                  <p>
                    Every vehicle in our fleet is hand-selected, meticulously maintained, and prepared to exceed expectations. We don't just rent cars — we craft experiences that linger long after the engine falls silent.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="mt-8 pl-6 border-l-2 border-[#006B5E]">
                  <p className={`text-lg font-serif italic ${isDark ? 'text-[#00B899]' : 'text-[#006B5E]'}`}>
                    "We don't just rent cars. We curate experiences."
                  </p>
                  <p className="mt-2 text-xs text-[#6B7280] uppercase tracking-widest">— Founder & CEO</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-20 lg:py-24 border-y ${
        isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.04)]'
      }`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-5xl md:text-6xl font-black text-[#006B5E]">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className={`mt-2 text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#006B5E]" />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Our Values</span>
                <div className="h-px w-8 bg-[#006B5E]" />
              </div>
              <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>What Drives Us</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className={`group p-7 rounded-2xl border transition-all duration-500 ${
                  isDark
                    ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,107,94,0.35)] hover:bg-[#111]'
                    : 'bg-white border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
                }`}>
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center group-hover:bg-[rgba(0,107,94,0.15)] group-hover:scale-110 transition-all">
                    <v.icon size={24} className="text-[#006B5E]" />
                  </div>
                  <h3 className={`mt-5 text-xl font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{v.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className={`py-24 lg:py-32 border-y ${
        isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.04)]' : 'bg-[#F8F9FA] border-[rgba(0,0,0,0.04)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#006B5E]" />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Our Journey</span>
                <div className="h-px w-8 bg-[#006B5E]" />
              </div>
              <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Milestones</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            {/* Vertical line */}
            <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${
              isDark ? 'bg-[rgba(0,107,94,0.2)]' : 'bg-[rgba(0,107,94,0.15)]'
            }`} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.1}>
                  <div className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <p className="text-3xl font-black text-[#006B5E]">{m.year}</p>
                      <h4 className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{m.title}</h4>
                      <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>{m.desc}</p>
                    </div>
                    <div className="hidden md:block w-4 h-4 rounded-full bg-[#006B5E] shadow-[0_0_20px_rgba(0,107,94,0.7)] shrink-0 z-10" />
                    <div className="hidden md:block flex-1" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`relative py-24 lg:py-32 overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#006B5E] opacity-[0.05] blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <Target className="w-12 h-12 text-[#006B5E] mx-auto mb-6" />
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Ready for an<br />
              <span style={{ color: '#006B5E' }}>Extraordinary Drive?</span>
            </h2>
            <p className={`mt-6 max-w-md mx-auto leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
              Browse our handpicked collection and discover the vehicle that matches your moment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/fleet"
                className="group px-10 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-full hover:shadow-[0_0_40px_rgba(0,107,94,0.5)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-2"
              >
                Explore Fleet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className={`px-10 py-4 border text-sm font-bold rounded-full transition-all duration-300 ${
                  isDark
                    ? 'border-[rgba(0,107,94,0.3)] text-[#00B899] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.06)]'
                    : 'border-[rgba(0,107,94,0.25)] text-[#006B5E] hover:border-[#006B5E] hover:bg-[rgba(0,107,94,0.05)]'
                }`}
              >
                Talk to Concierge
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send, Check, Clock, MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'concierge@luxdrive.com', href: 'mailto:concierge@luxdrive.com' },
    { icon: Phone, label: 'Phone', value: '+1 (800) 555-LUXE', href: 'tel:+18005555893' },
    { icon: MapPin, label: 'Address', value: '350 Fifth Avenue, Suite 4500, New York, NY 10118', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'X', href: '#' },
  ];

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
    isDark
      ? 'bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#444] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.2)]'
      : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.15)]'
  }`;

  const labelCls = `block text-[10px] uppercase tracking-widest mb-2 font-semibold ${
    isDark ? 'text-[#6B7280]' : 'text-[#6B7280]'
  }`;

  return (
    <div className={`min-h-screen pt-28 pb-24 relative overflow-hidden ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      {/* Decorative emerald glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#006B5E] opacity-[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00B899] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#006B5E]" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Contact</span>
              <div className="h-px w-8 bg-[#006B5E]" />
            </div>
            <h1 className={`text-5xl md:text-6xl font-black tracking-tight leading-[0.95] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Get in <span style={{ color: '#006B5E' }}>Touch</span>
            </h1>
            <p className={`mt-5 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
              Our concierge team is available 24/7 to assist with any inquiry or special request.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                      isDark
                        ? 'bg-[#0F0F0F] border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,107,94,0.35)] hover:bg-[#111]'
                        : 'bg-white border-[rgba(0,0,0,0.05)] hover:border-[rgba(0,107,94,0.25)] hover:shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.2)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(0,107,94,0.15)] group-hover:scale-110 transition-all">
                      <method.icon size={18} className="text-[#006B5E]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#006B5E]">{method.label}</p>
                      <p className={`mt-1 text-sm font-medium ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? 'bg-[#111] border border-[rgba(255,255,255,0.06)] text-[#9CA3AF] hover:bg-[rgba(0,107,94,0.1)] hover:border-[rgba(0,107,94,0.4)] hover:text-[#00B899]'
                        : 'bg-white border border-[rgba(0,0,0,0.06)] text-[#6B7280] hover:bg-[rgba(0,107,94,0.05)] hover:border-[rgba(0,107,94,0.3)] hover:text-[#006B5E]'
                    }`}
                  >
                    <social.icon size={17} />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${
                isDark
                  ? 'bg-[rgba(0,107,94,0.1)] border-[rgba(0,107,94,0.3)] text-[#00B899]'
                  : 'bg-[rgba(0,107,94,0.06)] border-[rgba(0,107,94,0.2)] text-[#006B5E]'
              }`}>
                <Clock size={13} />
                Average response: 15 minutes
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2}>
              <div className={`rounded-3xl p-8 lg:p-10 border ${
                isDark
                  ? 'bg-[#0A0A0A] border-[rgba(0,107,94,0.18)] shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[rgba(0,107,94,0.15)] shadow-[0_20px_60px_rgba(0,107,94,0.08)]'
              }`}>
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 mx-auto rounded-full bg-[rgba(0,107,94,0.12)] border border-[rgba(0,107,94,0.3)] flex items-center justify-center"
                    >
                      <Check size={36} className="text-[#006B5E]" />
                    </motion.div>
                    <h3 className={`mt-6 text-2xl font-black ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Message Sent</h3>
                    <p className={`mt-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>Our team will contact you within 15 minutes.</p>
                    <button
                      onClick={() => {
                        setFormState('idle');
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className={`mt-8 px-6 py-3 border text-sm font-semibold rounded-full transition-all ${
                        isDark
                          ? 'border-[rgba(255,255,255,0.1)] text-white hover:border-[#006B5E] hover:text-[#00B899]'
                          : 'border-[rgba(0,0,0,0.1)] text-[#0A0A0A] hover:border-[#006B5E] hover:text-[#006B5E]'
                      }`}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare size={16} className="text-[#006B5E]" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#006B5E]">Send a Message</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Name *</label>
                        <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Your name" />
                      </div>
                      <div>
                        <label className={labelCls}>Email *</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Phone</label>
                        <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label className={labelCls}>Subject *</label>
                        <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputCls}>
                          <option value="">Select a topic</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="support">Customer Support</option>
                          <option value="corporate">Corporate Services</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputCls} resize-none`}
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Showroom location card */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 mt-20">
        <ScrollReveal>
          <div className={`relative rounded-3xl overflow-hidden border ${
            isDark
              ? 'bg-gradient-to-br from-[#0F0F0F] to-[#080808] border-[rgba(0,107,94,0.18)]'
              : 'bg-gradient-to-br from-white to-[#F8F9FA] border-[rgba(0,107,94,0.15)]'
          }`}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#006B5E] opacity-[0.06] blur-[120px]" />
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-[#006B5E]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#006B5E]">Visit Us</span>
                </div>
                <h2 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  New York<br /><span style={{ color: '#006B5E' }}>Showroom</span>
                </h2>
                <p className={`mt-4 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                  Experience our fleet in person at the heart of Manhattan. Private viewings by appointment.
                </p>
                <div className="mt-6 space-y-2 text-sm">
                  <p className={isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}>350 Fifth Avenue, Suite 4500</p>
                  <p className={isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}>New York, NY 10118</p>
                  <p className="text-[#006B5E] font-semibold">Mon – Sat: 9 AM – 8 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className={`relative w-full h-48 md:h-full min-h-[200px] rounded-2xl border flex items-center justify-center ${
                  isDark ? 'bg-[#080808] border-[rgba(255,255,255,0.05)]' : 'bg-[rgba(0,107,94,0.04)] border-[rgba(0,107,94,0.1)]'
                }`}>
                  <div className="text-center">
                    <MapPin size={56} className="mx-auto text-[#006B5E] mb-3" />
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>5th Avenue, NYC</p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Empire State District</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

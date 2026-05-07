import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cars } from '@/data';
import { Check, ChevronRight, MapPin, Calendar, Clock, Gift, CreditCard, Download, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { useTheme } from '@/context/ThemeContext';

const step1Schema = z.object({
  pickupLocation: z.string().min(2, 'Location required'),
  pickupDate: z.string().min(1, 'Date required'),
  pickupTime: z.string().min(1, 'Time required'),
  returnDate: z.string().min(1, 'Date required'),
  returnTime: z.string().min(1, 'Time required'),
  driverAge: z.string().min(1, 'Required'),
  promoCode: z.string().optional(),
});

const step2Schema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(6, 'Phone required'),
  licenseNumber: z.string().min(3, 'License required'),
  licenseCountry: z.string().min(2, 'Country required'),
  specialRequests: z.string().optional(),
});

const step3Schema = z.object({
  cardNumber: z.string().min(16, 'Valid card number required'),
  cardName: z.string().min(2, 'Name required'),
  expiry: z.string().min(5, 'MM/YY required'),
  cvv: z.string().min(3, 'CVV required'),
  billingAddress: z.string().min(5, 'Address required'),
  zip: z.string().min(3, 'ZIP required'),
  country: z.string().min(2, 'Country required'),
});

// Helper to use theme styles consistently
function useInputCls() {
  const { isDark } = useTheme();
  return `w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-1 ${
    isDark
      ? 'bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#444] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.2)]'
      : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:border-[#006B5E] focus:ring-[rgba(0,107,94,0.15)]'
  }`;
}

function useLabelCls() {
  const { isDark } = useTheme();
  return `block text-[10px] uppercase tracking-widest font-semibold mb-2 ${ isDark ? 'text-[#6B7280]' : 'text-[#6B7280]' }`;
}

export default function Booking() {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const car = cars.find((c) => c.id === carId);
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<Record<string, unknown>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef] = useState(() => `LXD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  if (!isSignedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-[rgba(0,107,94,0.1)] border border-[rgba(0,107,94,0.25)] flex items-center justify-center mx-auto mb-6">
            <CreditCard size={36} className="text-[#006B5E]" />
          </div>
          <h1 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Sign In to Book</h1>
          <p className={`mb-8 leading-relaxed ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
            Please sign in to complete your booking and access exclusive member benefits.
          </p>
          <SignInButton mode="modal">
            <button className="px-10 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] hover:scale-[1.02] transition-all duration-300">
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={`min-h-screen pt-32 text-center ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <h1 className={`text-2xl ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Vehicle not found</h1>
        <button onClick={() => navigate('/fleet')} className="mt-4 text-[#006B5E] hover:underline">
          Back to Fleet
        </button>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Dates' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirm' },
  ];

  const dailyRate = car.pricePerDay;
  const insurance = 49;
  const deliveryFee = 99;

  const calcDays = () => {
    const pickup = bookingData.pickupDate as string;
    const ret = bookingData.returnDate as string;
    const pickupTime = (bookingData.pickupTime as string) || '10:00';
    const returnTime = (bookingData.returnTime as string) || '10:00';
    if (!pickup || !ret) return 1;
    const start = new Date(`${pickup}T${pickupTime}`);
    const end = new Date(`${ret}T${returnTime}`);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 1;
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(1, Math.ceil(diffHours / 24));
  };

  const totalDays = calcDays();
  const subtotal = dailyRate * totalDays;
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + insurance + deliveryFee + taxes;

  return (
    <div className={`min-h-screen pt-24 pb-24 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {!confirmed ? (
          <>
            {/* Stepper */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          step >= s.num
                            ? 'bg-[#006B5E] text-white shadow-[0_0_15px_rgba(0,107,94,0.4)]'
                            : isDark
                            ? 'bg-[#1A1A1A] text-[#6B7280] border border-[rgba(255,255,255,0.08)]'
                            : 'bg-[#F3F4F6] text-[#9CA3AF] border border-[rgba(0,0,0,0.08)]'
                        }`}
                      >
                        {step > s.num ? <Check size={18} /> : s.num}
                      </div>
                      <span className={`mt-2 text-xs uppercase tracking-wider font-semibold ${step >= s.num ? 'text-[#006B5E]' : isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-16 h-px mx-2 ${step > s.num ? 'bg-[#006B5E]' : isDark ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(0,0,0,0.08)]'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <Step1Form
                      key="step1"
                      defaultValues={bookingData}
                      onDateChange={(data) => setBookingData((prev) => ({ ...prev, ...data }))}
                      onSubmit={(data) => {
                        setBookingData((prev) => ({ ...prev, ...data }));
                        setStep(2);
                      }}
                    />
                  )}
                  {step === 2 && (
                    <Step2Form
                      key="step2"
                      defaultValues={bookingData}
                      onBack={() => setStep(1)}
                      onSubmit={(data) => {
                        setBookingData((prev) => ({ ...prev, ...data }));
                        setStep(3);
                      }}
                    />
                  )}
                  {step === 3 && (
                    <Step3Form
                      key="step3"
                      defaultValues={bookingData}
                      onBack={() => setStep(2)}
                      onSubmit={(data) => {
                        const finalData = { ...bookingData, ...data };
                        setBookingData(finalData);
                        const newBooking = {
                          id: bookingRef,
                          carId: car.id,
                          pickupDate: (finalData.pickupDate as string) || '',
                          returnDate: (finalData.returnDate as string) || '',
                          pickupLocation: (finalData.pickupLocation as string) || '',
                          total,
                          status: 'upcoming',
                        };
                        try {
                          const existing = JSON.parse(localStorage.getItem('luxdrive_bookings') || '[]');
                          localStorage.setItem('luxdrive_bookings', JSON.stringify([newBooking, ...existing]));
                        } catch { /* storage unavailable */ }
                        setConfirmed(true);
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-2">
                <div className={`sticky top-28 rounded-2xl p-6 border ${
                  isDark
                    ? 'bg-[#0F0F0F] border-[rgba(0,107,94,0.18)]'
                    : 'bg-white border-[rgba(0,107,94,0.15)] shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
                }`}>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={car.image} alt={car.name} className="w-20 h-14 object-cover rounded-lg" loading="eager" decoding="async" />
                    <div>
                      <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h3>
                      <p className={`text-xs ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{car.category}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar size={14} className="text-[#006B5E] mt-0.5" />
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Pickup</p>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{(bookingData.pickupDate as string) || 'TBD'} {(bookingData.pickupTime as string) || ''}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={14} className="text-[#006B5E] mt-0.5" />
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Return</p>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{(bookingData.returnDate as string) || 'TBD'} {(bookingData.returnTime as string) || ''}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-[#006B5E] mt-0.5" />
                      <div>
                        <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>Location</p>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{(bookingData.pickupLocation as string) || 'TBD'}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 pt-6 space-y-2 text-sm border-t ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
                    <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                      <span>${dailyRate} x {totalDays} days</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                      <span>Insurance</span>
                      <span>${insurance}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                      <span>Delivery Fee</span>
                      <span>${deliveryFee}</span>
                    </div>
                    <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                      <span>Taxes</span>
                      <span>${taxes}</span>
                    </div>
                  </div>

                  <div className={`mt-4 pt-4 flex justify-between items-center border-t ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Total</span>
                    <span className="text-2xl font-black text-[#006B5E]">${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ConfirmationScreen car={car} total={total} bookingRef={bookingRef} onHome={() => navigate('/')} />
        )}
      </div>
    </div>
  );
}

function Step1Form({ defaultValues, onSubmit, onDateChange }: { defaultValues: Record<string, unknown>; onSubmit: (data: Record<string, unknown>) => void; onDateChange?: (data: Partial<Record<string, unknown>>) => void }) {
  const { isDark } = useTheme();
  const inputCls = useInputCls();
  const labelCls = useLabelCls();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.infer<typeof step1Schema>>({ resolver: zodResolver(step1Schema) as never, defaultValues: defaultValues as z.infer<typeof step1Schema> });

  const pickupDate = watch('pickupDate');
  const returnDate = watch('returnDate');
  const pickupTime = watch('pickupTime');
  const returnTime = watch('returnTime');

  useEffect(() => {
    if (onDateChange) {
      onDateChange({ pickupDate, returnDate, pickupTime, returnTime });
    }
  }, [pickupDate, returnDate, pickupTime, returnTime, onDateChange]);

  return (
    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className={`text-3xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Rental Details</h2>

      <div>
        <label className={labelCls}>Pick-up Location</label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
          <input {...register('pickupLocation')} className={`${inputCls} pl-10`} placeholder="Enter city or airport" />
        </div>
        {errors.pickupLocation && <p className="mt-1 text-xs text-red-500">{errors.pickupLocation.message as string}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Pick-up Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
            <input type="date" {...register('pickupDate')} className={`${inputCls} pl-10`} />
          </div>
          {errors.pickupDate && <p className="mt-1 text-xs text-red-500">{errors.pickupDate.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>Pick-up Time</label>
          <div className="relative">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
            <input type="time" {...register('pickupTime')} className={`${inputCls} pl-10`} />
          </div>
          {errors.pickupTime && <p className="mt-1 text-xs text-red-500">{errors.pickupTime.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Return Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
            <input type="date" {...register('returnDate')} className={`${inputCls} pl-10`} />
          </div>
          {errors.returnDate && <p className="mt-1 text-xs text-red-500">{errors.returnDate.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>Return Time</label>
          <div className="relative">
            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
            <input type="time" {...register('returnTime')} className={`${inputCls} pl-10`} />
          </div>
          {errors.returnTime && <p className="mt-1 text-xs text-red-500">{errors.returnTime.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Driver Age</label>
          <select {...register('driverAge')} className={inputCls}>
            <option value="">Select age</option>
            {Array.from({ length: 46 }, (_, i) => i + 25).map((age) => <option key={age} value={age}>{age}</option>)}
          </select>
          {errors.driverAge && <p className="mt-1 text-xs text-red-500">{errors.driverAge.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>Promo Code</label>
          <div className="relative">
            <Gift size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
            <input {...register('promoCode')} className={`${inputCls} pl-10`} placeholder="Optional" />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full mt-4 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all flex items-center justify-center gap-2">
        Proceed to Details
        <ChevronRight size={16} />
      </button>
    </motion.form>
  );
}

function Step2Form({ defaultValues, onBack, onSubmit }: { defaultValues: Record<string, unknown>; onBack: () => void; onSubmit: (data: Record<string, unknown>) => void }) {
  const { isDark } = useTheme();
  const inputCls = useInputCls();
  const labelCls = useLabelCls();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof step2Schema>>({ resolver: zodResolver(step2Schema) as never, defaultValues: defaultValues as z.infer<typeof step2Schema> });

  return (
    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={onBack} className={`p-2 rounded-xl border transition-colors ${
          isDark ? 'border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-white hover:border-[#006B5E]' : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#006B5E]'
        }`}>
          <ArrowLeft size={16} />
        </button>
        <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Personal Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First Name</label>
          <input {...register('firstName')} className={inputCls} />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>Last Name</label>
          <input {...register('lastName')} className={inputCls} />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message as string}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Email</label>
        <input type="email" {...register('email')} className={inputCls} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>}
      </div>

      <div>
        <label className={labelCls}>Phone</label>
        <input {...register('phone')} className={inputCls} placeholder="+1 (555) 000-0000" />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message as string}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>License Number</label>
          <input {...register('licenseNumber')} className={inputCls} />
          {errors.licenseNumber && <p className="mt-1 text-xs text-red-500">{errors.licenseNumber.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>License Country</label>
          <input {...register('licenseCountry')} className={inputCls} />
          {errors.licenseCountry && <p className="mt-1 text-xs text-red-500">{errors.licenseCountry.message as string}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Special Requests</label>
        <textarea {...register('specialRequests')} rows={3} className={`${inputCls} resize-none`} placeholder="Any special requirements..." />
      </div>

      <button type="submit" className="w-full mt-4 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all flex items-center justify-center gap-2">
        Proceed to Payment
        <ChevronRight size={16} />
      </button>
    </motion.form>
  );
}

function Step3Form({ defaultValues, onBack, onSubmit }: { defaultValues: Record<string, unknown>; onBack: () => void; onSubmit: (data: Record<string, unknown>) => void }) {
  const { isDark } = useTheme();
  const inputCls = useInputCls();
  const labelCls = useLabelCls();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof step3Schema>>({ resolver: zodResolver(step3Schema) as never, defaultValues: defaultValues as z.infer<typeof step3Schema> });

  return (
    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={onBack} className={`p-2 rounded-xl border transition-colors ${
          isDark ? 'border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:text-white hover:border-[#006B5E]' : 'border-[rgba(0,0,0,0.08)] text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#006B5E]'
        }`}>
          <ArrowLeft size={16} />
        </button>
        <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Payment</h2>
      </div>

      <div className="bg-[rgba(0,107,94,0.08)] border border-[rgba(0,107,94,0.25)] rounded-xl p-4 mb-4">
        <p className="text-xs text-[#006B5E] text-center font-semibold">
          🔒 This is a demo booking. No real payment will be processed.
        </p>
      </div>

      <div>
        <label className={labelCls}>Card Number</label>
        <div className="relative">
          <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006B5E]" />
          <input {...register('cardNumber')} maxLength={19} className={`${inputCls} pl-10`} placeholder="0000 0000 0000 0000" />
        </div>
        {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber.message as string}</p>}
      </div>

      <div>
        <label className={labelCls}>Cardholder Name</label>
        <input {...register('cardName')} className={inputCls} />
        {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName.message as string}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Expiry Date</label>
          <input {...register('expiry')} placeholder="MM/YY" maxLength={5} className={inputCls} />
          {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>CVV</label>
          <input type="password" {...register('cvv')} maxLength={4} className={inputCls} />
          {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv.message as string}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Billing Address</label>
        <textarea {...register('billingAddress')} rows={2} className={`${inputCls} resize-none`} />
        {errors.billingAddress && <p className="mt-1 text-xs text-red-500">{errors.billingAddress.message as string}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>ZIP / Postal</label>
          <input {...register('zip')} className={inputCls} />
          {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip.message as string}</p>}
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <input {...register('country')} className={inputCls} />
          {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message as string}</p>}
        </div>
      </div>

      <button type="submit" className="w-full mt-4 py-4 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,107,94,0.4)] transition-all">
        Confirm Booking
      </button>
    </motion.form>
  );
}

function ConfirmationScreen({ car, total, bookingRef, onHome }: { car: typeof cars[0]; total: number; bookingRef: string; onHome: () => void }) {
  const { isDark } = useTheme();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-lg mx-auto text-center pt-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 mx-auto rounded-full bg-[rgba(0,107,94,0.15)] border border-[rgba(0,107,94,0.3)] flex items-center justify-center"
      >
        <Check size={40} className="text-[#006B5E]" />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`mt-8 text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
        Booking Confirmed!
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`mt-2 ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
        Your booking reference
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-2 text-2xl font-black text-[#006B5E] font-mono tracking-widest">
        {bookingRef}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 rounded-2xl p-6 text-left border ${
          isDark ? 'bg-[#0F0F0F] border-[rgba(0,107,94,0.18)]' : 'bg-white border-[rgba(0,107,94,0.15)] shadow-[0_8px_30px_rgba(0,107,94,0.08)]'
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <img src={car.image} alt={car.name} className="w-20 h-14 object-cover rounded-lg" loading="eager" decoding="async" />
          <div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{car.name}</h3>
            <p className={`text-xs ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>{car.category}</p>
          </div>
        </div>
        <div className={`pt-4 space-y-2 text-sm border-t ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
          <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
            <span>Total Paid</span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>${total}</span>
          </div>
          <div className={`flex justify-between ${isDark ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
            <span>Status</span>
            <span className="text-[#006B5E] font-semibold">Confirmed</span>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className={`flex items-center gap-2 px-6 py-3 border text-sm font-semibold rounded-xl transition-all ${
          isDark ? 'border-[rgba(255,255,255,0.08)] text-white hover:border-[#006B5E] hover:text-[#00B899]' : 'border-[rgba(0,0,0,0.08)] text-[#0A0A0A] hover:border-[#006B5E] hover:text-[#006B5E]'
        }`}>
          <Download size={16} />
          Download Confirmation
        </button>
        <button onClick={onHome} className="flex items-center gap-2 px-6 py-3 bg-[#006B5E] hover:bg-[#008C79] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_25px_rgba(0,107,94,0.4)] transition-all">
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
}

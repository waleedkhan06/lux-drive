import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Fleet from '@/pages/Fleet';
import CarDetail from '@/pages/CarDetail';
import Booking from '@/pages/Booking';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import MyBookings from '@/pages/MyBookings';
import Wishlist from '@/pages/Wishlist';
import FAQ from '@/pages/FAQ';
import Chatbot from '@/components/Chatbot';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/fleet"
          element={
            <PageTransition>
              <Fleet />
            </PageTransition>
          }
        />
        <Route
          path="/fleet/:carId"
          element={
            <PageTransition>
              <CarDetail />
            </PageTransition>
          }
        />
        <Route
          path="/booking/:carId"
          element={
            <PageTransition>
              <Booking />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PageTransition>
              <MyBookings />
            </PageTransition>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Wishlist />
            </PageTransition>
          }
        />
        <Route
          path="/faq"
          element={
            <PageTransition>
              <FAQ />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--lux-bg)', color: 'var(--lux-text)' }}>
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <Chatbot />
        </div>
      </LenisProvider>
      <SpeedInsights />
    </BrowserRouter>
  );
}

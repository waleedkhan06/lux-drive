# LuxDrive — Premium Luxury Car Rental

A modern, full-featured luxury car rental web application built with React, TypeScript, Tailwind CSS, and Framer Motion. Experience the world's most exclusive fleet with seamless booking, authentication, and a stunning user interface.

## ✨ Features

- **🏎️ 20+ Luxury Vehicles** — Ferrari, Lamborghini, Bugatti, Rolls-Royce, Bentley, McLaren & more
- **🎠 Hero Carousel** — Animated car showcase with live specs (top speed, 0–100)
- **🔍 Full Fleet Page** — Search, filter by brand/type/fuel/seats, sort by price or rating
- **📱 Car Detail Pages** — Image gallery, full specs, features, similar cars
- **📅 Booking System** — Multi-step booking with dynamic pricing based on dates
- **🔐 Clerk Authentication** — Sign in / Sign up with user management
- **❤️ Wishlist** — Save favourite cars (authenticated users)
- **🤖 Smart Chatbot** — Floating concierge with 25+ Q&A pairs and quick replies
- **❓ FAQ Page** — Categorised accordion FAQ
- **🌙 Dark / Light Theme** — Full theme support across all pages
- **📱 Responsive Design** — Mobile-first, works on all screen sizes
- **⚡ Performance Optimized** — LCP < 2.5s, RES 90+, lazy loading, code splitting

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework with type safety |
| Vite 7 | Ultra-fast build tool |
| Tailwind CSS v3 | Utility-first CSS framework |
| Framer Motion | Production-ready animations |
| React Router v7 | Client-side routing |
| Clerk | Authentication & user management |
| Lenis | Butter-smooth scrolling |
| Lucide React | Beautiful icon library |
| React Hook Form + Zod | Form validation |
| shadcn/ui | High-quality component library |
| Vercel Speed Insights | Performance monitoring |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/waleedkhan06/lux-drive.git
cd lux-drive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Get your Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # Shared components
│   ├── ui/           # shadcn/ui base components
│   ├── Navbar.tsx    # Navigation header
│   ├── Footer.tsx    # Footer component
│   ├── Chatbot.tsx   # AI chatbot assistant
│   └── ScrollReveal.tsx # Scroll animations
├── context/          # React Context providers
│   ├── ThemeContext.tsx    # Dark/light theme
│   └── WishlistContext.tsx # Wishlist state
├── data/             # Static data
│   └── index.ts      # Cars, testimonials, cities
├── hooks/            # Custom React hooks
│   └── use-mobile.ts # Mobile detection
├── pages/            # Route-level page components
│   ├── Home.tsx      # Landing page
│   ├── Fleet.tsx     # Car listing
│   ├── CarDetail.tsx # Individual car page
│   ├── Booking.tsx   # Booking flow
│   ├── MyBookings.tsx # User bookings
│   └── ...
├── types/            # TypeScript definitions
│   └── index.ts      # Core types
└── lib/              # Utility functions
    └── utils.ts      # Helper functions
public/
└── images/           # All static image assets
```

## 🌍 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key | ✅ |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add `VITE_CLERK_PUBLISHABLE_KEY` to environment variables
4. Deploy automatically on every push

### Other Platforms

```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## ⚡ Performance Features

- **Code Splitting** - Automatic vendor chunk splitting
- **Image Optimization** - Lazy loading with proper attributes
- **Critical CSS** - Inlined critical styles
- **Font Optimization** - Preconnect and display=swap
- **Bundle Analysis** - Optimized chunk sizes
- **Monitoring** - Vercel Speed Insights integration

## 🎨 Design System

- **Color Palette** - Emerald (#006B5E) primary with dark/light variants
- **Typography** - Inter font family with weight variations
- **Spacing** - Consistent Tailwind spacing scale
- **Animations** - Smooth Framer Motion transitions
- **Components** - Reusable shadcn/ui components

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [LuxDrive](https://github.com/waleedkhan06/lux-drive)

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Vercel](https://vercel.com) for hosting and Speed Insights
- [Framer Motion](https://www.framer.com/motion/) for beautiful animations
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling

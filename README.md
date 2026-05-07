# LuxDrive — Premium Luxury Car Rental

A modern, full-featured luxury car rental web application built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **20+ Luxury Vehicles** — Ferrari, Lamborghini, Bugatti, Rolls-Royce, Bentley, McLaren & more
- **Hero Carousel** — Animated car showcase with live specs (top speed, 0–100)
- **Full Fleet Page** — Search, filter by brand/type/fuel/seats, sort by price or rating
- **Car Detail Pages** — Image gallery, full specs, features, similar cars
- **Booking Flow** — Multi-step booking with date picker and order summary
- **Clerk Authentication** — Sign in / Sign up with user management
- **Wishlist** — Save favourite cars (authenticated users)
- **Smart Chatbot** — Floating concierge with 25+ Q&A pairs and quick replies
- **FAQ Page** — Categorised accordion FAQ
- **Dark / Light Theme** — Full theme support across all pages
- **Responsive Design** — Mobile-first, works on all screen sizes

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| React Router v7 | Routing |
| Clerk | Authentication |
| Lenis | Smooth scrolling |
| Lucide React | Icons |

## Getting Started

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

```bash
cp .env.example .env
```

Open `.env` and add your [Clerk](https://dashboard.clerk.com) publishable key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/       # Shared components (Navbar, Footer, Chatbot, ScrollReveal)
│   └── ui/           # shadcn/ui base components
├── context/          # React Context (ThemeContext, WishlistContext)
├── data/             # Car data, testimonials, cities
├── hooks/            # Custom React hooks
├── pages/            # Route-level page components
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
public/
└── images/           # All static image assets
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key (required) |

## License

MIT © LuxDrive

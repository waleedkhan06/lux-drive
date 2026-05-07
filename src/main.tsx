import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from './context/ThemeContext'
import { WishlistProvider } from './context/WishlistContext'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string
if (!clerkPubKey) {
  console.error('Missing VITE_CLERK_PUBLISHABLE_KEY — add it to your Vercel environment variables')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <ThemeProvider>
        <WishlistProvider>
          <App />
          <SpeedInsights />
        </WishlistProvider>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
)

import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

interface WishlistContextValue {
  wishlist: string[];
  isWishlisted: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue>({
  wishlist: [],
  isWishlisted: () => false,
  toggle: () => {},
  count: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user } = useUser();
  const storageKey = `lux-wishlist-${user?.id ?? 'guest'}`;

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const isWishlisted = (id: string) => wishlist.includes(id);

  const toggle = (id: string) => {
    if (!isSignedIn) return;
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggle, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

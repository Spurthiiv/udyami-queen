import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'customer_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function isWishlisted(productId) {
    return items.some((i) => i.id === productId);
  }

  function toggleWishlist(product) {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          seller: product.seller,
          price: product.price,
          color: product.color,
        },
      ];
    });
  }

  function removeFromWishlist(productId) {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
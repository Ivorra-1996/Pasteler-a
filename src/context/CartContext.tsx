'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { CartItem, Product } from '@/types/cart';
import { getCartData, setCartData } from '@/utils/cartUtils';

type CartContextValue = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (producto: Product, quantity: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * Carrito compartido por toda la app (Header, home, /carrito/info), para que
 * Header y Footer puedan vivir en el layout raíz sin desmontarse al navegar,
 * mostrando siempre el contador actualizado.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const isFirstSave = useRef(true);

  // Cargamos el carrito guardado al montar la app.
  useEffect(() => {
    setCart(getCartData());
  }, []);

  // Persistimos cada cambio (se ignora la primera pasada, antes de cargar
  // los datos guardados, para no pisarlos con el estado inicial vacío).
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    setCartData(cart);
  }, [cart]);

  const addToCart = (producto: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === producto.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: producto.id,
          name: producto.name,
          price: producto.price,
          quantity,
          image: producto.image,
        },
      ];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

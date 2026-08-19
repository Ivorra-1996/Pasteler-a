'use client';
import React, { useEffect, useState } from 'react';
import styles from './AddToCart.module.css';
import { useRouter } from 'next-nprogress-bar';
import { ShoppingCart } from 'lucide-react';
import { setCartData } from '@/utils/cartUtils';
import type { CartItem } from '@/types/cart';

type AddToCartProps = {
  cart: CartItem[]; // Recibe el carrito como prop
};

const AddToCart: React.FC<AddToCartProps> = ({cart}) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const { push } = useRouter();

  const goCart = () => {
      setCartData(cart);
      push('/carrito/info/');
  };
  // Actualizamos el cartCount cada vez que el carrito cambia
  useEffect(() => {
    // sumamos las cantidades de cada producto en el carrito
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQuantity);
  }, [cart]);

  return (
    <button type="button" className={styles.cartContainer} onClick={goCart} aria-label="Ver carrito">
      <ShoppingCart className={styles.cartImage} strokeWidth={1.75} />
      {cartCount > 0 && <p className={styles.cartCount}>{cartCount}</p>}
    </button>
  );
};

export default AddToCart;

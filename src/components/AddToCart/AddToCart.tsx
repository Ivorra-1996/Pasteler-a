'use client';
import React from 'react';
import styles from './AddToCart.module.css';
import { useRouter } from 'next-nprogress-bar';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const AddToCart = () => {
  const { cartCount } = useCart();
  const { push } = useRouter();

  const goCart = () => {
    push('/carrito/info/');
  };

  return (
    <button type="button" className={styles.cartContainer} onClick={goCart} aria-label="Ver carrito">
      <ShoppingCart className={styles.cartImage} strokeWidth={1.75} />
      {cartCount > 0 && <p className={styles.cartCount}>{cartCount}</p>}
    </button>
  );
};

export default AddToCart;

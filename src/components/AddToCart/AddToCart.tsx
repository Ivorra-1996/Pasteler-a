'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AddToCart.module.css';
import { useRouter } from 'next-nprogress-bar';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const PREVIEW_LIMIT = 4;

const AddToCart = () => {
  const { cart, cartCount } = useCart();
  const { push } = useRouter();
  const [hovered, setHovered] = useState(false);

  const goCart = () => {
    push('/carrito/info/');
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const visibleItems = cart.slice(0, PREVIEW_LIMIT);
  const extraCount = cart.length - visibleItems.length;

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button type="button" className={styles.cartContainer} onClick={goCart} aria-label="Ver carrito">
        <ShoppingCart className={styles.cartImage} strokeWidth={1.75} />
        {cartCount > 0 && <p className={styles.cartCount}>{cartCount}</p>}
      </button>
      <AnimatePresence>
        {hovered && cart.length > 0 && (
          <motion.div
            className={styles.preview}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className={styles.previewList}>
              {visibleItems.map((item) => (
                <li key={item.id} className={styles.previewItem}>
                  <Image src={item.image} alt={item.name} width={40} height={40} className={styles.previewImage} />
                  <div className={styles.previewDetails}>
                    <span className={styles.previewName}>{item.name}</span>
                    <span className={styles.previewQty}>{item.quantity} × ${item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
            {extraCount > 0 && <p className={styles.previewMore}>+{extraCount} más</p>}
            <div className={styles.previewFooter}>
              <span>Total</span>
              <span className={styles.previewTotal}>${total}</span>
            </div>
            <button type="button" className={styles.previewButton} onClick={goCart}>
              Ver carrito completo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCart;

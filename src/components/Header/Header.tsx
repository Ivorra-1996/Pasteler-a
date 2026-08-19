'use client';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Divider } from '../Divider';
import { AddToCart } from '../AddToCart';
import type { CartItem } from '@/types/cart';

type HeaderProps = {
  cart: CartItem[]; // Recibe el carrito como prop
};

const Header: React.FC<HeaderProps> = ({ cart }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.content}>
        <a href="#">Inicio</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
        <a href="#catalogo">Pedidos</a>
        <AddToCart cart={cart} /> {/* Pasa el carrito a AddToCart */}
      </div>
      <Divider />
    </div>
  );
};

export default Header;

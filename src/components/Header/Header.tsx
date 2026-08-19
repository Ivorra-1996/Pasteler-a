'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { Divider } from '../Divider';
import { AddToCart } from '../AddToCart';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // El header es sticky, así que si el navegador restaura una posición de
  // scroll vieja al recargar (F5), el header puede quedar tapando contenido.
  // Evitamos eso arrancando siempre arriba del todo, salvo que la URL apunte
  // a una sección puntual (#nosotros, #catalogo, #contacto).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.content}>
        <Link href="/">Inicio</Link>
        <Link href="/#nosotros">Nosotros</Link>
        <Link href="/#contacto">Contacto</Link>
        <Link href="/#catalogo">Pedidos</Link>
        <AddToCart />
      </div>
      <Divider />
    </div>
  );
};

export default Header;

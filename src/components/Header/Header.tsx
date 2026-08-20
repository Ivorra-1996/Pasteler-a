'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  // a una sección puntual (#nosotros, #catalogo, #faq, #contacto).
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
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className={styles.brand}>Dulce encanto</Link>
        <div className={styles.right}>
          {/* Orden igual al de las secciones en la home: Inicio, Catálogo, Nosotros, FAQ, Contacto */}
          <nav className={styles.nav}>
            <Link href="/">Inicio</Link>
            <Link href="/#catalogo" className={styles.cta}>Catálogo</Link>
            <Link href="/#nosotros">Nosotros</Link>
            <Link href="/#faq">Preguntas</Link>
            <Link href="/#contacto">Contacto</Link>
          </nav>
          <AddToCart />
        </div>
      </motion.div>
      <Divider />
    </div>
  );
};

export default Header;

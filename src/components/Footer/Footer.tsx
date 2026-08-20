'use client';
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

// lucide-react no incluye íconos de marcas (Instagram, etc.) por temas de
// trademark, así que dibujamos uno propio con el mismo estilo (stroke-based).
const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Datos de contacto de ejemplo (mock) — reemplazar por los reales.
 */
const CONTACTO = {
  telefono: '+54 11 5555-5555',
  email: 'hola@dulceencanto.com.ar',
  instagram: '@dulceencanto',
  direccion: 'Av. Caseros 3039, Piso 2, Parque Patricios, CABA',
};

const Footer = () => {
  return (
    <footer id="contacto" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>Dulce encanto</span>
          <p className={styles.tagline}>Pastelería artesanal en Parque Patricios, desde 1999.</p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Navegación</span>
          <Link href="/">Inicio</Link>
          <Link href="/#nosotros">Nosotros</Link>
          <Link href="/#catalogo">Catálogo</Link>
          <Link href="/#faq">Preguntas frecuentes</Link>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Contacto</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACTO.direccion)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLine}
          >
            <MapPin size={15} strokeWidth={1.75} />
            {CONTACTO.direccion}
          </a>
          <a href={`tel:${CONTACTO.telefono}`} className={styles.contactLine}>
            <Phone size={15} strokeWidth={1.75} />
            {CONTACTO.telefono}
          </a>
          <a href={`mailto:${CONTACTO.email}`} className={styles.contactLine}>
            <Mail size={15} strokeWidth={1.75} />
            {CONTACTO.email}
          </a>
          <span className={styles.contactLine}>
            <InstagramIcon />
            {CONTACTO.instagram}
          </span>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 1999-2025 Dulce encanto S.R.L</p>
        <button
          type="button"
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Volver arriba
          <ArrowUp size={14} strokeWidth={2.5} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

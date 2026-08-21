'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { Divider } from '../Divider';
import { AddToCart } from '../AddToCart';

// Secciones de la home que el nav puede resaltar mientras se scrollea,
// en el mismo orden en que aparecen en la página (importa para el cálculo).
const SECTION_IDS = ['catalogo', 'nosotros', 'faq', 'contacto'];
const ACTIVATION_LINE = 140;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

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

  // Resalta en el nav qué sección de la home está a la vista mientras se
  // scrollea: la "activa" es la última sección (en orden de página) cuyo
  // borde superior ya cruzó la línea de activación. Se vuelve a armar en
  // cada cambio de ruta porque el Header no se desmonta al navegar (vive
  // en el layout raíz). No usa IntersectionObserver por sección porque con
  // secciones muy altas (como el Catálogo) dos pueden quedar "intersecting"
  // al mismo tiempo y no hay forma confiable de saber cuál ganó.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) {
      setActiveSection(null);
      return;
    }
    const onScroll = () => {
      // El Footer (última sección) suele ser más bajo que el viewport, así
      // que su borde superior puede no llegar nunca a cruzar la línea de
      // activación aunque se llegue al final de la página. Al tocar fondo,
      // la última sección se marca activa sin importar esa línea.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= ACTIVATION_LINE) {
          current = el.id;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const linkClass = (id: string) => (isHome && activeSection === id ? styles.active : '');

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
            <Link href="/" className={isHome && !activeSection ? styles.active : ''}>Inicio</Link>
            <Link href="/#catalogo" className={`${styles.cta} ${linkClass('catalogo')}`}>Catálogo</Link>
            <Link href="/#nosotros" className={linkClass('nosotros')}>Nosotros</Link>
            <Link href="/#faq" className={linkClass('faq')}>Preguntas</Link>
            <Link href="/#contacto" className={linkClass('contacto')}>Contacto</Link>
          </nav>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
          <AddToCart />
        </div>
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" onClick={closeMenu} className={isHome && !activeSection ? styles.active : ''}>Inicio</Link>
            <Link href="/#nosotros" onClick={closeMenu} className={linkClass('nosotros')}>Nosotros</Link>
            <Link href="/#faq" onClick={closeMenu} className={linkClass('faq')}>Preguntas</Link>
            <Link href="/#contacto" onClick={closeMenu} className={linkClass('contacto')}>Contacto</Link>
          </motion.nav>
        )}
      </AnimatePresence>
      <Divider />
    </div>
  );
};

export default Header;

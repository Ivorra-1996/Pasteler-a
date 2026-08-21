import React from 'react';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

/**
 * Contenido de ejemplo (placeholder) — reemplazar por reseñas reales de clientes
 * antes de publicar el sitio.
 */
const testimonios = [
  {
    quote: 'Pedimos la torta de chocolate para un cumpleaños y no quedó ni una miga. Se nota que está hecha a mano.',
    name: 'Camila',
    detail: 'Parque Patricios',
  },
  {
    quote: 'Coordinaron todo por mensaje, súper fácil. La torta llegó impecable y en horario.',
    name: 'Martín',
    detail: 'Cliente frecuente',
  },
  {
    quote: 'Se nota la calidad de los ingredientes. Volvemos a pedir siempre que hay una ocasión especial.',
    name: 'Rocío',
    detail: 'Boedo',
  },
];

const Testimonials = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading kicker="Testimonios" title="Lo que dicen quienes ya probaron" />
        </Reveal>
        <div className={styles.grid}>
          {testimonios.map((t, index) => (
            <Reveal key={t.name} delay={index * 0.08} className={styles.card}>
              <Quote className={styles.quoteIcon} size={26} strokeWidth={1.5} />
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.detail}>{t.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

import React from 'react';
import { CakeSlice, ShoppingCart, CheckCircle2, Truck } from 'lucide-react';
import styles from './Process.module.css';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

const pasos = [
  {
    icon: CakeSlice,
    title: 'Elegí tu torta',
    text: 'Recorré el catálogo y encontrá la que mejor va para tu ocasión.',
  },
  {
    icon: ShoppingCart,
    title: 'Sumala al carrito',
    text: 'Elegí la cantidad y agregala — podés seguir mirando el resto del catálogo.',
  },
  {
    icon: CheckCircle2,
    title: 'Confirmá el pedido',
    text: 'Revisá el resumen de tu compra y confirmá desde el carrito.',
  },
  {
    icon: Truck,
    title: 'Coordinamos todo',
    text: 'Te contactamos para definir pago y entrega, sin vueltas.',
  },
];

const Process = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading kicker="Cómo pedir" title="De la pantalla a tu mesa" />
        </Reveal>
        <div className={styles.steps}>
          {pasos.map((paso, index) => (
            <Reveal key={paso.title} delay={index * 0.08} className={styles.step}>
              <div className={styles.stepIcon}>
                <paso.icon size={22} strokeWidth={1.75} />
              </div>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{paso.title}</h3>
              <p>{paso.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;

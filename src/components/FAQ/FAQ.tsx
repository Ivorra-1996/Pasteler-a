'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

const preguntas = [
  {
    question: '¿Con cuánta anticipación tengo que pedir mi torta?',
    answer: 'Recomendamos reservar con al menos 5 días de anticipación. Para casamientos o eventos grandes, con 3 semanas alcanza para coordinar todo con tranquilidad.',
  },
  {
    question: '¿Hacen envíos a domicilio?',
    answer: 'Sí, hacemos envíos en Parque Patricios y barrios cercanos (Boedo, Barracas, Constitución). Para otras zonas de CABA, consultanos por WhatsApp.',
  },
  {
    question: '¿Piden anticipo para reservar el pedido?',
    answer: 'Sí, pedimos un anticipo del 50% para confirmar la reserva. El resto se abona al retirar o recibir la torta.',
  },
  {
    question: '¿Puedo elegir el sabor y el relleno?',
    answer: 'Sí, todas las tortas del catálogo tienen variantes de sabor para elegir. Si buscás algo fuera de esas opciones, escribinos y lo vemos juntos.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Tarjeta de crédito o débito, transferencia bancaria, Mercado Pago y efectivo.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.section}>
      <Reveal>
        <SectionHeading kicker="Preguntas frecuentes" title="¿Tenés dudas?" />
      </Reveal>
      <Reveal delay={0.1} className={styles.list}>
        {preguntas.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className={styles.item}>
              <button
                type="button"
                className={styles.questionButton}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
              </button>
              <div className={`${styles.answerWrap} ${isOpen ? styles.answerOpen : ''}`}>
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </div>
  );
};

export default FAQ;

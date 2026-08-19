'use client';
import { useState } from 'react';
import styles from './News.module.css';
import { QuantityButton } from '../QuantityButton';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';
import type { Product } from '@/types/cart';

// Ids en el rango 101+ para no colisionar con los productos del Catálogo (que usan 1-7)
const productos: Product[] = [
  {
    id: 101,
    name: 'Torta de chocolate',
    description: 'Capas de bizcocho de chocolate húmedo y esponjoso...',
    price: '30.00',
    image: '/img/pexels-abhinavcoca-291528.jpg',
  },
  {
    id: 102,
    name: 'Torta de Nueces',
    description: 'Bizcocho húmedo con nueces caramelizadas y un toque de canela.',
    price: '1200',
    image: '/img/pexels-valeriya-827516.jpg',
  },
  {
    id: 103,
    name: 'Torta Cremosa',
    description: 'Bizcocho esponjoso cubierto con ganache cremoso y brillante.',
    price: '1500',
    image: '/img/pexels-eric-mufasa-578798-1414234.jpg',
  },
];

type NewsProps = {
  addToCart: (producto: Product, cantidad: number) => void;
};

const News = ({ addToCart }: NewsProps) => {
  const [expandido, setExpandido] = useState<number>(101);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleExpand = (id: number) => {
    setExpandido(id);
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  return (
    <div className={styles.section}>
      <Reveal>
        <SectionHeading kicker="Novedades" title="Recién salidas del horno" />
      </Reveal>
      <div className={styles.novedades}>
        {productos.map((producto, index) => (
          <Reveal
            key={producto.id}
            delay={index * 0.08}
            className={`${styles.revealCard} ${expandido === producto.id ? styles.revealExpanded : ''}`}
          >
            <div
              onClick={() => handleExpand(producto.id)}
              className={styles.producto}
            >
              <img src={producto.image} alt={producto.name} className={styles.imagen} />
              {expandido === producto.id && (
                <div className={styles.info}>
                  <h3>{producto.name}</h3>
                  <p>{producto.description}</p>
                  <div className={styles.content}>
                    <p className={styles.valor}>$ {producto.price}</p>
                    <QuantityButton onQuantityChange={handleQuantityChange} />
                    <button
                      className={styles.boton}
                      onClick={() => addToCart(producto, selectedQuantity)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default News;

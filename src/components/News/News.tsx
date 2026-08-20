'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

const AUTOPLAY_MS = 4000;

const News = ({ addToCart }: NewsProps) => {
  const [expandido, setExpandido] = useState<number>(101);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(0);

  const handleExpand = (id: number) => {
    indexRef.current = productos.findIndex((p) => p.id === id);
    setExpandido(id);
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  // Carrusel automático: avanza de imagen en imagen, pero se detiene
  // apenas el mouse pasa por encima (o si el usuario prefiere menos animaciones).
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % productos.length;
      setExpandido(productos[indexRef.current].id);
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className={styles.section}>
      <Reveal>
        <SectionHeading kicker="Novedades" title="Recién salidas del horno" />
      </Reveal>
      <div
        className={styles.novedades}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
              <div className={styles.imageWrap}>
                <Image
                  src={producto.image}
                  alt={producto.name}
                  fill
                  sizes="(max-width: 600px) 100vw, 450px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {expandido === producto.id && (
                <div className={styles.info}>
                  <div className={styles.productHeader}>
                    <h3>{producto.name}</h3>
                    <p className={styles.valor}>$ {producto.price}</p>
                  </div>
                  <p>{producto.description}</p>
                  <div className={styles.purchaseActions}>
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

'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './News.module.css';
import { QuantityButton } from '../QuantityButton';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';
import type { Product } from '@/types/cart';
import { productos as catalogProductos } from '@/data/products';

// Destacamos 3 productos del catálogo acá, con una foto distinta a la que
// usa el Catálogo (misma torta, otro ángulo) para no repetir la misma imagen
// en las dos secciones. Ids en el rango 101+ para no colisionar con los
// ids del Catálogo (que usan 1-5).
const NEWS_PHOTOS: Record<number, string> = {
  1: '/img/bizcochuelo-2.jpg',
  2: '/img/bizcochuelo-chocolate-2.jpg',
  3: '/img/budin-de-pan-2.jpg',
};

const productos: Product[] = Object.entries(NEWS_PHOTOS).map(([catalogId, image]) => {
  const producto = catalogProductos.find((p) => p.id === Number(catalogId))!;
  return {
    id: producto.id + 100,
    name: producto.name,
    description: producto.description,
    price: String(producto.price),
    image,
  };
});

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

'use client';
import { useState } from 'react';
import styles from './News.module.css';
import { Title } from '../Title';
import { QuantityButton } from '../QuantityButton';
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
    name: 'Producto 2',
    description: 'Descripción del producto 2.',
    price: '1500',
    image: '/img/pexels-valeriya-827516.jpg',
  },
  {
    id: 103,
    name: 'Producto 3',
    description: 'Descripción del producto 3.',
    price: '2000',
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
    <div>
      <Title title="Novedades" background="#C1652B" />
      <div className={styles.novedades}>
        {productos.map((producto) => (
          <div
            key={producto.id}
            onClick={() => handleExpand(producto.id)}
            className={`${styles.producto} ${expandido === producto.id ? styles.expandido : ''}`}
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
        ))}
      </div>
    </div>
  );
};

export default News;

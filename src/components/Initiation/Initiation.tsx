'use client';
import { useState } from 'react';
import { Header } from '../Header';
import { Catalog } from '../Catalog';
import { Footer } from '../Footer';
import { News } from '../News';
import { Logo } from './components/Logo';
import styles from './Initiation.module.css';
import type { CartItem, Product } from '@/types/cart';

const Initiation = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // Estado del carrito

  const addToCart = (producto: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === producto.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: producto.id,
            name: producto.name,
            price: producto.price,
            quantity: quantity,
            image: producto.image,
          },
        ];
      }
    });
  };

  return (
    <div>
      <Header cart={cart} /> {/* Pasa el carrito al Header */}
      <Logo />
      <p className={styles.contentText}>
        ♥ Creamos pasteles artesanales que hacen de cada ocasión un momento especial. ♥
      </p>
      <News addToCart={addToCart} />
      <Catalog addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default Initiation;

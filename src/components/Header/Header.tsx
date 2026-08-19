import React from 'react';
import styles from './Header.module.css';
import { Divider } from '../Divider';
import { AddToCart } from '../AddToCart';
import type { CartItem } from '@/types/cart';

type HeaderProps = {
  cart: CartItem[]; // Recibe el carrito como prop
};

const Header: React.FC<HeaderProps> = ({ cart }) => {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <p>Inicio</p>
        <p>Nosotros</p>
        <p>Contacto</p>
        <p>Pedidos</p>
        <AddToCart cart={cart} /> {/* Pasa el carrito a AddToCart */}
      </div>
      <Divider />
    </div>
  );
};

export default Header;

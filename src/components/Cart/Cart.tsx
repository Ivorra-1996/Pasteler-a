'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import style from './Cart.module.css';
import type { CartItem } from '@/types/cart';
import { getCartData, setCartData } from '@/utils/cartUtils';

const BackToCatalog = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className={style.backLink} onClick={onClick}>
    <ArrowLeft size={14} strokeWidth={2.5} />
    Volver al catálogo
  </button>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const isFirstSave = useRef(true);
  const { push } = useRouter();

   // Recuperamos los datos del carrito al montar el componente
  useEffect(() => {
    setCartItems(getCartData());
  }, []); // Solo se ejecuta al montar el componente

  // Guardamos los datos en localStorage cuando cambian los items del carrito
  // (se ignora la primera pasada, antes de que se hayan cargado los datos guardados,
  // para no pisarlos con el estado inicial vacío)
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    setCartData(cartItems);
  }, [cartItems]); // Se ejecuta cada vez que cartItems cambia

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    setConfirmedTotal(totalPrice);
    setOrderPlaced(true);
    setCartItems([]);
  };

  if (orderPlaced) {
    return (
      <div className={style.page}>
        <BackToCatalog onClick={() => push('/')} />
        <div className={style.confirmation}>
          <h2>¡Gracias por tu pedido!</h2>
          <p>
            Confirmamos tu compra por <strong>${confirmedTotal}</strong>. Te vamos a contactar a la brevedad para coordinar el pago y la entrega.
          </p>
          <button className={style.cartCheckout} onClick={() => push('/')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.page}>
      <BackToCatalog onClick={() => push('/')} />
      <div className={style.cartContainer}>
      {/* Left Column: Product List */}
      <div className={style.cartProducts}>
        <h2>Carrito de Compras</h2>
        {cartItems.map((item) => (
          <div key={item.id} className={style.cartItem}>
            <img src={item.image} alt={item.name} className={style.cartItemImage} />
            <div className={style.cartItemDetails}>
              <h4>{item.name}</h4>
              <p>Precio: ${item.price}</p>
              <div className={style.cartItemQuantity}>
                <button type="button" onClick={() => handleQuantityChange(item.id, -1)} aria-label="Disminuir cantidad">
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(item.id, 1)} aria-label="Aumentar cantidad">
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
              <p>Total: ${parseFloat(item.price) * item.quantity}</p>
            </div>
            <button type="button" onClick={() => handleRemoveItem(item.id)} className={style.cartItemRemove}>
              <Trash2 size={14} strokeWidth={2} />
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Right Column: Payment Methods */}
      <div className={style.cartSummary}>
        <h2>Resumen de Compra</h2>
        <p>Total: ${totalPrice}</p>
        <h3>Métodos de Pago</h3>
        <ul>
          <li>Tarjeta de Crédito/Débito</li>
          <li>Transferencia Bancaria</li>
          <li>Mercado Pago</li>
          <li>Pago en efectivo</li>
        </ul>
        <button
          className={style.cartCheckout}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Finalizar Compra
        </button>
      </div>
      </div>
    </div>
  );
};

export default Cart;

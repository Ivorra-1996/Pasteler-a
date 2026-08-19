'use client';
import React, { useEffect, useState } from 'react';
import style from './Cart.module.css';
import type { CartItem } from '@/types/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

   // Recuperamos los datos del carrito al montar el componente
  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      setCartItems(JSON.parse(storedCartData));
    }
  }, []); // Solo se ejecuta al montar el componente

  // Guardamos los datos en localStorage cuando cambian los items del carrito
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartItems));
    }
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

  return (
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
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <p>Total: ${parseFloat(item.price) * item.quantity}</p>
            </div>
            <button onClick={() => handleRemoveItem(item.id)} className={style.cartItemRemove}>
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
        <button className={style.cartCheckout}>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Cart;

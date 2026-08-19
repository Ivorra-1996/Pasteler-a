'use client';
import React, { useState, useEffect } from 'react';
import styles from './QuantityButton.module.css';

type QuantityButtonProps = {
  onQuantityChange: (quantity: number) => void;
};

const QuantityButton: React.FC<QuantityButtonProps> = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  // Usamos un useEffect para llamar a onQuantityChange solo cuando la cantidad cambie
  useEffect(() => {
    if (typeof onQuantityChange === 'function') {
      onQuantityChange(quantity); // Llamamos a onQuantityChange solo cuando es una función válida... Sino da error de que no es una función AAA!!
    }
  }, [quantity, onQuantityChange]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className={styles.quantityButton}>
      <button className={styles.button} onClick={decrease}>
        -
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.button} onClick={increase}>
        +
      </button>
    </div>
  );
};

export default QuantityButton;

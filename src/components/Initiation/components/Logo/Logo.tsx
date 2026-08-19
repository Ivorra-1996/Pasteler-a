'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './Logo.module.css';

// El rombo es un cuadrado rotado 45°, así que se achica (1/√2) para que su
// diagonal ocupe lo mismo que el lado de las otras figuras — mismo tamaño visual.
const SHAPES = [
  { id: 'cuadrado', borderRadius: '0px', restRotate: 0, scale: 1 },
  { id: 'circulo', borderRadius: '50%', restRotate: 0, scale: 1 },
  { id: 'rombo', borderRadius: '0px', restRotate: 45, scale: 0.71 },
  { id: 'suave', borderRadius: '32px', restRotate: 0, scale: 1 },
];

const SHAPE_MS = 2600;
const SPIN = 130;

const Logo = () => {
  const [index, setIndex] = useState(0);

  // El marco va rotando de forma automática entre distintas figuras,
  // siempre entrando desde la derecha y saliendo hacia la izquierda.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SHAPES.length);
    }, SHAPE_MS);

    return () => clearInterval(interval);
  }, []);

  const shape = SHAPES[index];

  return (
    <div className={style.logo}>
      <div className={style.stage}>
        <AnimatePresence initial={false}>
          <motion.div
            key={shape.id}
            className={style.shape}
            style={{ borderRadius: shape.borderRadius }}
            initial={{ opacity: 0, x: 90, rotate: shape.restRotate + SPIN, scale: shape.scale }}
            animate={{ opacity: 1, x: 0, rotate: shape.restRotate, scale: shape.scale }}
            exit={{ opacity: 0, x: -90, rotate: shape.restRotate - SPIN, scale: shape.scale }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className={style.content}>
          <div className={style.horizontalLine}></div>
          <p className={style.brandName}>Dulce encanto</p>
          <div className={style.horizontalLine}></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;

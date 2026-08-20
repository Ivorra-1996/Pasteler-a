'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './Logo.module.css';

// El rombo es un cuadrado rotado 45°, así que se achica (1/√2) para que su
// diagonal ocupe lo mismo que el lado de las otras figuras — mismo tamaño visual.
// El rectángulo usa scaleY distinto de scaleX para achatarse en vez de quedar cuadrado.
const SHAPES = [
  { id: 'cuadrado', borderRadius: '0px', restRotate: 0, scaleX: 1, scaleY: 1 },
  { id: 'circulo', borderRadius: '50%', restRotate: 0, scaleX: 1, scaleY: 1 },
  { id: 'rombo', borderRadius: '0px', restRotate: 45, scaleX: 0.71, scaleY: 0.71 },
  { id: 'rectangulo', borderRadius: '0px', restRotate: 0, scaleX: 1, scaleY: 0.62 },
  { id: 'suave', borderRadius: '32px', restRotate: 0, scaleX: 1, scaleY: 1 },
];

const SHAPE_MS = 2600;

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
        {/* Sombra fija: una segunda figura, desplazada en diagonal, que
            acompaña a la de adelante sin girar — da sensación de profundidad
            permanente en vez de depender de cazar el instante del flip. */}
        <div
          className={style.shapeShadow}
          style={{
            borderRadius: shape.borderRadius,
            transform: `translate(8px, 8px) rotate(${shape.restRotate}deg) scaleX(${shape.scaleX}) scaleY(${shape.scaleY})`,
          }}
        />
        <AnimatePresence initial={false}>
          <motion.div
            key={shape.id}
            className={style.shape}
            style={{ borderRadius: shape.borderRadius }}
            initial={{ opacity: 0, rotateY: 90, rotate: shape.restRotate, scaleX: shape.scaleX, scaleY: shape.scaleY }}
            animate={{ opacity: 1, rotateY: 0, rotate: shape.restRotate, scaleX: shape.scaleX, scaleY: shape.scaleY }}
            exit={{ opacity: 0, rotateY: -90, rotate: shape.restRotate, scaleX: shape.scaleX, scaleY: shape.scaleY }}
            transition={{ duration: 0.7, ease: [0.45, 0, 0.2, 1] }}
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

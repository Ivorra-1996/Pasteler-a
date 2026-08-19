import React from 'react';
import styles from './About.module.css';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

const valores = [
  '100% artesanal',
  'Ingredientes seleccionados',
  'Hecho a pedido',
];

const About = () => {
  return (
    <div id="nosotros" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.media}>
          <img
            src="/img/pexels-valeriya-827516.jpg"
            alt="Torta artesanal recién preparada en el taller de Dulce encanto"
          />
        </Reveal>
        <Reveal delay={0.1} className={styles.copy}>
          <SectionHeading kicker="Nuestra historia" title="Un dulce encanto desde 1999" align="left" />
          <p>
            Dulce encanto nació en Parque Patricios con una idea simple: hornear tortas como las de casa, con
            ingredientes reales y el tiempo que cada receta necesita. Nada de atajos, nada de apuro.
          </p>
          <p>
            Hoy seguimos armando cada torta a mano, una por una, para que cada cumpleaños, casamiento o
            reunión tenga su propio dulce encanto.
          </p>
          <ul className={styles.values}>
            {valores.map((valor) => (
              <li key={valor}>{valor}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

export default About;

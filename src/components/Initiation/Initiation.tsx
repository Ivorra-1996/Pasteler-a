'use client';
import { Catalog } from '../Catalog';
import { News } from '../News';
import { About } from '../About';
import { Process } from '../Process';
import { Testimonials } from '../Testimonials';
import { PaymentMethods } from '../PaymentMethods';
import { FAQ } from '../FAQ';
import { Reveal } from '../Reveal';
import { Logo } from './components/Logo';
import styles from './Initiation.module.css';
import { useCart } from '@/context/CartContext';

const Initiation = () => {
  const { addToCart } = useCart();

  return (
    <div>
      <Reveal>
        <Logo />
        <p className={styles.contentText}>
          ♥ Creamos pasteles artesanales que hacen de cada ocasión un momento especial. ♥
        </p>
      </Reveal>
      <News addToCart={addToCart} />
      <Catalog addToCart={addToCart} />
      <About />
      <Process />
      <Testimonials />
      <PaymentMethods />
      <FAQ />
    </div>
  );
};

export default Initiation;

import React from 'react';
import { CreditCard, Landmark, Wallet, Banknote } from 'lucide-react';
import styles from './PaymentMethods.module.css';
import { Reveal } from '../Reveal';

const metodos = [
  { icon: CreditCard, label: 'Tarjeta de crédito/débito' },
  { icon: Landmark, label: 'Transferencia bancaria' },
  { icon: Wallet, label: 'Mercado Pago' },
  { icon: Banknote, label: 'Efectivo' },
];

const PaymentMethods = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <span className={styles.kicker}>Medios de pago</span>
        </Reveal>
        <div className={styles.row}>
          {metodos.map((metodo, index) => (
            <Reveal key={metodo.label} delay={index * 0.06} className={styles.item}>
              <metodo.icon size={22} strokeWidth={1.75} />
              <span>{metodo.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;

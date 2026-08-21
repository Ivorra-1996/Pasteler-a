import React from 'react';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  kicker: string;
  title: string;
  align?: 'center' | 'left';
  className?: string;
};

const SectionHeading = ({ kicker, title, align = 'center', className }: SectionHeadingProps) => (
  <div className={`${styles.heading} ${align === 'left' ? styles.left : ''} ${className ?? ''}`}>
    <span className={styles.kicker}>{kicker}</span>
    <h2 className={styles.title}>{title}</h2>
  </div>
);

export default SectionHeading;

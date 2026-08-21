import Image from 'next/image';
import styles from './Gallery.module.css';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';

// lucide-react no incluye íconos de marcas por temas de trademark — mismo
// ícono dibujado a mano que usa el Footer.
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Fotos de ejemplo (placeholder) — reemplazar por fotos reales de pedidos
 * entregados en cuanto estén disponibles.
 */
const fotos = [
  { src: '/img/pexels-abhinavcoca-291528.jpg', alt: 'Torta de chocolate entregada a un cliente' },
  { src: '/img/pexels-valeriya-827516.jpg', alt: 'Torta de nueces entregada a un cliente' },
  { src: '/img/pexels-eric-mufasa-578798-1414234.jpg', alt: 'Cheesecake entregado a un cliente' },
];

const Gallery = () => {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <SectionHeading kicker="Galería" title="Pedidos que ya salieron del horno" />
        </Reveal>
        <div className={styles.grid}>
          {fotos.map((foto, index) => (
            <Reveal key={foto.src} delay={index * 0.08} className={styles.photo}>
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <a
            href="https://instagram.com/dulceencanto"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramLink}
          >
            <InstagramIcon />
            Ver más en @dulceencanto
          </a>
        </Reveal>
      </div>
    </div>
  );
};

export default Gallery;

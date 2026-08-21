import Link from 'next/link';
import styles from './NotFound.module.css';
import { SectionHeading } from '../SectionHeading';

const NotFound = () => {
  return (
    <div className={styles.section}>
      <span className={styles.code}>404</span>
      <SectionHeading kicker="Página no encontrada" title="Esta receta no existe" />
      <p className={styles.text}>
        El enlace puede estar roto o la página puede haberse movido. Volvé al inicio o mirá lo que
        tenemos en el catálogo.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>
          Volver al inicio
        </Link>
        <Link href="/#catalogo" className={styles.secondary}>
          Ver catálogo
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

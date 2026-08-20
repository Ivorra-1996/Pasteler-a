import styles from './WhatsAppButton.module.css';

// lucide-react no incluye íconos de marcas (WhatsApp, Instagram, etc.) por temas
// de trademark, así que dibujamos uno propio con el mismo estilo (stroke-based).
const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.83 14.19c-.24.68-1.19 1.25-1.95 1.41-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.17-4.95-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.25-.29.55-.36.74-.36.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.27.37-.22.62-.13.25.09 1.6.76 1.87.89.28.14.46.21.53.32.07.12.07.66-.17 1.32Z" />
  </svg>
);

const WHATSAPP_NUMBER = '5491155555555';
const WHATSAPP_MESSAGE = '¡Hola! Quería consultar por una torta de Dulce encanto.';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
};

export default WhatsAppButton;

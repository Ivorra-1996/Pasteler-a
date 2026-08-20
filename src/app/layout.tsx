import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Mulish } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Configuración de Geist Sans y Mono
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tipografía de marca: Lora (títulos) + Mulish (texto)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Dominio de ejemplo (mock, igual que el resto de los datos de contacto) —
// reemplazar por el dominio real cuando el sitio tenga uno.
const SITE_URL = "https://dulceencanto.com.ar";
const SITE_TITLE = "Dulce encanto";
const SITE_DESCRIPTION = "Pastelería artesanal — tortas hechas a pedido.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${mulish.variable}`}
      >
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

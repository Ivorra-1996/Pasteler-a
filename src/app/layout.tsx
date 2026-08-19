import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Mulish } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dulce encanto",
  description: "Pastelería artesanal — tortas hechas a pedido.",
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
        {children}
      </body>
    </html>
  );
}

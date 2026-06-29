import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CRUD Beneficiarios",
  description: "Proyecto CRUD de Beneficiarios - Next.js + MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <nav className="navbar">
          <span className="navbar-brand">CRUD Beneficiarios</span>
          <Link href="/" className="navbar-link">Inicio</Link>
          <Link href="/localidades" className="navbar-link">Localidades</Link>
          <Link href="/programas" className="navbar-link">Programas</Link>
          <Link href="/sectores" className="navbar-link">Sectores</Link>
          <Link href="/modalidades" className="navbar-link">Modalidades</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
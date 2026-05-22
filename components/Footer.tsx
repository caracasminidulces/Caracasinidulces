"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-[#010101] border-t border-brand-gold/10 pt-16 pb-8 px-6 md:px-12 flex flex-col items-center">
      {/* Resplandor sutil dorado de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-brand-gold/5 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center gap-10">
        
        {/* 1. Logotipo Centrado con Efecto */}
        <div className="group cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Caracas Mini Dulces Logo"
            width={160}
            height={60}
            className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* 2. Enlaces Rápidos Simétricos */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs uppercase tracking-[0.2em] text-brand-cream/70 font-medium">
          <Link href="/" className="hover:text-brand-gold transition-colors duration-300">
            Inicio
          </Link>
          <Link href="/dulces" className="hover:text-brand-gold transition-colors duration-300">
            Dulces
          </Link>
          <Link href="/eventos" className="hover:text-brand-gold transition-colors duration-300">
            Eventos
          </Link>
          <Link href="/repostera" className="hover:text-brand-gold transition-colors duration-300">
            Victoria
          </Link>
          <Link href="/contacto" className="hover:text-brand-gold transition-colors duration-300">
            Contacto
          </Link>
        </div>

        {/* Línea divisoria simétrica y sutil */}
        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

        {/* 3. Redes Sociales (Instagram & WhatsApp) */}
        <div className="flex items-center gap-8">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/caracasminidulces?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group text-xs uppercase tracking-[0.15em] text-brand-cream/80 hover:text-brand-gold transition-colors duration-300"
          >
            {/* SVG de Instagram Autohospedado */}
            <svg
              className="w-4 h-4 stroke-current fill-none transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>

          {/* WhatsApp Link */}
          <a
            href="https://wa.me/584141835422"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group text-xs uppercase tracking-[0.15em] text-brand-cream/80 hover:text-brand-gold transition-colors duration-300"
          >
            {/* SVG de WhatsApp Autohospedado */}
            <svg
              className="w-4 h-4 fill-current transition-transform duration-500 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.822 0c3.148.001 6.107 1.227 8.331 3.453 2.224 2.227 3.45 5.187 3.447 8.335-.006 6.502-5.332 11.827-11.828 11.827-2.002-.001-3.972-.51-5.733-1.485L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.389 0 9.773-4.381 9.777-9.772.002-2.61-1.01-5.063-2.851-6.907C16.4 2.08 13.945 1.066 11.336 1.065 5.948 1.065 1.564 5.447 1.56 10.839c-.001 1.637.447 3.235 1.3 4.65L1.88 20.89l5.59-1.466z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* 4. Copyright & Atribución */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-brand-gold/5 text-[10px] tracking-[0.15em] text-brand-cream/40 uppercase">
          <span>&copy; {currentYear} Caracas Mini Dulces. Todos los derechos reservados.</span>
          <span>Repostería Artística Exclusiva</span>
        </div>
      </div>
    </footer>
  );
}

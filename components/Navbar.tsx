"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/dulces", label: "Dulces" },
    { href: "/repostera", label: "Victoria" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#010101]/60 border-b border-brand-gold/10"
    >
      {/* 1. Izquierda: Logo o Nombre Corto */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Mini Logo"
            width={32}
            height={32}
            className="object-contain transition-transform duration-500 ease-luxury group-hover:scale-110"
          />
        </div>
        <span className="hidden sm:inline font-heading text-xs tracking-[0.2em] text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
          CARACAS MINI DULCES
        </span>
      </Link>

      {/* 2. Centro: Menú de Navegación Simétrico */}
      <div className="flex items-center gap-6 md:gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 py-1"
              style={{ color: isActive ? "#E5C414" : "#FDF3BF" }}
            >
              <span className="hover:text-brand-gold transition-colors duration-300">
                {link.label}
              </span>
              {/* Animación del indicador activo */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-line"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* 3. Derecha: Botón de WhatsApp/Contacto Rápido */}
      <div className="flex items-center">
        <a
          href="https://wa.me/584120000000" // Enlace genérico de WhatsApp de Venezuela
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-bg hover:bg-brand-gold transition-all duration-500 ease-luxury"
        >
          Pedir Ahora
        </a>
      </div>
    </motion.nav>
  );
}

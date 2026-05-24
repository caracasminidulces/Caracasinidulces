"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#FDF3BF"
    strokeLinecap="round"
    {...props}
  />
);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/dulces", label: "Dulces" },
    { href: "/eventos", label: "Eventos" },
    { href: "/repostera", label: "Victoria" },
    { href: "/contacto", label: "Contacto" },
  ];

  // Close mobile drawer when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#010101]/60 border-b border-brand-gold/10"
      >
        {/* 1. Izquierda: Logo */}
        <Link href="/" className="flex items-center group z-50">
          <div className="relative h-12 w-16 md:h-14 md:w-20 flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Caracas Mini Dulces"
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className="object-contain transition-transform duration-500 ease-luxury group-hover:scale-110"
              priority
            />
          </div>
        </Link>

        {/* 2. Centro: Menú de Navegación Simétrico Desktop */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
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

        {/* 3. Derecha: Botón de Carrito, WhatsApp/Contacto Rápido Desktop y Botón Móvil */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Botón del Carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 border border-brand-gold/15 hover:border-brand-gold/50 text-brand-gold transition-all duration-300 focus:outline-none flex items-center justify-center group"
            aria-label="Ver carrito"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:scale-105 transition-transform duration-300"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            
            {/* Indicador de cantidad (Badge) */}
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-brand-gold text-brand-bg font-body text-[9px] font-bold rounded-full flex items-center justify-center border border-brand-bg shadow-gold-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href="https://wa.me/584141835422" // WhatsApp de Caracas Mini Dulces
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-bg hover:bg-brand-gold transition-all duration-500 ease-luxury"
          >
            Pedir Ahora
          </a>

          {/* Botón de Menú Hamburguesa Móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden z-50 items-center justify-center p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" }
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Menú Cajón Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.55 }}
            className="fixed inset-0 z-40 w-full h-screen bg-[#010101]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 border-b border-brand-gold/15"
          >
            {/* Luz dorada sutil en el fondo del drawer */}
            <div className="absolute inset-0 bg-gold-radial-glow opacity-25 pointer-events-none" />
            
            {/* Adorno dorado geométrico clásico en las esquinas */}
            <div className="absolute top-20 left-6 w-8 h-8 border-t border-l border-brand-gold/20 pointer-events-none" />
            <div className="absolute top-20 right-6 w-8 h-8 border-t border-r border-brand-gold/20 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-brand-gold/20 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-brand-gold/20 pointer-events-none" />

            {/* Enlaces de navegación */}
            <div className="flex flex-col gap-6 mt-8 justify-center items-center">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 + 0.15, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-base uppercase tracking-[0.25em] font-semibold py-2 block text-center"
                      style={{ color: isActive ? "#E5C414" : "#FDF3BF" }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="active-line-mobile"
                          className="absolute -bottom-1 left-1/4 right-1/4 h-[2px] bg-brand-gold"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Botón de WhatsApp al final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 + 0.2, duration: 0.5 }}
              className="w-full flex justify-center mb-10"
            >
              <a
                href="https://wa.me/584141835422"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] px-8 py-3 border border-brand-gold/40 hover:border-brand-gold text-brand-gold hover:text-brand-bg hover:bg-brand-gold transition-all duration-500 ease-luxury text-center w-full max-w-[280px]"
              >
                Pedir Ahora
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

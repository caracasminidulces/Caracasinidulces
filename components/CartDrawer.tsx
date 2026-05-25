"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
  } = useCart();

  // Bloquear el scroll de la página cuando el carrito está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Generar la URL de WhatsApp con el mensaje preestablecido
  const handleProcessOrder = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map((item) => `• *${item.cantidad}x* ${item.nombre}`)
      .join("\n");

    const message = `¡Hola Victoria! ✨ Me gustaría realizar un pedido con las siguientes piezas de repostería fina:\n\n${itemsText}\n\nQuedo a la espera de tu confirmación para coordinar los detalles. ¡Muchas gracias! 🧑‍🍳🍰`;
    
    const whatsappUrl = `https://wa.me/584141835422?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {/* Backdrop esmerilado */}
      {isCartOpen && (
        <motion.div
          key="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 z-[9998] bg-[#000000]/70 backdrop-blur-sm cursor-pointer"
        />
      )}

      {/* Panel del Drawer */}
      {isCartOpen && (
        <motion.div
          key="cart-panel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 220 }}
          className="fixed top-0 right-0 z-[9999] w-full max-w-md h-[100dvh] bg-[#010101]/95 border-l border-brand-gold/15 shadow-gold-md flex flex-col justify-between"
        >
            {/* Resplandor dorado decorativo de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.015] blur-3xl pointer-events-none rounded-full" />

            {/* Cabecera del Carrito */}
            <div className="p-6 md:p-8 border-b border-brand-gold/10 flex items-center justify-between z-10 relative">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-1">
                  Tu Selección Especial
                </span>
                <h2 className="text-xl md:text-2xl font-heading text-brand-cream font-light tracking-wide">
                  El Carrito ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 border border-brand-gold/10 hover:border-brand-gold/50 text-brand-gold-light hover:text-brand-gold transition-colors duration-300 focus:outline-none"
                aria-label="Cerrar carrito"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Lista de Dulces (Scrollable) */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 z-10 relative custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 border border-dashed border-brand-gold/20 flex items-center justify-center rounded-none mb-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DBC975"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-60"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-light text-brand-cream mb-2 tracking-wider">
                    Bandeja Vacía
                  </h3>
                  <p className="text-xs text-brand-cream/60 font-light leading-relaxed max-w-[240px] font-body mb-6">
                    Aún no has añadido ninguna de nuestras exquisitas creaciones a tu selección.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2 border border-brand-gold/30 hover:border-brand-gold text-brand-gold text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Seguir Explorando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.nombre}
                    className="flex gap-4 p-4 bg-[#050505] border border-brand-gold/5 hover:border-brand-gold/15 transition-all duration-300"
                  >
                    {/* Imagen del dulce */}
                    <div className="relative w-20 h-20 bg-[#0c0c0c] border border-brand-gold/10 flex-shrink-0">
                      <Image
                        src={item.imagen}
                        alt={item.nombre}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Detalles */}
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-sm font-heading font-light tracking-wide text-brand-cream truncate">
                          {item.nombre}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.nombre)}
                          className="text-brand-cream/40 hover:text-brand-gold transition-colors duration-200 p-0.5"
                          aria-label="Eliminar artículo"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>

                      {item.textura && (
                        <p className="text-[9px] text-[#FDF3BF]/60 italic font-light truncate mb-2">
                          {item.textura}
                        </p>
                      )}

                      {/* Controles de Cantidad */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] text-brand-cream/40 font-body uppercase">
                          Cantidad:
                        </span>
                        <div className="flex items-center border border-brand-gold/15 bg-brand-bg select-none">
                          <button
                            onClick={() =>
                              updateQuantity(item.nombre, item.cantidad - 1)
                            }
                            className="px-2 py-1 text-xs text-brand-gold hover:bg-brand-gold/10 transition-colors duration-200 font-medium"
                            aria-label="Disminuir"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs text-brand-cream font-medium font-body w-6 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.nombre, item.cantidad + 1)
                            }
                            className="px-2 py-1 text-xs text-brand-gold hover:bg-brand-gold/10 transition-colors duration-200 font-medium"
                            aria-label="Incrementar"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pie de Página del Carrito */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 border-t border-brand-gold/10 bg-[#020202] z-10 relative">
                {/* Resumen */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cream/60">
                    Total Piezas Seleccionadas:
                  </span>
                  <span className="text-sm font-heading font-medium text-brand-gold">
                    {cartCount} {cartCount === 1 ? "unidad" : "unidades"}
                  </span>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleProcessOrder}
                    className="shimmer-effect w-full py-4 text-center font-semibold text-[10px] tracking-[0.25em] uppercase rounded-none transition-all duration-500 ease-luxury shadow-gold-sm hover:shadow-gold-md text-brand-bg bg-gold-gradient hover:bg-gold-gradient-hover hover:scale-[1.02]"
                  >
                    Procesar Pedido vía WhatsApp
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-[9px] uppercase tracking-[0.2em] text-brand-cream/40 hover:text-brand-gold/80 transition-colors duration-300 text-center py-1 mt-1"
                  >
                    Limpiar Selección
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
    </AnimatePresence>
  );
}

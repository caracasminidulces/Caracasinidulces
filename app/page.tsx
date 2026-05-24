"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  const destacados = [
    {
      nombre: "Mini Pavlova de Gala",
      categoria: "Pavlovas",
      imagen: "/images/dulces/minipavlova.png",
      descripcion: "Elegantes bocados de merengue horneado lentamente, rellenos con una suave corona de crema batida y fresas frescas, o dulce de leche repostero con un toque crocante de nueces.",
      textura: "Merengue etéreo y crujiente con la suavidad de la crema"
    },
    {
      nombre: "Polvorosas Imperiales",
      categoria: "Bocados Finos",
      imagen: "/images/dulces/polvorosas.png",
      descripcion: "Tradicionales polvorosas caraqueñas que se deshacen delicadamente en el paladar. Elaboradas con un toque sutil de vainilla bourbon y espolvoreadas con azúcar fina.",
      textura: "Desmoronamiento suave y fundente al instante"
    },
    {
      nombre: "Brookies Tentación",
      categoria: "Bocados Finos",
      imagen: "/images/dulces/brookies.png",
      descripcion: "La fusión definitiva de dos mundos: una base densa y húmeda de brownie de chocolate belga fusionada con una cubierta crocante de galleta con chispas de chocolate.",
      textura: "Corazón súper meloso con superficie crujiente"
    }
  ];

  const handleAdd = (item: any, index: number) => {
    addToCart({
      nombre: item.nombre,
      descripcion: item.descripcion,
      imagen: item.imagen,
      textura: item.textura,
      categoria: item.categoria
    }, 1);
    setAddedIndex(index);
    setTimeout(() => setAddedIndex(null), 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="w-full min-h-screen bg-brand-bg select-none">
      {/* 1. Sección de Bienvenida Inmersiva */}
      <HeroSection />

      {/* 2. Sección de Adelanto: Dulces Destacados */}
      <section id="coleccion" className="relative z-10 w-full py-24 bg-[#030303] border-t border-brand-gold/5 px-6 md:px-12 flex flex-col items-center">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-brand-gold/[0.02] blur-3xl rounded-full pointer-events-none" />

        <div className="w-full max-w-6xl flex flex-col items-center">
          {/* Cabecera de la Sección */}
          <div className="text-center max-w-xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-3 block">
              Sabores que Enamoran
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-brand-cream mb-4">
              Dulces Destacados
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-4" />
            <p className="text-xs md:text-sm text-brand-cream/70 font-light leading-relaxed font-body">
              Un adelanto sensorial de nuestras creaciones más pedidas. Elaborados artesanalmente 
              con ingredientes de procedencia selecta para garantizar una experiencia sublime.
            </p>
          </div>

          {/* Grid de 3 Tarjetas Destacadas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {destacados.map((item, idx) => (
              <motion.div
                key={item.nombre}
                variants={itemVariants}
                className="group flex flex-col p-6 bg-brand-bg border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury"
              >
                {/* Contenedor de la Imagen Real del Producto */}
                <div className="relative w-full aspect-square bg-[#0c0c0c] border border-brand-gold/5 flex items-center justify-center overflow-hidden mb-6">
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 330px"
                    className="object-cover transition-transform duration-750 ease-in-out group-hover:scale-105"
                  />
                  {/* Efecto de degradado premium sobre la foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                </div>

                <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold-light font-semibold mb-2 block">
                  {item.categoria}
                </span>

                <h3 className="font-heading text-base tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-2">
                  {item.nombre}
                </h3>

                <div className="w-10 h-[1px] bg-brand-gold/20 mb-3 group-hover:w-16 transition-all duration-500" />

                <p className="text-xs text-brand-cream/70 font-light leading-relaxed font-body mb-6 flex-grow">
                  {item.descripcion}
                </p>

                {/* Ficha Sensorial */}
                <div className="mb-6 pt-3 border-t border-brand-gold/5 text-[9px] uppercase tracking-wide text-brand-gold-light italic">
                  <strong className="text-brand-cream/30 font-medium font-body mr-1 not-italic">Sensación:</strong>
                  {item.textura}
                </div>

                {/* Botón Añadir al Carrito */}
                <button
                  onClick={() => handleAdd(item, idx)}
                  className="w-full py-2.5 border border-brand-gold/30 hover:border-brand-gold bg-transparent hover:bg-brand-gold text-brand-gold hover:text-brand-bg text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 focus:outline-none"
                >
                  {addedIndex === idx ? (
                    <>
                      <span>¡Añadido!</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Añadir al Carrito</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA a Galería completa */}
          <Link
            href="/dulces"
            className="shimmer-effect inline-flex items-center justify-center px-8 py-3 border border-brand-gold bg-transparent text-brand-cream hover:text-brand-bg hover:bg-brand-gold font-medium tracking-[0.15em] text-[10px] uppercase rounded-none transition-all duration-500 shadow-gold-sm hover:shadow-gold-md hover:scale-105"
          >
            Ver Toda la Colección
          </Link>
        </div>
      </section>

      {/* 3. Sección de Adelanto: Biografía Corta */}
      <section className="relative z-10 w-full py-24 bg-[#010101] px-6 md:px-12 flex flex-col items-center">
        {/* Glow lateral */}
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-brand-gold/[0.02] blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Columna Texto */}
          <div className="md:col-span-7 flex flex-col">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-3">
              El Corazón del Taller
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-brand-cream mb-6">
              El Arte de Crear Piezas Únicas
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mb-6" />
            <p className="text-xs md:text-sm text-brand-cream/80 font-light leading-relaxed font-body mb-6">
              Para Victoria, la creadora detrás de Caracas Mini Dulces, la pastelería va mucho más allá de seguir una receta; 
              es una forma de arte, de expresión y, sobre todo, la oportunidad de materializar momentos memorables en piezas comestibles únicas.
            </p>
            <p className="text-xs md:text-sm text-brand-cream/60 font-light leading-relaxed font-body mb-8 italic">
              "No hago postres en serie; creo piezas con alma. Disfruto el reto de tomar un concepto y moldearlo capa por capa, detalle a detalle..."
            </p>
            <div>
              <Link
                href="/repostera"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-gold hover:text-brand-cream transition-colors duration-300 group"
              >
                Conoce a Victoria
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Columna con encuadre visual de gala */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[280px] aspect-[4/5] border border-brand-gold/15 p-2 bg-[#040404] overflow-hidden group">
              <div className="absolute inset-0 bg-gold-radial-glow opacity-25 z-10 pointer-events-none" />
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/victoria_inicio.png"
                  alt="Victoria - Caracas Mini Dulces"
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/40 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

export default function Home() {
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
            {/* Tarjeta 1 */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col p-6 bg-brand-bg border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury"
            >
              <div className="relative w-full aspect-square bg-[#0a0a0a] overflow-hidden mb-6 border border-brand-gold/5 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-gold-radial-glow opacity-25 group-hover:opacity-50 transition-all duration-500" />
                <span className="text-[10px] tracking-[0.2em] text-brand-gold-light uppercase font-semibold">
                  Trufa de Chocolate 24K
                </span>
              </div>
              <h3 className="font-heading text-base tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-2">
                Trufa Real
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed font-body mb-4 flex-grow">
                Chocolate belga oscuro de origen único al 70%, centro fundente de ganache sedosa y un destello dorado comestible.
              </p>
              <span className="text-[9px] tracking-[0.15em] text-brand-gold-light uppercase font-medium italic mt-auto">
                Textura: Fundente de Terciopelo
              </span>
            </motion.div>

            {/* Tarjeta 2 */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col p-6 bg-brand-bg border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury"
            >
              <div className="relative w-full aspect-square bg-[#0a0a0a] overflow-hidden mb-6 border border-brand-gold/5 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-gold-radial-glow opacity-25 group-hover:opacity-50 transition-all duration-500" />
                <span className="text-[10px] tracking-[0.2em] text-brand-gold-light uppercase font-semibold">
                  Macarons de Pistacho
                </span>
              </div>
              <h3 className="font-heading text-base tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-2">
                Macarons Franceses
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed font-body mb-4 flex-grow">
                Conchas simétricas y crujientes de harina de almendras rellenas con una densa crema de pistacho puro italiano.
              </p>
              <span className="text-[9px] tracking-[0.15em] text-brand-gold-light uppercase font-medium italic mt-auto">
                Textura: Delicado y Cremoso
              </span>
            </motion.div>

            {/* Tarjeta 3 */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col p-6 bg-brand-bg border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury"
            >
              <div className="relative w-full aspect-square bg-[#0a0a0a] overflow-hidden mb-6 border border-brand-gold/5 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-gold-radial-glow opacity-25 group-hover:opacity-50 transition-all duration-500" />
                <span className="text-[10px] tracking-[0.2em] text-brand-gold-light uppercase font-semibold">
                  Tartaleta de Frutas
                </span>
              </div>
              <h3 className="font-heading text-base tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-2">
                Mini Pavlova Premium
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed font-body mb-4 flex-grow">
                Merengue horneado lentamente, crujiente por fuera y tierno por dentro, con fresas, frambuesas y crema bourbon.
              </p>
              <span className="text-[9px] tracking-[0.15em] text-brand-gold-light uppercase font-medium italic mt-auto">
                Textura: Aireado y Crocante
              </span>
            </motion.div>
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

          {/* Columna Frame Visual (Symmetrically balanced) */}
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

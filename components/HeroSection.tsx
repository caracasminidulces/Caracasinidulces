"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Variantes de animación de Framer Motion para lograr transiciones coreografiadas y fluidas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Retraso entre animaciones hijas
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between bg-brand-bg text-brand-cream overflow-hidden px-6 py-8 md:px-12 md:py-12">
      {/* 1. Fondo inmersivo preparado para assets multimedia futuros (video/imagen de fondo) */}
      <div className="absolute inset-0 z-0">
        {/* Fondo base oscuro absoluto con gradiente radial de lujo */}
        <div className="absolute inset-0 bg-dark-radial" />
        
        {/* Resplandor dorado radial central y sutil para emular iluminación de galería de arte */}
        <div className="absolute inset-0 bg-gold-radial-glow opacity-80" />

        {/* Cuadrícula geométrica sutil para reflejar simetría matemática */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,196,20,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,196,20,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem]" />

        {/* Marcador de posición para video/imagen de fondo futura */}
        {/* 
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 mix-blend-luminosity"
        >
          <source src="/videos/hero-bakery-draft.mp4" type="video/mp4" />
        </video> 
        */}
      </div>

      {/* 2. Espaciador Superior Simétrico para compensar el Navbar */}
      <div className="relative z-10 w-full h-12 md:h-16" />

      {/* 3. Contenido Central (Sección Hero) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center my-auto px-4"
      >
        {/* Logotipo Central Premium (Figura Central de la Marca) */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 group cursor-pointer flex justify-center"
        >
          {/* Halo de luz dorada radial de fondo */}
          <div className="absolute -inset-10 bg-brand-gold/10 opacity-70 group-hover:opacity-90 rounded-full blur-3xl transition-all duration-1000 ease-luxury" />
          
          <Image
            src="/images/logo.png"
            alt="Caracas Mini Dulces Logo"
            width={380}
            height={160}
            priority
            className="h-28 sm:h-36 md:h-44 w-auto object-contain transition-all duration-750 ease-luxury group-hover:scale-105 drop-shadow-[0_0_20px_rgba(229,196,20,0.15)]"
          />
        </motion.div>

        {/* Subtítulo: Colección exclusiva */}
        <motion.span
          variants={itemVariants}
          className="text-xs md:text-sm font-semibold tracking-[0.25em] text-brand-gold-light uppercase mb-6"
        >
          Colección de Repostería Fina
        </motion.span>

        {/* Título Principal: Cinzel y de alta gama */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-brand-cream leading-tight mb-8"
        >
          Arte Comestible & <br className="hidden md:block" />
          <span className="text-gold-gradient font-medium italic">Simetría Perfecta</span>
        </motion.h1>

        {/* Separador Simétrico */}
        <motion.div
          variants={lineVariants}
          className="w-24 md:w-32 h-[1px] bg-brand-gold-light opacity-60 mb-8 origin-center"
        />

        {/* Descripción corta de lujo */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-brand-cream/80 font-light leading-relaxed max-w-2xl mb-12 tracking-wide font-body"
        >
          Bocados diseñados con rigurosidad geométrica y elaborados con ingredientes de origen exclusivo. 
          Elevamos la repostería tradicional al estándar del arte contemporáneo.
        </motion.p>

        {/* Botón de Acción Principal (CTA) con efecto de brillo metálico */}
        <motion.div variants={itemVariants}>
          <a
            href="#coleccion"
            className="shimmer-effect inline-flex items-center justify-center px-10 py-4 border border-brand-gold bg-transparent text-brand-cream hover:text-brand-bg hover:bg-brand-gold font-medium tracking-[0.15em] text-xs uppercase rounded-none transition-all duration-500 ease-luxury shadow-gold-sm hover:shadow-gold-md hover:scale-105"
          >
            Explorar la Galería
          </a>
        </motion.div>
      </motion.div>

      {/* 4. Pie de Sección - Indicador Simétrico de Desplazamiento */}
      <footer className="relative z-10 w-full flex flex-col items-center justify-center py-4">
        {/* Línea decorativa delgada que representa el equilibrio matemático */}
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold-light/40 to-transparent" />
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] tracking-[0.3em] text-brand-gold-light/50 uppercase mt-2"
        >
          Deslizar
        </motion.span>
      </footer>
    </section>
  );
}

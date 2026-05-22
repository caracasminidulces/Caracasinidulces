"use client";

import { motion } from "framer-motion";

export default function ReposteraPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-brand-cream py-16 md:py-24">
      {/* Resplandor dorado decorativo */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* 1. Izquierda: Marco Editorial para Fotografía (Preparado para la foto de Victoria) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px] aspect-[3/4] border border-brand-gold/20 p-3 bg-transparent">
              <div className="absolute -inset-1 border border-brand-gold/10 pointer-events-none" />
              
              {/* Contenedor del retrato artístico */}
              <div className="relative w-full h-full bg-gradient-to-b from-[#080808] to-[#141414] overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="absolute inset-0 bg-gold-radial-glow opacity-30" />
                
                {/* SVG Decorativo para simbolizar el arte manual */}
                <svg className="w-12 h-12 stroke-brand-gold/40 fill-none mb-4" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>

                <span className="text-[11px] tracking-[0.2em] text-brand-gold uppercase font-semibold">
                  Victoria
                </span>
                <span className="text-[9px] tracking-[0.1em] text-brand-cream/40 uppercase mt-1">
                  (Fotografía en el Taller)
                </span>
              </div>
            </div>
          </motion.div>

          {/* 2. Derecha: Biografía Editorial de Victoria (Texto exacto provisto por el usuario) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Cabecera */}
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-3">
              Mente y Manos Creadoras
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-cream mb-6">
              Conoce a tu Repostera
            </h1>
            <div className="w-16 h-[1px] bg-brand-gold mb-8" />

            {/* Texto de la Biografía redactado de forma exquisita en base a lo provisto */}
            <div className="flex flex-col gap-6 text-sm md:text-base text-brand-cream/90 font-light leading-relaxed font-body">
              <p className="text-base md:text-lg text-brand-gold-light tracking-wide font-normal font-heading italic">
                ¡Hola! Te doy la bienvenida a mi rincón dulce.
              </p>
              
              <p>
                Soy <strong>Victoria</strong>, apasionada de la repostería artística y la mente (y manos) detrás de cada una de las creaciones que ves aquí. Para mí, la pastelería va mucho más allá de seguir una receta; es una forma de arte, de expresión y, sobre todo, la oportunidad de materializar tus momentos más felices en piezas únicas y comestibles.
              </p>

              <div className="border-l border-brand-gold/20 pl-4 py-1 flex flex-col gap-3 my-2 bg-brand-gold/[0.01]">
                <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium font-heading">
                  ¿A qué me dedico?
                </h3>
                <p className="text-xs md:text-sm text-brand-cream/80">
                  Me especializo en el diseño y modelado artesanal de dulces temáticos, pasteles de diseño y postres personalizados para todo tipo de eventos.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium font-heading">
                  Mi enfoque es completamente personalizado y detallista:
                </h3>
                
                <ul className="flex flex-col gap-4 pl-2 text-xs md:text-sm text-brand-cream/80">
                  <li>
                    <strong className="text-brand-cream font-medium uppercase tracking-wider block mb-1">
                      Modelado a Mano:
                    </strong>
                    Creo firmemente en el valor de lo hecho a mano. Cada figura, personaje o estructura tridimensional cobra vida directamente a través del modelado manual, logrando piezas únicas que no verás en ningún otro lugar.
                  </li>
                  <li>
                    <strong className="text-brand-cream font-medium uppercase tracking-wider block mb-1">
                      Historias Comestibles:
                    </strong>
                    Ya sea una celebración elegante, un cumpleaños lleno de fantasía o un evento corporativo, transformo tus ideas, temáticas y paletas de colores en una experiencia visual y de sabor inolvidable.
                  </li>
                  <li>
                    <strong className="text-brand-cream font-medium uppercase tracking-wider block mb-1">
                      Calidad y Sabor:
                    </strong>
                    El arte entra por los ojos, pero se queda en el paladar. Por eso, combino técnicas de diseño de vanguardia con ingredientes seleccionados y texturas perfectas para que el interior sea tan espectacular como el exterior.
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-6 border-t border-brand-gold/10">
                <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium font-heading mb-3">
                  Mi Filosofía
                </h3>
                <p className="italic font-light">
                  "No hago postres en serie; creo piezas con alma. Disfruto el reto de tomar un concepto (desde la magia del fondo del mar hasta la elegancia de un diseño minimalista) y moldearlo capa por capa, detalle a detalle, hasta ver la sonrisa de mis clientes al recibir su pedido."
                </p>
              </div>

              <p className="text-xs md:text-sm text-brand-gold-light mt-4 font-medium tracking-wide">
                Si tienes una idea en mente, un evento especial en camino o simplemente quieres sorprender a alguien con un detalle inolvidable, estás en el lugar correcto. ¡Hagamos realidad el pastel de tus sueños!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Definición de las colecciones de dulces reales con descripciones sensoriales irresistibles
const colecciones = [
  {
    titulo: "Colección de Galletas & Bocados Finos",
    descripcion: "Crujientes, melosos y tradicionales. Creaciones artesanales horneadas con esmero para encantar en cualquier momento del día.",
    items: [
      {
        nombre: "Polvorosas Imperiales",
        descripcion: "Tradicionales polvorosas caraqueñas que se deshacen delicadamente en el paladar. Elaboradas con un toque sutil de vainilla bourbon y espolvoreadas con azúcar fina.",
        textura: "Desmoronamiento suave y fundente al instante",
        imagen: "/images/dulces/polvorosas.png",
        categoria: "Bocados"
      },
      {
        nombre: "Brookies Tentación",
        descripcion: "La fusión definitiva de dos mundos: una base densa y húmeda de brownie de chocolate belga fusionada con una cubierta crocante de galleta con chispas de chocolate.",
        textura: "Corazón súper meloso con superficie crujiente",
        imagen: "/images/dulces/brookies.png",
        categoria: "Bocados"
      },
      {
        nombre: "Craqueladas de Chocolate",
        descripcion: "Exquisitas galletas de chocolate intenso agrietadas con una generosa y elegante nevada de azúcar glas, presentadas en su exclusiva caja de presentación con lazo dorado.",
        textura: "Corteza crujiente con centro denso tipo fudge",
        imagen: "/images/dulces/craqueladas.png",
        categoria: "Bocados"
      }
    ]
  },
  {
    titulo: "Colección de Pavlovas",
    descripcion: "La máxima expresión del merengue artesanal. Ligereza, frescura y dulzura en perfecta armonía visual y sensorial.",
    items: [
      {
        nombre: "Mini Pavlova de Gala",
        descripcion: "Elegantes bocados de merengue horneado lentamente, rellenos con una suave corona de crema batida y fresas frescas, o dulce de leche repostero con un toque crocante de nueces.",
        textura: "Merengue etéreo y crujiente con la suavidad de la crema",
        imagen: "/images/dulces/minipavlova.png",
        categoria: "Pavlovas"
      },
      {
        nombre: "Gran Pavlova de Autor",
        descripcion: "Una majestuosa obra de arte para compartir. Disco de merengue artesanal crujiente, coronado con abundante crema batida, finas láminas de melocotón y una deslumbrante flor de fresas naturales.",
        textura: "Contraste sublime entre fruta fresca, crema sedosa y merengue crujiente",
        imagen: "/images/dulces/pavlova.png",
        categoria: "Pavlovas"
      }
    ]
  }
];

export default function DulcesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-brand-cream py-16 md:py-24">
      {/* Fondo decorativo con resplandor dorado */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col items-center">
        {/* Cabecera de la página */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mb-20"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-4 block">
            El Arte en tu Paladar
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-brand-cream mb-6">
            La Colección
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-brand-cream/80 font-light leading-relaxed">
            Una selección exclusiva de repostería fina. Piezas artesanales modeladas con esmero, 
            diseñadas para impactar visualmente y permanecer grabadas en el recuerdo de tu paladar.
          </p>
        </motion.div>

        {/* Listado de Colecciones */}
        <div className="w-full flex flex-col gap-24">
          {colecciones.map((coleccion) => (
            <motion.section
              key={coleccion.titulo}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full flex flex-col gap-12"
            >
              {/* Encabezado de la Colección */}
              <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-brand-gold/10 pb-4">
                <h2 className="text-2xl md:text-3xl font-light tracking-wide text-brand-cream">
                  {coleccion.titulo}
                </h2>
                <p className="text-xs md:text-sm text-brand-gold-light max-w-md font-light italic">
                  {coleccion.descripcion}
                </p>
              </div>

              {/* Grid de Dulces */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coleccion.items.map((item) => (
                  <motion.div
                    key={item.nombre}
                    variants={itemVariants}
                    className="group relative flex flex-col bg-[#050505] border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 p-6 rounded-none"
                  >
                    {/* Contenedor de la Imagen Real del Producto */}
                    <div className="relative w-full aspect-square bg-[#0c0c0c] border border-brand-gold/5 flex items-center justify-center overflow-hidden mb-6">
                      <Image
                        src={item.imagen}
                        alt={item.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-750 ease-in-out group-hover:scale-105"
                      />
                      
                      {/* Efecto de degradado premium sobre la foto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Información del dulce - Orientación Gourmet */}
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-light tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
                          {item.nombre}
                        </h3>
                      </div>

                      {/* Separador de oro sutil */}
                      <div className="w-12 h-[1px] bg-brand-gold/20 mb-4 group-hover:w-20 transition-all duration-500" />

                      <p className="text-xs text-brand-cream/80 font-light leading-relaxed mb-6 flex-grow font-body">
                        {item.descripcion}
                      </p>

                      {/* Ficha Sensorial (Rico, apetitoso y de alta gama) */}
                      <div className="mt-auto pt-4 border-t border-brand-gold/5 flex flex-col gap-2 text-[10px] tracking-wide text-brand-gold-light uppercase">
                        <div>
                          <strong className="text-brand-cream/40 font-medium font-body mr-1">Sensación:</strong> 
                          <span className="font-light italic text-[#FDF3BF]/90">{item.textura}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const handleIncrement = (nombre: string) => {
    setQuantities(prev => ({
      ...prev,
      [nombre]: (prev[nombre] || 1) + 1
    }));
  };

  const handleDecrement = (nombre: string) => {
    setQuantities(prev => ({
      ...prev,
      [nombre]: Math.max(1, (prev[nombre] || 1) - 1)
    }));
  };

  const getQuantity = (nombre: string) => {
    return quantities[nombre] || 1;
  };

  const handleAddToCart = (item: any) => {
    const qty = getQuantity(item.nombre);
    addToCart({
      nombre: item.nombre,
      descripcion: item.descripcion,
      imagen: item.imagen,
      textura: item.textura,
      categoria: item.categoria
    }, qty);
    
    // Feedback de añadido
    setAddedItems(prev => ({ ...prev, [item.nombre]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.nombre]: false }));
    }, 1500);
  };

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
                      <div className="mt-auto pt-4 border-t border-brand-gold/5 flex flex-col gap-4">
                        <div className="text-[10px] tracking-wide text-brand-gold-light uppercase flex items-center justify-between">
                          <div>
                            <strong className="text-brand-cream/40 font-medium font-body mr-1">Sensación:</strong> 
                            <span className="font-light italic text-[#FDF3BF]/90">{item.textura}</span>
                          </div>
                        </div>

                        {/* Controles de Compra */}
                        <div className="flex gap-3 items-center mt-2">
                          {/* Selector de cantidad */}
                          <div className="flex items-center border border-brand-gold/15 bg-[#010101] select-none">
                            <button
                              onClick={() => handleDecrement(item.nombre)}
                              className="px-2.5 py-1.5 text-xs text-brand-gold hover:bg-brand-gold/10 transition-colors duration-200 font-medium"
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs text-brand-cream font-medium font-body w-6 text-center">
                              {getQuantity(item.nombre)}
                            </span>
                            <button
                              onClick={() => handleIncrement(item.nombre)}
                              className="px-2.5 py-1.5 text-xs text-brand-gold hover:bg-brand-gold/10 transition-colors duration-200 font-medium"
                              aria-label="Incrementar cantidad"
                            >
                              +
                            </button>
                          </div>

                          {/* Botón Añadir */}
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex-grow py-2 border border-brand-gold/30 hover:border-brand-gold bg-transparent hover:bg-brand-gold text-brand-gold hover:text-brand-bg text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 focus:outline-none"
                          >
                            {addedItems[item.nombre] ? (
                              <>
                                <span>¡Añadido!</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </>
                            ) : (
                              <>
                                <span>Añadir</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </>
                            )}
                          </button>
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

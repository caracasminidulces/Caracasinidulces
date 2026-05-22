"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Definición de las colecciones de dulces con descripciones sensoriales irresistibles
const colecciones = [
  {
    titulo: "Mini Dulces de Gala",
    descripcion: "Bocados sofisticados y delicados diseñados para eventos memorables. Texturas y sabores intensos concentrados en una porción perfecta.",
    items: [
      {
        nombre: "Trufa Real de Avellana",
        descripcion: "Ganache sedosa de chocolate belga al 70% infusionada con licor de avellanas, cubierta por una fina capa de oro comestible de 24 quilates.",
        textura: "Terciopelo fundente con un corazón crujiente",
        imagen: "/images/dulces/trufa.jpg",
        categoria: "Gala"
      },
      {
        nombre: "Mini Pavlova de Frutos Rojos",
        descripcion: "Nido de merengue crujiente por fuera y suave como malvavisco por dentro, coronado con crema montada de vainilla y frutos rojos frescos de estación.",
        textura: "Crujiente de merengue con ligereza de crema",
        imagen: "/images/dulces/pavlova.jpg",
        categoria: "Gala"
      },
      {
        nombre: "Tartaleta de Limón y Albahaca",
        descripcion: "Masa sablé ultra crujiente rellena de una crema untuosa y ácida de limón natural con un sutil toque de albahaca fresca, coronada con merengue italiano dorado.",
        textura: "Cremosa y cítrica con masa crocante",
        imagen: "/images/dulces/tartaleta-limon.jpg",
        categoria: "Gala"
      }
    ]
  },
  {
    titulo: "Pastelería de Diseño e Individuales",
    descripcion: "Obras artísticas individuales donde el sabor espectacular se encuentra con un diseño visual minimalista e impactante.",
    items: [
      {
        nombre: "Domo de Chocolate y Frambuesa",
        descripcion: "Mousse brillante y untuosa de chocolate amargo que oculta un corazón ácido de coulis de frambuesa silvestre, asentado sobre un bizcocho húmedo de almendras.",
        textura: "Espejo brillante y mousse aireada",
        imagen: "/images/dulces/domo-chocolate.jpg",
        categoria: "Individual"
      },
      {
        nombre: "Eclair de Pistacho y Azahar",
        descripcion: "Masa choux perfectamente horneada, rellena de una untuosa crema pastelera de pistacho siciliano y un perfume sutil de agua de azahar.",
        textura: "Masa ligera con relleno denso y aromático",
        imagen: "/images/dulces/eclair-pistacho.jpg",
        categoria: "Individual"
      }
    ]
  },
  {
    titulo: "Tortas de Autor & Modelado Temático",
    descripcion: "Creaciones personalizadas exclusivas de Victoria. Pasteles con alma, modelados a mano capa por capa para materializar el concepto de tus sueños.",
    items: [
      {
        nombre: "Pastel Minimalista de Bodas",
        descripcion: "Estructura impecable de bordes perfectos, decorada con flores modeladas a mano pétalo a pétalo en pasta de azúcar. Bizcocho de vainilla bourbon con praliné de nuez.",
        textura: "Bizcocho súper húmedo con crema sedosa de mantequilla",
        imagen: "/images/dulces/torta-boda.jpg",
        categoria: "Autor"
      },
      {
        nombre: "Tarta Temática Infantil Fantasía",
        descripcion: "Personajes y estructuras tridimensionales esculpidas completamente a mano por Victoria en fondant comestible. Bizcocho de chocolate fudge con dulce de leche.",
        textura: "Fudge denso y esponjoso con detalles de azúcar modelada",
        imagen: "/images/dulces/torta-fantasia.jpg",
        categoria: "Autor"
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
          {colecciones.map((coleccion, indexIndex) => (
            <motion.section
              key={coleccion.titulo}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
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
                {coleccion.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.nombre}
                    variants={itemVariants}
                    className="group relative flex flex-col bg-[#050505] border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury p-6 rounded-none"
                  >
                    {/* Contenedor de la Imagen (Preparado para la foto real del usuario) */}
                    <div className="relative w-full aspect-square bg-[#0c0c0c] border border-brand-gold/5 flex items-center justify-center overflow-hidden mb-6">
                      
                      {/* En el futuro, cuando subas la foto, esta etiqueta Image se mostrará perfectamente */}
                      {/* 
                      <Image
                        src={item.imagen}
                        alt={item.nombre}
                        fill
                        className="object-cover transition-transform duration-750 ease-luxury group-hover:scale-105"
                      />
                      */}

                      {/* Diseñamos un marcador de posición de súper lujo con gradiente y tipografía dorada */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#020202] via-[#080808] to-[#121212] flex flex-col items-center justify-center text-center p-6 transition-all duration-500 group-hover:bg-[#030303]/90">
                        <div className="absolute inset-0 bg-gold-radial-glow opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                        
                        {/* Icono decorativo de repostería minimalista en SVG */}
                        <svg className="w-10 h-10 stroke-brand-gold/40 group-hover:stroke-brand-gold/80 fill-none mb-4 transition-colors duration-500" viewBox="0 0 24 24" strokeWidth="1">
                          <path d="M12 21a9 9 0 0 0 9-9c0-3-2-6-9-10-7 4-9 7-9 10a9 9 0 0 0 9 9z" />
                          <path d="M12 8v8M8 12h8" />
                        </svg>

                        <span className="text-[10px] tracking-[0.2em] text-brand-gold-light uppercase font-semibold">
                          Fotografía Real
                        </span>
                        <span className="text-[9px] tracking-[0.1em] text-brand-cream/40 uppercase mt-1">
                          (Pronto Disponible)
                        </span>
                      </div>
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

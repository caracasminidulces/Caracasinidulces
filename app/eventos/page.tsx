"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeParticles from "../../components/ThemeParticles";

// Definición de todos los datos gourmet y poéticos para los Eventos y Subtemas de Cumpleaños
interface ThemeDetail {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  textura: string;
  sabor: string;
  presentacion: string;
  imagenes: string[];
}

const mainThemes = [
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "navidad", label: "Navidad" },
  { id: "pascuas", label: "Pascuas" },
  { id: "san_valentin", label: "San Valentín" },
  { id: "halloween", label: "Halloween" },
  { id: "babyshower", label: "Baby Shower" },
];

const birthdaySubthemes = [
  { id: "hp", label: "Harry Potter" },
  { id: "aladdin", label: "Aladdin" },
  { id: "alicia", label: "Alicia en el País" },
  { id: "dinosaurio", label: "Dinosaurio" },
  { id: "encanto", label: "Encanto" },
  { id: "fresita", label: "Fresita" },
  { id: "futbol", label: "Fútbol" },
  { id: "toystory", label: "Toy Story" },
];

const themeDetails: Record<string, ThemeDetail> = {
  // Navidad
  navidad: {
    titulo: "Colección Navideña de Gala",
    subtitulo: "Magia y Tradición en Nochebuena",
    descripcion: "La calidez de las fiestas plasmada en alta repostería. Pops de chocolate con pinitos navideños nevados en relieve, bocados gourmet envueltos en lazos verdes de satén y elegantes cintas escocesas rojas con negro. Cacao de autor para celebrar la unión familiar.",
    textura: "Chocolate crujiente con rellenos melosos y especiados que evocan la calidez hogareña.",
    sabor: "Cacao belga, canela de Ceilán, ralladura de naranja confitada y frutos secos selectos.",
    presentacion: "Elegantes pedestales de madera noble y follaje de pino natural aromático.",
    imagenes: ["/images/eventos/navidad.png"],
  },
  // Pascuas
  pascuas: {
    titulo: "Cofre de Pascuas Imperial",
    subtitulo: "El Renacer de la Primavera",
    descripcion: "Una experiencia lúdica y sublime. Un espectacular conejo de Pascua esculpido en chocolate de leche de autor y pintado a mano con destellos de oro comestible de 24 quilates. Resguardado en una cama de mini malvaviscos pastel y acompañado de un mazo de madera con lazo de satén.",
    textura: "Chocolate con leche de quiebre perfecto y nubes de malvavisco artesanal súper esponjosas.",
    sabor: "Chocolate con leche al 40%, vainilla de Madagascar y malvavisco artesanal perfumado.",
    presentacion: "Caja de regalo blanca de diseño minimalista con visor de acetato de alta resistencia.",
    imagenes: ["/images/eventos/pascuas.png"],
  },
  // San Valentín
  san_valentin: {
    titulo: "San Valentín: Amor Eterno",
    subtitulo: "Dulzura para Compartir en Pareja",
    descripcion: "Romance hecho repostería fina. Exquisitos cupcakes de chocolate profundo en cápsulas doradas imperiales, coronados con un remolino perfecto de frosting de vainilla bourbon y un romántico corazón nido de abeja en papel rojo rubí. El regalo ideal para enamorar.",
    textura: "Bizcocho esponjoso y húmedo coronado con una crema de mantequilla de vainilla sedosa y ligera.",
    sabor: "Chocolate negro intenso, extracto puro de vainilla bourbon y fresas silvestres escondidas.",
    presentacion: "Exclusiva caja gourmet Caracas Mini Dulces con detalles de corazones de terciopelo.",
    imagenes: ["/images/eventos/san_valentin.png"],
  },
  // Halloween
  halloween: {
    titulo: "Halloween: Spooky Glamour",
    subtitulo: "Hechizos de Sabor Oscuro",
    descripcion: "Misterio y elegancia en una caja naranja troquelada con la cara de Jack-o'-lantern. Al abrirse, revela cuadrados perfectos de brownies de chocolate oscuro súper melosos, coronados con mini calabazas esculpidas meticulosamente en frosting naranja.",
    textura: "Brownie denso y húmedo con superficie craquelada y frosting de vainilla cremoso.",
    sabor: "Doble chocolate fudge, un toque sutil de flor de sal y esencia de calabaza especiada.",
    presentacion: "Caja de diseño exclusivo con detalles de hojas de maíz negras y verdes.",
    imagenes: ["/images/eventos/halloween.png"],
  },
  // Baby Shower
  babyshower: {
    titulo: "Baby Shower: Dulce Bienvenida",
    subtitulo: "Ternura en Rosa y Oro",
    descripcion: "Para recibir una nueva vida con la máxima elegancia. Bocados circulares esculpidos con rosas blancas tridimensionales y perlas comestibles de azúcar, acompañados de paletas con lazos de seda pura en blanco níveo sobre una imperial base de oro labrado.",
    textura: "Crema suave de chocolate blanco y bizcocho de almendra etéreo.",
    sabor: "Chocolate blanco premium, frambuesa silvestre ácida y praliné de almendras.",
    presentacion: "Pedestal de gala en metal labrado dorado viejo e hilos de seda blanca.",
    imagenes: ["/images/eventos/babyshower.png"],
  },
  // Subtemas de Cumpleaños
  hp: {
    titulo: "Cumpleaños: Magia de Hogwarts",
    subtitulo: "El Universo de Harry Potter",
    descripcion: "Sumérgete en el misticismo del Gran Comedor con bocados inspirados en la magia de Hogwarts. Paletas y cupcakes esculpidos a mano con las emblemáticas gafas redondas, la cicatriz del rayo en oro viejo y majestuosos lazos negros de satén sobre bandejas espejo. Un tributo de sabor eterno.",
    textura: "Suave terciopelo de chocolate con un centro de fudge tibio y fundente.",
    sabor: "Cacao belga al 70%, vainilla de Madagascar y un suspiro de caramelo salado.",
    presentacion: "Elegante bandeja imperial de metal dorado labrado con base de espejo.",
    imagenes: [
      "/images/eventos/cumpleanos_hp.png",
      "/images/eventos/cumpleanos_hp_2.png",
      "/images/eventos/cumpleanos_hp_3.png"
    ],
  },
  aladdin: {
    titulo: "Cumpleaños: Fantasía de Agrabah",
    subtitulo: "Inspirado en las Mil y Una Noches",
    descripcion: "Un suntuoso viaje al corazón de Agrabah. Delicados dulces en capacillos púrpuras reales, acompañados de cajas piramidales con destellos dorados y coronados por una lámpara mágica en relieve tridimensional. La perfecta unión de sabor y misterio oriental.",
    textura: "Bocado fundente y crujiente de almendras tostadas con cobertura de chocolate fino.",
    sabor: "Trufa de chocolate amargo, notas de cardamomo y miel pura de azahar.",
    presentacion: "Torre dorada de presentación con pedestales turquesa real.",
    imagenes: [
      "/images/eventos/cumpleanos_aladdin.png",
      "/images/eventos/cumpleanos_aladdin_2.png",
      "/images/eventos/cumpleanos_aladdin_3.png"
    ],
  },
  alicia: {
    titulo: "Cumpleaños: Té en Wonderland",
    subtitulo: "El Sombrerero Loco y Alicia",
    descripcion: "La locura más dulce. Una mesa de té de fantasía compuesta por popsicakes en forma de tazas de porcelana apiladas, galletas de relojes de bolsillo dorados que marcan la hora del té, y paletas decoradas con naipes de corazones y llaves antiguas.",
    textura: "Bizcocho súper húmedo de limón y arándanos, con cobertura de chocolate blanco crujiente.",
    sabor: "Limón confitado, frutos silvestres de temporada y chocolate blanco aterciopelado.",
    presentacion: "Mesa imperial con detalles de vajilla vintage de porcelana y encajes.",
    imagenes: [
      "/images/eventos/cumpleanos_alicia.png",
      "/images/eventos/cumpleanos_alicia_2.png",
      "/images/eventos/cumpleanos_alicia_3.png"
    ],
  },
  dinosaurio: {
    titulo: "Cumpleaños: Aventura Jurásica",
    subtitulo: "Dinosaurios de Lujo",
    descripcion: "Una expedición de sabor prehistórico. Cupcakes con un detallado glaseado de hierba verde esmeralda, coronados con huevos de dinosaurio moteados descansando sobre nidos de chocolate, y pequeños huesos arqueológicos esculpidos con azúcar fina.",
    textura: "Merengue crujiente, crema sedosa y base de brownie denso e intensamente húmedo.",
    sabor: "Chocolate fudge americano, frutos rojos y crema batida ligera.",
    presentacion: "Nidos rústicos decorados con hojas de monstera frescas.",
    imagenes: [
      "/images/eventos/cumpleanos_dinosaurio.png",
      "/images/eventos/cumpleanos_dinosaurio_2.png",
      "/images/eventos/cumpleanos_dinosaurio_3.png"
    ],
  },
  encanto: {
    titulo: "Cumpleaños: Mariposas Mágicas",
    subtitulo: "La Magia de Encanto",
    descripcion: "Celebra el milagro de la vida con colores radiantes. Paletas gourmet decoradas con mariposas doradas en relieve y la icónica vela mágica, rodeadas de flores tropicales multicolores que bailan en una explosión visual irresistible.",
    textura: "Corazón cremoso y suave cubierto de un cascarón de chocolate crujiente de alta densidad.",
    sabor: "Dulce de leche repostero premium, coco tostado y vainilla de bourbon.",
    presentacion: "Base festiva de madera rústica adornada con buganvilias y luces cálidas.",
    imagenes: [
      "/images/eventos/cumpleanos_encanto.png",
      "/images/eventos/cumpleanos_encanto_2.png",
      "/images/eventos/cumpleanos_encanto_3.png"
    ],
  },
  fresita: {
    titulo: "Cumpleaños: Dulzura Silvestre",
    subtitulo: "El Jardín de Rosita Fresita",
    descripcion: "La inocencia y el dulzor silvestre hechos arte. Una primorosa selección que incluye una casita de fresa con pequeños detalles florales, una canasta tejida repleta de mini fresas de azúcar modeladas a mano, y popsicakes florales de ensueño rosa.",
    textura: "Mousse etérea y bizcocho tierno que se funde instantáneamente al tacto y en boca.",
    sabor: "Fresas frescas del huerto, crema de mascarpone y chocolate rosa rubí.",
    presentacion: "Canastas de mimbre blanco y lazos de satén rosa pastel.",
    imagenes: [
      "/images/eventos/cumpleanos_fresita.png",
      "/images/eventos/cumpleanos_fresita_2.png",
      "/images/eventos/cumpleanos_fresita_3.png"
    ],
  },
  futbol: {
    titulo: "Cumpleaños: Pasión Futbolera",
    subtitulo: "Fútbol y Gloria de Campeones",
    descripcion: "Para los campeones de la casa. Paletas circulares con la forma del clásico balón de fútbol en blanco y negro, decoradas con elegantes lazos de satén negro e imponentes palitos de brillo verde esmeralda. El sabor de la victoria.",
    textura: "Bizcocho súper denso estilo trufa con cobertura crujiente de chocolate.",
    sabor: "Ganache de chocolate semi-amargo al 60% y crujiente de avellanas europeas.",
    presentacion: "Bandejas lacadas en negro piano con detalles de césped artificial impecable.",
    imagenes: [
      "/images/eventos/cumpleanos_futbol.png",
      "/images/eventos/cumpleanos_futbol_2.png",
      "/images/eventos/cumpleanos_futbol_3.png"
    ],
  },
  toystory: {
    titulo: "Cumpleaños: Vaqueros y Galaxias",
    subtitulo: "Inspirado en Toy Story",
    descripcion: "Una entrañable aventura que revive la nostalgia de la infancia en alta repostería. Delicadas paletas con nubes celestes modeladas en relieve, bizcochos con los emblemáticos colores de Woody y Buzz Lightyear, y finas estrellas de sheriff doradas en azúcar de autor. Un viaje infinito hacia el sabor y la imaginación.",
    textura: "Bizcocho sumamente húmedo y cremoso cubierto de un cascarón crocante de chocolate belga de alta densidad.",
    sabor: "Vainilla bourbon infusionada, chocolate con leche sedoso y ganache de caramelo toffee.",
    presentacion: "Pedestales rústicos de madera noble y detalles estelares en oro pulido.",
    imagenes: [
      "/images/eventos/cumpleanos_toystory.png",
      "/images/eventos/cumpleanos_toystory_2.png",
      "/images/eventos/cumpleanos_toystory_3.png"
    ],
  },
};

// Clases de Tailwind para resplandores cromáticos según el tema activo
const themeGlowStyles: Record<string, string> = {
  navidad: "from-emerald-950/20 via-red-950/15 to-brand-bg shadow-[0_0_100px_rgba(16,185,129,0.06)] border-emerald-500/20",
  pascuas: "from-purple-950/20 via-emerald-950/10 to-brand-bg shadow-[0_0_100px_rgba(167,139,250,0.06)] border-purple-500/20",
  san_valentin: "from-rose-950/30 via-red-950/20 to-brand-bg shadow-[0_0_100px_rgba(244,63,94,0.08)] border-rose-500/20",
  halloween: "from-orange-950/20 via-purple-950/25 to-brand-bg shadow-[0_0_100px_rgba(249,115,22,0.07)] border-orange-500/20",
  babyshower: "from-sky-950/20 via-pink-950/15 to-brand-bg shadow-[0_0_100px_rgba(14,165,233,0.06)] border-sky-500/20",
  // Subtemas de Cumpleaños
  hp: "from-amber-950/30 via-red-950/20 to-brand-bg shadow-[0_0_100px_rgba(229,196,20,0.07)] border-brand-gold/30",
  aladdin: "from-purple-950/30 via-teal-950/25 to-brand-bg shadow-[0_0_100px_rgba(168,85,247,0.07)] border-purple-500/20",
  alicia: "from-sky-950/20 via-rose-950/15 to-brand-bg shadow-[0_0_100px_rgba(14,165,233,0.06)] border-sky-500/20",
  dinosaurio: "from-emerald-950/30 via-stone-900 to-brand-bg shadow-[0_0_100px_rgba(16,185,129,0.07)] border-emerald-600/20",
  encanto: "from-yellow-950/20 via-fuchsia-950/20 to-brand-bg shadow-[0_0_100px_rgba(234,179,8,0.07)] border-yellow-500/20",
  fresita: "from-pink-950/30 via-red-950/15 to-brand-bg shadow-[0_0_100px_rgba(236,72,153,0.07)] border-pink-500/20",
  futbol: "from-emerald-950/20 via-neutral-900 to-brand-bg shadow-[0_0_100px_rgba(16,185,129,0.05)] border-emerald-500/10",
  toystory: "from-sky-950/30 via-amber-950/20 to-brand-bg shadow-[0_0_100px_rgba(14,165,233,0.07)] border-sky-500/20",
};

export default function EventosPage() {
  const [mainTheme, setMainTheme] = useState("cumpleanos");
  const [birthdaySubtheme, setBirthdaySubtheme] = useState("hp");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeThemeId = mainTheme === "cumpleanos" ? birthdaySubtheme : mainTheme;
  const activeDetail = themeDetails[activeThemeId] || themeDetails.hp;
  const currentGlowClass = themeGlowStyles[activeThemeId] || themeGlowStyles.hp;

  // Safe extraction of the active image to avoid index overflow issues
  const activeImageIndexNormalized = activeImageIndex < activeDetail.imagenes.length ? activeImageIndex : 0;
  const activeImageSrc = activeDetail.imagenes[activeImageIndexNormalized];

  const handleMainThemeChange = (id: string) => {
    setMainTheme(id);
    setActiveImageIndex(0);
    if (id === "cumpleanos") {
      setBirthdaySubtheme("hp");
    }
  };

  const handleBirthdaySubthemeChange = (id: string) => {
    setBirthdaySubtheme(id);
    setActiveImageIndex(0);
  };

  // Crear el link de WhatsApp personalizado para cada dulce temático
  const whatsappUrl = `https://wa.me/584141835422?text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20para%20el%20evento%20tem%C3%A1tico%20de%20*${encodeURIComponent(
    activeDetail.titulo
  )}*%20(${encodeURIComponent(activeDetail.subtitulo)})`;

  return (
    <div className="relative w-full min-h-screen bg-brand-bg text-brand-cream py-16 md:py-24 transition-colors duration-1000 overflow-hidden">
      {/* 1. Fondo de gradiente cromático dinámico adaptativo */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr transition-all duration-1000 ease-in-out pointer-events-none z-0 ${currentGlowClass}`}
      />
      
      {/* 2. Capa de resplandor dorado complementario */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none z-0" />

      {/* 3. Motor de Partículas Físicas Temáticas Activo */}
      <ThemeParticles theme={activeThemeId} />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col items-center">
        
        {/* Cabecera Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-4 block">
            Celebraciones Exclusivas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-brand-cream mb-6">
            Eventos de Gala
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-sm md:text-base text-brand-cream/80 font-light leading-relaxed">
            Repostería de lujo que transforma tus momentos más importantes. Selecciona un evento
            para sumergirte en su atmósfera cromática y descubrir nuestros dulces temáticos diseñados a medida.
          </p>
        </motion.div>

        {/* 4. Menú Selector de Nivel 1 (Eventos Principales) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl flex flex-wrap justify-center gap-3 md:gap-4 mb-8"
        >
          {mainThemes.map((theme) => {
            const isActive = mainTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleMainThemeChange(theme.id)}
                className={`relative px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-500 rounded-none border ${
                  isActive
                    ? "bg-brand-gold text-brand-bg border-brand-gold"
                    : "border-brand-gold/20 hover:border-brand-gold/60 text-brand-cream/90 hover:text-brand-gold"
                }`}
              >
                {theme.label}
                {isActive && (
                  <motion.div
                    layoutId="event-active-pill"
                    className="absolute inset-0 bg-brand-gold -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* 5. Submenú Animado Desplegable para Cumpleaños */}
        <AnimatePresence mode="wait">
          {mainTheme === "cumpleanos" && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl overflow-hidden flex flex-col items-center mb-12 border-t border-b border-brand-gold/10 py-4"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold-light mb-3">
                Selecciona la Temática del Cumpleaños:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {birthdaySubthemes.map((sub) => {
                  const isSubActive = birthdaySubtheme === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleBirthdaySubthemeChange(sub.id)}
                      className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                        isSubActive
                          ? "text-brand-gold border border-brand-gold/30 bg-brand-gold/5"
                          : "text-brand-cream/60 hover:text-brand-gold-light"
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Showroom de Dulces Temáticos en Marco de Lujo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeThemeId}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-[#050505]/75 border border-brand-gold/10 p-6 md:p-10 backdrop-blur-md relative"
          >
            {/* Esquinas ornamentales estilo simetría geométrica de lujo */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-gold/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-gold/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-gold/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-gold/40" />

            {/* Contenedor de la Imagen con Galería Interactiva */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square bg-[#0c0c0c] border border-brand-gold/15 overflow-hidden shadow-2xl">
                
                {/* Imagen Principal con Animación Cross-Fade Cinemática */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeImageSrc}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeImageSrc}
                      alt={activeDetail.titulo}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/40 via-transparent to-transparent pointer-events-none" />

                {/* Flechas de Navegación Laterales Flotantes */}
                {activeDetail.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev - 1 + activeDetail.imagenes.length) % activeDetail.imagenes.length);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold/20 hover:border-brand-gold/60 bg-[#050505]/40 hover:bg-[#050505]/80 text-brand-gold hover:text-brand-cream hover:scale-105 transition-all duration-300 shadow-lg"
                      aria-label="Imagen anterior"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev + 1) % activeDetail.imagenes.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold/20 hover:border-brand-gold/60 bg-[#050505]/40 hover:bg-[#050505]/80 text-brand-gold hover:text-brand-cream hover:scale-105 transition-all duration-300 shadow-lg"
                      aria-label="Siguiente imagen"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Miniaturas del Showroom (Fila de Previsualización) */}
              {activeDetail.imagenes.length > 1 && (
                <div className="w-full flex justify-center gap-2 mt-4 px-2">
                  {activeDetail.imagenes.map((imgSrc, index) => {
                    const isSelected = index === activeImageIndexNormalized;
                    return (
                      <button
                        key={imgSrc}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative w-14 h-14 border ${
                          isSelected
                            ? "border-brand-gold scale-105 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                            : "border-brand-gold/20 hover:border-brand-gold/60 opacity-60 hover:opacity-100"
                        } transition-all duration-300 overflow-hidden bg-[#0c0c0c] aspect-square flex-shrink-0`}
                      >
                        <Image
                          src={imgSrc}
                          alt={`Miniatura ${index + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Ficha e Información Gourmet */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-2">
                {activeDetail.subtitulo}
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-brand-cream mb-4">
                {activeDetail.titulo}
              </h2>
              <div className="w-16 h-[1px] bg-brand-gold mb-6" />
              
              <p className="text-xs md:text-sm text-brand-cream/80 font-light leading-relaxed mb-8 font-body">
                {activeDetail.descripcion}
              </p>

              {/* Ficha Técnica Sensorial Simétrica */}
              <div className="border-t border-b border-brand-gold/10 py-5 mb-8 flex flex-col gap-3 text-xs tracking-wide">
                <div className="grid grid-cols-12">
                  <span className="col-span-3 text-brand-cream/40 font-medium uppercase font-body text-[10px] self-center">Sensación:</span>
                  <span className="col-span-9 font-light italic text-[#FDF3BF] font-body">{activeDetail.textura}</span>
                </div>
                <div className="grid grid-cols-12">
                  <span className="col-span-3 text-brand-cream/40 font-medium uppercase font-body text-[10px] self-center">Sabor:</span>
                  <span className="col-span-9 font-light text-brand-cream/90 font-body">{activeDetail.sabor}</span>
                </div>
                <div className="grid grid-cols-12">
                  <span className="col-span-3 text-brand-cream/40 font-medium uppercase font-body text-[10px] self-center">Montaje:</span>
                  <span className="col-span-9 font-light text-brand-cream/90 font-body">{activeDetail.presentacion}</span>
                </div>
              </div>

              {/* Botón de Pedido por WhatsApp Temático */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-brand-gold text-brand-gold hover:text-brand-bg hover:bg-brand-gold transition-all duration-500 ease-luxury font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.822 0c3.148.001 6.107 1.227 8.331 3.453 2.224 2.227 3.45 5.187 3.447 8.335-.006 6.502-5.332 11.827-11.828 11.827-2.002-.001-3.972-.51-5.733-1.485L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.389 0 9.773-4.381 9.777-9.772.002-2.61-1.01-5.063-2.851-6.907C16.4 2.08 13.945 1.066 11.336 1.065 5.948 1.065 1.564 5.447 1.56 10.839c-.001 1.637.447 3.235 1.3 4.65L1.88 20.89l5.59-1.466z" />
                  </svg>
                  Solicitar Presupuesto
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

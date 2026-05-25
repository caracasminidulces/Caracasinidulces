"use client";

import { motion } from "framer-motion";

export default function ContactoPage() {
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

  const contactInfo = [
    {
      tipo: "Correo Electrónico",
      valor: "minidulces1@gmail.com",
      link: "mailto:minidulces1@gmail.com",
      descripcion: "Escríbeme para hacerme llegar tus ideas, paletas de colores y referencias de diseño para tu evento.",
      icono: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
    {
      tipo: "Teléfono & WhatsApp",
      valor: "+58 414-1835422",
      link: "https://wa.me/584141835422",
      descripcion: "Hablemos de forma directa para agendar fechas y cotizar el modelado de tus postres personalizados.",
      icono: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
    {
      tipo: "Instagram",
      valor: "@caracasminidulces",
      link: "https://www.instagram.com/caracasminidulces?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      descripcion: "Sígueme en Instagram para ver las últimas creaciones en tiempo real y nuestro catálogo diario.",
      icono: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full min-h-[85vh] bg-brand-bg text-brand-cream flex items-center py-16 md:py-24 overflow-hidden">
      {/* Resplandor dorado decorativo en el centro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 flex flex-col items-center">
        {/* Cabecera simplificada */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-3 block">
            Planifica tu Próxima Celebración
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-brand-cream mb-6">
            Contacto Directo
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-6" />
          <p className="text-sm text-brand-cream/80 font-light leading-relaxed font-body">
            Comunícate directamente con Victoria para dar vida a tus ideas y crear 
            piezas dulces únicas para tus momentos especiales.
          </p>
        </motion.div>

        {/* Canales de Contacto Simétricos (Grid de 3 columnas equilibrado) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {contactInfo.map((info) => (
            <motion.a
              key={info.tipo}
              href={info.link}
              target={info.link.startsWith("http") ? "_blank" : undefined}
              rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={itemVariants}
              className="group relative flex flex-col items-center text-center p-5 sm:p-8 bg-[#050505] border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 ease-luxury rounded-none cursor-pointer w-full overflow-hidden"
            >
              {/* Sutil glow trasero en hover */}
              <div className="absolute inset-0 bg-gold-radial-glow opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              {/* Icono de Lujo */}
              <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold-light mb-6 group-hover:scale-105 group-hover:border-brand-gold transition-all duration-500">
                {info.icono}
              </div>

              {/* Título de Canal */}
              <h2 className="text-xs uppercase tracking-[0.2em] text-brand-cream/50 mb-2 font-medium">
                {info.tipo}
              </h2>

              {/* Valor del Canal (Destacado) */}
              <p className="text-xs sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-4 font-heading break-all sm:break-normal w-full overflow-hidden text-ellipsis">
                {info.valor}
              </p>

              {/* Línea decorativa sutil */}
              <div className="w-8 h-[1px] bg-brand-gold/10 mb-4 group-hover:w-16 transition-all duration-500" />

              {/* Descripción */}
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed max-w-xs font-body">
                {info.descripcion}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Frase de Cierre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-center mt-16 text-[10px] tracking-[0.2em] text-brand-cream/50 uppercase"
        >
          Caracas, Venezuela &bull; Diseños Completamente Exclusivos
        </motion.div>
      </div>
    </div>
  );
}

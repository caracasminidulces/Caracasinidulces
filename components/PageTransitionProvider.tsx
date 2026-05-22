"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PipingOverlay from "./PipingOverlay";

interface PageTransitionProviderProps {
  children: ReactNode;
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();
  const [displayPathname, setDisplayPathname] = useState(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Si la ruta cambia y no estamos ya en proceso de transición, activamos el telón
    if (pathname !== displayPathname) {
      setIsTransitioning(true);
    }
  }, [pathname, displayPathname]);

  const handleTransitionComplete = () => {
    // Al completarse el trazado de crema, intercambiamos la página trasera y cerramos el telón
    setDisplayPathname(pathname);
    setIsTransitioning(false);
    setIsFirstLoad(false);
  };

  const handleFirstLoadComplete = () => {
    setIsFirstLoad(false);
  };

  return (
    <>
      {/* Loader de Bienvenida de Alta Gama (Primera carga de la web) */}
      {isFirstLoad && (
        <PipingOverlay onComplete={handleFirstLoadComplete} />
      )}

      {/* Telón de Transición de Escudillado (En cambios de páginas posteriores) */}
      {!isFirstLoad && isTransitioning && (
        <PipingOverlay onComplete={handleTransitionComplete} />
      )}
      
      {/* Contenedor de páginas de Next.js con transición suave de entrada/salida.
          Usamos displayPathname como clave para mantener la página previa visible por debajo del 
          telón oscuro durante el escudillado de crema, evitando saltos bruscos. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={displayPathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

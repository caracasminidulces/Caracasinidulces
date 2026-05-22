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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleFirstLoadComplete = () => {
    setIsFirstLoad(false);
  };

  return (
    <>
      {/* Loader de Bienvenida de Alta Gama (Primera carga de la web) */}
      {isFirstLoad && (
        <PipingOverlay onComplete={handleFirstLoadComplete} />
      )}
      
      {/* Contenedor de páginas de Next.js con transición suave de entrada/salida.
          Usamos la ruta actual como clave para una transición rápida, elegante e instantánea. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.35, 
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

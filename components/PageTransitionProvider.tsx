"use client";

import { ReactNode, useState } from "react";
import PipingOverlay from "./PipingOverlay";

interface PageTransitionProviderProps {
  children: ReactNode;
}

export default function PageTransitionProvider({ children }: PageTransitionProviderProps) {
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
      
      {/* Renderizar los hijos directamente para garantizar compatibilidad total 
          con el enrutador de Next.js App Router, evitando bloqueos o pantallas en blanco */}
      {children}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PipingOverlayProps {
  onComplete: () => void;
}

export default function PipingOverlay({ onComplete }: PipingOverlayProps) {
  const [animationStage, setAnimationStage] = useState<"idle" | "drawing" | "reveal" | "fadeOut">("idle");

  // Definición del trazado SVG simétrico y elegante en un lienzo de 800x600.
  // Termina exactamente en el centro (400, 300).
  const creamPath = "M 80,300 C 150,120 280,120 350,250 C 420,380 550,380 620,250 C 670,140 580,70 480,100 C 370,130 300,280 380,360 C 440,420 520,350 490,260 C 460,180 360,200 380,290 C 390,320 415,320 410,295 C 405,270 401,270 400,300";

  useEffect(() => {
    // 1. Iniciar el trazado/escudillado de crema
    setAnimationStage("drawing");

    // 2. Al cabo de 1.8s (cuando el trazo termina), revelar el logotipo central
    const revealTimer = setTimeout(() => {
      setAnimationStage("reveal");
    }, 1800);

    // 3. Al cabo de 3.0s, iniciar la retirada del telón/overlay
    const fadeOutTimer = setTimeout(() => {
      setAnimationStage("fadeOut");
    }, 3000);

    // 4. Al cabo de 3.6s, finalizar por completo la transición y desmontar
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {animationStage !== "fadeOut" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] w-full h-full bg-[#010101] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Luz dorada ambiental muy sutil de fondo */}
          <div className="absolute inset-0 bg-gold-radial-glow opacity-30 pointer-events-none" />

          {/* Grid geométrico sutil para reflejar simetría */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,196,20,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,196,20,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

          {/* Lienzo SVG Principal de Transición */}
          <div className="relative w-full max-w-[650px] aspect-[4/3] flex items-center justify-center p-4">
            <svg
              viewBox="0 0 800 600"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              {/* Filtro de brillo/glow dorado para simular volumen y relieve 3D de la crema */}
              <defs>
                <filter id="creamGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Trazado 1 (Sombra de relieve dorada inferior) */}
              <motion.path
                d={creamPath}
                fill="none"
                stroke="#E5C414"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.35"
                filter="url(#creamGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* Trazado 2 (Cuerpo de crema dorada suave intermedia) */}
              <motion.path
                d={creamPath}
                fill="none"
                stroke="#DBC975"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* Trazado 3 (Brillo de crema clara superior - Tridimensionalidad) */}
              <motion.path
                d={creamPath}
                fill="none"
                stroke="#FDF3BF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Div animado que porta la Manga Repostera y sigue el trazado mediante offset CSS */}
            {animationStage === "drawing" && (
              <motion.div
                initial={{ offsetDistance: "0%", opacity: 1 }}
                animate={{ offsetDistance: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{
                  offsetPath: `path('${creamPath}')`,
                  offsetRotate: "auto -45deg", // Auto-rotación tangente + inclinación natural del chef
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  zIndex: 20,
                }}
              >
                {/* Manga Repostera SVG (Punto de anclaje de boquilla en 0,0) */}
                <svg
                  width="70"
                  height="140"
                  viewBox="-35 -120 70 140"
                  className="absolute"
                  style={{
                    transform: "translate(-50%, -50%)", // Centra la boquilla en el camino
                  }}
                >
                  <defs>
                    <linearGradient id="goldBag" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDF3BF" />
                      <stop offset="50%" stopColor="#E5C414" />
                      <stop offset="100%" stopColor="#B39200" />
                    </linearGradient>
                    <linearGradient id="silverNozzle" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E5E7EB" />
                      <stop offset="100%" stopColor="#9CA3AF" />
                    </linearGradient>
                  </defs>

                  {/* Cuerpo de la Manga Repostera (Cono dorado) */}
                  <path
                    d="M -6,-18 C -15,-40 -25,-75 -28,-95 C -28,-105 -18,-112 0,-112 C 18,-112 28,-105 28,-95 C 25,-75 15,-40 6,-18 Z"
                    fill="url(#goldBag)"
                    stroke="#DBC975"
                    strokeWidth="1.5"
                  />

                  {/* Detalle de pliegues en la manga */}
                  <path
                    d="M -24,-85 Q 0,-75 24,-85"
                    fill="none"
                    stroke="#B39200"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <path
                    d="M -16,-55 Q 0,-48 16,-55"
                    fill="none"
                    stroke="#B39200"
                    strokeWidth="1"
                    opacity="0.5"
                  />

                  {/* Collar de acople */}
                  <path
                    d="M -5,-12 L 5,-12 L 6,-18 L -6,-18 Z"
                    fill="#F3F4F6"
                    stroke="#DBC975"
                    strokeWidth="1"
                  />

                  {/* Boquilla de Estrella Metálica (Extremo termina en 0,0) */}
                  <path
                    d="M 0,0 L -4,-12 L 4,-12 Z"
                    fill="url(#silverNozzle)"
                    stroke="#6B7280"
                    strokeWidth="0.8"
                  />
                </svg>
              </motion.div>
            )}

            {/* Logotipo Central que se revela sutilmente al finalizar el trazo */}
            <AnimatePresence>
              {animationStage === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute z-30 flex flex-col items-center justify-center"
                >
                  {/* Halo dorado trasero resplandeciente en el logo */}
                  <div className="absolute -inset-10 bg-brand-gold/25 rounded-full blur-3xl opacity-80" />

                  <div className="relative w-48 sm:w-60 h-28 sm:h-36 flex items-center justify-center">
                    <Image
                      src="/images/logo.png"
                      alt="Caracas Mini Dulces Logo"
                      fill
                      sizes="240px"
                      className="object-contain drop-shadow-[0_0_25px_rgba(229,196,20,0.3)]"
                      priority
                    />
                  </div>

                  {/* Texto de lujo debajo del logo */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mt-4"
                  >
                    Repostería de Autor
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

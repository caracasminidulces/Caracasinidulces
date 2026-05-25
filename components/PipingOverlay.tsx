"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PipingOverlayProps {
  onComplete: () => void;
}

export default function PipingOverlay({ onComplete }: PipingOverlayProps) {
  const [animationStage, setAnimationStage] = useState<"idle" | "drawing" | "reveal" | "fadeOut">("idle");
  const [isMobile, setIsMobile] = useState(false);

  // Exact vector path of the original logo's outer boundary (1343 x 897 coordinate space)
  const logoOutlinePath = "M 1119,25 L 1134,25 L 1149,29 L 1164,37 L 1178,47 L 1193,36 L 1208,29 L 1223,26 L 1238,26 L 1253,30 L 1268,37 L 1280,50 L 1288,65 L 1291,80 L 1295,95 L 1308,110 L 1315,125 L 1318,140 L 1317,155 L 1312,170 L 1301,185 L 1286,197 L 1277,208 L 1278,223 L 1276,238 L 1271,253 L 1264,268 L 1255,283 L 1243,298 L 1231,313 L 1220,328 L 1208,343 L 1196,358 L 1184,373 L 1173,388 L 1161,403 L 1151,418 L 1141,433 L 1130,448 L 1124,463 L 1117,478 L 1109,493 L 1100,508 L 1090,523 L 1078,538 L 1064,552 L 1049,564 L 1034,573 L 1019,580 L 1004,585 L 989,586 L 974,585 L 959,581 L 944,579 L 929,588 L 914,594 L 899,597 L 884,598 L 869,596 L 854,592 L 839,587 L 824,597 L 809,605 L 794,610 L 779,612 L 764,612 L 749,610 L 734,605 L 719,612 L 704,620 L 689,624 L 674,624 L 659,622 L 644,624 L 629,630 L 614,633 L 599,633 L 584,630 L 569,635 L 554,640 L 539,642 L 524,641 L 512,646 L 506,661 L 499,676 L 490,691 L 481,706 L 470,721 L 458,736 L 445,751 L 431,766 L 416,780 L 401,793 L 386,804 L 371,814 L 356,824 L 341,832 L 326,840 L 311,847 L 296,853 L 281,858 L 266,863 L 251,866 L 236,869 L 221,871 L 206,872 L 191,872 L 176,871 L 161,868 L 146,864 L 131,857 L 116,847 L 101,833 L 92,818 L 85,803 L 80,788 L 78,773 L 77,758 L 79,743 L 83,728 L 89,713 L 96,698 L 107,683 L 119,668 L 134,653 L 149,640 L 139,635 L 124,636 L 109,635 L 94,631 L 79,624 L 64,613 L 50,598 L 41,583 L 34,568 L 30,553 L 27,538 L 26,523 L 26,508 L 27,493 L 29,478 L 32,463 L 36,448 L 41,433 L 46,418 L 53,403 L 61,388 L 70,373 L 80,358 L 91,343 L 103,328 L 118,313 L 133,299 L 148,287 L 163,276 L 178,267 L 193,258 L 208,251 L 223,245 L 238,240 L 253,235 L 268,232 L 283,228 L 298,226 L 313,224 L 328,223 L 343,223 L 358,224 L 373,225 L 388,228 L 403,232 L 418,237 L 433,245 L 448,253 L 463,265 L 478,276 L 489,261 L 503,247 L 518,237 L 533,231 L 548,229 L 563,229 L 578,233 L 593,241 L 608,243 L 623,236 L 638,234 L 653,235 L 668,241 L 683,239 L 698,237 L 713,236 L 728,235 L 743,231 L 758,231 L 773,228 L 788,226 L 803,219 L 818,214 L 833,213 L 848,216 L 863,221 L 878,215 L 893,214 L 908,212 L 921,206 L 935,192 L 950,186 L 965,184 L 980,185 L 995,191 L 1010,182 L 1025,176 L 1038,172 L 1046,157 L 1056,142 L 1070,128 L 1071,113 L 1070,98 L 1070,83 L 1072,68 L 1079,53 L 1091,38 L 1106,29 L 1119,25 Z";

  useEffect(() => {
    const mobileCheck = typeof window !== "undefined" && window.innerWidth < 768;
    setIsMobile(mobileCheck);

    // Iniciar la animación del dibujo vectorial del logo
    setAnimationStage("drawing");

    // Tiempos optimizados de la coreografía de gala (extendidos en móvil para apreciarse)
    const revealDelay = mobileCheck ? 1400 : 1500;
    const fadeOutDelay = mobileCheck ? 2600 : 2800;
    const completeDelay = mobileCheck ? 3200 : 3400;

    // Temporizador para revelar el logo original a color
    const revealTimer = setTimeout(() => {
      setAnimationStage("reveal");
    }, revealDelay);

    // Temporizador para desvanecer el telón oscuro
    const fadeOutTimer = setTimeout(() => {
      setAnimationStage("fadeOut");
    }, fadeOutDelay);

    // Temporizador para desmontar el overlay
    const completeTimer = setTimeout(() => {
      onComplete();
    }, completeDelay);

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

          {/* Grid ornamental sutil */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,196,20,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,196,20,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

          {/* Lienzo Principal de Transición con la relación de aspecto del Logotipo */}
          <div className="relative w-[90%] max-w-[600px] aspect-[1343/897]">
            
            {/* Dibujo Vectorial del Contorno del Logotipo */}
            <svg
              viewBox="0 0 1343 897"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <defs>
                <linearGradient id="goldStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDF3BF" />
                  <stop offset="50%" stopColor="#E5C414" />
                  <stop offset="100%" stopColor="#B39200" />
                </linearGradient>
                <filter id="logoStrokeGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Capa 1: Sombra/Relieve dorado trasero difuminado */}
              <motion.path
                d={logoOutlinePath}
                fill="none"
                stroke="#E5C414"
                strokeWidth={isMobile ? "4" : "10"}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
                filter="url(#logoStrokeGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: isMobile ? 1.4 : 1.8, ease: "easeInOut" }}
              />

              {/* Capa 2: Cuerpo central dorado metálico */}
              <motion.path
                d={logoOutlinePath}
                fill="none"
                stroke="url(#goldStrokeGradient)"
                strokeWidth={isMobile ? "2" : "5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: isMobile ? 1.4 : 1.8, ease: "easeInOut" }}
              />

              {/* Capa 3: Brillo superior claro para tridimensionalidad */}
              <motion.path
                d={logoOutlinePath}
                fill="none"
                stroke="#FDF3BF"
                strokeWidth={isMobile ? "1" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationStage !== "idle" ? 1 : 0 }}
                transition={{ duration: isMobile ? 1.4 : 1.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Logotipo Original a color que se revela de forma pixel-perfect en el contorno */}
            <AnimatePresence>
              {animationStage === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{
                    duration: isMobile ? 0.6 : 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 z-20 pointer-events-none"
                >
                  {/* Halo de luz dorada trasera resplandeciente */}
                  <div className="absolute -inset-10 bg-brand-gold/15 rounded-full blur-3xl opacity-80 pointer-events-none" />

                  {/* Contenedor exacto de la imagen */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/logo.png"
                      alt="Caracas Mini Dulces Logo"
                      fill
                      sizes="(max-w-md) 100vw, 600px"
                      className="object-contain drop-shadow-[0_0_30px_rgba(229,196,20,0.35)]"
                      priority
                    />
                  </div>

                  {/* Texto de lujo debajo del logo, posicionado absolutamente fuera de la caja del logo */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ delay: isMobile ? 0.2 : 0.4, duration: 0.8 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] sm:text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold text-center whitespace-nowrap"
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

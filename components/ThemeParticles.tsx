"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ThemeParticlesProps {
  theme: string;
}

interface Particle {
  id: number;
  symbol: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  rotationDirection: number;
  glow?: boolean;
  xSway: number[];
}

const themeSymbols: Record<string, string[]> = {
  navidad: ["❄️", "❅", "❆", "✨", "🔔"],
  pascuas: ["🥚", "🌸", "🌼", "🐰", "🌷"],
  san_valentin: ["❤️", "💖", "💝", "💘", "🌹"],
  halloween: ["🦇", "🎃", "🕸️", "👻", "🕯️"],
  babyshower: ["🍼", "⭐", "✨", "🧸", "🎈"],
  // Subtemas Cumpleaños
  hp: ["⚡", "🧹", "🎩", "✨", "🦉"],
  aladdin: ["🪔", "📜", "💎", "✨", "🕌"],
  alicia: ["⏰", "♠️", "♥️", "☕", "🔑"],
  dinosaurio: ["🦖", "🐾", "🍃", "🌋", "🦕"],
  encanto: ["🦋", "🌸", "✨", "🕯️", "🌺"],
  fresita: ["🍓", "🎀", "🌼", "🍰", "🍒"],
  futbol: ["⚽", "🏆", "⭐", "🥇", "🥅"],
};

export default function ThemeParticles({ theme }: ThemeParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Generar partículas aleatorias estables en el cliente
    const symbols = themeSymbols[theme] || ["✨", "✨"];
    const count = 20; // Reducido ligeramente de 25 a 20 para máximo rendimiento móvil
    const generated: Particle[] = Array.from({ length: count }).map((_, i) => {
      const isUpward = theme === "san_valentin";
      return {
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100, // % de ancho de pantalla
        size: Math.random() * 14 + 14, // tamaño optimizado entre 14px y 28px
        delay: Math.random() * 5, // retraso aleatorio hasta 5s
        duration: Math.random() * 5 + (isUpward ? 5 : 7), // duración de caída/subida
        rotation: Math.random() * 360, // rotación inicial
        rotationDirection: Math.random() > 0.5 ? 180 : -180, // rotación estable
        glow: Math.random() > 0.7, // algunas brillan más
        // Pre-calcular balanceo en píxeles puros para evitar recálculo de strings (vw/vh) en render
        xSway: [
          0,
          Math.random() * 30 - 15,
          Math.random() * 60 - 30,
          Math.random() * 30 - 15,
          0
        ],
      };
    });
    
    setParticles(generated);
  }, [theme]);

  if (!isMounted) return null;

  const isUpward = theme === "san_valentin";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            left: `${p.left}%`,
            y: isUpward ? "105vh" : "-10vh",
            rotate: p.rotation,
            scale: 0.6,
            x: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: isUpward ? "-10vh" : "105vh",
            rotate: p.rotation + p.rotationDirection,
            scale: [0.6, 1, 1, 0.6],
            x: p.xSway,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute select-none"
          style={{
            fontSize: `${p.size}px`,
            filter: p.glow ? "drop-shadow(0 0 6px rgba(229, 196, 20, 0.25))" : "none",
            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
            willChange: "transform, opacity", // Promoción a capa de compositor GPU
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}

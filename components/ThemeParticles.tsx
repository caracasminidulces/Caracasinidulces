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
  toystory: ["🤠", "🚀", "⭐", "👽", "🎈"],
};

export default function ThemeParticles({ theme }: ThemeParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Registrar el montaje inicial de manera única
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generar partículas cuando cambia el tema o tras el montaje inicial
  useEffect(() => {
    if (!isMounted) return;
    
    const symbols = themeSymbols[theme] || ["✨", "✨"];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 6 : 20; // Reducido en móvil para máximo rendimiento
    const generated: Particle[] = Array.from({ length: count }).map((_, i) => {
      const isUpward = theme === "san_valentin";
      return {
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100,
        size: Math.random() * 14 + 14,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + (isUpward ? 5 : 7),
        rotation: Math.random() * 360,
        rotationDirection: Math.random() > 0.5 ? 180 : -180,
        glow: Math.random() > 0.7,
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
  }, [theme, isMounted]);

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

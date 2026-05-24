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

  // Generar la estructura de partículas estable una sola vez tras el montaje en el cliente
  useEffect(() => {
    if (!isMounted) return;
    
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 6 : 18; // 18 partículas estables para máximo rendimiento
    
    const initialParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      return {
        id: i,
        symbol: "✨", // Símbolo por defecto inicial
        left: Math.random() * 100,
        size: Math.random() * 14 + 14,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 8, // Movimiento constante majestuoso y lento
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
    
    // Asignar los símbolos reales del tema inicial
    const symbols = themeSymbols[theme] || ["✨"];
    const withSymbols = initialParticles.map(p => ({
      ...p,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
    
    setParticles(withSymbols);
  }, [isMounted]);

  // Cambiar únicamente el símbolo del tema de manera reactiva (Metamorfosis con Cero Lag)
  // Al no cambiar left, size, delay ni duration, el ciclo de animación Framer Motion no se reinicia.
  useEffect(() => {
    if (!isMounted || particles.length === 0) return;
    
    const symbols = themeSymbols[theme] || ["✨"];
    
    setParticles(prev => 
      prev.map(p => ({
        ...p,
        symbol: symbols[Math.floor(Math.random() * symbols.length)]
      }))
    );
  }, [theme]);

  if (!isMounted || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            left: `${p.left}%`,
            y: "-10vh",
            rotate: p.rotation,
            scale: 0.6,
            x: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: "105vh",
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
            willChange: "transform, opacity", // Promoción a GPU
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}

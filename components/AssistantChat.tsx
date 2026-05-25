"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface ClarificationContext {
  type: "pavlova" | "custom_only" | null;
  pendingQuantity: number;
  pendingItemName?: string;
}

// ==========================================
// 1. Bespoke Gold Vector SVG Icons for Chat Messages (Replacing casual emojis)
// ==========================================

const IconBespokeSparkle = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  </span>
);

const IconBespokeChef = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18V9a6 6 0 0 1 12 0v9M3 18h18v3H3zM12 3v3" />
    </svg>
  </span>
);

const IconBespokeCake = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16H3V8l9-4 9 4zM3 12h18M12 4v4M12 12v4M7 8v2M17 8v2" />
    </svg>
  </span>
);

const IconBespokeStrawberry = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1-1 3-1 4 0 1 1 0 3-1 4-2 3-5 7-7 9a6 6 0 0 1-8-8c2-2 6-5 9-7z" />
      <circle cx="9" cy="11" r="0.5" fill="currentColor" />
      <circle cx="12" cy="13" r="0.5" fill="currentColor" />
      <circle cx="10" cy="15" r="0.5" fill="currentColor" />
    </svg>
  </span>
);

const IconBespokeCrown = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7z" />
      <path d="M3 20h18" />
    </svg>
  </span>
);

const IconBespokeCupcake = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13a4 4 0 0 1 8 0v1h-8zm0 1h8v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM10 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  </span>
);

const IconBespokeCart = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  </span>
);

const IconBespokePalette = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02105 19.1652 5.09351 19.3951 5.05041 19.6212C4.94273 20.186 5.12784 20.7687 5.56569 21.1578C6.01258 21.555 6.62678 21.6806 7.1856 21.4883C7.4116 21.4105 7.66016 21.4428 7.86311 21.575C9.0716 22.3621 10.4907 22.7538 12 22Z" />
      <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
    </svg>
  </span>
);

const IconBespokeFlower = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm0 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm-8 2a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4zm8 0a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
    </svg>
  </span>
);

const IconBespokeDelivery = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  </span>
);

const IconBespokePhone = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  </span>
);

const IconBespokeRing = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="14" r="6" />
      <path d="M12 8L12.5 6.5L14 6L12.5 5.5L12 4L11.5 5.5L10 6L11.5 6.5Z" fill="currentColor" />
    </svg>
  </span>
);

const IconBespokeGift = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  </span>
);

const IconBespokeTree = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 17h18L12 2z" />
      <path d="M12 17v5" />
    </svg>
  </span>
);

const IconBespokeClock = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  </span>
);

const IconBespokeRabbit = () => (
  <span className="inline-flex items-center mx-0.5 align-middle select-none">
    <svg className="w-3.5 h-3.5 text-brand-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5a2 2 0 0 1 4 0v4H10V5z" />
      <path d="M16 4a2 2 0 0 1 4 0v5H16V4z" />
      <path d="M19 13a6 6 0 1 1-12 0h12z" />
    </svg>
  </span>
);

// Mapeo e interpolador de emojis a SVGs vectorizados
const renderBespokeMessage = (text: string): React.ReactNode[] => {
  const emojiMap: Record<string, React.ComponentType> = {
    "✨": IconBespokeSparkle,
    "🧑‍🍳": IconBespokeChef,
    "🍰": IconBespokeCake,
    "🍓": IconBespokeStrawberry,
    "👑": IconBespokeCrown,
    "🧁": IconBespokeCupcake,
    "🛒": IconBespokeCart,
    "🎨": IconBespokePalette,
    "🌸": IconBespokeFlower,
    "🚗": IconBespokeDelivery,
    "📞": IconBespokePhone,
    "💍": IconBespokeRing,
    "🎁": IconBespokeGift,
    "🎄": IconBespokeTree,
    "⏳": IconBespokeClock,
    "🐰": IconBespokeRabbit,
  };

  const regex = new RegExp(`(${Object.keys(emojiMap).join("|")})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const IconComponent = emojiMap[part];
    if (IconComponent) {
      const Component = IconComponent;
      return <Component key={index} />;
    }
    return part;
  });
};

// ==========================================
// 2. Catálogo de Dulces y Definición
// ==========================================

const ACTIVE_SWEETS = [
  {
    id: "polvorosas",
    nombre: "Polvorosas Imperiales",
    categoria: "Bocados Finos",
    imagen: "/images/dulces/polvorosas.png",
    descripcion: "Tradicionales polvorosas caraqueñas que se deshacen delicadamente en el paladar. Elaboradas con un toque sutil de vainilla bourbon y espolvoreadas con azúcar fina.",
    textura: "Desmoronamiento suave y fundente al instante",
    keywords: ["polvorosa", "polvorosas", "polvorocitas", "polvoroza"]
  },
  {
    id: "brookies",
    nombre: "Brookies Tentación",
    categoria: "Bocados Finos",
    imagen: "/images/dulces/brookies.png",
    descripcion: "La fusión definitiva de dos mundos: una base densa y húmeda de brownie de chocolate belga fusionada con una cubierta crocante de galleta con chispas de chocolate.",
    textura: "Corazón súper meloso con superficie crujiente",
    keywords: ["broki", "brokis", "brookie", "brookies", "brownie galleta"]
  },
  {
    id: "craqueladas",
    nombre: "Craqueladas de Chocolate",
    categoria: "Bocados Finos",
    imagen: "/images/dulces/craqueladas.png",
    descripcion: "Exquisitas galletas de chocolate intenso agrietadas con una generosa y elegante nevada de azúcar glas, presentadas en su exclusiva caja de presentación con lazo dorado.",
    textura: "Corteza crujiente con centro denso tipo fudge",
    keywords: ["craquelada", "craqueladas", "crackle", "crackles", "galleta chocolate"]
  },
  {
    id: "minipavlova",
    nombre: "Mini Pavlova de Gala",
    categoria: "Pavlovas",
    imagen: "/images/dulces/minipavlova.png",
    descripcion: "Elegantes bocados de merengue horneado lentamente, rellenos con una suave corona de crema batida y fresas frescas, o dulce de leche repostero con un toque crocante de nueces.",
    textura: "Merengue etéreo y crujiente con la suavidad de la crema",
    keywords: ["mini pavlova", "minipavlova", "mini pavlovas", "minipavlovas", "pavlova individual"]
  },
  {
    id: "granpavlova",
    nombre: "Gran Pavlova de Autor",
    categoria: "Pavlovas",
    imagen: "/images/dulces/pavlova.png",
    descripcion: "Una majestuosa obra de arte para compartir. Disco de merengue artesanal crujiente, coronado con abundante crema batida, finas láminas de melocotón y una deslumbrante flor de fresas naturales.",
    textura: "Contraste sublime entre fruta fresca, crema sedosa y merengue crujiente",
    keywords: ["gran pavlova", "granpavlova", "pavlova grande", "pavlova de autor", "pavlova para compartir"]
  }
];

const CUSTOM_SWEETS_KEYWORDS = [
  { keywords: ["alfajor", "alfajores", "alfajorcito", "alfajorcitos"], name: "Alfajores Finos" },
  { keywords: ["brigadeiro", "brigadeiros", "brigadero"], name: "Brigadeiros Gourmet" },
  { keywords: ["cupcake", "cupcakes", "minicupcake", "minicupcakes"], name: "Cupcakes Artísticos" },
  { keywords: ["cakepop", "cakepops", "paleta"], name: "Cakepops & Paletas Brownie" },
  { keywords: ["shot", "shots", "vasito"], name: "Shots de 2oz y Vasitos de Chocolate" },
  { keywords: ["trufa", "trufas"], name: "Cuchi-Trufas" },
  { keywords: ["fresa", "fresas"], name: "Fresas cubiertas de chocolate" }
];

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "¡Hola! ✨ Soy tu Asistente Gastronómico de Caracas Mini Dulces. 🧑‍🍳🍰\n\nEstoy aquí para guiarte en tu pedido de alta repostería. Puedes hacerme preguntas sobre Victoria, nuestro menú de eventos, si hacemos delivery, o pedirme directamente que agregue dulces a tu carrito (ej. *'añade 6 brookies'* o *'quiero polvorosas'*).",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [clarification, setClarification] = useState<ClarificationContext>({ type: null, pendingQuantity: 1 });

  const { addToCart, setIsCartOpen } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
      .trim();
  };

  const extractQuantity = (text: string): number => {
    const numMatch = text.match(/\b\d+\b/);
    if (numMatch) return parseInt(numMatch[0]);

    if (text.includes("una docena") || text.includes("1 docena") || text.includes("docena")) return 12;
    if (text.includes("media docena") || text.includes("media")) return 6;
    if (text.includes("un par") || text.includes("dos")) return 2;
    if (text.includes("tres")) return 3;
    if (text.includes("cuatro")) return 4;
    if (text.includes("cinco")) return 5;
    if (text.includes("seis")) return 6;
    if (text.includes("diez")) return 10;
    if (text.includes("doce")) return 12;
    
    return 1; // Por defecto
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsg: Message = { sender: "user", text: userText, timestamp: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Procesar la respuesta del bot con un retardo orgánico pero reactivo (600ms en lugar del antiguo retraso de 6s)
    setTimeout(() => {
      const responseText = processResponse(userText);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, timestamp: new Date() }
      ]);
    }, 600);
  };

  const processResponse = (text: string): string => {
    const raw = cleanText(text);

    // 1. RESOLVER CLARIFICACIONES ACTIVAS (Pavlova o Catálogo a pedido)
    if (clarification.type === "pavlova") {
      const isMini = raw.includes("mini") || raw.includes("individual") || raw.includes("pequena") || raw.includes("gala") || raw.includes("1") || raw.includes("primer");
      const isGran = raw.includes("gran") || raw.includes("grande") || raw.includes("compartir") || raw.includes("autor") || raw.includes("2") || raw.includes("segund");

      if (isMini) {
        const item = ACTIVE_SWEETS.find((s) => s.id === "minipavlova")!;
        addToCart({
          nombre: item.nombre,
          descripcion: item.descripcion,
          imagen: item.imagen,
          textura: item.textura,
          categoria: item.categoria
        }, clarification.pendingQuantity);
        
        setClarification({ type: null, pendingQuantity: 1 });
        setIsCartOpen(true);
        return `¡Exquisita elección! He añadido **${clarification.pendingQuantity}x ${item.nombre}** al carrito de compras en el fondo. ¿Te gustaría que te asista con algún otro dulce gourmet? 🍓✨`;
      }

      if (isGran) {
        const item = ACTIVE_SWEETS.find((s) => s.id === "granpavlova")!;
        addToCart({
          nombre: item.nombre,
          descripcion: item.descripcion,
          imagen: item.imagen,
          textura: item.textura,
          categoria: item.categoria
        }, clarification.pendingQuantity);
        
        setClarification({ type: null, pendingQuantity: 1 });
        setIsCartOpen(true);
        return `¡Un postre sublime de autor! He agregado **${clarification.pendingQuantity}x ${item.nombre}** (disco de merengue majestuoso) al carrito. ¡Tu mesa se verá increíble! 👑🧁`;
      }

      return "Disculpa, para procesar tu orden correctamente necesito saber: ¿prefieres la **Mini Pavlova de Gala** (bocado individual, bocado de gala) o la **Gran Pavlova de Autor** (grande para compartir)? ¿Cuál de las dos te gustaría que añadamos? 🍓✨";
    }

    // 2. PARSEAR INTENCIONES DE COMPRA
    const isBuyingIntent = raw.includes("agrega") || raw.includes("anade") || raw.includes("pon") || raw.includes("quiero") || raw.includes("comprar") || raw.includes("dame") || raw.includes("adiciona") || raw.includes("add") || raw.includes("ordenar") || raw.includes("pedir") || raw.includes("gustaria");

    if (isBuyingIntent) {
      const quantity = extractQuantity(raw);

      // A. Comprobar si pide "pavlova" de forma ambigua
      const mentionsPavlova = raw.includes("pavlova") || raw.includes("pablova") || raw.includes("merengue");
      const mentionsMini = raw.includes("mini");
      const mentionsGran = raw.includes("gran") || raw.includes("grande") || raw.includes("autor");

      if (mentionsPavlova && !mentionsMini && !mentionsGran) {
        setClarification({ type: "pavlova", pendingQuantity: quantity });
        return `Veo que deseas ordenar **Pavlovas** (tenemos de merengue crujiente y fresas frescas). ✨\n\n¿Prefieres la **Mini Pavlova de Gala** (bocado individual, bocado de gala) o la **Gran Pavlova de Autor** (una majestuosa obra para compartir)?`;
      }

      // B. Mapeo normal de dulces rápidos en el menú
      for (const sweet of ACTIVE_SWEETS) {
        for (const kw of sweet.keywords) {
          if (raw.includes(kw)) {
            addToCart({
              nombre: sweet.nombre,
              descripcion: sweet.descripcion,
              imagen: sweet.imagen,
              textura: sweet.textura,
              categoria: sweet.categoria
            }, quantity);
            
            setIsCartOpen(true);
            return `¡Perfecto! He agregado **${quantity}x ${sweet.nombre}** a tu carrito de compras de inmediato en el fondo. El panel de compras se ha abierto para que puedas coordinarlo. 🍰🛒 ¿Deseas algo más?`;
          }
        }
      }

      // C. Comprobar si pide dulces personalizados del catálogo a pedido (alfajores, brigadeiros, etc.)
      for (const custom of CUSTOM_SWEETS_KEYWORDS) {
        for (const kw of custom.keywords) {
          if (raw.includes(kw)) {
            return `¡Oh, los **${custom.name}** de Victoria son una delicia celestial! 🧑‍🍳✨\n\nEstos dulces se elaboran de forma 100% personalizada y exclusiva por docena para eventos. No figuran en el menú de compra rápida en el carrito, pero **puedes incluirlos en tu cotización personalizada**.\n\nTe recomiendo utilizar el **Event Planner Wizard** en la sección de **Eventos** o escribirme directamente al WhatsApp para planificar tu mesa de dulces completa. ¿Te gustaría que te ayude con eso?`;
          }
        }
      }
    }

    // 3. BASE DE CONOCIMIENTO GENERAL (RESPUESTAS A PREGUNTAS CLAVE)

    // Sobre Eventos que hace Victoria
    if (raw.includes("evento") || raw.includes("que hace victoria") || raw.includes("cuales haces") || raw.includes("tipo de evento") || raw.includes("boda") || raw.includes("bautizo") || raw.includes("comunion") || raw.includes("babyshower") || raw.includes("tematico")) {
      return "**Victoria** realiza **todo tipo de eventos** y se adapta por completo a lo que tú como cliente necesites. ✨🎨\n\nDiseñamos mesas de dulces y experiencias culinarias personalizadas para cualquier celebración en Caracas:\n* **Cumpleaños de cualquier temática:** Victoria da vida a tus sueños más creativos modelando figuras personalizadas a mano. Algunos ejemplos son nuestros populares showrooms de Harry Potter, Aladdin, Alicia, Dinosaurios, Encanto, Fresita, Fútbol o Toy Story. 🎂\n* **Bodas & Compromisos:** Elegancia sublime y diseño de alta costura para tu gran día. 💍\n* **Celebraciones Familiares:** Bautizos, Primeras Comuniones, Baby Showers y aniversarios de ensueño. 🍼🌸\n* **Ediciones Especiales & Festividades:** Colecciones estacionales para Navidad, Pascuas, San Valentín y Halloween. 🎄🐰\n\nNo importa el tema o el tamaño de tu celebración, **Victoria se ajusta a lo que tú necesites** para hacerla inolvidable. Todas las piezas y detalles se modelan de forma 100% manual con ingredientes premium.\n\n¿Te gustaría planificar el tuyo? Te sugiero usar nuestro **Event Planner Wizard** en la sección de **Eventos** o escribirnos directamente al WhatsApp para diseñar tu cotización a medida. 📞🍰";
    }

    // Sobre Envío / Delivery / Transporte Seguro
    if (raw.includes("delivery") || raw.includes("envio") || raw.includes("envian") || raw.includes("entreg") || raw.includes("lleg") || raw.includes("trae") || raw.includes("repart") || raw.includes("mand")) {
      return "¡Por supuesto! 🚗✨ Coordinamos **envíos seguros y climatizados** a toda la zona metropolitana de Caracas.\n\nPara garantizar que tus mini dulces y pavlovas de gala lleguen en un estado impecable (sin que el calor afecte la crema o la simetría del merengue), los transportamos en **vehículos especialmente acondicionados** para mantener la temperatura óptima. ❄️🍰\n\nTambién ofrecemos la opción de **pick-up / retiro directo** por nuestro atelier en Caracas si prefieres coordinarlo tú mismo. Todos los pedidos se entregan en cajas de presentación de lujo con lazos dorados, listos para tu mesa de gala. 👑🎁";
    }

    // Sobre Ubicación / Tienda Física / Atelier
    if (raw.includes("donde estan") || raw.includes("ubicacion") || raw.includes("tienda") || raw.includes("local") || raw.includes("direccion") || raw.includes("fisic") || raw.includes("taller") || raw.includes("atelier") || raw.includes("caracas")) {
      return "Nos encontramos en **Caracas**, operando bajo el concepto exclusivo de **Atelier boutique de alta repostería** por encargo. 🧑‍🍳✨\n\n**No disponemos de una tienda física de mostrador o vitrina tradicional.** Esto es una decisión de diseño culinario deliberada para garantizar la excelencia: cada bocado, polvorosa o pavlova de autor se elabora desde cero **únicamente bajo pedido previo**.\n\nDe esta forma, te aseguramos una frescura absoluta en boca y un modelado impecable para tu evento. ¡Coordinamos entregas directas a tu celebración o retiro por nuestro atelier! 🚗🧁";
    }

    // Sobre Tiempos de Entrega / Antelación
    if (raw.includes("antelacion") || raw.includes("tiempo") || raw.includes("cuando pido") || raw.includes("con cuanto") || raw.includes("anticip") || raw.includes("dias")) {
      return "Para asegurar el nivel de detalle y frescura que nos caracteriza, manejamos los siguientes tiempos de anticipación: 🧑‍🍳⏳\n\n* **Menú de Compra Rápida (Polvorosas, Brookies, Craqueladas y Pavlovas):** Recomendamos realizar el pedido con **3 a 5 días de anticipación** directamente en el carrito.\n* **Mesas de Dulces Temáticas y Tortas de Gala:** Al requerir modelado de azúcar manual y diseño conceptual, solicitamos reservar con **1 a 2 semanas de antelación**.\n\nSi tienes una urgencia de última hora, ¡escríbenos al WhatsApp! Haremos todo lo posible en nuestro recetario para asistirte. 📞✨";
    }

    // Sobre Victoria / Repostera
    if (raw.includes("victoria") || raw.includes("repostera") || raw.includes("creadora") || raw.includes("quien es") || raw.includes("quien hace")) {
      return "**Victoria** es la mente y las manos creadoras de Caracas Mini Dulces. 🧑‍🍳✨\n\nElla es una apasionada de la repostería artística y detallista. Su filosofía se basa en el **modelado 100% manual**, asegurando que cada figura o rosa de azúcar sea una pieza única con alma, combinando un diseño visual simétrico con texturas y sabores gourmet extraordinarios.";
    }

    // Sobre Precios / Presupuestos / Mesa de Dulces
    if (raw.includes("precio") || raw.includes("cuanto cuesta") || raw.includes("presupuesto") || raw.includes("cotizacion") || raw.includes("mesa de dulce")) {
      return "¡Excelente! Los dulces de nuestro menú rápido (Polvorosas, Brookies y Pavlovas) se pueden añadir directamente al carrito en nuestra web.\n\nPara mesas de dulces de eventos completas o dulces a pedido por docena (brigadeiros, cakepops, etc.), te recomendamos usar nuestro **Planificador de Eventos (Event Planner Wizard)** en la sección de **Eventos** o enviarnos un WhatsApp. Victoria estará encantada de diseñarte una cotización a la medida de tus invitados.";
    }

    // Sobre los temas / Harry Potter / Aladdin, etc.
    if (raw.includes("tematicas") || raw.includes("tematica") || raw.includes("harry potter") || raw.includes("aladdin") || raw.includes("alicia") || raw.includes("dinosaurio") || raw.includes("encanto") || raw.includes("fresita") || raw.includes("futbol") || raw.includes("toy story")) {
      return "¡En Caracas Mini Dulces nos encantan las historias hechas azúcar! 🎨✨\n\nVictoria diseña eventos de gala y cumpleaños espectaculares con temáticas como **Harry Potter**, **Aladdin**, **Alicia en el País**, **Dinosaurios**, **Encanto**, **Fresita**, **Fútbol** y **Toy Story**, además de colecciones de gala para **Navidad**, **Pascuas**, **San Valentín** y **Halloween**.\n\nPuedes navegar en la pestaña de **Eventos** de nuestra web para sumergirte en la atmósfera cromática y el showroom en HD de cada temática.";
    }

    // Sobre Contacto / Instagram / Teléfono
    if (raw.includes("contacto") || raw.includes("instagram") || raw.includes("telefono") || raw.includes("whatsapp") || raw.includes("correo")) {
      return "¡Comunicarse con nosotros es muy sencillo! 📞✨\n\n* **WhatsApp Directo:** +58 414-1835422\n* **Instagram:** [@caracasminidulces](https://instagram.com/caracasminidulces) (¡síguenos para ver el showroom diario!)\n* **Correo:** minidulces1@gmail.com\n\nTambién puedes pulsar en el apartado de **Contacto** en el menú de navegación para ver los detalles.";
    }

    // Saludos / Ayuda general
    if (raw.includes("hola") || raw.includes("buenos dias") || raw.includes("buenas tardes") || raw.includes("saludos") || raw.includes("hello")) {
      return "¡Hola! ✨ Bienvenido de nuevo a Caracas Mini Dulces. 🧑‍🍳🍰 ¿En qué puedo asistirte hoy? ¿Deseas que te recomiende un dulce especial, te hable sobre Victoria o te ayude a armar tu carrito de compras?";
    }

    // Agradecimientos
    if (raw.includes("gracias") || raw.includes("excelente") || raw.includes("perfecto") || raw.includes("buenisimo") || raw.includes("graci")) {
      return "¡Es todo un honor para mí asistirte! 🌸 Si tienes cualquier otra duda culinaria, deseas agregar más bocados finos al carrito o quieres saber sobre nuestras mesas de gala, estaré por aquí.";
    }

    // Fallback general gourmet
    return "Entiendo lo que buscas, pero no dispongo de esa opción específica en mi recetario de respuestas rápidas. 🧑‍🍳🧁\n\n¿Te gustaría que añadamos alguna de nuestras especialidades al carrito (como las **Polvorosas Imperiales** o las **Mini Pavlovas**), o prefieres que coordinemos una cotización directa en WhatsApp con Victoria para personalizar tus postres?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] select-none font-body">
      <AnimatePresence>
        {/* Chat Drawer Expandido */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] h-[500px] bg-[#050505]/95 border border-brand-gold/15 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(229,196,20,0.05)] flex flex-col backdrop-blur-md"
          >
            {/* Esquinas ornamentales de lujo */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand-gold/30" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-brand-gold/30" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-brand-gold/30" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand-gold/30" />

            {/* Cabecera del chat */}
            <div className="px-5 py-4 border-b border-brand-gold/10 flex items-center justify-between bg-[#080808]/90">
              <div className="flex items-center gap-3">
                {/* Logotipo oficial de la marca en círculo de oro */}
                <div className="w-8 h-8 rounded-full border border-brand-gold/25 flex items-center justify-center bg-[#050505] overflow-hidden">
                  <img
                    src="/images/logo.png"
                    alt="Caracas Mini Dulces Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-heading font-medium tracking-wide text-brand-cream">
                    Asistente Gastronómico
                  </span>
                  <span className="text-[9px] text-brand-gold tracking-[0.1em] uppercase font-semibold">
                    En línea
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-cream/40 hover:text-brand-gold transition-colors duration-300 p-1"
                aria-label="Cerrar chat"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Historial de mensajes */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[#030303]/40 scrollbar-thin scrollbar-thumb-brand-gold/10">
              {messages.map((msg, i) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={i}
                    className={`flex ${isBot ? "justify-start" : "justify-end"} w-full`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed font-light ${
                        isBot
                          ? "bg-[#0b0b0b] border border-brand-gold/5 text-brand-cream/90 rounded-none rounded-tr-lg rounded-br-lg"
                          : "bg-brand-gold/10 border border-brand-gold/25 text-brand-cream rounded-none rounded-tl-lg rounded-bl-lg"
                      } whitespace-pre-wrap`}
                    >
                      {isBot ? renderBespokeMessage(msg.text) : msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Campo de entrada de mensajes */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-brand-gold/10 bg-[#080808]/95 flex gap-2.5 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu mensaje gourmet..."
                className="flex-1 bg-[#0c0c0c] border border-brand-gold/15 text-brand-cream text-xs px-4 py-2.5 focus:outline-none focus:border-brand-gold rounded-none transition-colors duration-300 font-light"
              />
              <button
                type="submit"
                className="w-9 h-9 border border-brand-gold text-brand-gold hover:text-brand-bg hover:bg-brand-gold flex items-center justify-center transition-all duration-300"
                aria-label="Enviar mensaje"
              >
                <svg className="w-4 h-4 fill-current transform rotate-90" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante (Pulsante e interactivo con el Logo Oficial de la Marca) */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-[#050505] border border-brand-gold text-brand-gold flex items-center justify-center shadow-[0_0_20px_rgba(229,196,20,0.15)] cursor-pointer focus:outline-none relative group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir asistente virtual"
      >
        {/* Efecto de resplandor e iluminación de fondo */}
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Efecto de latido / pulso circular elegante */}
        <div className="absolute -inset-1 border border-brand-gold/20 rounded-full animate-ping opacity-25 pointer-events-none -z-10" />

        {/* Logotipo original en miniatura de alta resolución */}
        <div className="relative w-9 h-9 overflow-hidden transition-transform duration-500 ease-luxury group-hover:scale-110">
          <img
            src="/images/logo.png"
            alt="Caracas Mini Dulces Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(229,196,20,0.35)]"
          />
        </div>
      </motion.button>
    </div>
  );
}

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
    keywords: ["brookie", "brookies", "bruki", "brukis", "brownie galleta"]
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
      text: "¡Hola! ✨ Soy tu Asistente Gastronómico de Caracas Mini Dulces. 🧑‍🍳🍰\n\nEstoy aquí para guiarte en tu pedido de alta repostería. Puedes hacerme preguntas sobre Victoria, nuestro menú, o pedirme directamente que agregue dulces a tu carrito (ej. *'añade 6 brookies'* o *'quiero polvorosas'*).",
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
    // Buscar números explícitos (ej. 3, 12, 24)
    const numMatch = text.match(/\b\d+\b/);
    if (numMatch) return parseInt(numMatch[0]);

    // Buscar palabras numéricas en español
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

    // Procesar la respuesta del bot
    setTimeout(() => {
      const responseText = processResponse(userText);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, timestamp: new Date() }
      ]);
    }, 6000); // 600ms de respuesta simulada
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

      return "Disculpa, no logré entender si prefieres la **Mini Pavlova de Gala** (individual) o la **Gran Pavlova de Autor** (grande para compartir). ¿Cuál de las dos te gustaría que añadamos?";
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

    // 3. BASE DE CONOCIMIENTO GENERAL (RESPUESTAS A PREGUNTAS)
    
    // Sobre Victoria / Repostera
    if (raw.includes("victoria") || raw.includes("repostera") || raw.includes("creadora") || raw.includes("quien es") || raw.includes("quien hace")) {
      return "**Victoria** es la mente y las manos creadoras de Caracas Mini Dulces. 🧑‍🍳✨\n\nElla es una apasionada de la repostería artística y detallista. Su filosofía se basa en el **modelado 100% manual**, asegurando que cada figura o rosa de azúcar sea una pieza única con alma, combinando un diseño visual simétrico con texturas y sabores gourmet extraordinarios.";
    }

    // Sobre Envío / Delivery / Dónde están
    if (raw.includes("envio") || raw.includes("delivery") || raw.includes("donde estan") || raw.includes("ubicacion") || raw.includes("caracas") || raw.includes("entregas")) {
      return "¡Hola! Nos encontramos en **Caracas**. Coordinamos entregas personalizadas y envíos seguros a toda la zona metropolitana de Caracas para asegurar que tus mini dulces y pavlovas de gala lleguen en un estado impecable a tu evento. 🚗🍰";
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
    return "Mmm, entiendo lo que buscas, pero no dispongo de esa opción específica en mi recetario de respuestas rápidas. 🧑‍🍳🧁\n\n¿Te gustaría que añadamos alguna de nuestras especialidades al carrito (como las **Polvorosas Imperiales** o las **Mini Pavlovas**), o prefieres que coordinemos una cotización directa en WhatsApp con Victoria para personalizar tus postres?";
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
                {/* Manga repostera animada miniatura */}
                <div className="w-8 h-8 rounded-full border border-brand-gold/25 flex items-center justify-center bg-brand-gold/5 text-brand-gold">
                  <svg className="w-5.5 h-5.5" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M48 10C49 8.5 51.5 7.5 53.5 9.5C55.5 11.5 54.5 14 53 15C50 17 48 15 48 10Z" />
                    <path d="M44 14C45 12 47 11 48 12C49 13 48 15 46 16" />
                    <path d="M45 15L19 41C18 42 16.5 44 16 46L15 48L17 47C19 46.5 21 45 22 44L48 18L45 15Z" />
                    <path d="M15 48L11 52L8 50L10 46L14 42" />
                    <path d="M7 53C6.5 54 6.5 55.5 7.5 56.5C8.5 57.5 10 57.5 11 57C12 56.5 12.5 55 12 54" />
                  </svg>
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
                      {msg.text}
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

      {/* Botón Flotante (Pulsante e interactivo con Manga Repostera SVG) */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-[#050505] border border-brand-gold text-brand-gold flex items-center justify-center shadow-[0_0_20px_rgba(229,196,20,0.15)] cursor-pointer focus:outline-none relative group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir asistente de pastelería"
      >
        {/* Efecto de resplandor e iluminación de fondo */}
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Efecto de latido / pulso circular elegante */}
        <div className="absolute -inset-1 border border-brand-gold/20 rounded-full animate-ping opacity-25 pointer-events-none -z-10" />

        {/* Ícono Vectorizado de Manga Repostera de Alta Fidelidad */}
        <svg 
          className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-500" 
          viewBox="0 0 64 64" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Nudo/Lazo superior de la manga */}
          <path d="M48 10C49 8.5 51.5 7.5 53.5 9.5C55.5 11.5 54.5 14 53 15C50 17 48 15 48 10Z" />
          <path d="M44 14C45 12 47 11 48 12C49 13 48 15 46 16" />
          
          {/* Cuerpo principal de la manga */}
          <path d="M45 15L19 41C18 42 16.5 44 16 46L15 48L17 47C19 46.5 21 45 22 44L48 18L45 15Z" />
          
          {/* Texturas de pliegues en la manga */}
          <path d="M40 20C36 21 32 23 28 27" opacity="0.6" strokeDasharray="2 2" />
          <path d="M35 25C32 26 29 28 26 31" opacity="0.6" strokeDasharray="2 2" />
          
          {/* Boquilla de metal al final */}
          <path d="M15 48L11 52L8 50L10 46L14 42" />
          
          {/* Delicada espiral / copo de crema saliendo */}
          <path d="M7 53C6.5 54 6.5 55.5 7.5 56.5C8.5 57.5 10 57.5 11 57C12 56.5 12.5 55 12 54" />
        </svg>
      </motion.button>
    </div>
  );
}

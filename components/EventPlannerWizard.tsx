"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

export default function EventPlannerWizard() {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("");
  const [eventScale, setEventScale] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleReset = () => {
    setEventType("");
    setEventScale("");
    setStep(1);
  };

  const handleWhatsAppRedirect = () => {
    const scaleText = eventScale === "Mayor a 60 personas" ? "más de 60" : eventScale.replace(" personas", "");
    const message = `¡Hola Victoria! ✨ Me gustaría solicitar un presupuesto de mesa de dulces personalizada para un evento de tipo *${eventType}* para un grupo de *${scaleText} personas*. ¿Podríamos coordinar los detalles? 🍰✨`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584141835422?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const [direction, setDirection] = useState(1);

  const setStepWithDirection = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const eventTypes = [
    { id: "Cumpleaños", label: "Cumpleaños", icon: "🎂", desc: "Celebraciones llenas de color y fantasía" },
    { id: "Boda", label: "Boda", icon: "💍", desc: "Elegancia sublime para tu día eterno" },
    { id: "Bautizo", label: "Bautizo", icon: "🕊️", desc: "Dulzura pura para bendiciones familiares" },
    { id: "Temático por festividad", label: "Temático", icon: "🎄", desc: "Navidad, Pascuas, San Valentín y Halloween" },
    { id: "Primera Comunión", label: "Comunión", icon: "⛪", desc: "Distinción artesanal para un día santo" },
    { id: "Baby Shower", label: "Baby Shower", icon: "🍼", desc: "Tiernas sorpresas en rosa, azul y oro" },
  ];

  const guestRanges = [
    { id: "10/15 personas", label: "10 a 15 personas", size: "Íntimo", desc: "Ideal para celebraciones en el hogar o reuniones privadas." },
    { id: "20/35 personas", label: "20 a 35 personas", size: "Mediano", desc: "Perfecto para salones pequeños y reuniones familiares selectas." },
    { id: "40/60 personas", label: "40 a 60 personas", size: "Grande", desc: "Diseñado para banquetes de tamaño moderado o fiestas formales." },
    { id: "Mayor a 60 personas", label: "Más de 60 personas", size: "Gala", desc: "El gran Showroom de lujo Caracas Mini Dulces a escala masiva." },
  ];

  return (
    <section id="planificador" className="w-full max-w-4xl bg-[#050505]/75 border border-brand-gold/15 p-6 md:p-10 backdrop-blur-md relative mt-16 md:mt-24 select-none">
      {/* Esquinas de estilo boutique */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-gold/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-gold/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-gold/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-gold/40" />

      {/* Cabecera del Wizard */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-2 block">
          Asistente de Presupuesto
        </span>
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-brand-cream mb-3">
          Planifica tu Evento Especial
        </h2>
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-4" />
        <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
          Diseña tu mesa de dulces ideal en solo tres pasos. Selecciona la naturaleza de tu celebración, 
          su escala en invitados y obtén una cotización personalizada al instante.
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-10 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-brand-gold/10 -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-brand-gold transition-all duration-500 -z-10"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        {[1, 2, 3].map((num) => {
          const isActive = step >= num;
          const isCurrent = step === num;
          return (
            <button
              key={num}
              onClick={() => {
                if (num === 1) setStepWithDirection(1);
                if (num === 2 && eventType) setStepWithDirection(2);
                if (num === 3 && eventType && eventScale) setStepWithDirection(3);
              }}
              disabled={num === 2 && !eventType || num === 3 && (!eventType || !eventScale)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                isCurrent
                  ? "bg-brand-gold text-brand-bg border-brand-gold shadow-[0_0_12px_rgba(229,196,20,0.4)]"
                  : isActive
                  ? "bg-brand-bg text-brand-gold border-brand-gold"
                  : "bg-brand-bg text-brand-cream/30 border-brand-gold/10"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Caja de contenido animada */}
      <div className="relative min-h-[300px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* PASO 1: Naturaleza del Evento */}
            {step === 1 && (
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-light mb-6">
                  Paso 1: Selecciona la Naturaleza de tu Evento
                </span>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eventTypes.map((type) => {
                    const isSelected = eventType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setEventType(type.id);
                          setStepWithDirection(2);
                        }}
                        className={`relative p-5 text-left border transition-all duration-300 flex flex-col group ${
                          isSelected
                            ? "border-brand-gold bg-brand-gold/[0.04] shadow-[0_0_15px_rgba(212,175,55,0.06)]"
                            : "border-brand-gold/15 hover:border-brand-gold/50 bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{type.icon}</span>
                          <span className={`text-sm tracking-wide font-medium font-heading transition-colors duration-300 ${isSelected ? "text-brand-gold" : "text-brand-cream/90 group-hover:text-brand-gold-light"}`}>
                            {type.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-cream/60 leading-relaxed font-body">
                          {type.desc}
                        </p>
                        <div className={`absolute bottom-0 right-0 w-2 h-2 bg-brand-gold transition-transform duration-300 ${isSelected ? "scale-100" : "scale-0"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PASO 2: Escala del Evento */}
            {step === 2 && (
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-light mb-6">
                  Paso 2: Selecciona la Escala de Invitados
                </span>
                
                <div className="w-full max-w-2xl flex flex-col gap-4">
                  {guestRanges.map((range) => {
                    const isSelected = eventScale === range.id;
                    return (
                      <button
                        key={range.id}
                        onClick={() => {
                          setEventScale(range.id);
                          setStepWithDirection(3);
                        }}
                        className={`relative p-5 text-left border transition-all duration-300 flex items-center justify-between group ${
                          isSelected
                            ? "border-brand-gold bg-brand-gold/[0.04] shadow-[0_0_15px_rgba(212,175,55,0.06)]"
                            : "border-brand-gold/15 hover:border-brand-gold/50 bg-transparent"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-baseline gap-3">
                            <span className={`text-base font-medium tracking-wide ${isSelected ? "text-brand-gold" : "text-brand-cream group-hover:text-brand-gold-light"}`}>
                              {range.label}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-brand-gold/60 font-semibold px-2 py-0.5 bg-brand-gold/5 border border-brand-gold/10">
                              {range.size}
                            </span>
                          </div>
                          <p className="text-[11px] text-brand-cream/60 leading-relaxed font-body max-w-lg">
                            {range.desc}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${isSelected ? "border-brand-gold bg-brand-gold" : "border-brand-gold/25"}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-brand-bg" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Botón de retroceso */}
                <button
                  onClick={handleBack}
                  className="mt-8 text-[10px] uppercase tracking-[0.2em] text-brand-cream/50 hover:text-brand-gold transition-colors duration-300"
                >
                  ← Volver a Naturaleza del Evento
                </button>
              </div>
            )}

            {/* PASO 3: Resumen y Conversión a WhatsApp */}
            {step === 3 && (
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-light mb-6">
                  Paso 3: Tu Resumen de Cotización
                </span>

                <div className="w-full max-w-lg bg-[#0c0c0c]/80 border border-brand-gold/10 p-6 md:p-8 backdrop-blur-sm relative text-center">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-gold/30" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-gold/30" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-gold/30" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-gold/30" />

                  <span className="text-[32px] mb-4 block">✨🧁✨</span>
                  
                  <h3 className="text-lg font-light tracking-wide text-brand-cream mb-4 font-heading">
                    ¡Detalles de la Celebración listos!
                  </h3>

                  <div className="w-full flex flex-col gap-3 mb-6 py-4 border-t border-b border-brand-gold/10 text-xs">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-brand-cream/55 font-light">Naturaleza:</span>
                      <span className="text-brand-gold font-medium uppercase tracking-wider">{eventType}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-brand-cream/55 font-light">Escala en invitados:</span>
                      <span className="text-brand-gold font-medium uppercase tracking-wider">
                        {eventScale === "Mayor a 60 personas" ? "MÁS DE 60" : eventScale.replace(" personas", "")} PERSONAS
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-brand-cream/70 leading-relaxed italic mb-8 px-4 font-body">
                    "Hola Victoria! ✨ Me gustaría solicitar un presupuesto de mesa de dulces personalizada para un evento de tipo *{eventType}* para un grupo de *{eventScale === "Mayor a 60 personas" ? "más de 60" : eventScale.replace(" personas", "")} personas*. ¿Podríamos coordinar los detalles? 🍰✨"
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={handleBack}
                      className="text-[10px] uppercase tracking-[0.18em] px-5 py-2.5 border border-brand-gold/15 text-brand-cream/60 hover:border-brand-gold/40 hover:text-brand-cream transition-all duration-300 w-full sm:w-auto"
                    >
                      Editar Escala
                    </button>
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="inline-flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.18em] px-6 py-3 border border-brand-gold bg-brand-gold text-brand-bg hover:bg-transparent hover:text-brand-gold transition-all duration-500 font-semibold w-full sm:w-auto"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.822 0c3.148.001 6.107 1.227 8.331 3.453 2.224 2.227 3.45 5.187 3.447 8.335-.006 6.502-5.332 11.827-11.828 11.827-2.002-.001-3.972-.51-5.733-1.485L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.389 0 9.773-4.381 9.777-9.772.002-2.61-1.01-5.063-2.851-6.907C16.4 2.08 13.945 1.066 11.336 1.065 5.948 1.065 1.564 5.447 1.56 10.839c-.001 1.637.447 3.235 1.3 4.65L1.88 20.89l5.59-1.466z" />
                      </svg>
                      Enviar a WhatsApp
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-6 text-[9px] uppercase tracking-[0.2em] text-brand-cream/35 hover:text-brand-gold transition-colors duration-300 block mx-auto"
                  >
                    Reiniciar Planificador
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

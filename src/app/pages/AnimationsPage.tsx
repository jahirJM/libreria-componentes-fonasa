import { useState } from "react";
import { LuCopy, LuCheck, LuPlay, LuRotateCcw } from "react-icons/lu";
import { Card, CardContent } from "../../componentsUI/Card";
import { Badge } from "../../componentsUI/Badge";

// ═══════════════════════════════════════════════════════════════════════════════
// DATOS DE ANIMACIONES
// ═══════════════════════════════════════════════════════════════════════════════

interface AnimationEntry {
  name: string;
  description: string;
  /** Clase Tailwind 4 para aplicar */
  tailwindClass: string;
  /** Si requiere @keyframes en CSS (true = necesita CSS custom) */
  requiresCss: boolean;
  /** El @keyframes CSS necesario (si aplica) */
  cssCode?: string;
  /** Duración sugerida */
  duration: string;
  /** Easing sugerido */
  easing: string;
  /** Categoría */
  category: "Entrada" | "Salida" | "Loop" | "Interacción" | "Feedback";
}

const animations: AnimationEntry[] = [
  // ─── Entrada ───
  {
    name: "Fade In",
    description: "Aparece con opacidad de 0 a 1. Base de todas las animaciones.",
    tailwindClass: "animate-[fadeIn_0.3s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
    duration: "0.3s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Fade Slide Up",
    description: "Sube desde abajo con fade. Perfecto para cards y listas staggered.",
    tailwindClass: "animate-[fadeSlideUp_0.4s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    duration: "0.4s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Blur In",
    description: "Aparece desde un blur desenfocado. Efecto cinematográfico premium.",
    tailwindClass: "animate-[blurIn_0.5s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes blurIn {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}`,
    duration: "0.5s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Flip In X",
    description: "Gira en el eje X como una carta. Para revelar contenido con drama.",
    tailwindClass: "animate-[flipInX_0.6s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes flipInX {
  from {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  40% {
    transform: perspective(400px) rotateX(-10deg);
  }
  70% {
    transform: perspective(400px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateX(0);
  }
}`,
    duration: "0.6s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Slide In Bounce",
    description: "Entra desde la derecha con rebote elástico. Alto impacto visual.",
    tailwindClass: "animate-[slideInBounce_0.7s_cubic-bezier(0.68,-0.55,0.265,1.55)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes slideInBounce {
  from {
    opacity: 0;
    transform: translateX(80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`,
    duration: "0.7s",
    easing: "cubic-bezier(0.68,-0.55,0.265,1.55)",
    category: "Entrada",
  },
  {
    name: "Drop In",
    description: "Cae desde arriba con gravedad y rebote. Para notificaciones.",
    tailwindClass: "animate-[dropIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes dropIn {
  from {
    opacity: 0;
    transform: translateY(-60px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`,
    duration: "0.5s",
    easing: "cubic-bezier(0.34,1.56,0.64,1)",
    category: "Entrada",
  },
  {
    name: "Zoom In Rotate",
    description: "Entra con zoom + rotación leve. Muy llamativo para hero sections.",
    tailwindClass: "animate-[zoomInRotate_0.6s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes zoomInRotate {
  from {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}`,
    duration: "0.6s",
    easing: "ease-out",
    category: "Entrada",
  },
  // ─── Salida ───
  {
    name: "Fade Out Down",
    description: "Sale bajando con fade. Para remover items de una lista.",
    tailwindClass: "animate-[fadeOutDown_0.3s_ease-in_forwards]",
    requiresCss: true,
    cssCode: `@keyframes fadeOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}`,
    duration: "0.3s",
    easing: "ease-in",
    category: "Salida",
  },
  {
    name: "Blur Out",
    description: "Se desvanece con blur. Efecto de desenfoque cinemático.",
    tailwindClass: "animate-[blurOut_0.4s_ease-in_forwards]",
    requiresCss: true,
    cssCode: `@keyframes blurOut {
  from {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
  to {
    opacity: 0;
    filter: blur(12px);
    transform: scale(1.05);
  }
}`,
    duration: "0.4s",
    easing: "ease-in",
    category: "Salida",
  },
  {
    name: "Shrink Out",
    description: "Se encoge hasta desaparecer. Para cerrar chips o tags.",
    tailwindClass: "animate-[shrinkOut_0.3s_ease-in_forwards]",
    requiresCss: true,
    cssCode: `@keyframes shrinkOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}`,
    duration: "0.3s",
    easing: "ease-in",
    category: "Salida",
  },
  // ─── Loop ───
  {
    name: "Spin",
    description: "Rotación continua 360°. El clásico spinner.",
    tailwindClass: "animate-spin",
    requiresCss: false,
    duration: "1s",
    easing: "linear",
    category: "Loop",
  },
  {
    name: "Pulse",
    description: "Opacidad pulsante. Para skeletons y loading states.",
    tailwindClass: "animate-pulse",
    requiresCss: false,
    duration: "2s",
    easing: "cubic-bezier(0.4,0,0.6,1)",
    category: "Loop",
  },
  {
    name: "Bounce",
    description: "Rebote vertical continuo. Para indicar scroll o atención.",
    tailwindClass: "animate-bounce",
    requiresCss: false,
    duration: "1s",
    easing: "ease",
    category: "Loop",
  },
  {
    name: "Float",
    description: "Flota arriba y abajo suavemente. Ideal para ilustraciones hero.",
    tailwindClass: "animate-[float_3s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`,
    duration: "3s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Glow Pulse",
    description: "Pulso de box-shadow luminoso. Para CTAs y botones destacados.",
    tailwindClass: "animate-[glowPulse_2s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(5, 114, 206, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(5, 114, 206, 0.8),
                0 0 40px rgba(5, 114, 206, 0.3);
  }
}`,
    duration: "2s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Morph",
    description: "Transforma el border-radius continuamente. Efecto orgánico/blob.",
    tailwindClass: "animate-[morph_4s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
}`,
    duration: "4s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Rotate Pulse",
    description: "Rotación con escala pulsante. Spinner premium para loading states.",
    tailwindClass: "animate-[rotatePulse_1.5s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes rotatePulse {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}`,
    duration: "1.5s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Swing",
    description: "Oscila como un péndulo. Para íconos de campana o notificaciones.",
    tailwindClass: "animate-[swing_1s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes swing {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
}`,
    duration: "1s",
    easing: "ease-in-out",
    category: "Loop",
  },
  // ─── Interacción ───
  {
    name: "Press",
    description: "Escala al hacer clic. Feedback táctil inmediato.",
    tailwindClass: "active:scale-95 transition-transform",
    requiresCss: false,
    duration: "instant",
    easing: "transform",
    category: "Interacción",
  },
  {
    name: "Hover Lift",
    description: "Sube + sombra al hover. Para cards con profundidad.",
    tailwindClass: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
    requiresCss: false,
    duration: "200ms",
    easing: "ease-out",
    category: "Interacción",
  },
  {
    name: "Hover Glow",
    description: "Brillo de borde al hover. Para botones y elementos interactivos.",
    tailwindClass: "hover:shadow-[0_0_15px_rgba(5,114,206,0.4)] transition-shadow duration-300",
    requiresCss: false,
    duration: "300ms",
    easing: "ease",
    category: "Interacción",
  },
  // ─── Feedback ───
  {
    name: "Shake",
    description: "Sacudida horizontal. Feedback de error en formularios.",
    tailwindClass: "animate-[shake_0.4s_ease-in-out]",
    requiresCss: true,
    cssCode: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}`,
    duration: "0.4s",
    easing: "ease-in-out",
    category: "Feedback",
  },
  {
    name: "Jello",
    description: "Deformación elástica tipo gelatina. Feedback lúdico y divertido.",
    tailwindClass: "animate-[jello_0.7s_ease-in-out]",
    requiresCss: true,
    cssCode: `@keyframes jello {
  0%, 100% { transform: skewX(0deg) skewY(0deg); }
  30% { transform: skewX(-12deg) skewY(-12deg); }
  40% { transform: skewX(10deg) skewY(10deg); }
  50% { transform: skewX(-6deg) skewY(-6deg); }
  65% { transform: skewX(4deg) skewY(4deg); }
  75% { transform: skewX(-2deg) skewY(-2deg); }
}`,
    duration: "0.7s",
    easing: "ease-in-out",
    category: "Feedback",
  },
  {
    name: "Rubber Band",
    description: "Estiramiento elástico tipo liga. Para confirmar acciones con estilo.",
    tailwindClass: "animate-[rubberBand_0.6s_ease-in-out]",
    requiresCss: true,
    cssCode: `@keyframes rubberBand {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  50% { transform: scaleX(1.15) scaleY(0.85); }
  65% { transform: scaleX(0.95) scaleY(1.05); }
  75% { transform: scaleX(1.05) scaleY(0.95); }
  100% { transform: scale(1); }
}`,
    duration: "0.6s",
    easing: "ease-in-out",
    category: "Feedback",
  },
  {
    name: "Heartbeat",
    description: "Latido como corazón. Para likes, favoritos o health indicators.",
    tailwindClass: "animate-[heartbeat_1.2s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}`,
    duration: "1.2s",
    easing: "ease-in-out",
    category: "Feedback",
  },
  {
    name: "Tada",
    description: "Rotación con escala celebratoria. Para éxitos y logros.",
    tailwindClass: "animate-[tada_0.8s_ease-in-out]",
    requiresCss: true,
    cssCode: `@keyframes tada {
  0%, 100% { transform: scale(1) rotate(0deg); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
}`,
    duration: "0.8s",
    easing: "ease-in-out",
    category: "Feedback",
  },
  {
    name: "Success Pop",
    description: "Pop con overshoot. Confirmar guardado, envío o check.",
    tailwindClass: "animate-[successPop_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes successPop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}`,
    duration: "0.4s",
    easing: "cubic-bezier(0.175,0.885,0.32,1.275)",
    category: "Feedback",
  },
  // ─── Corporativo (útil para webs institucionales) ───
  {
    name: "Counter Up",
    description: "Efecto numérico de contador subiendo. Para estadísticas y KPIs en dashboards.",
    tailwindClass: "animate-[counterUp_0.8s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes counterUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-3px) scale(1.02);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}`,
    duration: "0.8s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Stagger Fade",
    description: "Fade escalonado para listas. Usar con delay incremental (delay-100, delay-200...).",
    tailwindClass: "animate-[staggerFade_0.4s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes staggerFade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Uso: agregar delay-[100ms], delay-[200ms], etc. a cada item */`,
    duration: "0.4s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Slide Reveal",
    description: "Revelado con clip-path de izquierda a derecha. Para títulos y banners.",
    tailwindClass: "animate-[slideReveal_0.6s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes slideReveal {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}`,
    duration: "0.6s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Notification Slide",
    description: "Entra desde arriba-derecha con rebote. Para toasts y alertas del sistema.",
    tailwindClass: "animate-[notifSlide_0.4s_cubic-bezier(0.21,1.02,0.73,1)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes notifSlide {
  from {
    opacity: 0;
    transform: translateX(30px) translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
}`,
    duration: "0.4s",
    easing: "cubic-bezier(0.21,1.02,0.73,1)",
    category: "Entrada",
  },
  {
    name: "Card Hover Depth",
    description: "Eleva la card con sombra progresiva al hover. Efecto material design.",
    tailwindClass: "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300",
    requiresCss: false,
    duration: "300ms",
    easing: "ease-out",
    category: "Interacción",
  },
  {
    name: "Accordion Expand",
    description: "Expansión vertical con grid. Para acordeones y secciones colapsables.",
    tailwindClass: "animate-[accordionExpand_0.3s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes accordionExpand {
  from {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
/* Alternativa con grid (mejor performance):
   grid transition-[grid-template-rows] duration-300
   style={{ gridTemplateRows: open ? '1fr' : '0fr' }} */`,
    duration: "0.3s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Table Row Highlight",
    description: "Flash de fondo al actualizar un registro en tabla. Para datos en tiempo real.",
    tailwindClass: "animate-[rowHighlight_1.5s_ease-out]",
    requiresCss: true,
    cssCode: `@keyframes rowHighlight {
  0% { background-color: rgba(5, 114, 206, 0.15); }
  100% { background-color: transparent; }
}`,
    duration: "1.5s",
    easing: "ease-out",
    category: "Feedback",
  },
  {
    name: "Badge Count",
    description: "Pop elástico para badge de notificación. Cuando llega un nuevo item.",
    tailwindClass: "animate-[badgeCount_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]",
    requiresCss: true,
    cssCode: `@keyframes badgeCount {
  0% { transform: scale(0); }
  60% { transform: scale(1.3); }
  100% { transform: scale(1); }
}`,
    duration: "0.3s",
    easing: "cubic-bezier(0.175,0.885,0.32,1.275)",
    category: "Feedback",
  },
  {
    name: "Status Dot",
    description: "Punto que pulsa suavemente. Para indicar estado online/activo.",
    tailwindClass: "animate-[statusDot_2s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes statusDot {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
}`,
    duration: "2s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Breadcrumb Arrow",
    description: "Flecha que se desplaza indicando dirección. Para navegación step-by-step.",
    tailwindClass: "animate-[breadcrumbArrow_1s_ease-in-out_infinite]",
    requiresCss: true,
    cssCode: `@keyframes breadcrumbArrow {
  0%, 100% { transform: translateX(0); opacity: 1; }
  50% { transform: translateX(4px); opacity: 0.6; }
}`,
    duration: "1s",
    easing: "ease-in-out",
    category: "Loop",
  },
  {
    name: "Modal Backdrop",
    description: "Oscurecimiento gradual del fondo. Para overlays de modales y drawers.",
    tailwindClass: "animate-[backdropIn_0.2s_ease-out_forwards]",
    requiresCss: true,
    cssCode: `@keyframes backdropIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
}`,
    duration: "0.2s",
    easing: "ease-out",
    category: "Entrada",
  },
  {
    name: "Tooltip Pop",
    description: "Aparece con escala desde el punto de anclaje. Para tooltips y popovers.",
    tailwindClass: "animate-[tooltipPop_0.15s_cubic-bezier(0.16,1,0.3,1)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes tooltipPop {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}`,
    duration: "0.15s",
    easing: "cubic-bezier(0.16,1,0.3,1)",
    category: "Entrada",
  },
  {
    name: "Stepper Complete",
    description: "Check que aparece con escala y rotación. Para marcar pasos completados.",
    tailwindClass: "animate-[stepperCheck_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]",
    requiresCss: true,
    cssCode: `@keyframes stepperCheck {
  from {
    opacity: 0;
    transform: scale(0) rotate(-45deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}`,
    duration: "0.4s",
    easing: "cubic-bezier(0.175,0.885,0.32,1.275)",
    category: "Feedback",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTES
// ═══════════════════════════════════════════════════════════════════════════════

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  }
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#0572CE] transition-colors" title="Copiar">
      {copied ? <LuCheck className="size-3 text-green-500" /> : <LuCopy className="size-3" />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

function AnimationCard({ entry }: { entry: AnimationEntry }) {
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);

  function replay() {
    setPlaying(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setPlaying(true);
    }, 50);
  }

  // Para interacciones (hover/active) no usamos replay, siempre visible
  const isInteraction = entry.category === "Interacción";
  const isLoop = entry.category === "Loop";

  return (
    <Card className="overflow-hidden hover:border-gray-300 transition-colors !p-0 !gap-0">
      {/* Preview area */}
      <div className="relative h-32 flex items-center justify-center bg-gray-50 border-b border-gray-100">
        <div
          key={key}
          className={`w-12 h-12 rounded-lg bg-[#0572CE] shadow-md ${
            isInteraction
              ? entry.tailwindClass
              : isLoop
                ? entry.tailwindClass
                : playing
                  ? entry.tailwindClass
                  : "opacity-0"
          }`}
        />
        {!isInteraction && !isLoop && (
          <button
            onClick={replay}
            className="absolute bottom-2 right-2 p-1.5 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-[#0572CE] hover:border-[#0572CE] transition-colors shadow-sm"
            title="Reproducir"
          >
            {playing ? <LuRotateCcw className="size-3.5" /> : <LuPlay className="size-3.5" />}
          </button>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{entry.name}</h3>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{entry.description}</p>
          </div>
          {entry.requiresCss && (
            <Badge variant="estado-pendiente" text="CSS" />
          )}
        </div>

        {/* Clase Tailwind */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Clase</p>
            <CopyButton text={entry.tailwindClass} />
          </div>
          <code className="block text-[11px] text-[#0572CE] bg-blue-50/50 border border-blue-100 rounded-md px-2.5 py-1.5 font-mono break-all">
            {entry.tailwindClass}
          </code>
        </div>

        {/* CSS requerido */}
        {entry.requiresCss && entry.cssCode && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">CSS requerido</p>
              <CopyButton text={entry.cssCode} />
            </div>
            <pre className="text-[10px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-2 font-mono overflow-x-auto whitespace-pre leading-relaxed">
              {entry.cssCode}
            </pre>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-[10px] text-gray-400">
            ⏱ {entry.duration}
          </span>
          <span className="text-[10px] text-gray-400">
            ⚡ {entry.easing}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PÁGINA
// ═══════════════════════════════════════════════════════════════════════════════

const categories = ["Entrada", "Salida", "Loop", "Interacción", "Feedback"] as const;

export function AnimationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? animations
    : animations.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-[11px] font-semibold text-[#0572CE] uppercase tracking-widest mb-2">Recursos</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Animaciones</h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            Catálogo de animaciones listas para usar con Tailwind CSS 4. Las que requieren CSS
            necesitan agregar el <code className="text-[11px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">@keyframes</code> en tu archivo CSS global.
          </p>

          {/* Guía rápida */}
          <Card className="mt-5 max-w-xl">
            <CardContent>
              <p className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-2">Cómo usar en Tailwind 4</p>
              <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Si la animación es nativa de Tailwind (spin, ping, pulse, bounce), úsala directamente.</li>
                <li>Si requiere CSS, copia el <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">@keyframes</code> en tu <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">index.css</code>.</li>
                <li>Aplica la clase con la sintaxis arbitraria: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">animate-[nombre_duración_easing]</code></li>
                <li>Para <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">forwards</code> (mantener estado final), agrégualo al final de la clase.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filtros */}
      <div className="sticky top-14 z-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === "all" ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Todas ({animations.length})
          </button>
          {categories.map((cat) => {
            const count = animations.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de animaciones */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((entry) => (
            <AnimationCard key={entry.name} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

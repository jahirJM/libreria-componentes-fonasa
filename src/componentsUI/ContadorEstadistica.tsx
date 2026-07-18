import { useEffect, useRef, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type VarianteContador = "neutral" | "primario" | "exito" | "advertencia" | "peligro";

interface ContadorEstadisticaProps {
  /** Variante de color del contenedor */
  variante?: VarianteContador;
  /** Duración de la animación de conteo en ms (default: 1500) */
  duracion?: number;
  /** Clase CSS adicional */
  className?: string;
  children: ReactNode;
}

interface MetricaProps {
  /** Valor numérico final */
  valor: number;
  /** Prefijo (ej: "$") */
  prefijo?: string;
  /** Sufijo (ej: "%", " pts") */
  sufijo?: string;
  /** Separador de miles (default: ".") */
  separadorMiles?: string;
}

interface ContenidoProps {
  children: ReactNode;
}

interface CabeceraProps {
  children: ReactNode;
  /** Clase CSS adicional para sobreescribir el estilo del contenedor del ícono */
  className?: string;
}

// ─── Contexto interno ────────────────────────────────────────────────────────

interface ContextoContador {
  variante: VarianteContador;
  duracion: number;
  visible: boolean;
  estilos: { acento: string; icono: string; numero: string };
}

const ContextoContador = createContext<ContextoContador | null>(null);

function usarContexto() {
  const ctx = useContext(ContextoContador);
  if (!ctx) throw new Error("Debe usarse dentro de <ContadorEstadistica>");
  return ctx;
}

// ─── Estilos por variante ────────────────────────────────────────────────────

const mapaEstilos: Record<
  VarianteContador,
  { contenedor: string; acento: string; icono: string; numero: string }
> = {
  neutral: {
    contenedor: "border-gray-200 bg-white",
    acento: "bg-gray-100",
    icono: "text-gray-500",
    numero: "text-gray-900",
  },
  primario: {
    contenedor: "border-blue-100 bg-white",
    acento: "bg-blue-50",
    icono: "text-[#0572CE]",
    numero: "text-[#0572CE]",
  },
  exito: {
    contenedor: "border-green-100 bg-white",
    acento: "bg-green-50",
    icono: "text-green-600",
    numero: "text-green-700",
  },
  advertencia: {
    contenedor: "border-amber-100 bg-white",
    acento: "bg-amber-50",
    icono: "text-amber-500",
    numero: "text-amber-600",
  },
  peligro: {
    contenedor: "border-red-100 bg-white",
    acento: "bg-red-50",
    icono: "text-red-500",
    numero: "text-red-600",
  },
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatearNumero(valor: number, separador: string): string {
  return Math.floor(valor)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separador);
}

// ─── Ícono de tendencia (inline, sin dependencias) ───────────────────────────

function IconoTendencia({ tipo }: { tipo: "subida" | "bajada" | "sin-cambio" }) {
  if (tipo === "subida") {
    return (
      <svg className="size-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 3L14 9H2L8 3Z" />
      </svg>
    );
  }
  if (tipo === "bajada") {
    return (
      <svg className="size-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 13L2 7H14L8 13Z" />
      </svg>
    );
  }
  return (
    <svg className="size-3" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Sub-componente: Cabecera ─────────────────────────────────────────────────

/**
 * Área superior de la tarjeta. Coloca aquí el ícono, título o cualquier elemento visual.
 */
function Cabecera({ children, className = "" }: CabeceraProps) {
  const { estilos } = usarContexto();
  return (
    <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl ${estilos.acento} ${estilos.icono} text-xl ${className}`}>
      {children}
    </div>
  );
}

// ─── Sub-componente: Metrica ──────────────────────────────────────────────────

/**
 * El número animado. Cuenta desde 0 hasta `valor` al entrar en vista.
 */
function Metrica({
  valor,
  prefijo = "",
  sufijo = "",
  separadorMiles = ".",
}: MetricaProps) {
  const { duracion, visible, estilos } = usarContexto();
  const [actual, setActual] = useState(0);

  const rafRef = useRef<number>();
  const inicioRef = useRef<number>();

  useEffect(() => {
    if (!visible) return;

    setActual(0);
    inicioRef.current = undefined;

    function animar(timestamp: number) {
      if (!inicioRef.current) inicioRef.current = timestamp;
      const progreso = Math.min((timestamp - inicioRef.current) / duracion, 1);
      setActual(valor * easeOutExpo(progreso));
      if (progreso < 1) {
        rafRef.current = requestAnimationFrame(animar);
      }
    }

    rafRef.current = requestAnimationFrame(animar);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [valor, duracion, visible]);

  return (
    <p
      className={`text-4xl font-bold tracking-tight tabular-nums ${estilos.numero}`}
      style={{
        filter: visible && actual < valor * 0.9 ? "blur(0.5px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      {prefijo}
      {formatearNumero(actual, separadorMiles)}
      {sufijo}
    </p>
  );
}

// ─── Sub-componente: Contenido ────────────────────────────────────────────────

/**
 * Área de texto inferior: etiqueta, descripción, tendencia.
 * Acepta cualquier children para máxima flexibilidad.
 */
function Contenido({ children }: ContenidoProps) {
  return <div className="mt-1.5 space-y-0.5">{children}</div>;
}

// ─── Helpers de texto exportados para usar dentro de Contenido ───────────────

/** Etiqueta principal de la métrica */
function Etiqueta({ children }: { children: ReactNode }) {
  return <p className="text-sm font-medium text-gray-600">{children}</p>;
}

/** Descripción secundaria */
function Descripcion({ children }: { children: ReactNode }) {
  return <p className="text-xs text-gray-400">{children}</p>;
}

/** Indicador de tendencia */
function Tendencia({
  tipo,
  children,
}: {
  tipo: "subida" | "bajada" | "sin-cambio";
  children: ReactNode;
}) {
  const color =
    tipo === "subida"
      ? "text-green-600"
      : tipo === "bajada"
        ? "text-red-500"
        : "text-gray-400";

  return (
    <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${color}`}>
      <IconoTendencia tipo={tipo} />
      {children}
    </div>
  );
}

// ─── Componente raíz ─────────────────────────────────────────────────────────

/**
 * Tarjeta de estadística animada con patrón de composición.
 *
 * @example
 * <ContadorEstadistica variante="primario">
 *   <ContadorEstadistica.Cabecera><MiIcono /></ContadorEstadistica.Cabecera>
 *   <ContadorEstadistica.Metrica valor={14823} prefijo="$" />
 *   <ContadorEstadistica.Contenido>
 *     <ContadorEstadistica.Etiqueta>Beneficiarios activos</ContadorEstadistica.Etiqueta>
 *     <ContadorEstadistica.Descripcion>Registros actualizados hoy</ContadorEstadistica.Descripcion>
 *     <ContadorEstadistica.Tendencia tipo="subida">+3,2% este mes</ContadorEstadistica.Tendencia>
 *   </ContadorEstadistica.Contenido>
 * </ContadorEstadistica>
 */
function ContadorEstadisticaRaiz({
  variante = "neutral",
  duracion = 1500,
  className = "",
  children,
}: ContadorEstadisticaProps) {
  const [visible, setVisible] = useState(false);
  const [entrado, setEntrado] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const e = mapaEstilos[variante];

  // Intersection Observer: dispara animación al entrar en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (contenedorRef.current) observer.observe(contenedorRef.current);
    return () => observer.disconnect();
  }, []);

  // Fade + slide-up al entrar
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setEntrado(true), 50);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <ContextoContador.Provider value={{ variante, duracion, visible, estilos: e }}>
      <div
        ref={contenedorRef}
        className={`rounded-2xl border p-5 shadow-sm transition-all duration-700 ease-out ${e.contenedor} ${
          entrado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${className}`}
      >
        {children}
      </div>
    </ContextoContador.Provider>
  );
}

// ─── Adjuntar sub-componentes ────────────────────────────────────────────────

export const ContadorEstadistica = Object.assign(ContadorEstadisticaRaiz, {
  Cabecera,
  Metrica,
  Contenido,
  Etiqueta,
  Descripcion,
  Tendencia,
});

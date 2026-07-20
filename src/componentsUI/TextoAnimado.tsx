import { useEffect, useRef, useState } from "react";

type Variante = "normal" | "grande" | "moneda" | "codigo" | "exito" | "error";

interface TextoAnimadoProps {
  /** El valor/texto a mostrar con animación */
  valor: string;
  /** Variante visual del contenedor */
  variante?: Variante;
  /** Etiqueta superior (opcional) */
  etiqueta?: string;
  /** Duración de la animación en ms (default: 200) */
  duracion?: number;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const estilosVariante: Record<Variante, { contenedor: string; texto: string }> = {
  normal: {
    contenedor: "rounded-xl border border-gray-200 bg-gray-50 p-4",
    texto: "text-lg font-semibold text-gray-800",
  },
  grande: {
    contenedor: "rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-5 text-center",
    texto: "text-3xl font-bold text-gray-800 tabular-nums",
  },
  moneda: {
    contenedor: "rounded-xl border border-green-100 bg-linear-to-br from-green-50 to-green-100/50 p-5 text-center",
    texto: "text-3xl font-bold text-green-700 tabular-nums",
  },
  codigo: {
    contenedor: "rounded-xl border border-gray-200 bg-gray-900 p-4",
    texto: "text-base font-mono text-green-500",
  },
  exito: {
    contenedor: "rounded-xl border border-green-100 bg-green-50 p-4",
    texto: "text-lg font-semibold text-green-700",
  },
  error: {
    contenedor: "rounded-xl border border-red-100 bg-red-50 p-4",
    texto: "text-lg font-semibold text-red-700",
  },
};

/**
 * Componente que muestra un valor con animación suave al cambiar.
 * Ideal para mostrar resultados de formateo, cálculos o transformaciones en tiempo real.
 */
export function TextoAnimado({
  valor,
  variante = "normal",
  etiqueta,
  duracion = 200,
  className = "",
}: TextoAnimadoProps) {
  const [mostrar, setMostrar] = useState(valor);
  const [animando, setAnimando] = useState(false);
  const prevRef = useRef(valor);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (prevRef.current !== valor) {
      setAnimando(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setMostrar(valor);
        setAnimando(false);
      }, duracion / 2);

      prevRef.current = valor;
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [valor, duracion]);

  const estilos = estilosVariante[variante];

  return (
    <div className={`${estilos.contenedor} ${className}`}>
      {etiqueta && (
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          {etiqueta}
        </p>
      )}
      <p className={estilos.texto}>
        <span
          className="inline-block transition-all ease-out"
          style={{
            transitionDuration: `${duracion / 2}ms`,
            opacity: animando ? 0 : 1,
            transform: animando
              ? "translateY(4px) scale(0.97)"
              : "translateY(0) scale(1)",
          }}
        >
          {mostrar || <span className="text-gray-300 italic text-base font-normal">Sin valor</span>}
        </span>
      </p>
    </div>
  );
}

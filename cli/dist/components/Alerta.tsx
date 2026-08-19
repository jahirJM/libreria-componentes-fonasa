import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import clsx from "clsx";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiBell,
} from "react-icons/fi";
import { BiX } from "react-icons/bi";

/**
 * Variantes disponibles.
 * - success: confirmaciones (ej. "Solicitud enviada con éxito")
 * - error: fallas críticas (ej. "No se pudo procesar el pago")
 * - warning: advertencias (comportamiento original del componente)
 * - info: mensajes informativos neutros (ej. "Tu cotización está siendo revisada")
 * - neutral: avisos generales sin carga emocional, tono gris corporativo
 */
export type VarianteAlerta = "success" | "error" | "warning" | "info" | "neutral";

interface EstiloVariante {
  contenedor: string;
  icono: string;
  botonCerrar: string;
  Icono: React.ComponentType<{ className?: string }>;
}

// Paleta corporativa Fonasa (azul institucional) + semántica tipo Airbnb
// suavizada para mantener el tono "salud pública / confianza" en vez de marketplace.
const ESTILOS_VARIANTE: Record<VarianteAlerta, EstiloVariante> = {
  success: {
    contenedor: "bg-emerald-500/10 text-emerald-700 border-emerald-500",
    icono: "text-emerald-600",
    botonCerrar: "hover:bg-emerald-400/20 text-emerald-600",
    Icono: FiCheckCircle,
  },
  error: {
    contenedor: "bg-red-500/10 text-red-700 border-red-500",
    icono: "text-red-600",
    botonCerrar: "hover:bg-red-400/20 text-red-600",
    Icono: FiXCircle,
  },
  warning: {
    contenedor: "bg-yellow-500/10 text-yellow-700 border-yellow-500",
    icono: "text-yellow-600",
    botonCerrar: "hover:bg-yellow-400/20 text-yellow-600",
    Icono: FiAlertTriangle,
  },
  info: {
    contenedor: "bg-sky-600/10 text-sky-800 border-sky-600",
    icono: "text-sky-700",
    botonCerrar: "hover:bg-sky-500/20 text-sky-700",
    Icono: FiInfo,
  },
  neutral: {
    contenedor: "bg-slate-500/10 text-slate-700 border-slate-400",
    icono: "text-slate-600",
    botonCerrar: "hover:bg-slate-400/20 text-slate-600",
    Icono: FiBell,
  },
};

interface AccionAlerta {
  label: string;
  onClick: () => void;
}

interface AlertaProps {
  /** Texto simple. Ignorado si se pasa `children`. */
  mensaje?: string;
  /** Título opcional en negrita sobre el mensaje. */
  titulo?: string;
  /** Contenido libre (JSX, listas, links, código, lo que sea) en vez de `mensaje`. */
  children?: ReactNode;
  /** Variante visual/semántica de la alerta. */
  variante?: VarianteAlerta;
  /** Callback típico de tus formularios de consulta. */
  setConsulta?: Dispatch<SetStateAction<boolean>>;
  /** Muestra el botón de cerrar (X). */
  cerrar?: boolean;
  /** Reemplaza el ícono por defecto de la variante. */
  icono?: ReactNode;
  /** Acción secundaria tipo botón de texto (ej. "Reintentar", "Ver detalle"). */
  accion?: AccionAlerta;
  /** Clases Tailwind extra para ajustar el layout donde se use. */
  className?: string;
  /** Se ejecuta al cerrar la alerta (aparte de `setConsulta`). */
  onClose?: () => void;
}

export const Alerta = ({
  mensaje,
  titulo,
  children,
  variante = "warning",
  setConsulta,
  cerrar = true,
  icono,
  accion,
  className,
  onClose,
}: AlertaProps) => {
  const [cerrarMensaje, setCerrarMensaje] = useState(false);

  if (cerrarMensaje) {
    return null;
  }

  const { contenedor, icono: iconoColor, botonCerrar, Icono } =
    ESTILOS_VARIANTE[variante];

  const handleClick = () => {
    if (cerrar) {
      setCerrarMensaje(true);
    }
    if (setConsulta) {
      setConsulta(false);
    }
    onClose?.();
  };

  return (
    <article
      role="alert"
      className={clsx(
        "relative w-full rounded-xl border px-4 py-4 pr-10 flex gap-3 items-start font-medium shadow-sm shadow-black/5",
        contenedor,
        className
      )}
    >
      <span className={clsx("shrink-0 mt-0.5", iconoColor)}>
        {icono ?? <Icono className="size-5" />}
      </span>

      <div className="flex-1 min-w-0 text-sm leading-relaxed">
        {titulo && <p className="font-bold mb-0.5">{titulo}</p>}
        {children ?? <span>{mensaje}</span>}

        {accion && (
          <button
            type="button"
            onClick={accion.onClick}
            className={clsx(
              "mt-2 inline-flex text-xs font-bold underline underline-offset-2 decoration-2",
              iconoColor
            )}
          >
            {accion.label}
          </button>
        )}
      </div>

      {cerrar && (
        <button
          type="button"
          aria-label="Cerrar mensaje"
          onClick={handleClick}
          className={clsx(
            "absolute top-2 right-2 p-1 rounded-lg cursor-pointer transition-colors",
            botonCerrar
          )}
        >
          <BiX className="size-4" />
        </button>
      )}
    </article>
  );
};
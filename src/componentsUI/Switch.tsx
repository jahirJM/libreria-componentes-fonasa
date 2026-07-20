import { useId, useState } from "react";
import clsx from "clsx";
import { FiCheck, FiX } from "react-icons/fi";

/**
 * Variantes de color disponibles cuando el switch está activado (checked).
 * - primary: azul institucional Fonasa (default, uso general en formularios)
 * - success: activaciones positivas (ej. "Notificarme por correo")
 * - error: activa algo riesgoso/irreversible (ej. "Eliminar datos automáticamente")
 * - warning: activa algo que requiere atención
 * - neutral: gris, para toggles sin carga semántica (ej. modo oscuro)
 */
export type VarianteSwitch = "primary" | "success" | "error" | "warning" | "neutral";

export type TamanoSwitch = "sm" | "md" | "lg";

interface EstiloVariante {
  activo: string;
  anilloFoco: string;
}

const ESTILOS_VARIANTE: Record<VarianteSwitch, EstiloVariante> = {
  primary: {
    activo: "bg-sky-600",
    anilloFoco: "focus-visible:ring-sky-600/40",
  },
  success: {
    activo: "bg-emerald-600",
    anilloFoco: "focus-visible:ring-emerald-600/40",
  },
  error: {
    activo: "bg-red-600",
    anilloFoco: "focus-visible:ring-red-600/40",
  },
  warning: {
    activo: "bg-yellow-500",
    anilloFoco: "focus-visible:ring-yellow-500/40",
  },
  neutral: {
    activo: "bg-slate-600",
    anilloFoco: "focus-visible:ring-slate-600/40",
  },
};

const TAMANOS: Record<
  TamanoSwitch,
  { pista: string; thumb: string; traslado: string; icono: string }
> = {
  sm: {
    pista: "w-8 h-4.5",
    thumb: "size-3.5",
    traslado: "translate-x-3.5",
    icono: "size-2",
  },
  md: {
    pista: "w-11 h-6",
    thumb: "size-5",
    traslado: "translate-x-5",
    icono: "size-2.5",
  },
  lg: {
    pista: "w-14 h-7.5",
    thumb: "size-6.5",
    traslado: "translate-x-6.5",
    icono: "size-3",
  },
};

export interface SwitchProps {
  /** Estado controlado. Si se omite, el switch maneja su propio estado interno. */
  checked?: boolean;
  /** Estado inicial cuando el componente no es controlado. */
  defaultChecked?: boolean;
  /** Se dispara con el nuevo valor al cambiar. */
  onChange?: (checked: boolean) => void;
  /** Variante de color cuando está activado. */
  variante?: VarianteSwitch;
  /** Tamaño del switch. */
  tamano?: TamanoSwitch;
  /** Muestra un check/X dentro del thumb según el estado. */
  conIconos?: boolean;
  disabled?: boolean;
  /** Clases Tailwind extra para el contenedor externo. */
  className?: string;
  name?: string;
  id?: string;
}

export const Switch = ({
  checked,
  defaultChecked = false,
  onChange,
  variante = "primary",
  tamano = "md",
  conIconos = false,
  disabled = false,
  className,
  name,
  id,
}: SwitchProps) => {
  const idGenerado = useId();
  const switchId = id ?? idGenerado;

  const esControlado = checked !== undefined;
  const [estadoInterno, setEstadoInterno] = useState(defaultChecked);
  const activo = esControlado ? checked : estadoInterno;

  const { activo: colorActivo, anilloFoco } = ESTILOS_VARIANTE[variante];
  const { pista, thumb, traslado, icono } = TAMANOS[tamano];

  const toggle = () => {
    if (disabled) return;
    const nuevoValor = !activo;
    if (!esControlado) {
      setEstadoInterno(nuevoValor);
    }
    onChange?.(nuevoValor);
  };

  return (
    <button
      type="button"
      role="switch"
      id={switchId}
      name={name}
      aria-checked={activo}
      disabled={disabled}
      onClick={toggle}
      className={clsx(
        "relative shrink-0 inline-flex items-center rounded-full border border-transparent transition-colors duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-4",
        pista,
        anilloFoco,
        activo ? colorActivo : "bg-slate-300",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <span
        className={clsx(
          "inline-flex items-center justify-center rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out",
          thumb,
          activo ? traslado : "translate-x-0.5"
        )}
      >
        {conIconos &&
          (activo ? (
            <FiCheck className={clsx(icono, "text-emerald-600")} />
          ) : (
            <FiX className={clsx(icono, "text-slate-400")} />
          ))}
      </span>
    </button>
  );
};

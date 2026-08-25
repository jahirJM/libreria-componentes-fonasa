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
  /** Si true, muestra skeleton de carga. */
  isLoading?: boolean;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
  /** ID del elemento que actúa como label del switch. */
  ariaLabelledBy?: string;
}

/**
 * Toggle switch accesible con variantes de color, tamaños y íconos opcionales.
 * Soporta modo controlado y no controlado.
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={activo}
 *   onChange={(v) => setActivo(v)}
 *   variante="success"
 *   tamano="md"
 *   conIconos
 * />
 * ```
 */
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
  isLoading = false,
  ariaLabel,
  ariaLabelledBy,
}: SwitchProps) => {
  const idGenerado = useId();
  const switchId = id ?? idGenerado;

  if (isLoading) {
    const { pista } = TAMANOS[tamano];
    return <div className={clsx("rounded-full bg-gray-200 animate-pulse", pista, className)} />;
  }

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
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
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

/* ------------------------------------------------------------------ */
/* SegmentedToggle — Toggle con labels de texto                        */
/* ------------------------------------------------------------------ */

export interface SegmentedToggleProps {
  /** Las dos opciones del toggle. */
  options: [string, string];
  /** Índice de la opción activa (0 o 1). */
  value?: number;
  /** Estado inicial cuando no es controlado. @default 0 */
  defaultValue?: number;
  /** Se dispara con el índice seleccionado al cambiar. */
  onChange?: (index: number) => void;
  /** Tamaño del toggle. */
  size?: "sm" | "md" | "lg";
  /** Deshabilitar interacción. */
  disabled?: boolean;
  /** Clases adicionales. */
  className?: string;
}

const SEGMENTED_SIZES = {
  sm: { container: "p-1 rounded-lg", button: "px-3 py-1 text-xs rounded-md" },
  md: { container: "p-1.5 rounded-xl", button: "px-4 py-1.5 text-sm rounded-lg" },
  lg: { container: "p-2 rounded-2xl", button: "px-6 py-2 text-base rounded-xl" },
};

/**
 * Toggle segmentado con dos opciones de texto y un indicador deslizante.
 * Ideal para alternar entre dos vistas o modos.
 *
 * @example
 * ```tsx
 * <SegmentedToggle
 *   options={["1 col", "2 col"]}
 *   value={cols}
 *   onChange={(i) => setCols(i)}
 * />
 * ```
 */
export const SegmentedToggle = ({
  options,
  value,
  defaultValue = 0,
  onChange,
  size = "md",
  disabled = false,
  className,
}: SegmentedToggleProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const active = isControlled ? value : internalValue;

  const s = SEGMENTED_SIZES[size];

  const handleSelect = (index: number) => {
    if (disabled || index === active) return;
    if (!isControlled) setInternalValue(index);
    onChange?.(index);
  };

  return (
    <div
      className={clsx(
        "relative inline-flex items-center bg-gray-100 border border-gray-200",
        s.container,
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {/* Sliding indicator */}
      <div
        className={clsx(
          "absolute top-1.5 bottom-1.5 bg-gray-900 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none",
          s.button,
        )}
        style={{
          left: active === 0 ? "6px" : "50%",
          width: "calc(50% - 6px)",
        }}
      />

      {/* Options */}
      {options.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => handleSelect(i)}
          disabled={disabled}
          className={clsx(
            "relative z-10 font-medium transition-colors duration-200 text-center flex-1",
            s.button,
            active === i
              ? "text-white"
              : "text-gray-500 hover:text-gray-700",
            !disabled && "cursor-pointer",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

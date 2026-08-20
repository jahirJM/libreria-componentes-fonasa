import type { IconType } from "react-icons";
import React from "react";

interface BotonesProps {
  /** Texto o contenido del botón. */
  label: React.ReactNode;
  /** Ícono de react-icons a mostrar a la izquierda del label. */
  icon?: IconType;
  /** Callback al hacer click. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Deshabilita el botón. @default false */
  isDisabled?: boolean;
  /** Tipo HTML del botón. @default "button" */
  type?: "button" | "submit" | "reset";
  /** Clases CSS adicionales. */
  customClass?: string;
  /** Si true, muestra skeleton de carga. @default false */
  isLoading?: boolean;
}

/**
 * Botón de confirmación (fondo cyan). Uso típico: acciones afirmativas en formularios.
 *
 * @example
 * ```tsx
 * <BotonConfirmar label="Guardar" onClick={handleSave} />
 * ```
 */
export const BotonConfirmar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type,
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-9 w-28 bg-gray-200 rounded-2xl animate-pulse" />;
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

/**
 * Botón de cancelación (fondo rojo). Uso típico: rechazar, descartar, cancelar.
 *
 * @example
 * ```tsx
 * <BotonCancelar label="Cancelar" onClick={handleCancel} />
 * ```
 */
export const BotonCancelar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-9 w-28 bg-gray-200 rounded-2xl animate-pulse" />;
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

/**
 * Botón primario institucional (fondo azul Fonasa). Acción principal de la vista.
 *
 * @example
 * ```tsx
 * <BotonPrimario label="Enviar solicitud" type="submit" />
 * ```
 */
export const BotonPrimario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type = "button",
  customClass = "",
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-9 w-28 bg-gray-200 rounded-2xl animate-pulse" />;
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#0572CE] hover:bg-blue-700 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

/**
 * Botón secundario (fondo gris). Acciones de menor jerarquía visual.
 *
 * @example
 * ```tsx
 * <BotonSecundario label="Volver" onClick={handleBack} />
 * ```
 */
export const BotonSecundario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-9 w-28 bg-gray-200 rounded-2xl animate-pulse" />;
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

/**
 * Botón con borde (outline). Sin fondo, estilo limpio para acciones terciarias.
 *
 * @example
 * ```tsx
 * <BotonOutline label="Ver más" onClick={handleViewMore} />
 * ```
 */
export const BotonOutline = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type = "button",
  customClass = "",
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-9 w-28 bg-gray-200 rounded-2xl animate-pulse" />;
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border px-4 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

/**
 * Botón estilo link (sin fondo ni borde). Para acciones inline o navegación textual.
 *
 * @example
 * ```tsx
 * <BotonLink label="Ver detalle" onClick={handleDetail} />
 * ```
 */
export const BotonLink = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  customClass = "",
  isLoading = false,
}: BotonesProps) => {
  if (isLoading) {
    return <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />;
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center px-1 py-0.5 text-sm font-medium focus:outline-none ${
        isDisabled
          ? "text-gray-300 cursor-not-allowed"
          : "text-[#0572CE] hover:text-blue-700 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg mr-1.5" />}
      {label}
    </button>
  );
};

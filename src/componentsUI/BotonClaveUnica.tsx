import React, { useState } from "react";

/**
 * Variantes de esquinas del botón según guía oficial:
 * - "none": border-radius 0 (default según especificación)
 * - "middle": border-radius 4px
 * - "full": border-radius 99px
 */
type RoundedVariant = "none" | "middle" | "full";

/**
 * Variante de color del botón:
 * - "estandar": fondo #0F69C4 (default)
 * - "highContrast": fondo #625AF6 (modo alto contraste / dark mode)
 */
type ColorVariant = "estandar" | "highContrast";

/**
 * Variante de ancho:
 * - "fit": ancho ajustado al contenido (default)
 * - "full": ancho 100% (max 550px), estilo btn-fw
 */
type WidthVariant = "fit" | "full";

interface BotonClaveUnicaProps {
  /** URL de redirección para autenticación ClaveÚnica */
  href?: string;
  /** Texto del botón. Valores recomendados: "Iniciar sesión" o "ClaveÚnica" */
  label?: string;
  /** Variante de esquinas: "none" | "middle" | "full" */
  rounded?: RoundedVariant;
  /** Variante de color: "estandar" | "highContrast" */
  colorVariant?: ColorVariant;
  /** Variante de ancho: "fit" | "full" */
  width?: WidthVariant;
  /** Si true, renderiza como <button> en vez de <a> */
  asButton?: boolean;
  /** Callback onClick (solo cuando asButton=true) */
  onClick?: () => void;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
  /** Clases CSS adicionales */
  customClass?: string;
}

/* ─── Colores según CSS oficial ─── */
const colorStyles = {
  estandar: {
    base: "#0F69C4",
    hover: "#0B4E91",
    active: "#07305A",
    focusOutline: "4px solid #FFBE5C",
  },
  highContrast: {
    base: "#625AF6",
    hover: "#4943B6",
    active: "#2D2971",
    focusOutline: "4px solid rgba(216,215,250,1)",
  },
};

const borderRadiusMap: Record<RoundedVariant, string> = {
  none: "0",
  middle: "4px",
  full: "99px",
};

/**
 * Ícono oficial de ClaveÚnica (isotipo llave circular).
 * Usa el archivo SVG oficial ubicado en /logos/gobierno/svg/ico-clave-unica.svg
 * Dimensiones según guía: 24x24px, color #FFFFFF.
 */
const ClaveUnicaIcon = () => (
  <img
    src="/logos/gobierno/svg/ico-clave-unica.svg"
    alt=""
    aria-hidden="true"
    width={24}
    height={24}
    style={{ margin: "auto 4px auto 0px", flexShrink: 0 }}
  />
);

/**
 * Botón oficial de autenticación ClaveÚnica.
 *
 * Implementado según la guía oficial:
 * https://wikiguias.digital.gob.cl/Manuales/BotónCU
 *
 * Especificaciones:
 * - Contenedor: #0F69C4, border-radius 0
 * - Hover: #0B4E91 | Active: #07305A | Focus outline: #FFBE5C
 * - Ícono: 24x24px, color #FFFFFF
 * - Texto: Roboto, 1rem/16px, Bold, #FFFFFF
 * - Tamaño M: min-height 48px, padding 8px 14px
 */
export const BotonClaveUnica: React.FC<BotonClaveUnicaProps> = ({
  href = "https://iam-backend.claveunica.gob.cl/auth/accounts/login",
  label = "Iniciar sesión",
  rounded = "none",
  colorVariant = "estandar",
  width = "fit",
  asButton = false,
  onClick,
  isLoading = false,
  customClass = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  if (isLoading) {
    return <div className="h-12 w-56 bg-gray-200 rounded animate-pulse" />;
  }

  const colors = colorStyles[colorVariant];

  const getBgColor = () => {
    if (isActive) return colors.active;
    if (isHovered || isFocused) return colors.hover;
    return colors.base;
  };

  const baseStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    verticalAlign: "middle",
    userSelect: "none",
    border: 0,
    borderRadius: borderRadiusMap[rounded],
    backgroundColor: getBgColor(),
    color: "#FFF",
    // Tamaño M (btn-m)
    width: width === "full" ? "100%" : "fit-content",
    maxWidth: width === "full" ? "550px" : undefined,
    minHeight: "48px",
    padding: "8px 14px",
    fontSize: "16px",
    lineHeight: "2rem",
    // Focus
    outline: isFocused ? colors.focusOutline : "none",
    outlineOffset: isFocused ? "0" : undefined,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  };

  const textStyle: React.CSSProperties = {
    paddingLeft: "4px",
    textDecoration: "none",
    fontSize: "1rem",
    textRendering: "geometricPrecision",
  };

  const eventHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => { setIsHovered(false); setIsActive(false); },
    onMouseDown: () => setIsActive(true),
    onMouseUp: () => setIsActive(false),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  if (asButton || onClick) {
    return (
      <button
        type="button"
        className={customClass}
        style={baseStyle}
        onClick={onClick}
        aria-label={`${label} con ClaveÚnica`}
        {...eventHandlers}
      >
        <ClaveUnicaIcon />
        <span style={textStyle} aria-hidden="true">{label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      className={customClass}
      style={baseStyle}
      aria-label={`${label} con ClaveÚnica`}
      tabIndex={0}
      {...eventHandlers}
    >
      <ClaveUnicaIcon />
      <span style={textStyle} aria-hidden="true">{label}</span>
    </a>
  );
};

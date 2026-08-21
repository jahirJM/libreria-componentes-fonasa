import { useState, useRef, useCallback } from "react";
import clsx from "clsx";

/** Variante visual del badge según el contexto de uso. */
export type BadgeVariant =
  | "counter"
  | "documentos"
  | "especialidad"
  | "estado-pendiente"
  | "estado-revision"
  | "estado-aprobada"
  | "estado-rechazada"
  | "estado-default";

interface BadgeProps {
  /** Variante visual que determina colores y semántica. */
  variant: BadgeVariant;
  /** Texto a mostrar dentro del badge. */
  text: string;
  /** Clases CSS adicionales. */
  customClass?: string;
  /** Habilita redimensionamiento por arrastre con colapso a punto. @default false */
  resizable?: boolean;
  /** Umbral en px debajo del cual colapsa a punto. @default 40 */
  collapseThreshold?: number;
  /** Si true, en mobile (< sm) muestra solo un punto de color. @default false */
  compactOnMobile?: boolean;
  /** Si true, fuerza el estado colapsado (solo punto) siempre. @default false */
  forceCollapsed?: boolean;
}

/** Colores del punto colapsado según variante */
const dotColors: Record<BadgeVariant, string> = {
  counter: "bg-gray-400",
  documentos: "bg-[var(--different-color)]",
  especialidad: "bg-gray-400",
  "estado-pendiente": "bg-yellow-600",
  "estado-revision": "bg-blue-600",
  "estado-aprobada": "bg-green-500",
  "estado-rechazada": "bg-red-500",
  "estado-default": "bg-gray-400",
};

/** Estilos del counter colapsado: círculo sin padding ni border, solo el número */
const counterCollapsedStyles =
  "size-5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center";

/**
 * Badge de estado con variantes semánticas y modo responsive.
 * Puede colapsar a un punto de color en mobile o por arrastre.
 *
 * @example
 * ```tsx
 * <Badge variant="estado-aprobada" text="Aprobada" />
 * <Badge variant="counter" text="12" compactOnMobile />
 * ```
 */
export const Badge = ({
  variant,
  text,
  customClass = "",
  resizable = false,
  collapseThreshold = 40,
  compactOnMobile = false,
  forceCollapsed = false,
}: BadgeProps) => {
  const baseStyles =
    "text-xs px-2 py-0.5 rounded-full font-bold text-sm!";

  const variantStyles = {
    counter: "bg-gray-100 text-gray-500 border border-gray-200",
    documentos: "bg-(--different-color) text-white!",
    especialidad: "bg-gray-100 text-gray-500 border border-gray-200",
    "estado-pendiente":
      "bg-yellow-50 text-yellow-700! border border-yellow-100",
    "estado-revision": "bg-blue-50 text-blue-800! border border-blue-100",
    "estado-aprobada":
      "bg-green-50! text-green-800! border border-green-100",
    "estado-rechazada": "bg-red-100 text-red-900! border border-red-500",
    "estado-default": "bg-gray-100 text-gray-700! border border-gray-300",
  };

  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(12, Math.min(ev.clientX - rect.left, rect.width));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  // Si forceCollapsed, siempre mostrar punto
  if (forceCollapsed) {
    return (
      <span
        className={clsx(
          "block size-3 rounded-full shrink-0",
          dotColors[variant],
          customClass,
        )}
        title={text}
      />
    );
  }

  // Si no es resizable, renderizar badge simple
  if (!resizable) {
    if (compactOnMobile) {
      return (
        <>
          {/* Mobile: punto de color */}
          <span
            className={clsx(
              "sm:hidden block size-3 rounded-full shrink-0",
              dotColors[variant],
              customClass,
            )}
            title={text}
          />
          {/* Desktop: badge completo */}
          <span className={clsx("hidden sm:inline", baseStyles, variantStyles[variant], customClass)}>
            {text}
          </span>
        </>
      );
    }

    return (
      <span className={clsx(baseStyles, variantStyles[variant], customClass)}>
        {text}
      </span>
    );
  }

  const isCollapsed = width !== null && width < collapseThreshold;

  return (
    <div ref={containerRef} className="relative w-full flex items-center">
      {/* Área del badge con borde derecho como el responsive del PreviewPanel */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-150",
          !isCollapsed && "border-r border-gray-200"
        )}
        style={{ width: width ?? "100%" }}
      >
        {isCollapsed ? (
          variant === "counter" ? (
            <span className={counterCollapsedStyles}>
              {text}
            </span>
          ) : (
            <span
              className={clsx(
                "block size-3 rounded-full shrink-0",
                dotColors[variant]
              )}
              title={text}
            />
          )
        ) : (
          <span
            className={clsx(
              baseStyles,
              variantStyles[variant],
              "inline-block truncate whitespace-nowrap max-w-full",
              customClass
            )}
          >
            {text}
          </span>
        )}
      </div>

      {/* Handle de resize — mismo estilo que PreviewPanel */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
        style={{ left: width != null ? `${width}px` : "calc(100% - 6px)" }}
      >
        <div className="w-1.5 h-6 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
      </div>
    </div>
  );
};

import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FiX } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/* Subcomponentes internos                                             */
/* ------------------------------------------------------------------ */

const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex items-start justify-between gap-4 px-4 py-3 border-b border-gray-100",
        className,
      )}
      {...props}
    />
  ),
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100",
        className,
      )}
      {...props}
    />
  ),
);
DrawerFooter.displayName = "DrawerFooter";

/* ------------------------------------------------------------------ */
/* Tipos y variantes                                                    */
/* ------------------------------------------------------------------ */

export type DrawerPosicion = "right" | "left" | "bottom" | "top";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface DrawerDinamicoProps {
  isOpen: boolean;
  onClose: () => void;
  titulo?: ReactNode;
  descripcion?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  posicion?: DrawerPosicion;
  size?: DrawerSize;
  cerrarAlClickFuera?: boolean;
  mostrarBotonCerrar?: boolean;
  className?: string;
}

// Ancho/alto según posición + size
const sizeStyles: Record<DrawerPosicion, Record<DrawerSize, string>> = {
  right: {
    sm: "w-[320px]",
    md: "w-[420px]",
    lg: "w-[560px]",
    xl: "w-[720px]",
    full: "w-full",
  },
  left: {
    sm: "w-[320px]",
    md: "w-[420px]",
    lg: "w-[560px]",
    xl: "w-[720px]",
    full: "w-full",
  },
  bottom: {
    sm: "h-[240px]",
    md: "h-[360px]",
    lg: "h-[480px]",
    xl: "h-[640px]",
    full: "h-full",
  },
  top: {
    sm: "h-[240px]",
    md: "h-[360px]",
    lg: "h-[480px]",
    xl: "h-[640px]",
    full: "h-full",
  },
};

// Clases base de posición (fixed a un borde de la pantalla)
const posicionBase: Record<DrawerPosicion, string> = {
  right: "top-0 right-0 h-full",
  left: "top-0 left-0 h-full",
  bottom: "bottom-0 left-0 w-full",
  top: "top-0 left-0 w-full",
};

// Transform de entrada/salida (translate fuera de pantalla -> 0)
const translateOculto: Record<DrawerPosicion, string> = {
  right: "translate-x-full",
  left: "-translate-x-full",
  bottom: "translate-y-full",
  top: "-translate-y-full",
};

/* ------------------------------------------------------------------ */
/* Drawer                                                             */
/* ------------------------------------------------------------------ */

export const Drawer = ({
  isOpen,
  onClose,
  titulo,
  descripcion,
  children,
  footer,
  posicion = "right",
  size = "md",
  cerrarAlClickFuera = true,
  mostrarBotonCerrar = true,
  className = "",
}: DrawerDinamicoProps) => {
  // Mantenemos el componente montado un poco más para poder animar la salida
  const [montado, setMontado] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMontado(true);
      // Doble rAF para asegurar que el navegador pinta el estado inicial
      // (fuera de pantalla) antes de animar a la posición final
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setMontado(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (!montado) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [montado]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!montado) return null;

  const handleOverlayClick = () => {
    if (cerrarAlClickFuera) onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex">
      {/* Overlay */}
      <div
        onClick={handleOverlayClick}
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "absolute bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out",
          posicionBase[posicion],
          sizeStyles[posicion][size],
          visible ? "translate-x-0 translate-y-0" : translateOculto[posicion],
          className,
        )}
      >
        {(titulo || descripcion || mostrarBotonCerrar) && (
          <DrawerHeader>
            <div className="min-w-0">
              {titulo && (
                <h2 className="text-base font-semibold text-gray-900 truncate">
                  {titulo}
                </h2>
              )}
              {descripcion && (
                <p className="text-sm text-gray-500 mt-0.5">{descripcion}</p>
              )}
            </div>
            {mostrarBotonCerrar && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <FiX className="size-4" />
              </button>
            )}
          </DrawerHeader>
        )}

        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </div>
    </div>,
    document.body,
  );
};

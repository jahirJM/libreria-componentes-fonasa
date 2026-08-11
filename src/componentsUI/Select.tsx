import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  type CSSProperties,
  type KeyboardEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { FiChevronDown } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/* Subcomponente interno                                                */
/* ------------------------------------------------------------------ */

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  opciones: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Select                                                              */
/* ------------------------------------------------------------------ */

export const Select = ({
  opciones,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  disabled = false,
  error = false,
  isLoading = false,
  className = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [indiceFocused, setIndiceFocused] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  const opcionSeleccionada = opciones.find((op) => op.value === value);

  const calcularPosicion = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 220;
    const espacioAbajo = viewportHeight - rect.bottom;
    const abreArriba =
      espacioAbajo < dropdownHeight && rect.top > dropdownHeight;

    setDropdownStyle({
      position: "fixed",
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(abreArriba
        ? { bottom: viewportHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  }, []);

  const handleAbrir = () => {
    if (disabled || isLoading) return;
    calcularPosicion();
    setIsOpen(true);
    setIndiceFocused(opciones.findIndex((op) => op.value === value));
  };

  const handleCerrar = () => {
    setIsOpen(false);
    setIndiceFocused(-1);
  };

  const handleSeleccionar = (opcion: SelectOption) => {
    if (opcion.disabled) return;
    onChange(opcion.value);
    handleCerrar();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAbrir();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndiceFocused((prev) =>
        prev < opciones.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndiceFocused((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (indiceFocused >= 0) {
        handleSeleccionar(opciones[indiceFocused]);
      }
    } else if (e.key === "Escape") {
      handleCerrar();
    }
  };

  // Scroll al elemento focused
  useEffect(() => {
    if (indiceFocused >= 0 && listaRef.current) {
      const elemento = listaRef.current.children[indiceFocused] as HTMLElement;
      elemento?.scrollIntoView({ block: "nearest" });
    }
  }, [indiceFocused]);

  // Cerrar al clickear fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickEnTrigger = containerRef.current?.contains(e.target as Node);
      const clickEnDropdown = dropdownRef.current?.contains(e.target as Node);
      if (!clickEnTrigger && !clickEnDropdown) {
        handleCerrar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recalcular posición al hacer scroll o resize
  useEffect(() => {
    if (!isOpen) return;
    const handleReposition = () => calcularPosicion();
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen, calcularPosicion]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-9 bg-gray-200 rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleAbrir}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={clsx(
          "w-full flex items-center justify-between border text-left",
          "px-3 py-1.5 rounded-xl text-sm",
          "focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none",
          disabled
            ? "bg-gray-200 cursor-not-allowed opacity-60"
            : "bg-white cursor-pointer",
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300",
        )}
      >
        <span
          className={clsx(
            "truncate",
            opcionSeleccionada ? "text-gray-600" : "text-gray-400",
          )}
        >
          {opcionSeleccionada ? opcionSeleccionada.label : placeholder}
        </span>

        <FiChevronDown
          className={clsx(
            "size-4 text-gray-400 transition-transform shrink-0 ml-2",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <Card ref={dropdownRef} style={dropdownStyle}>
          <ul ref={listaRef} className="max-h-48 overflow-y-auto py-1">
            {opciones.map((opcion, index) => (
              <li
                key={opcion.value}
                onClick={() => handleSeleccionar(opcion)}
                className={clsx(
                  "px-3 py-2 text-sm cursor-pointer transition-colors truncate",
                  "hover:bg-gray-100",
                  opcion.value === value
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : opcion.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700",
                  index === indiceFocused && "bg-gray-100",
                )}
              >
                {opcion.label}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

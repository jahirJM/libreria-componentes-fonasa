import { useState, useRef, useEffect, forwardRef, type KeyboardEvent, type InputHTMLAttributes, type HTMLAttributes } from "react";
import clsx from "clsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/* Subcomponentes internos (solo para SelectBuscable)                  */
/* ------------------------------------------------------------------ */

// Contenedor del panel flotante del dropdown.
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Input de búsqueda dentro del dropdown.
const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={clsx(
        "w-full text-sm outline-none placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

/* ------------------------------------------------------------------ */
/* Tipos y variantes                                                   */
/* ------------------------------------------------------------------ */

export interface OpcionBuscable {
  value: string;
  label: string;
  deshabilitado?: boolean;
}

export type SelectBuscableSize = "sm" | "md" | "lg";

interface SelectBuscableProps {
  opciones: OpcionBuscable[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  className?: string;
  /** Tamaño del componente. `md` reproduce exactamente el diseño original. */
  size?: SelectBuscableSize;
}

// `md` = estilos originales, tal cual. sm/lg son variantes nuevas.
const sizeStyles: Record<SelectBuscableSize, { trigger: string; text: string; icon: string; option: string }> = {
  sm: { trigger: "px-2 py-1 rounded-lg", text: "text-xs", icon: "size-3.5", option: "px-2 py-1.5" },
  md: { trigger: "px-3 py-1.5 rounded-xl", text: "text-sm", icon: "size-4", option: "px-3 py-2" },
  lg: { trigger: "px-4 py-2 rounded-xl", text: "text-base", icon: "size-5", option: "px-4 py-2.5" },
};

/* ------------------------------------------------------------------ */
/* SelectBuscable                                                       */
/* ------------------------------------------------------------------ */

export const SelectBuscable = ({
  opciones,
  value,
  onChange,
  placeholder = "Seleccione",
  disabled = false,
  error = false,
  isLoading = false,
  className = "",
  size = "md",
}: SelectBuscableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [indiceFocused, setIndiceFocused] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  const s = sizeStyles[size];

  const opcionesFiltradas = opciones.filter((op) =>
    op.label.toLowerCase().includes(busqueda.toLowerCase())
  );

  const opcionSeleccionada = opciones.find((op) => op.value === value);

  const handleAbrir = () => {
    if (disabled || isLoading) return;
    setIsOpen(true);
    setBusqueda("");
    setIndiceFocused(-1);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCerrar = () => {
    setIsOpen(false);
    setBusqueda("");
    setIndiceFocused(-1);
  };

  const handleSeleccionar = (opcion: OpcionBuscable) => {
    onChange(opcion.value);
    handleCerrar();
  };

  const handleLimpiar = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    handleCerrar();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndiceFocused((prev) =>
        prev < opcionesFiltradas.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndiceFocused((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && indiceFocused >= 0) {
      e.preventDefault();
      handleSeleccionar(opcionesFiltradas[indiceFocused]);
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
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleCerrar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleAbrir}
        disabled={disabled || isLoading}
        className={clsx(
          "w-full flex items-center justify-between border text-left",
          "focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none",
          s.trigger,
          s.text,
          disabled || isLoading
            ? "bg-gray-200 cursor-not-allowed opacity-60"
            : "bg-white cursor-pointer",
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        )}
      >
        <span
          className={clsx(
            opcionSeleccionada
              ? opcionSeleccionada.deshabilitado
                ? "text-red-600 flex items-center gap-1.5"
                : "text-gray-700"
              : "text-gray-400"
          )}
        >
          {isLoading
            ? "Cargando..."
            : opcionSeleccionada
              ? (
                <>
                  {opcionSeleccionada.deshabilitado && (
                    <AiOutlineExclamationCircle className="inline text-red-600" />
                  )}
                  {opcionSeleccionada.label}
                </>
              )
              : placeholder}
        </span>

        <div className="flex items-center gap-1">
          {value && !disabled && (
            <span
              onClick={handleLimpiar}
              className="p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="size-3.5" />
            </span>
          )}
          <FiChevronDown
            className={clsx(s.icon, "text-gray-400 transition-transform", isOpen && "rotate-180")}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute z-50 mt-1 w-full">
          {/* Input de búsqueda */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <FiSearch className="size-4 text-gray-400 flex-shrink-0" />
            <Input
              ref={inputRef}
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setIndiceFocused(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Buscar..."
            />
          </div>

          {/* Lista de opciones */}
          <ul ref={listaRef} className="max-h-48 overflow-y-auto py-1">
            {opcionesFiltradas.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400 text-center">
                Sin resultados
              </li>
            ) : (
              opcionesFiltradas.map((opcion, index) => (
                <li
                  key={opcion.value}
                  onClick={() => handleSeleccionar(opcion)}
                  className={clsx(
                    "cursor-pointer transition-colors flex items-center gap-1.5 hover:bg-gray-100",
                    s.option,
                    s.text,
                    opcion.value === value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : opcion.deshabilitado
                        ? "text-red-600"
                        : "text-gray-700",
                    index === indiceFocused && "bg-gray-100"
                  )}
                >
                  {opcion.deshabilitado && (
                    <AiOutlineExclamationCircle className="text-red-600 flex-shrink-0" />
                  )}
                  {opcion.label}
                </li>
              ))
            )}
          </ul>
        </Card>
      )}
    </div>
  );
};
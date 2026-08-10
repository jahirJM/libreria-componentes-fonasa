import { useState, useRef, useEffect } from "react";
import { CalendarioRango } from "./CalendarioRango";

interface InputCalendarioProps {
  /** Tipo de selección: "fecha" para una sola fecha, "rango" para inicio y fin, "nacimiento" para fecha de nacimiento */
  tipo?: "fecha" | "rango" | "nacimiento";
  /** Callback cuando se selecciona una fecha (modo fecha o nacimiento) */
  onDateSelect?: (date: Date) => void;
  /** Callback cuando se selecciona un rango completo (modo rango) */
  onRangeSelect?: (start: Date, end: Date) => void;
  /** Label del campo (modo fecha) o del campo inicio (modo rango) */
  labelInicio?: string;
  /** Label del campo de fecha fin (solo modo rango) */
  labelFin?: string;
  /** Placeholder del campo */
  placeholderInicio?: string;
  /** Placeholder del campo fin (solo modo rango) */
  placeholderFin?: string;
  /** Modo del calendario interno: single o double */
  mode?: "single" | "double";
  /** Mostrar conteo de días. Default: true */
  showStats?: boolean;
  /** Contar feriados en el total. Default: true */
  feriados?: boolean;
  /** Contar días hábiles en el total. Default: true */
  habiles?: boolean;
  /** Contar fines de semana en el total. Default: true */
  finSemana?: boolean;
  /** Fecha mínima seleccionable */
  minDate?: Date;
  /** Fecha máxima seleccionable */
  maxDate?: Date;
  /** Clase CSS adicional */
  className?: string;
  /** Error en el campo */
  error?: boolean;
  /** Deshabilitar el campo */
  disabled?: boolean;
  /** Validar edad mínima (solo modo nacimiento). Si se pasa, valida que la fecha seleccionada cumpla la edad mínima */
  validarEdad?: boolean;
  /** Edad mínima requerida en años (solo cuando validarEdad es true) */
  edadMinima?: number;
  /** Callback cuando la validación de edad falla */
  onEdadInvalida?: (edadCalculada: number) => void;
  /** Bloquear fechas desde hoy en adelante (solo modo nacimiento). Default: true */
  bloquearFuturo?: boolean;
}

export function InputCalendario({
  tipo = "rango",
  onDateSelect,
  onRangeSelect,
  labelInicio = tipo === "nacimiento" ? "Fecha de nacimiento" : tipo === "fecha" ? "Fecha" : "Fecha inicio",
  labelFin = "Fecha fin",
  placeholderInicio = "dd/mm/aaaa",
  placeholderFin = "dd/mm/aaaa",
  mode = "single",
  showStats = true,
  feriados = true,
  habiles = true,
  finSemana = true,
  minDate,
  maxDate,
  className = "",
  error = false,
  disabled = false,
  validarEdad = false,
  edadMinima = 18,
  onEdadInvalida,
  bloquearFuturo = true,
}: InputCalendarioProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [edadError, setEdadError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular edad a partir de fecha de nacimiento
  const calcularEdad = (fechaNacimiento: Date): number => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNac = fechaNacimiento.getMonth();
    if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  // Cerrar al clickear fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Modo rango — primer click: actualiza inicio al tiro
  const handleStartSelect = (date: Date) => {
    setStartDate(date);
    setEndDate(null);
  };

  // Modo rango — segundo click: actualiza fin al tiro
  const handleRangeSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    onRangeSelect?.(start, end);
  };

  // Modo fecha — actualiza al tiro
  const handleSingleDateSelect = (date: Date) => {
    setStartDate(date);
    setEndDate(null);
    onDateSelect?.(date);
  };

  // Modo nacimiento — valida edad si corresponde
  const handleNacimientoSelect = (date: Date) => {
    setStartDate(date);
    setEndDate(null);
    setEdadError(null);

    if (validarEdad) {
      const edad = calcularEdad(date);
      if (edad < edadMinima) {
        setEdadError(`La persona debe tener al menos ${edadMinima} años (edad calculada: ${edad})`);
        onEdadInvalida?.(edad);
        return;
      }
    }

    onDateSelect?.(date);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("es-CL");
  };

  const borderClass = error || edadError
    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
    : "border-gray-300 focus-within:border-[#0572CE] focus-within:ring-[#0572CE]";

  // maxDate para nacimiento: bloquea hoy y futuro si bloquearFuturo es true
  const effectiveMaxDate = (() => {
    if (tipo === "nacimiento" && !maxDate && bloquearFuturo) {
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      return ayer;
    }
    return maxDate;
  })();

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: mode === "double" && tipo !== "nacimiento" ? 680 : 340 }}>
      {/* Input(s) de fecha */}
      <div
        className={`flex items-center gap-2 rounded-md border px-3 py-3 transition-colors focus-within:ring-2 ${borderClass} ${
          disabled ? "bg-gray-100 opacity-50 cursor-not-allowed" : "bg-white cursor-pointer"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {/* Ícono calendario */}
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>

        {/* Input inicio / única fecha */}
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] font-medium text-gray-500 uppercase leading-none mb-0.5">
            {labelInicio}
          </label>
          <input
            type="text"
            readOnly
            disabled={disabled}
            value={formatDate(startDate)}
            placeholder={placeholderInicio}
            className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 cursor-pointer"
          />
        </div>

        {/* Separador e input fin — solo en modo rango */}
        {tipo === "rango" && (
          <>
            <span className="text-gray-300 text-sm">→</span>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-medium text-gray-500 uppercase leading-none mb-0.5">
                {labelFin}
              </label>
              <input
                type="text"
                readOnly
                disabled={disabled}
                value={formatDate(endDate)}
                placeholder={placeholderFin}
                className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 cursor-pointer"
              />
            </div>
          </>
        )}

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Mensaje error de edad */}
      {edadError && (
        <p className="mt-1 text-xs text-red-600 font-medium">{edadError}</p>
      )}

      {/* Popover con calendario — no se cierra solo, el usuario lo cierra */}
      {isOpen && (
        <div className="absolute z-50 mt-2 left-0 shadow-xl rounded-xl">
          <CalendarioRango
            mode={tipo === "nacimiento" ? "single" : mode}
            showStats={tipo === "rango" ? showStats : false}
            feriados={feriados}
            habiles={habiles}
            finSemana={finSemana}
            minDate={minDate}
            maxDate={effectiveMaxDate}
            selectionMode={tipo === "nacimiento" ? "nacimiento" : undefined}
            onRangeSelect={tipo === "rango" ? handleRangeSelect : undefined}
            onStartSelect={tipo === "rango" ? handleStartSelect : undefined}
            onDateSelect={tipo === "nacimiento" ? handleNacimientoSelect : tipo === "fecha" ? handleSingleDateSelect : undefined}
          />
        </div>
      )}
    </div>
  );
}

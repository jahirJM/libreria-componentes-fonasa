import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { BotonOutline, BotonPrimario } from "./Botones";

interface SelectorColorProps {
  /** Color actualmente seleccionado en formato hex (ej. "#0572CE"). */
  value?: string;
  /** Callback en tiempo real mientras el usuario elige un color (hex). */
  onChange?: (hex: string) => void;
  /** Callback al presionar "Guardar cambios" (solo si mostrarGuardar es true). */
  onGuardar?: (hex: string) => void;
  /**
   * Si true, muestra un botón "Guardar cambios" dentro del popover. La elección
   * queda pendiente hasta confirmar con el botón.
   * @default false
   */
  mostrarGuardar?: boolean;
  /** Texto del botón cuando no hay color seleccionado. @default "Seleccionar color" */
  placeholder?: string;
  /** Deshabilita el selector. @default false */
  disabled?: boolean;
  /**
   * Si true, el disparador es únicamente un botón circular con el color, sin
   * dropdown, sin texto hex ni contenedor con bordes. El popover se abre igual.
   * @default false
   */
  soloColor?: boolean;
  /**
   * Ancho del botón circular en la variante `soloColor`, en píxeles. La altura
   * se iguala automáticamente para mantener el círculo. No tiene efecto en la
   * variante con dropdown.
   * @default 32
   */
  size?: number;
  /** Clases CSS adicionales para el contenedor. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Utilidades de conversión de color                                   */
/* ------------------------------------------------------------------ */

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

/** Convierte HSV a HEX (#rrggbb). */
function hsvToHex({ h, s, v }: HSV): string {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;

  let rgb: [number, number, number];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const [r, g, b] = rgb;

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Convierte HEX (#rgb o #rrggbb) a HSV. Devuelve null si es inválido. */
function hexToHsv(hex: string): HSV | null {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;

  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;

  return { h, s: Math.round(s), v: Math.round(v) };
}

/** Determina si un color hex es claro (para elegir color de texto contrastante). */
function isLightHex(hex: string): boolean {
  const hsv = hexToHsv(hex);
  if (!hsv) return false;
  return hsv.v > 70 && hsv.s < 40;
}

/* ------------------------------------------------------------------ */
/* Panel del color picker (espectro + hue)                             */
/* ------------------------------------------------------------------ */

function ColorPickerPanel({
  hsv,
  onChange,
}: {
  hsv: HSV;
  onChange: (hsv: HSV) => void;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // Actualiza saturación/brillo según la posición del puntero en el área.
  const updateFromArea = useCallback(
    (clientX: number, clientY: number) => {
      const el = areaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100);
      onChange({ ...hsv, s, v });
    },
    [hsv, onChange]
  );

  // Actualiza el matiz según la posición del puntero en la barra.
  const updateFromHue = useCallback(
    (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const h = Math.round((x / rect.width) * 360);
      onChange({ ...hsv, h });
    },
    [hsv, onChange]
  );

  // Gestión genérica de arrastre para área y barra.
  const startDrag = (
    e: React.MouseEvent,
    handler: (x: number, y: number) => void
  ) => {
    e.preventDefault();
    handler(e.clientX, e.clientY);
    const onMove = (ev: MouseEvent) => handler(ev.clientX, ev.clientY);
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const hueColor = hsvToHex({ h: hsv.h, s: 100, v: 100 });

  return (
    <div>
      {/* Área de saturación / brillo */}
      <div
        ref={areaRef}
        onMouseDown={(e) => startDrag(e, updateFromArea)}
        className="relative w-full h-44 rounded-xl cursor-crosshair overflow-hidden select-none"
        style={{ backgroundColor: hueColor }}
        role="slider"
        aria-label="Saturación y brillo"
        aria-valuetext={`Saturación ${hsv.s}%, brillo ${hsv.v}%`}
      >
        {/* Gradiente blanco horizontal */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fff, rgba(255,255,255,0))" }} />
        {/* Gradiente negro vertical */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000, rgba(0,0,0,0))" }} />
        {/* Puntero */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: hsvToHex(hsv),
          }}
        />
      </div>

      {/* Barra de matiz (Hue) */}
      <div className="flex items-center justify-between mt-4 mb-1">
        <span className="text-sm font-semibold text-gray-700">Hue</span>
        <span className="text-sm text-gray-500">{hsv.h.toFixed(2)}°</span>
      </div>
      <div
        ref={hueRef}
        onMouseDown={(e) => startDrag(e, (x) => updateFromHue(x))}
        className="relative w-full h-4 rounded-full cursor-pointer select-none"
        style={{
          background:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        }}
        role="slider"
        aria-label="Matiz"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hsv.h)}
      >
        <div
          className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: hueColor }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

/**
 * Selector de color de espectro continuo. Se abre desde un botón y muestra un
 * popover flotante con un área de saturación/brillo y una barra de matiz (Hue),
 * permitiendo elegir cualquier color manualmente. Sigue el patrón del
 * InputCalendario: el panel se renderiza en un portal y se posiciona dinámicamente.
 *
 * @example
 * ```tsx
 * <SelectorColor value={color} onChange={setColor} />
 * ```
 */
export function SelectorColor({
  value = "#0572CE",
  onChange,
  onGuardar,
  mostrarGuardar = false,
  placeholder = "Seleccionar color",
  disabled = false,
  soloColor = false,
  size = 32,
  className = "",
}: SelectorColorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHsv] = useState<HSV>(() => hexToHsv(value) ?? { h: 208, s: 90, v: 90 });
  const [hexInput, setHexInput] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  const hex = hsvToHex(hsv);

  const calcularPosicion = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const popoverWidth = 280;
    const popoverHeight = 340;
    const viewportHeight = window.innerHeight;
    const espacioAbajo = viewportHeight - rect.bottom;
    const abreArriba = espacioAbajo < popoverHeight && rect.top > popoverHeight;

    setPopoverStyle({
      position: "fixed",
      left: rect.left,
      width: popoverWidth,
      zIndex: 9999,
      ...(abreArriba
        ? { bottom: viewportHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  }, []);

  // Cerrar al clickear fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const enContainer = containerRef.current?.contains(event.target as Node);
      const enPopover = popoverRef.current?.contains(event.target as Node);
      if (!enContainer && !enPopover) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Recalcular posición al hacer scroll o resize
  useEffect(() => {
    if (!isOpen) return;
    const handleReposition = (e: Event) => {
      if (popoverRef.current?.contains(e.target as Node)) return;
      calcularPosicion();
    };
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", calcularPosicion);
    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", calcularPosicion);
    };
  }, [isOpen, calcularPosicion]);

  const toggle = () => {
    if (disabled) return;
    if (!isOpen) {
      calcularPosicion();
      // Al abrir, sincroniza el estado interno con el value externo actual.
      const parsed = hexToHsv(value);
      if (parsed) {
        setHsv(parsed);
        setHexInput(value);
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Cambio desde el panel (área o hue).
  const handlePanelChange = (nuevo: HSV) => {
    setHsv(nuevo);
    const nuevoHex = hsvToHex(nuevo);
    setHexInput(nuevoHex);
    if (!mostrarGuardar) {
      onChange?.(nuevoHex);
    }
  };

  // Cambio desde el campo hex.
  const handleHexInput = (raw: string) => {
    setHexInput(raw);
    const parsed = hexToHsv(raw);
    if (parsed) {
      setHsv(parsed);
      if (!mostrarGuardar) {
        onChange?.(hsvToHex(parsed));
      }
    }
  };

  const handleGuardar = () => {
    onGuardar?.(hex);
    onChange?.(hex);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${soloColor ? "" : className}`}>
      {soloColor ? (
        <button
          type="button"
          onClick={toggle}
          disabled={disabled}
          aria-label={`${placeholder}: ${value}`}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={`rounded-full cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0572CE] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${className}`}
          style={{ backgroundColor: value, width: size, height: size }}
        />
      ) : (
        <BotonOutline
          label={
            <span className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                style={{ backgroundColor: value }}
              />
              <span className="truncate">{value ?? placeholder}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          }
          onClick={toggle}
          isDisabled={disabled}
        />
      )}

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            style={popoverStyle}
            className="bg-white rounded-xl shadow-xl border border-gray-200 p-4"
            role="dialog"
            aria-label="Selector de color"
          >
            <ColorPickerPanel hsv={hsv} onChange={handlePanelChange} />

            {/* Campo hex + preview */}
            <div className="flex items-center gap-2 mt-4">
              <span
                className="w-9 h-9 rounded-lg border border-gray-200 shrink-0"
                style={{ backgroundColor: hex }}
              />
              <div className="flex-1 flex items-center rounded-md border border-gray-300 focus-within:border-[#0572CE] focus-within:ring-2 focus-within:ring-[#0572CE] px-2 py-1.5">
                <span className={`text-sm ${isLightHex(hex) ? "text-gray-500" : "text-gray-400"}`}>#</span>
                <input
                  type="text"
                  value={hexInput.replace("#", "")}
                  onChange={(e) => handleHexInput(e.target.value)}
                  maxLength={6}
                  className="w-full text-sm text-gray-800 bg-transparent outline-none uppercase ml-0.5"
                  aria-label="Valor hexadecimal"
                />
              </div>
            </div>

            {/* Footer con botón Guardar cambios (solo variante base) */}
            {mostrarGuardar && (
              <div className="flex justify-end pt-3 mt-3 border-t border-gray-100">
                <BotonPrimario label="Guardar cambios" onClick={handleGuardar} />
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}

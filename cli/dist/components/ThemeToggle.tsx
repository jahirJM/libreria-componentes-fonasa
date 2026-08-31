import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type Theme = "light" | "dark";

/** Clave usada para persistir el tema en localStorage. */
const STORAGE_KEY = "fonasa-ui-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export interface ThemeToggleProps {
  /**
   * Tema controlado. Si se omite, el componente maneja su propio estado y
   * persiste el valor en localStorage aplicando la clase `dark` al `<html>`.
   */
  theme?: Theme;
  /** Se dispara con el nuevo tema al alternar. Útil en modo controlado. */
  onToggle?: (theme: Theme) => void;
  /** Clases Tailwind extra para el botón contenedor. */
  className?: string;
  /** Texto para lectores de pantalla. Si se omite, se genera según el estado. */
  ariaLabel?: string;
}

/**
 * Interruptor para alternar entre modo claro y oscuro.
 * La pista se inclina levemente al cambiar y el thumb muestra un sol o una luna.
 *
 * En modo no controlado aplica la clase `dark` al elemento `<html>` y persiste
 * la preferencia en localStorage, por lo que funciona sin configuracion extra.
 *
 * @example
 * ```tsx
 * // No controlado (autonomo)
 * <ThemeToggle />
 *
 * // Controlado
 * <ThemeToggle theme={theme} onToggle={(t) => setTheme(t)} />
 * ```
 */
export const ThemeToggle = ({
  theme: themeProp,
  onToggle,
  className = "",
  ariaLabel,
}: ThemeToggleProps) => {
  const isControlled = themeProp !== undefined;
  const [internalTheme, setInternalTheme] = useState<Theme>(getInitialTheme);
  const theme = isControlled ? themeProp : internalTheme;

  const [tilting, setTilting] = useState(false);

  // Solo aplica efectos globales (clase dark + localStorage) en modo no controlado.
  useEffect(() => {
    if (isControlled) return;
    const root = document.documentElement;
    if (internalTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, internalTheme);
  }, [internalTheme, isControlled]);

  const handleToggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTilting(true);
    if (!isControlled) setInternalTheme(next);
    onToggle?.(next);
    setTimeout(() => setTilting(false), 500);
  };

  const trackTilt = tilting
    ? theme === "dark"
      ? "rotate-[-4deg]"
      : "rotate-[4deg]"
    : "rotate-0";

  const label =
    ariaLabel ?? (theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`cursor-pointer ${className}`}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      aria-label={label}
    >
      <div
        className={`relative w-12 h-6 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
          theme === "dark"
            ? "bg-[#1e3a5f] border-blue-800"
            : "bg-gray-200 border-gray-300"
        } ${trackTilt}`}
      >
        <div
          className={`absolute top-0.5 size-5 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
            theme === "dark"
              ? "left-[26px] bg-[#0572CE] rotate-[360deg]"
              : "left-0.5 bg-white shadow-md rotate-0"
          }`}
        >
          {theme === "dark" ? (
            <FiSun className="size-3 text-white" />
          ) : (
            <FiMoon className="size-3 text-gray-500" />
          )}
        </div>
      </div>
    </button>
  );
};

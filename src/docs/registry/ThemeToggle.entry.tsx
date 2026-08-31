import { useState } from "react";
import themeToggleCode from "../../componentsUI/ThemeToggle.tsx?raw";
import { ThemeToggle } from "../../componentsUI/ThemeToggle";
import type { ComponentEntry } from "./types";

/**
 * Wrapper controlado para las demos: alterna el tema localmente sin afectar
 * el tema global del previsualizador.
 */
function ThemeToggleDemo({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return <ThemeToggle theme={theme} onToggle={setTheme} className={className} />;
}

export const themeToggleEntry: ComponentEntry = {
  name: "theme-toggle",
  group: "Otros",
  description:
    "Interruptor para alternar entre modo claro y oscuro, con sol/luna e inclinacion animada de la pista. Modo no controlado aplica la clase dark al <html> y persiste en localStorage; modo controlado via theme/onToggle.",
  code: themeToggleCode,
  dependencies: ["react-icons"],
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Fondo del thumb en modo oscuro" },
    { name: "blue-900", value: "#1e3a5f", usage: "Fondo de la pista en modo oscuro" },
    { name: "blue-800", value: "#1e40af", usage: "Borde de la pista en modo oscuro" },
    { name: "gray-200", value: "#e5e7eb", usage: "Fondo de la pista en modo claro" },
    { name: "gray-300", value: "#d1d5db", usage: "Borde de la pista en modo claro" },
    { name: "gray-500", value: "#6b7280", usage: "Icono de luna en modo claro" },
    { name: "white", value: "#ffffff", usage: "Fondo del thumb e icono de sol en modo oscuro" },
  ],
  propsInterface: `type Theme = "light" | "dark";

interface ThemeToggleProps {
  /** Tema controlado. Si se omite, el componente maneja su propio estado. */
  theme?: Theme;
  /** Se dispara con el nuevo tema al alternar. */
  onToggle?: (theme: Theme) => void;
  /** Clases Tailwind extra para el boton contenedor. */
  className?: string;
  /** Texto para lectores de pantalla. */
  ariaLabel?: string;
}`,
  variants: [
    {
      label: "Por defecto (controlado en la demo)",
      props: {},
      render: () => <ThemeToggleDemo />,
      usageCode: `{/* No controlado: aplica la clase dark al <html> y persiste en localStorage */}
<ThemeToggle />`,
    },
    {
      label: "Controlado",
      props: {},
      render: () => <ThemeToggleDemo />,
      usageCode: `const [theme, setTheme] = useState<"light" | "dark">("light");

<ThemeToggle theme={theme} onToggle={(t) => setTheme(t)} />`,
    },
  ],
};

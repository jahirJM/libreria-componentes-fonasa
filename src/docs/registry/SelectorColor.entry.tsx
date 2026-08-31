import selectorColorCode from "../../componentsUI/SelectorColor.tsx?raw";
import { SelectorColor } from "../../componentsUI/SelectorColor";
import { SelectorColorPlayground } from "../demos/SelectorColorPlayground";
import { SelectorColorConGuardarDemo, SelectorColorEnVivoDemo, SelectorColorSoloColorDemo } from "../demos/SelectorColorDemo";
import type { ComponentEntry } from "./types";

export const selectorColorEntry: ComponentEntry = {
  name: "selector-color",
  group: "Formularios",
  description:
    "Utiliza: boton-comun. Selector de color de espectro continuo que se abre desde un botón outline. Muestra un popover flotante con un área de saturación/brillo, una barra de matiz (Hue) y un campo hexadecimal para elegir cualquier color manualmente. El panel se renderiza en un portal y se posiciona dinámicamente (igual que el input de calendario).",
  code: selectorColorCode,
  dependencies: ["react-icons"],
  playground: () => <SelectorColorPlayground />,
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Focus ring y borde del campo hex activo" },
    { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde del campo hex y swatch actual" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes suaves y divisor del footer" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Símbolo # e íconos" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Etiqueta Hue y valor de grados" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Etiqueta Hue y valor del campo hex" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del popover y borde de los punteros" },
  ],
  propsInterface: `interface SelectorColorProps {
  /** Color actualmente seleccionado en formato hex (ej. "#0572CE"). */
  value?: string;
  /** Callback en tiempo real mientras el usuario elige un color (hex). */
  onChange?: (hex: string) => void;
  /** Callback al presionar "Guardar cambios" (solo si mostrarGuardar es true). */
  onGuardar?: (hex: string) => void;
  /** Si true, muestra un botón "Guardar cambios" dentro del popover. */
  mostrarGuardar?: boolean;
  /** Texto del botón cuando no hay color seleccionado. */
  placeholder?: string;
  /** Deshabilita el selector. */
  disabled?: boolean;
  /** Si true, el disparador es solo un botón circular con el color, sin dropdown, hex ni bordes. */
  soloColor?: boolean;
  /** Clases CSS adicionales para el contenedor. */
  className?: string;
}`,
  variants: [
    {
      label: "Con guardar cambios",
      props: { mostrarGuardar: true },
      render: () => <SelectorColorConGuardarDemo />,
      usageCode: `const [color, setColor] = useState("#0572CE");

<SelectorColor
  value={color}
  mostrarGuardar
  onGuardar={(hex) => setColor(hex)}
/>`,
      responsive: true,
    },
    {
      label: "Sin guardar (cambio en vivo)",
      props: {},
      render: () => <SelectorColorEnVivoDemo />,
      usageCode: `const [color, setColor] = useState("#16a34a");

<SelectorColor
  value={color}
  onChange={(hex) => setColor(hex)}
/>`,
      responsive: true,
    },
    {
      label: "Solo color (botón)",
      props: { soloColor: true },
      render: () => <SelectorColorSoloColorDemo />,
      usageCode: `const [color, setColor] = useState("#0572CE");

<SelectorColor
  value={color}
  soloColor
  onChange={(hex) => setColor(hex)}
/>`,
      responsive: true,
    },
    {
      label: "Deshabilitado",
      props: { disabled: true },
      render: () => (
        <div className="flex justify-center w-full">
          <SelectorColor disabled value="#dc2626" />
        </div>
      ),
      usageCode: `<SelectorColor disabled value="#dc2626" />`,
    },
  ],
};

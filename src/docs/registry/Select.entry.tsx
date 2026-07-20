import selectCode from "../../componentsUI/Select.tsx?raw"
import { Select } from "../../componentsUI/Select";
import type { ComponentEntry } from "./types";

export const selectEntry: ComponentEntry =   {
    name: "Select",
    description:
      "Select desplegable con soporte para estados de error y deshabilitado.",
    code: selectCode,
    colors: [
      { name: "Blanco", value: "#ffffff", usage: "Fondo del select" },
      { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Fondo del select deshabilitado" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde normal" },
      { name: "Texto (medio)", value: "#4b5563", usage: "Texto del select" },
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "Ring y borde en focus" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde y ring en estado error" },
    ],
    propsInterface: `interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
  children: ReactNode;
}`,
    variants: [
      {
        label: "Normal",
        props: {},
        render: () => (
          <Select>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
            <option value="2">Opción 2</option>
          </Select>
        ),
        usageCode: `<Select>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n  <option value="2">Opción 2</option>\n</Select>`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => (
          <Select error>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
          </Select>
        ),
        usageCode: `<Select error>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n</Select>`,
      },
      {
        label: "Deshabilitado",
        props: { disabled: true },
        render: () => (
          <Select disabled>
            <option value="">No disponible</option>
          </Select>
        ),
        usageCode: `<Select disabled>\n  <option value="">No disponible</option>\n</Select>`,
      },
    ],
  }
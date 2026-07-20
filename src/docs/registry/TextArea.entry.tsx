import textAreaCode from "../../componentsUI/TextArea.tsx?raw"
import { TextArea } from "../../componentsUI/TextArea";
import type { ComponentEntry } from "./types";

export const textAreaEntry: ComponentEntry =   {
    name: "TextArea",
    description:
      "Campo de texto multilínea con soporte para estados de error y deshabilitado.",
    code: textAreaCode,
    dependencies: ["clsx"],
    colors: [
      { name: "Blanco", value: "#ffffff", usage: "Fondo del textarea" },
      { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Fondo del textarea deshabilitado" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde normal" },
      { name: "Texto (medio)", value: "#4b5563", usage: "Texto del textarea" },
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "Ring y borde en focus" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde y ring en estado error" },
    ],
    propsInterface: `interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
      error?: boolean;
    }`,
    variants: [
      {
        label: "Normal",
        props: { placeholder: "Escribe aquí..." },
        render: () => <TextArea placeholder="Escribe aquí..." />,
        usageCode: `<TextArea placeholder="Escribe aquí..." />`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => <TextArea placeholder="Escribe aquí..." error />,
        usageCode: `<TextArea placeholder="Escribe aquí..." error />`,
      },
      {
        label: "Deshabilitado",
        props: { disabled: true },
        render: () => <TextArea placeholder="No disponible" disabled />,
        usageCode: `<TextArea placeholder="No disponible" disabled />`,
      },
    ],
  }
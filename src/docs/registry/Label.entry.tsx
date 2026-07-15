import labelCode from "../../componentsUI/Label.tsx?raw";
import { Label } from "../../componentsUI/Label";
import type { ComponentEntry } from "./types";

export const labelEntry: ComponentEntry =   {
    name: "Label",
    description:
      "Etiqueta de texto con asterisco de campo obligatorio y mensaje de error 'requerido' con ícono.",
    code: labelCode,
    dependencies: ["clsx", "react-icons"],
    colors: [
      { name: "gray-600", value: "#4b5563", usage: "Texto del label" },
      { name: "red-500", value: "#ef4444", usage: "Asterisco de campo requerido (*)" },
      { name: "red-400", value: "#f87171", usage: "Texto e ícono del mensaje de error 'requerido'" },
    ],
    propsInterface: `interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
      text: string;
      indicador?: boolean;
      error?: boolean;
    }`,
    variants: [
      {
        label: "Normal",
        props: { text: "Nombre" },
        render: () => <Label text="Nombre" />,
        usageCode: `<Label text="Nombre" />`,
      },
      {
        label: "Con indicador (*)",
        props: { text: "RUT Solicitante", indicador: true },
        render: () => <Label text="RUT Solicitante" indicador />,
        usageCode: `<Label text="RUT Solicitante" indicador />`,
      },
      {
        label: "Con error (requerido)",
        props: { text: "RUT Solicitante", error: true },
        render: () => <Label text="RUT Solicitante" error />,
        usageCode: `<Label text="RUT Solicitante" error />`,
      },
      {
        label: "Indicador + error",
        props: { text: "Email", indicador: true, error: true },
        render: () => <Label text="Email" indicador error />,
        usageCode: `<Label text="Email" indicador error />`,
      },
    ],
  }
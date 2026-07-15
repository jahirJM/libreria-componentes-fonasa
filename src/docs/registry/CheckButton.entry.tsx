import checkButtonCode from "../../componentsUI/CheckButton.tsx?raw"
import { CheckButtonDemo } from "../demos/CheckButtonDemo";
import type { ComponentEntry } from "./types";

export const checkButtonEntry: ComponentEntry =   {
    name: "CheckButton",
    description:
      "Checkbox/radio button group con variantes primary (checkbox múltiple) y secondary (radio single).",
    code: checkButtonCode,
    dependencies: ["clsx"],
    colors: [
      { name: "gray-700", value: "#374151", usage: "Texto de los labels" },
      { name: "Accent (primary-color)", value: "#0572CE", usage: "Color del checkbox/radio cuando está seleccionado (accent-color CSS)" },
    ],
    propsInterface: `interface Opcion {
  id: string;
  label: string;
}

interface CheckButtonProps {
  listaOpciones?: Opcion[];
  selectedItems?: string[];
  onToggle: (opcion: Opcion) => void;
  customClass?: string;
  customClassItem?: string;
  customClassLabel?: string;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
}`,
    variants: [
      {
        label: "Checkbox (primary)",
        props: { variant: "primary" },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
              { id: "opcion3", label: "Opción 3" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }, { id: "opcion2", label: "Opción 2" }]}\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Radio (secondary)",
        props: { variant: "secondary" },
        render: () => <CheckButtonDemo variant="secondary" />,
        usageCode: `<CheckButton\n  variant="secondary"\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Deshabilitado",
        props: { variant: "primary", isDisabled: true },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            isDisabled
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }]}\n  selectedItems={[]}\n  onToggle={handleToggle}\n  isDisabled\n/>`,
      },
    ],
  }
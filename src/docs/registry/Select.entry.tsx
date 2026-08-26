import { useState } from "react";
import selectCode from "../../componentsUI/Select.tsx?raw";
import selectTestCode from "../../tests/Select.test.tsx?raw";
import { Select } from "../../componentsUI/Select";
import { SelectResizeDemo } from "../demos/SelectDemo";
import { SelectPlayground } from "../demos/SelectPlayground";
import type { ComponentEntry } from "./types";

const opcionesEjemplo = [
  { value: "1", label: "Opción 1" },
  { value: "2", label: "Opción 2" },
  { value: "3", label: "Opción 3" },
];

function DefaultDemo() {
  const [value, setValue] = useState("");
  return (
    <Select
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione una opción"
    />
  );
}

function WithSelectionDemo() {
  const [value, setValue] = useState("2");
  return (
    <Select
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
    />
  );
}

function ErrorDemo() {
  const [value, setValue] = useState("");
  return (
    <Select
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione una opción"
      error
    />
  );
}

function DisabledDemo() {
  const [value, setValue] = useState("");
  return (
    <Select
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione una opción"
      disabled
    />
  );
}

export const selectEntry: ComponentEntry = {
  name: "select",
  group: "Select",
  description:
    "Select desplegable custom con soporte para estados de error y deshabilitado. Dropdown controlado por CSS/JS (no nativo).",
  code: selectCode,
  testCode: selectTestCode,
  dependencies: ["clsx", "react-icons"],
  playground: () => <SelectPlayground />,
  colors: [
    { name: "Blanco", value: "#ffffff", usage: "Fondo del trigger y dropdown" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Fondo del trigger deshabilitado" },
    { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde del trigger" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Texto del trigger" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Texto placeholder y chevron" },
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Ring y borde en focus" },
    { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo opción seleccionada" },
    { name: "Texto badge revisión", value: "#1d4ed8", usage: "Texto opción seleccionada" },
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde y ring en estado error" },
  ],
  propsInterface: `interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  opciones: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  className?: string;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
  /** ID del elemento que actúa como label del select. */
  ariaLabelledBy?: string;
}`,
  variants: [
    {
      label: "Normal",
      props: {},
      render: () => <DefaultDemo />,
      usageCode: `const [value, setValue] = useState("");

<Select
  opciones={[
    { value: "1", label: "Opción 1" },
    { value: "2", label: "Opción 2" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Seleccione una opción"
/>`,
    },
    {
      label: "Con selección",
      props: { value: "2" },
      render: () => <WithSelectionDemo />,
      usageCode: `const [value, setValue] = useState("2");

<Select
  opciones={opciones}
  value={value}
  onChange={setValue}
/>`,
    },
    {
      label: "Con error",
      props: { error: true },
      render: () => <ErrorDemo />,
      usageCode: `<Select
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione una opción"
  error
/>`,
    },
    {
      label: "Deshabilitado",
      props: { disabled: true },
      render: () => <DisabledDemo />,
      usageCode: `<Select
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione una opción"
  disabled
/>`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => (
        <Select
          opciones={[]}
          value=""
          onChange={() => {}}
          isLoading
        />
      ),
      usageCode: `<Select opciones={[]} value="" onChange={() => {}} isLoading />`,
    },
    {
      label: "Responsive (resize)",
      props: {},
      render: () => <SelectResizeDemo />,
      usageCode: `{/* El texto se trunca con ellipsis al reducir el ancho */}\n<Select\n  opciones={opciones}\n  value={value}\n  onChange={setValue}\n/>`,
    },
  ],
};

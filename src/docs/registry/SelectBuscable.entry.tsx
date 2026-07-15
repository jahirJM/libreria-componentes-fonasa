import { useState } from "react";
import selectBuscableCode from "../../componentsUI/SelectBuscable.tsx?raw";
import { SelectBuscable } from "../../componentsUI/SelectBuscable";
import type { ComponentEntry } from "./types";

const opcionesEjemplo = [
  { value: "1", label: "Hospital Barros Luco" },
  { value: "2", label: "Hospital San Juan de Dios" },
  { value: "3", label: "Hospital del Salvador" },
  { value: "4", label: "Hospital San Borja Arriarán" },
  { value: "5", label: "Hospital Padre Hurtado" },
];

const opcionesConDeshabilitado = [
  { value: "1", label: "Hospital Barros Luco" },
  { value: "2", label: "Hospital San Juan de Dios", deshabilitado: true },
  { value: "3", label: "Hospital del Salvador" },
  { value: "4", label: "Hospital San Borja Arriarán", deshabilitado: true },
  { value: "5", label: "Hospital Padre Hurtado" },
];

/* Wrappers interactivos para las variantes */

function DefaultDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione un hospital"
    />
  );
}

function WithSelectionDemo() {
  const [value, setValue] = useState("3");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
    />
  );
}

function ErrorDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione un hospital"
      error
    />
  );
}

function DisabledDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione un hospital"
      disabled
    />
  );
}

function LoadingDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={[]}
      value={value}
      onChange={setValue}
      isLoading
    />
  );
}

function SmallDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione"
      size="sm"
    />
  );
}

function LargeDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesEjemplo}
      value={value}
      onChange={setValue}
      placeholder="Seleccione un hospital"
      size="lg"
    />
  );
}

function DisabledOptionsDemo() {
  const [value, setValue] = useState("");
  return (
    <SelectBuscable
      opciones={opcionesConDeshabilitado}
      value={value}
      onChange={setValue}
      placeholder="Seleccione un hospital"
    />
  );
}

export const selectBuscableEntry: ComponentEntry = {
  name: "Select Buscable",
  description:
    "Select desplegable con campo de búsqueda integrado, navegación por teclado, opciones deshabilitadas y soporte para múltiples tamaños.",
  code: selectBuscableCode,
  dependencies: ["clsx", "react-icons"],
  propsInterface: `interface OpcionBuscable {
  value: string;
  label: string;
  deshabilitado?: boolean;
}

type SelectBuscableSize = "sm" | "md" | "lg";

interface SelectBuscableProps {
  opciones: OpcionBuscable[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: SelectBuscableSize;
}`,
  colors: [
    { name: "white", value: "#ffffff", usage: "Fondo del trigger y del dropdown" },
    { name: "gray-100", value: "#f3f4f6", usage: "Fondo hover de opciones" },
    { name: "gray-200", value: "#e5e7eb", usage: "Fondo trigger deshabilitado, hover botón limpiar" },
    { name: "gray-300", value: "#d1d5db", usage: "Borde del trigger" },
    { name: "gray-400", value: "#9ca3af", usage: "Texto placeholder, íconos chevron y búsqueda" },
    { name: "gray-600", value: "#4b5563", usage: "Hover botón limpiar texto" },
    { name: "gray-700", value: "#374151", usage: "Texto de la opción seleccionada y opciones normales" },
    { name: "Azul Fonasa", value: "#0572CE", usage: "Ring y borde en focus del trigger" },
    { name: "blue-50", value: "#eff6ff", usage: "Fondo opción actualmente seleccionada" },
    { name: "blue-700", value: "#1d4ed8", usage: "Texto opción actualmente seleccionada" },
    { name: "red-500", value: "#ef4444", usage: "Borde y ring en estado error" },
    { name: "red-600", value: "#dc2626", usage: "Texto e ícono de opciones deshabilitadas" },
  ],
  variants: [
    {
      label: "Default",
      props: {},
      render: () => <DefaultDemo />,
      usageCode: `const [value, setValue] = useState("");

<SelectBuscable
  opciones={[
    { value: "1", label: "Hospital Barros Luco" },
    { value: "2", label: "Hospital San Juan de Dios" },
    { value: "3", label: "Hospital del Salvador" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Seleccione un hospital"
/>`,
    },
    {
      label: "Con selección",
      props: { value: "3" },
      render: () => <WithSelectionDemo />,
      usageCode: `const [value, setValue] = useState("3");

<SelectBuscable
  opciones={opciones}
  value={value}
  onChange={setValue}
/>`,
    },
    {
      label: "Con error",
      props: { error: true },
      render: () => <ErrorDemo />,
      usageCode: `<SelectBuscable
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione un hospital"
  error
/>`,
    },
    {
      label: "Deshabilitado",
      props: { disabled: true },
      render: () => <DisabledDemo />,
      usageCode: `<SelectBuscable
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione un hospital"
  disabled
/>`,
    },
    {
      label: "Cargando",
      props: { isLoading: true },
      render: () => <LoadingDemo />,
      usageCode: `<SelectBuscable
  opciones={[]}
  value={value}
  onChange={setValue}
  isLoading
/>`,
    },
    {
      label: "Tamaño pequeño (sm)",
      props: { size: "sm" },
      render: () => <SmallDemo />,
      usageCode: `<SelectBuscable
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione"
  size="sm"
/>`,
    },
    {
      label: "Tamaño grande (lg)",
      props: { size: "lg" },
      render: () => <LargeDemo />,
      usageCode: `<SelectBuscable
  opciones={opciones}
  value={value}
  onChange={setValue}
  placeholder="Seleccione un hospital"
  size="lg"
/>`,
    },
    {
      label: "Opciones deshabilitadas",
      props: {},
      render: () => <DisabledOptionsDemo />,
      usageCode: `<SelectBuscable
  opciones={[
    { value: "1", label: "Hospital Barros Luco" },
    { value: "2", label: "Hospital San Juan de Dios", deshabilitado: true },
    { value: "3", label: "Hospital del Salvador" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Seleccione un hospital"
/>`,
    },
  ],
};

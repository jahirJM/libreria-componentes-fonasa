import inputCode from "../../componentsUI/Input.tsx?raw";
import { Input } from "../../componentsUI/Input";
import { FiEye, FiSearch } from "react-icons/fi";
import type { ComponentEntry } from "./types";

export const inputEntry: ComponentEntry =   {
    name: "Input",
    description:
      "Input con soporte para múltiples tipos, íconos, loading y copyable.",
    code: inputCode,
    dependencies: ["clsx", "react-icons"],
    colors: [
      { name: "Blanco", value: "#ffffff", usage: "Fondo del input" },
      { name: "Fondo (cards)", value: "#f3f4f6", usage: "Fondo del input deshabilitado" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde del input normal" },
      { name: "Texto (secundario)", value: "#6b7280", usage: "Placeholder, íconos y texto auxiliar" },
      { name: "Focus ring inputs", value: "#1e3a5f", usage: "Borde y ring en focus" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde, focus ring y borde en estado error" },
      { name: "Negro", value: "#000000", usage: "Texto del input" },
    ],
    propsInterface: `interface InputProps
      extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
      error?: boolean;
      value?: string;
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      loading?: boolean;
      copyable?: boolean;
      type?: "text" | "email" | "number" | "password" | "tel" | "url" | "file";
    }`,
    variants: [
      {
        label: "Texto",
        props: { placeholder: "Ingrese texto" },
        render: () => <Input type="text" placeholder="Ingrese texto" />,
        usageCode: `<Input type="text" placeholder="Ingrese texto" />`,
      },
      {
        label: "Email",
        props: { placeholder: "tu@email.com" },
        render: () => <Input type="email" placeholder="tu@email.com" />,
        usageCode: `<Input type="email" placeholder="tu@email.com" />`,
      },
      {
        label: "Password",
        props: { placeholder: "••••••••" },
        render: () => <Input type="password" placeholder="••••••••" />,
        usageCode: `<Input type="password" placeholder="••••••••" />`,
      },
      {
        label: "Teléfono",
        props: { placeholder: "+56 9 1234 5678" },
        render: () => <Input type="tel" placeholder="+56 9 1234 5678" />,
        usageCode: `<Input type="tel" placeholder="+56 9 1234 5678" />`,
      },
      {
        label: "URL",
        props: { placeholder: "www.fonasa.cl" },
        render: () => <Input type="url" placeholder="www.fonasa.cl" />,
        usageCode: `<Input type="url" placeholder="www.fonasa.cl" />`,
      },
      {
        label: "Número",
        props: { placeholder: "0" },
        render: () => <Input type="number" placeholder="0" />,
        usageCode: `<Input type="number" placeholder="0" />`,
      },
      {
        label: "Archivo",
        props: {},
        render: () => <Input type="file" />,
        usageCode: `<Input type="file" />`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => <Input type="text" error placeholder="Input con error" />,
        usageCode: `<Input type="text" error placeholder="Input con error" />`,
      },
      {
        label: "Con ícono izquierda",
        props: { leftIcon: "FiSearch" },
        render: () => (
          <Input type="text" placeholder="Buscar..." leftIcon={<FiSearch />} />
        ),
        usageCode: `<Input type="text" placeholder="Buscar..." leftIcon={<FiSearch />} />`,
      },
      {
        label: "Con ícono derecho",
        props: { rightIcon: "FiEye" },
        render: () => (
          <Input type="password" placeholder="••••••••" rightIcon={<FiEye />} />
        ),
        usageCode: `<Input type="password" placeholder="••••••••" rightIcon={<FiEye />} />`,
      },
      {
        label: "Loading",
        props: { loading: true },
        render: () => <Input type="text" placeholder="Cargando..." loading />,
        usageCode: `<Input type="text" placeholder="Cargando..." loading />`,
      },
      {
        label: "Copyable",
        props: { copyable: true, value: "ABC-1234-XYZ" },
        render: () => <Input type="text" value="ABC-1234-XYZ" copyable />,
        usageCode: `<Input type="text" value="ABC-1234-XYZ" copyable />`,
      },
      {
        label: "Disabled",
        props: { disabled: true },
        render: () => (
          <Input type="text" placeholder="No disponible" disabled />
        ),
        usageCode: `<Input type="text" placeholder="No disponible" disabled />`,
      },
    ],
  }
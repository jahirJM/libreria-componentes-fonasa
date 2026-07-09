import { Input } from "./components/Input";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => React.ReactNode;
  usageCode: string;
}

export interface ComponentEntry {
  name: string;
  description?: string;
  code: string;
  variants: ComponentVariant[];
}

const inputCode = `interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  placeholder,
  error,
  disabled,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={\`rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        } \${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "bg-white"}\`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}`;

export const registry: ComponentEntry[] = [
  {
    name: "Input",
    description: "Campo de texto reutilizable con soporte para estados de error y deshabilitado.",
    code: inputCode,
    variants: [
      {
        label: "Normal",
        props: { placeholder: "Ingrese texto" },
        render: () => <Input placeholder="Ingrese texto" />,
        usageCode: `<Input placeholder="Ingrese texto" />`,
      },
      {
        label: "Con Label",
        props: { label: "Email", placeholder: "tu@email.com" },
        render: () => <Input label="Email" placeholder="tu@email.com" />,
        usageCode: `<Input label="Email" placeholder="tu@email.com" />`,
      },
      {
        label: "Error",
        props: { placeholder: "Ingrese texto", error: "Campo requerido" },
        render: () => (
          <Input placeholder="Ingrese texto" error="Campo requerido" />
        ),
        usageCode: `<Input placeholder="Ingrese texto" error="Campo requerido" />`,
      },
      {
        label: "Deshabilitado",
        props: { placeholder: "No disponible", disabled: true },
        render: () => <Input placeholder="No disponible" disabled />,
        usageCode: `<Input placeholder="No disponible" disabled />`,
      },
    ],
  },
];

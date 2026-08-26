import switchCode from "../../componentsUI/Switch.tsx?raw";
import switchTestCode from "../../tests/Switch.test.tsx?raw";
import { Switch, SegmentedToggle } from "../../componentsUI/Switch";
import { SwitchPlayground } from "../demos/SwitchPlayground";
import type { ComponentEntry } from "./types";

export const switchEntry: ComponentEntry = {
  name: "switch",
  group: "Otros",
  description:
    "Toggle switch con 5 variantes de color (primary, success, error, warning, neutral), 3 tamaños (sm, md, lg), íconos internos opcionales, y soporte controlado/no-controlado.",
  code: switchCode,
  testCode: switchTestCode,
  dependencies: ["clsx", "react-icons"],
  playground: () => <SwitchPlayground />,
  colors: [
    { name: "sky-600", value: "#0284c7", usage: "Pista activa variante primary" },
    { name: "emerald-600", value: "#059669", usage: "Pista activa variante success / ícono check" },
    { name: "red-600", value: "#dc2626", usage: "Pista activa variante error" },
    { name: "yellow-500", value: "#eab308", usage: "Pista activa variante warning" },
    { name: "slate-600", value: "#475569", usage: "Pista activa variante neutral" },
    { name: "slate-300", value: "#cbd5e1", usage: "Pista inactiva (todas las variantes)" },
    { name: "slate-400", value: "#94a3b8", usage: "Ícono X cuando está apagado" },
    { name: "white", value: "#ffffff", usage: "Fondo del thumb" },
  ],
  propsInterface: `type VarianteSwitch = "primary" | "success" | "error" | "warning" | "neutral";
type TamanoSwitch = "sm" | "md" | "lg";

interface SwitchProps {
  /** Estado controlado. Si se omite, maneja su propio estado. */
  checked?: boolean;
  /** Estado inicial cuando no es controlado. */
  defaultChecked?: boolean;
  /** Se dispara con el nuevo valor al cambiar. */
  onChange?: (checked: boolean) => void;
  /** Variante de color cuando está activado. */
  variante?: VarianteSwitch;
  /** Tamaño del switch. */
  tamano?: TamanoSwitch;
  /** Muestra un check/X dentro del thumb. */
  conIconos?: boolean;
  disabled?: boolean;
  /** Clases Tailwind extra para el contenedor. */
  className?: string;
  name?: string;
  id?: string;
  isLoading?: boolean;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
  /** ID del elemento que actúa como label del switch. */
  ariaLabelledBy?: string;
}

interface SegmentedToggleProps {
  /** Las dos opciones del toggle. */
  options: [string, string];
  /** Índice de la opción activa (0 o 1). */
  value?: number;
  /** Estado inicial cuando no es controlado. @default 0 */
  defaultValue?: number;
  /** Se dispara con el índice seleccionado al cambiar. */
  onChange?: (index: number) => void;
  /** Tamaño del toggle. */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}`,
  variants: [
    {
      label: "Primary (por defecto)",
      props: { variante: "primary" },
      render: () => <Switch variante="primary" defaultChecked />,
      usageCode: `{/* Uso básico con label externo */}
<label className="flex items-center gap-3 cursor-pointer">
  <Switch variante="primary" defaultChecked />
  <span className="text-sm font-medium text-slate-800">Recibir notificaciones</span>
</label>`,
    },
    {
      label: "Success",
      props: { variante: "success" },
      render: () => <Switch variante="success" defaultChecked />,
      usageCode: `<label className="flex items-center gap-3 cursor-pointer">
  <Switch variante="success" defaultChecked />
  <span className="text-sm font-medium text-slate-800">Activar correos de confirmación</span>
</label>`,
    },
    {
      label: "Error",
      props: { variante: "error" },
      render: () => <Switch variante="error" defaultChecked />,
      usageCode: `<label className="flex items-center gap-3 cursor-pointer">
  <Switch variante="error" defaultChecked />
  <span className="text-sm font-medium text-slate-800">Eliminar datos automáticamente</span>
</label>`,
    },
    {
      label: "Warning",
      props: { variante: "warning" },
      render: () => <Switch variante="warning" defaultChecked />,
      usageCode: `<label className="flex items-center gap-3 cursor-pointer">
  <Switch variante="warning" defaultChecked />
  <span className="text-sm font-medium text-slate-800">Compartir ubicación</span>
</label>`,
    },
    {
      label: "Neutral",
      props: { variante: "neutral" },
      render: () => <Switch variante="neutral" defaultChecked />,
      usageCode: `<label className="flex items-center gap-3 cursor-pointer">
  <Switch variante="neutral" defaultChecked />
  <span className="text-sm font-medium text-slate-800">Modo oscuro</span>
</label>`,
    },
    {
      label: "Tamaño pequeño (sm)",
      props: { tamano: "sm" },
      render: () => <Switch tamano="sm" defaultChecked />,
      usageCode: `<Switch tamano="sm" defaultChecked />`,
    },
    {
      label: "Tamaño mediano (md)",
      props: { tamano: "md" },
      render: () => <Switch tamano="md" defaultChecked />,
      usageCode: `<Switch tamano="md" defaultChecked />`,
    },
    {
      label: "Tamaño grande (lg)",
      props: { tamano: "lg" },
      render: () => <Switch tamano="lg" defaultChecked />,
      usageCode: `<Switch tamano="lg" defaultChecked />`,
    },
    {
      label: "Con íconos (check/X)",
      props: { conIconos: true },
      render: () => (
        <div className="flex items-center gap-4">
          <Switch conIconos defaultChecked />
          <Switch conIconos />
        </div>
      ),
      usageCode: `{/* Activado */}
<Switch conIconos defaultChecked />

{/* Desactivado */}
<Switch conIconos />`,
    },
    {
      label: "Deshabilitado",
      props: { disabled: true },
      render: () => (
        <div className="flex items-center gap-4">
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      ),
      usageCode: `<Switch disabled />
<Switch disabled defaultChecked />`,
    },
    {
      label: "Todos los tamaños",
      props: {},
      render: () => (
        <div className="flex items-center gap-4">
          <Switch tamano="sm" defaultChecked />
          <Switch tamano="md" defaultChecked />
          <Switch tamano="lg" defaultChecked />
        </div>
      ),
      usageCode: `<Switch tamano="sm" defaultChecked />
<Switch tamano="md" defaultChecked />
<Switch tamano="lg" defaultChecked />`,
    },
    {
      label: "Todas las variantes con íconos",
      props: {},
      render: () => (
        <div className="flex items-center gap-4">
          <Switch variante="primary" defaultChecked conIconos />
          <Switch variante="success" defaultChecked conIconos />
          <Switch variante="error" defaultChecked conIconos />
          <Switch variante="warning" defaultChecked conIconos />
          <Switch variante="neutral" defaultChecked conIconos />
        </div>
      ),
      usageCode: `<Switch variante="primary" defaultChecked conIconos />
<Switch variante="success" defaultChecked conIconos />
<Switch variante="error" defaultChecked conIconos />
<Switch variante="warning" defaultChecked conIconos />
<Switch variante="neutral" defaultChecked conIconos />`,
    },
    {
      label: "Con label y descripción (ejemplo de uso)",
      props: {},
      render: () => (
        <label className="flex items-start gap-3 cursor-pointer max-w-xs">
          <Switch variante="primary" defaultChecked className="mt-0.5" />
          <div>
            <span className="text-sm font-medium text-slate-800">Notificaciones SMS</span>
            <p className="text-xs text-slate-500 mt-0.5">
              Se enviará un SMS a su número registrado cada vez que se actualice el estado de su solicitud.
            </p>
          </div>
        </label>
      ),
      usageCode: `{/* Ejemplo con label y descripción usando un <label> externo */}
<label className="flex items-start gap-3 cursor-pointer">
  <Switch variante="primary" defaultChecked className="mt-0.5" />
  <div>
    <span className="text-sm font-medium text-slate-800">Notificaciones SMS</span>
    <p className="text-xs text-slate-500 mt-0.5">
      Se enviará un SMS a su número registrado cada vez que se
      actualice el estado de su solicitud.
    </p>
  </div>
</label>`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => (
        <div className="space-y-3">
          <Switch tamano="sm" isLoading />
          <Switch tamano="md" isLoading />
          <Switch tamano="lg" isLoading />
        </div>
      ),
      usageCode: `<Switch isLoading />`,
    },
    {
      label: "Toggle segmentado",
      props: {},
      render: () => (
        <div className="flex flex-col items-center gap-4">
          <SegmentedToggle options={["1 col", "2 col"]} defaultValue={1} size="md" />
          <SegmentedToggle options={["Mensual", "Anual"]} defaultValue={0} size="sm" />
          <SegmentedToggle options={["Lista", "Grilla"]} defaultValue={0} size="lg" />
        </div>
      ),
      usageCode: `<SegmentedToggle
  options={["1 col", "2 col"]}
  value={active}
  onChange={(i) => setActive(i)}
/>`,
    },
  ],
};

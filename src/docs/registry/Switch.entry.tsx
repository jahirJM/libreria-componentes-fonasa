import switchCode from "../../componentsUI/Switch.tsx?raw";
import { Switch } from "../../componentsUI/Switch";
import type { ComponentEntry } from "./types";

export const switchEntry: ComponentEntry = {
  name: "Switch",
  description:
    "Toggle switch con 5 variantes de color (primary, success, error, warning, neutral), 3 tamaños (sm, md, lg), íconos internos opcionales, y soporte controlado/no-controlado.",
  code: switchCode,
  dependencies: ["clsx", "react-icons"],
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
  ],
};

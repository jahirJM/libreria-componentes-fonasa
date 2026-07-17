import badgeCode from "../../componentsUI/Badge.tsx?raw"
import { Badge } from "../../componentsUI/Badge";
import type { ComponentEntry } from "./types";

export const badgeEntry: ComponentEntry =   {
    name: "Badge",
    description:
      "Badge/pill para indicar estados, contadores y categorías. Variantes de color según contexto.",
    code: badgeCode,
    dependencies: ["clsx"],
    colors: [
      { name: "yellow-100", value: "#fef9c3", usage: "Fondo badge pendiente" },
      { name: "yellow-800", value: "#854d0e", usage: "Texto badge pendiente" },
      { name: "yellow-300", value: "#fde047", usage: "Borde badge pendiente" },
      { name: "blue-100", value: "#dbeafe", usage: "Fondo badge revisión" },
      { name: "blue-800", value: "#1e40af", usage: "Texto badge revisión" },
      { name: "blue-300", value: "#93c5fd", usage: "Borde badge revisión" },
      { name: "green-100", value: "#dcfce7", usage: "Fondo badge aprobada" },
      { name: "green-800", value: "#166534", usage: "Texto badge aprobada" },
      { name: "green-300", value: "#86efac", usage: "Borde badge aprobada" },
      { name: "red-200", value: "#fecaca", usage: "Fondo badge rechazada" },
      { name: "red-900", value: "#7f1d1d", usage: "Texto badge rechazada" },
      { name: "red-400", value: "#f87171", usage: "Borde badge rechazada" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo badge counter/default" },
      { name: "gray-500", value: "#6b7280", usage: "Texto badge counter" },
      { name: "gray-700", value: "#374151", usage: "Texto badge default" },
    ],
    propsInterface: `type BadgeVariant =
  | "counter"
  | "documentos"
  | "especialidad"
  | "estado-pendiente"
  | "estado-revision"
  | "estado-aprobada"
  | "estado-rechazada"
  | "estado-default";

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
  customClass?: string;
  /** Habilita redimensionamiento por arrastre con colapso a punto */
  resizable?: boolean;
  /** Umbral en px debajo del cual colapsa a punto (default: 40) */
  collapseThreshold?: number;
}`,
    variants: [
      {
        label: "Pendiente",
        props: { variant: "estado-pendiente", text: "Pendiente", resizable: true },
        render: () => <Badge variant="estado-pendiente" text="Pendiente" resizable />,
        usageCode: `<Badge variant="estado-pendiente" text="Pendiente" resizable />`,
      },
      {
        label: "En revisión",
        props: { variant: "estado-revision", text: "En revisión", resizable: true },
        render: () => <Badge variant="estado-revision" text="En revisión" resizable />,
        usageCode: `<Badge variant="estado-revision" text="En revisión" resizable />`,
      },
      {
        label: "Aprobada",
        props: { variant: "estado-aprobada", text: "Aprobada", resizable: true },
        render: () => <Badge variant="estado-aprobada" text="Aprobada" resizable />,
        usageCode: `<Badge variant="estado-aprobada" text="Aprobada" resizable />`,
      },
      {
        label: "Rechazada",
        props: { variant: "estado-rechazada", text: "Rechazada", resizable: true },
        render: () => <Badge variant="estado-rechazada" text="Rechazada" resizable />,
        usageCode: `<Badge variant="estado-rechazada" text="Rechazada" resizable />`,
      },
      {
        label: "Counter",
        props: { variant: "counter", text: "12", resizable: true },
        render: () => <Badge variant="counter" text="12" resizable />,
        usageCode: `<Badge variant="counter" text="12" resizable />`,
      },
      {
        label: "Default",
        props: { variant: "estado-default", text: "Sin estado", resizable: true },
        render: () => <Badge variant="estado-default" text="Sin estado" resizable />,
        usageCode: `<Badge variant="estado-default" text="Sin estado" resizable />`,
      },
    ],
  }
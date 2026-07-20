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
      { name: "Fondo (pendiente)", value: "#fefce8", usage: "Fondo badge pendiente" },
      { name: "Texto (pendiente)", value: "#a16207", usage: "Texto badge pendiente" },
      { name: "Fondo selecciones", value: "#dbeafe", usage: "Fondo badge revisión" },
      { name: "Texto links", value: "#1e40af", usage: "Texto badge revisión" },
      { name: "Bordes selección", value: "#93c5fd", usage: "Borde badge revisión" },
      { name: "Fondo (éxito)", value: "#dcfce7", usage: "Fondo badge aprobada" },
      { name: "Texto (éxito)", value: "#166534", usage: "Texto badge aprobada" },
      { name: "Fondo (error)", value: "#fee2e2", usage: "Fondo badge rechazada" },
      { name: "Texto (QA)", value: "#7f1d1d", usage: "Texto badge rechazada" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde badge rechazada" },
      { name: "Fondo (cards)", value: "#f3f4f6", usage: "Fondo badge counter/default" },
      { name: "Texto (secundario)", value: "#6b7280", usage: "Texto badge counter" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto badge default" },
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
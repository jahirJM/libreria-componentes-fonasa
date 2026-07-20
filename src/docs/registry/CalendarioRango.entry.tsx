import calendarioRangoCode from "../../componentsUI/CalendarioRango.tsx?raw";
import { CalendarioRango } from "../../componentsUI/CalendarioRango";
import type { ComponentEntry } from "./types";

export const calendarioRangoEntry: ComponentEntry = {
  name: "Calendario",
  group: "Calendario",
  description:
    "Calendario mensual con selección de rango de fechas (inicio y fin). Marca los feriados de Chile en azul fuerte usando la librería date-holidays. Soporta modo single y double. Los filtros (feriados, habiles, finSemana) solo afectan el conteo de días, no la visualización del calendario.",
  code: calendarioRangoCode,
  dependencies: ["date-holidays"],
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Feriados, extremos del rango, labels y stats" },
    { name: "Color secundario (fondos)", value: "#D4E8F7", usage: "Fondo de días dentro del rango seleccionado" },
    { name: "Color primario (prestadores naturales)", value: "#008CB5", usage: "Borde del indicador del día actual" },
    { name: "Color secundario (fondos)", value: "#D4E8F7", usage: "Hover sobre días normales" },
    { name: "Focus ring inputs", value: "#1e3a5f", usage: "Texto de días en el rango" },
    { name: "Ícono confirmación", value: "#22c55e", usage: "Filtro y stats de días hábiles" },
    { name: "Ícono advertencia", value: "#f59e0b", usage: "Filtro y stats de fines de semana" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto días normales" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Nombres días de la semana" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde del contenedor y separador" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del calendario" },
  ],
  propsInterface: `interface CalendarioRangoProps {
  /** Callback cuando se selecciona un rango completo (inicio y fin) */
  onRangeSelect?: (start: Date, end: Date) => void;
  /** Mes inicial a mostrar (0-11). Por defecto el mes actual */
  initialMonth?: number;
  /** Año inicial a mostrar. Por defecto el año actual */
  initialYear?: number;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  /** Modo de visualización: single (un calendario) o double (dos calendarios lado a lado) */
  mode?: "single" | "double";
  /** Mostrar conteo de días junto a la fecha fin. Default: true */
  showStats?: boolean;
  /** Contar feriados en el total de días. Default: true */
  feriados?: boolean;
  /** Contar días hábiles en el total de días. Default: true */
  habiles?: boolean;
  /** Contar fines de semana en el total de días. Default: true */
  finSemana?: boolean;
  /** Fecha mínima seleccionable. Las fechas anteriores se deshabilitan */
  minDate?: Date;
  /** Fecha máxima seleccionable. Las fechas posteriores se deshabilitan */
  maxDate?: Date;
}`,
  variants: [
    {
      label: "Simple sin conteo",
      props: { mode: "single", showStats: false, initialMonth: 8, initialYear: 2026 },
      render: () => (
        <CalendarioRango
          mode="single"
          showStats={false}
          initialMonth={8}
          initialYear={2026}
        />
      ),
      usageCode: `<CalendarioRango
  showStats={false}
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
    },
    {
      label: "Simple con conteo (todos los días)",
      props: { mode: "single", initialMonth: 8, initialYear: 2026 },
      render: () => (
        <CalendarioRango
          mode="single"
          initialMonth={8}
          initialYear={2026}
        />
      ),
      usageCode: `<CalendarioRango
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
    },
    {
      label: "Simple con conteo (sin feriados, con fines de semana)",
      props: { mode: "single", feriados: false, initialMonth: 8, initialYear: 2026 },
      render: () => (
        <CalendarioRango
          mode="single"
          feriados={false}
          initialMonth={8}
          initialYear={2026}
        />
      ),
      usageCode: `<CalendarioRango
  feriados={false}
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
    },
    {
      label: "Double — solo días hábiles (sin feriados ni fines de semana)",
      props: { mode: "double", feriados: false, finSemana: false, initialMonth: 8, initialYear: 2026 },
      render: () => (
        <CalendarioRango
          mode="double"
          feriados={false}
          finSemana={false}
          initialMonth={8}
          initialYear={2026}
        />
      ),
      usageCode: `<CalendarioRango
  mode="double"
  feriados={false}
  finSemana={false}
  initialMonth={8}
  initialYear={2026}
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
      responsive: true,
    },
    {
      label: "Con límites (10 Sep - 25 Sep 2026)",
      props: { mode: "single", initialMonth: 8, initialYear: 2026, minDate: "2026-09-10", maxDate: "2026-09-25" },
      render: () => (
        <CalendarioRango
          mode="single"
          initialMonth={8}
          initialYear={2026}
          minDate={new Date(2026, 8, 10)}
          maxDate={new Date(2026, 8, 25)}
        />
      ),
      usageCode: `<CalendarioRango
  initialMonth={8}
  initialYear={2026}
  minDate={new Date(2026, 8, 10)}
  maxDate={new Date(2026, 8, 25)}
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
    },
  ],
};

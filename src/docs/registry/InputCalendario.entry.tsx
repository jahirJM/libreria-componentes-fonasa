import inputCalendarioCode from "../../componentsUI/InputCalendario.tsx?raw";
import { InputCalendario } from "../../componentsUI/InputCalendario";
import { SkeletonInputCalendario } from "../../skeletons/SkeletonInputCalendario";
import type { ComponentEntry } from "./types";

export const inputCalendarioEntry: ComponentEntry = {
  name: "Input Calendario",
  group: "Calendario",
  description:
    "Utiliza: Calendario. Input con popover de calendario integrado. Soporta modo fecha (una sola fecha) y modo rango (fecha inicio y fin). Al seleccionar en el calendario, los campos se rellenan automáticamente.",
  code: inputCalendarioCode,
  dependencies: ["date-holidays"],
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Focus ring y label activo" },
    { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde del input" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Íconos y placeholder" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Labels internos" },
    { name: "Fondos (dark)", value: "#1f2937", usage: "Texto de la fecha seleccionada" },
    { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde en estado error" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del input" },
  ],
  propsInterface: `interface InputCalendarioProps {
  /** Tipo de selección: "fecha" para una sola fecha, "rango" para inicio y fin, "nacimiento" para fecha de nacimiento */
  tipo?: "fecha" | "rango" | "nacimiento";
  /** Callback cuando se selecciona una fecha (modo fecha o nacimiento) */
  onDateSelect?: (date: Date) => void;
  /** Callback cuando se selecciona un rango completo (modo rango) */
  onRangeSelect?: (start: Date, end: Date) => void;
  /** Label del campo (modo fecha) o del campo inicio (modo rango) */
  labelInicio?: string;
  /** Label del campo de fecha fin (solo modo rango) */
  labelFin?: string;
  /** Placeholder del campo */
  placeholderInicio?: string;
  /** Placeholder del campo fin (solo modo rango) */
  placeholderFin?: string;
  /** Modo del calendario interno: single o double */
  mode?: "single" | "double";
  /** Mostrar conteo de días. Default: true */
  showStats?: boolean;
  /** Contar feriados en el total. Default: true */
  feriados?: boolean;
  /** Contar días hábiles en el total. Default: true */
  habiles?: boolean;
  /** Contar fines de semana en el total. Default: true */
  finSemana?: boolean;
  /** Fecha mínima seleccionable */
  minDate?: Date;
  /** Fecha máxima seleccionable */
  maxDate?: Date;
  /** Clase CSS adicional */
  className?: string;
  /** Error en el campo */
  error?: boolean;
  /** Deshabilitar el campo */
  disabled?: boolean;
  /** Validar edad mínima (solo modo nacimiento) */
  validarEdad?: boolean;
  /** Edad mínima requerida en años (solo cuando validarEdad es true) */
  edadMinima?: number;
  /** Callback cuando la validación de edad falla */
  onEdadInvalida?: (edadCalculada: number) => void;
}`,
  variants: [
    {
      label: "Fecha simple",
      props: { tipo: "fecha" },
      render: () => (
        <div className="w-full max-w-sm">
          <InputCalendario
            tipo="fecha"
            labelInicio="Seleccionar fecha"
            onDateSelect={(date) => console.log(date)}
          />
        </div>
      ),
      usageCode: `<InputCalendario
  tipo="fecha"
  labelInicio="Seleccionar fecha"
  onDateSelect={(date) => console.log(date)}
/>`,
      responsive: true,
    },
    {
      label: "Rango de fechas (inicio y término)",
      props: { tipo: "rango", mode: "double" },
      render: () => (
        <div className="w-full max-w-md">
          <InputCalendario
            tipo="rango"
            mode="double"
            onRangeSelect={(start, end) => console.log(start, end)}
          />
        </div>
      ),
      usageCode: `<InputCalendario
  tipo="rango"
  mode="double"
  onRangeSelect={(start, end) => console.log(start, end)}
/>`,
      responsive: true,
    },
    {
      label: "Fecha de nacimiento (sin validación de edad)",
      props: { tipo: "nacimiento" },
      render: () => (
        <div className="w-full max-w-sm">
          <InputCalendario
            tipo="nacimiento"
            onDateSelect={(date) => console.log("Nacimiento:", date)}
          />
        </div>
      ),
      usageCode: `<InputCalendario
  tipo="nacimiento"
  onDateSelect={(date) => console.log("Nacimiento:", date)}
/>`,
      responsive: true,
    },
    {
      label: "Fecha de nacimiento (edad mínima 18 años)",
      props: { tipo: "nacimiento", validarEdad: true, edadMinima: 18 },
      render: () => (
        <div className="w-full max-w-sm">
          <InputCalendario
            tipo="nacimiento"
            validarEdad={true}
            edadMinima={18}
            onDateSelect={(date) => console.log("Nacimiento válido:", date)}
            onEdadInvalida={(edad) => console.log("Edad insuficiente:", edad)}
          />
        </div>
      ),
      usageCode: `<InputCalendario
  tipo="nacimiento"
  validarEdad={true}
  edadMinima={18}
  onDateSelect={(date) => console.log("Nacimiento válido:", date)}
  onEdadInvalida={(edad) => console.log("Edad insuficiente:", edad)}
/>`,
      responsive: true,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => <SkeletonInputCalendario tipo="rango" />,
      usageCode: `import { SkeletonInputCalendario } from "@/skeletons";

<SkeletonInputCalendario tipo="rango" />`,
    },
  ],
};

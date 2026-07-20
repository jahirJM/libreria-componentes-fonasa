import stepperCode from "../../componentsUI/Stepper.tsx?raw"
import { StepperDemo } from "../demos/StepperDemo";
import { Stepper } from "../../componentsUI/Stepper";
import type { ComponentEntry } from "./types";

export const stepperEntry: ComponentEntry =   {
    name: "Stepper",
    description:
      "Utiliza: Botones. Stepper horizontal para formularios multi-paso. Responsive: en mobile muestra badge, en desktop muestra línea de progreso con círculos.",
    code: stepperCode,
    colors: [
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "Círculos activos, línea de progreso, texto del paso actual y borde del badge mobile" },
      { name: "Blanco", value: "#ffffff", usage: "Texto dentro de los círculos" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Círculos inactivos y línea de fondo" },
      { name: "Texto (secundario)", value: "#6b7280", usage: "Texto de labels inactivos" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto del label en vista mobile" },
    ],
    propsInterface: `interface Paso {
  id: string;
  label: string;
}

interface StepperProps {
  pasos: Paso[];
  pasoActual: number;
  onCambiarPaso?: (paso: number) => void;
  puedeNavegar?: boolean;
  /** Fuerza la vista mobile (badge) sin importar el breakpoint */
  forceMobile?: boolean;
}`,
    variants: [
      {
        label: "3 pasos (responsive)",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            conResize
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Datos" }, { id: "2", label: "Docs" }, { id: "3", label: "Confirmar" }]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "5 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
              { id: "5", label: "Paso 5" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Inicio" }, ...]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "Navegable (click en pasos)",
        props: { puedeNavegar: true },
        render: () => (
          <StepperDemo
            navegable
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={pasos}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n  puedeNavegar\n/>`,
      },
      {
        label: "Skeleton",
        props: {},
        render: () => (
          <Stepper
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
            ]}
            pasoActual={1}
            isLoading
          />
        ),
        usageCode: `<Stepper pasos={pasos} pasoActual={1} isLoading />`,
      },
    ],
  }

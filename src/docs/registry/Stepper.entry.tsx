import stepperCode from "../../componentsUI/Stepper.tsx?raw"
import { StepperDemo } from "../demos/StepperDemo";
import type { ComponentEntry } from "./types";

export const stepperEntry: ComponentEntry =   {
    name: "Stepper",
    description:
      "Utiliza: Botones. Stepper horizontal para formularios multi-paso. Responsive: en mobile muestra badge, en desktop muestra línea de progreso con círculos.",
    code: stepperCode,
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "Círculos activos, línea de progreso, texto del paso actual y borde del badge mobile" },
      { name: "white", value: "#ffffff", usage: "Texto dentro de los círculos" },
      { name: "gray-300", value: "#d1d5db", usage: "Círculos inactivos y línea de fondo" },
      { name: "gray-500", value: "#6b7280", usage: "Texto de labels inactivos" },
      { name: "gray-700", value: "#374151", usage: "Texto del label en vista mobile" },
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
}`,
    variants: [
      {
        label: "3 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
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
    ],
  }
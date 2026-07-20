import { BotonCancelar, BotonConfirmar, BotonPrimario, BotonSecundario } from "../../componentsUI/Botones";
import botonesCode from "../../componentsUI/Botones.tsx?raw"
import type { ComponentEntry } from "./types";

export const botonesEntry: ComponentEntry =   {
    name: "Botones",
    description:
      "Conjunto de botones (Confirmar, Cancelar, Primario, Secundario) con soporte para íconos y estado deshabilitado.",
    code: botonesCode,
    dependencies: ["react-icons"],
    colors: [
      { name: "Botón toast éxito", value: "#0891b2", usage: "Fondo BotonConfirmar" },
      { name: "Hover botón toast éxito", value: "#06b6d4", usage: "Fondo hover BotonConfirmar" },
      { name: "Botón eliminar", value: "#dc2626", usage: "Fondo BotonCancelar" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Fondo hover BotonCancelar" },
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "Fondo BotonPrimario" },
      { name: "Texto badge revisión", value: "#1d4ed8", usage: "Fondo hover BotonPrimario" },
      { name: "Texto (placeholder)", value: "#9ca3af", usage: "Fondo BotonSecundario" },
      { name: "Texto (secundario)", value: "#6b7280", usage: "Fondo hover BotonSecundario y focus ring" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Fondo de todos los botones deshabilitados" },
      { name: "Blanco", value: "#ffffff", usage: "Texto de todos los botones" },
    ],
    propsInterface: `interface BotonesProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}`,
    variants: [
      {
        label: "BotonConfirmar",
        props: { label: "Confirmar" },
        render: () => <div className="flex justify-center w-full"><BotonConfirmar label="Confirmar" /></div>,
        usageCode: `<BotonConfirmar label="Confirmar" />`,
      },
      {
        label: "BotonCancelar",
        props: { label: "Cancelar" },
        render: () => <div className="flex justify-center w-full"><BotonCancelar label="Cancelar" /></div>,
        usageCode: `<BotonCancelar label="Cancelar" />`,
      },
      {
        label: "BotonPrimario",
        props: { label: "Guardar" },
        render: () => <div className="flex justify-center w-full"><BotonPrimario label="Guardar" /></div>,
        usageCode: `<BotonPrimario label="Guardar" />`,
      },
      {
        label: "BotonSecundario",
        props: { label: "Volver" },
        render: () => <div className="flex justify-center w-full"><BotonSecundario label="Volver" /></div>,
        usageCode: `<BotonSecundario label="Volver" />`,
      },
      {
        label: "Deshabilitado",
        props: { label: "No disponible", isDisabled: true },
        render: () => <div className="flex justify-center w-full"><BotonPrimario label="No disponible" isDisabled /></div>,
        usageCode: `<BotonPrimario label="No disponible" isDisabled />`,
      },
    ],
  }
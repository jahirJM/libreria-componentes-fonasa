import { BotonCancelar, BotonConfirmar, BotonPrimario, BotonSecundario } from "../../componentsUI/Botones";
import botonesCode from "../../componentsUI/Botones.tsx?raw"
import type { ComponentEntry } from "./types";

export const botonesEntry: ComponentEntry =   {
    name: "Botones",
    description:
      "Conjunto de botones (Confirmar, Cancelar, Primario, Secundario) con soporte para íconos y estado deshabilitado.",
    code: botonesCode,
    dependencies: ["react-icons"],
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
        render: () => <BotonConfirmar label="Confirmar" />,
        usageCode: `<BotonConfirmar label="Confirmar" />`,
      },
      {
        label: "BotonCancelar",
        props: { label: "Cancelar" },
        render: () => <BotonCancelar label="Cancelar" />,
        usageCode: `<BotonCancelar label="Cancelar" />`,
      },
      {
        label: "BotonPrimario",
        props: { label: "Guardar" },
        render: () => <BotonPrimario label="Guardar" />,
        usageCode: `<BotonPrimario label="Guardar" />`,
      },
      {
        label: "BotonSecundario",
        props: { label: "Volver" },
        render: () => <BotonSecundario label="Volver" />,
        usageCode: `<BotonSecundario label="Volver" />`,
      },
      {
        label: "Deshabilitado",
        props: { label: "No disponible", isDisabled: true },
        render: () => <BotonPrimario label="No disponible" isDisabled />,
        usageCode: `<BotonPrimario label="No disponible" isDisabled />`,
      },
    ],
  }
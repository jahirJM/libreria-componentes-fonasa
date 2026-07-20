import uploadBoxCode from "../../componentsUI/UploadBox.tsx?raw"
import { UploadBox } from "../../componentsUI/UploadBox";
import type { ComponentEntry } from "./types";

export const uploadBoxEntry: ComponentEntry =   {
    name: "UploadBox",
    description:
      "Zona de carga de archivos con estados: default, confirmación y error. Estilo drag & drop.",
    code: uploadBoxCode,
    dependencies: ["clsx", "react-icons"],
    colors: [
      { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Fondo del estado default" },
      { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde punteado del estado default" },
      { name: "Texto (secundario)", value: "#6b7280", usage: "Texto secundario y texto de formato" },
      { name: "Texto (medio)", value: "#4b5563", usage: "Ícono de upload" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto principal" },
      { name: "Ícono confirmación", value: "#22c55e", usage: "Ícono de confirmación" },
      { name: "Fondo (rechazado)", value: "#fef2f2", usage: "Fondo del estado error" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde del estado error" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Ícono y texto secundario de error" },
      { name: "Botón eliminar", value: "#dc2626", usage: "Texto principal de error" },
    ],
    propsInterface: `interface UploadBoxProps {
  text: string;
  textStrong: string;
  customClass?: string;
  confirmacion?: boolean;
  error?: boolean;
}`,
    variants: [
      {
        label: "Default",
        props: {
          textStrong: "Arrastra tu archivo aquí",
          text: "o haz click para buscar",
        },
        render: () => (
          <UploadBox
            textStrong="Arrastra tu archivo aquí"
            text="o haz click para buscar"
          />
        ),
        usageCode: `<UploadBox textStrong="Arrastra tu archivo aquí" text="o haz click para buscar" />`,
      },
      {
        label: "Confirmación",
        props: {
          textStrong: "documento.pdf",
          text: "subido correctamente",
          confirmacion: true,
        },
        render: () => (
          <UploadBox
            textStrong="documento.pdf"
            text="subido correctamente"
            confirmacion
          />
        ),
        usageCode: `<UploadBox textStrong="documento.pdf" text="subido correctamente" confirmacion />`,
      },
      {
        label: "Error",
        props: {
          textStrong: "archivo.exe",
          text: "formato no válido",
          error: true,
        },
        render: () => (
          <UploadBox textStrong="archivo.exe" text="formato no válido" error />
        ),
        usageCode: `<UploadBox textStrong="archivo.exe" text="formato no válido" error />`,
      },
      {
        label: "Skeleton",
        props: {},
        render: () => <UploadBox isLoading textStrong="" text="" />,
        usageCode: `<UploadBox isLoading textStrong="" text="" />`,
      },
    ],
  }
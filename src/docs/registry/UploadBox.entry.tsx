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
      { name: "gray-200", value: "#e5e7eb", usage: "Fondo del estado default" },
      { name: "gray-300", value: "#d1d5db", usage: "Borde punteado del estado default" },
      { name: "gray-500", value: "#6b7280", usage: "Texto secundario y texto de formato" },
      { name: "gray-600", value: "#4b5563", usage: "Ícono de upload" },
      { name: "gray-700", value: "#374151", usage: "Texto principal" },
      { name: "green-500", value: "#22c55e", usage: "Ícono de confirmación" },
      { name: "red-50", value: "#fef2f2", usage: "Fondo del estado error" },
      { name: "red-300", value: "#fca5a5", usage: "Borde del estado error" },
      { name: "red-500", value: "#ef4444", usage: "Ícono y texto secundario de error" },
      { name: "red-600", value: "#dc2626", usage: "Texto principal de error" },
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
    ],
  }
import { useState } from "react";
import solicitudCardCode from "../../componentsUI/SolicitudCard.tsx?raw";
import solicitudCardTestCode from "../../tests/SolicitudCard.test.tsx?raw";
import { SolicitudCard } from "../../componentsUI/SolicitudCard";
import { SolicitudCardPlayground } from "../demos/SolicitudCardPlayground";
import type { ComponentEntry } from "./types";

function DefaultDemo() {
  return (
    <SolicitudCard
      id={1234}
      tipo="Bonificación Ley de Urgencia"
      estado={{ label: "Pendiente", variant: "estado-pendiente" }}
      fechaEnvio="15/03/2025"
    />
  );
}

function AprobadaDemo() {
  return (
    <SolicitudCard
      id={5678}
      tipo="Inscripción voluntaria"
      estado={{ label: "Aprobada", variant: "estado-aprobada" }}
      fechaEnvio="10/02/2025"
      fechaResolucion="20/02/2025"
    />
  );
}

function ResueltaDemo() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="space-y-2">
      <SolicitudCard
        id={9999}
        tipo="Cambio de tramo"
        estado={{ label: "Aprobada", variant: "estado-aprobada" }}
        fechaEnvio="01/01/2025"
        fechaResolucion="05/01/2025"
        resuelta
        onClickResuelta={() => setClicked(true)}
      />
      {clicked && <p className="text-xs text-gray-500">Click detectado</p>}
    </div>
  );
}

function CompactDemo() {
  return (
    <SolicitudCard
      id={4321}
      tipo="Solicitud de reembolso"
      estado={{ label: "En revisión", variant: "estado-revision" }}
      fechaEnvio="20/04/2025"
      forceCompact
    />
  );
}

function ConDocumentosDemo() {
  return (
    <SolicitudCard
      id={7777}
      tipo="Reclamo prestador"
      estado={{ label: "Rechazada", variant: "estado-rechazada" }}
      fechaEnvio="05/03/2025"
      fechaResolucion="15/03/2025"
      documentos={[
        { id: "1", nombre: "Certificado médico.pdf" },
        { id: "2", nombre: "Boleta de atención.pdf" },
      ]}
    />
  );
}

export const solicitudCardEntry: ComponentEntry = {
  name: "solicitud-card",
  group: "Otros",
  description:
    "Utiliza: badge. Tarjeta de solicitud con estado, fechas, documentos adjuntos y acordeón desplegable. Soporta vista compacta responsive.",
  code: solicitudCardCode,
  testCode: solicitudCardTestCode,
  dependencies: ["react-icons"],
  playground: () => <SolicitudCardPlayground />,
  propsInterface: `interface Documento {
  id: string;
  nombre: string;
  onVer?: () => void;
}

interface SolicitudCardProps {
  id: number | string;
  tipo: string;
  estado: {
    label: string;
    variant: BadgeVariant;
  };
  fechaEnvio?: string;
  fechaResolucion?: string;
  motivoResolucion?: string;
  documentoRespuesta?: { nombre: string; onVer?: () => void };
  documentos?: Documento[];
  resuelta?: boolean;
  onClickResuelta?: () => void;
  forceCompact?: boolean;
}`,
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "ID de solicitud y links de documentos" },
    { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo del badge de ID" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes de la tarjeta" },
    { name: "Bordes (dividers)", value: "#d1d5db", usage: "Borde tarjeta resuelta" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto del tipo de solicitud" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Texto de fechas" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Fondo sección documentos" },
  ],
  variants: [
    {
      label: "Pendiente",
      props: {},
      render: () => <DefaultDemo />,
      usageCode: `<SolicitudCard
  id={1234}
  tipo="Bonificación Ley de Urgencia"
  estado={{ label: "Pendiente", variant: "estado-pendiente" }}
  fechaEnvio="15/03/2025"
/>`,
    },
    {
      label: "Aprobada",
      props: {},
      render: () => <AprobadaDemo />,
      usageCode: `<SolicitudCard
  id={5678}
  tipo="Inscripción voluntaria"
  estado={{ label: "Aprobada", variant: "estado-aprobada" }}
  fechaEnvio="10/02/2025"
  fechaResolucion="20/02/2025"
/>`,
    },
    {
      label: "Resuelta (con click)",
      props: { resuelta: true },
      render: () => <ResueltaDemo />,
      usageCode: `<SolicitudCard
  id={9999}
  tipo="Cambio de tramo"
  estado={{ label: "Aprobada", variant: "estado-aprobada" }}
  fechaEnvio="01/01/2025"
  fechaResolucion="05/01/2025"
  resuelta
  onClickResuelta={() => console.log("click")}
/>`,
    },
    {
      label: "Compacta (forceCompact)",
      props: { forceCompact: true },
      render: () => <CompactDemo />,
      usageCode: `<SolicitudCard
  id={4321}
  tipo="Solicitud de reembolso"
  estado={{ label: "En revisión", variant: "estado-revision" }}
  fechaEnvio="20/04/2025"
  forceCompact
/>`,
    },
    {
      label: "Con documentos",
      props: {},
      render: () => <ConDocumentosDemo />,
      usageCode: `<SolicitudCard
  id={7777}
  tipo="Reclamo prestador"
  estado={{ label: "Rechazada", variant: "estado-rechazada" }}
  fechaEnvio="05/03/2025"
  fechaResolucion="15/03/2025"
  documentos={[
    { id: "1", nombre: "Certificado médico.pdf" },
    { id: "2", nombre: "Boleta de atención.pdf" },
  ]}
/>`,
    },
  ],
};

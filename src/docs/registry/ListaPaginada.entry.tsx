
import listaPaginadaCode from "../../componentsUI/ListaPaginada.tsx?raw"
import { ListaPaginada } from "../../componentsUI/ListaPaginada";
import { SkeletonSolicitudCard, SkeletonSolicitudesList } from "../../componentsUI/SkeletonSolicitud";
import { SolicitudCard } from "../../componentsUI/SolicitudCard";
import type { ComponentEntry } from "./types";

export const listaPaginadaEntry: ComponentEntry =   {
    name: "Lista de Solicitudes",
    description:
      "Utiliza: Paginación, Badge, SkeletonSolicitud. Contenedor de lista de solicitudes con skeleton de carga, manejo de error, contador de resultados y paginación integrada.",
    code: listaPaginadaCode,
    dependencies: ["react-icons"],
    colors: [
      { name: "Azul Fonasa", value: "#0572CE", usage: "ID de solicitud, enlaces 'Ver', acordeón de documentos" },
      { name: "white", value: "#ffffff", usage: "Fondo del header de la card" },
      { name: "blue-50", value: "#eff6ff", usage: "Fondo del badge de ID y hover del acordeón" },
      { name: "gray-50", value: "#f9fafb", usage: "Fondo de la sección de fechas" },
      { name: "gray-100", value: "#f3f4f6", usage: "Fondo de motivo de resolución y documento respuesta" },
      { name: "gray-200", value: "#e5e7eb", usage: "Bordes de la card y separadores" },
      { name: "gray-400", value: "#9ca3af", usage: "Texto del contador de resultados" },
      { name: "gray-700", value: "#374151", usage: "Texto del tipo de solicitud y documentos" },
      { name: "gray-800", value: "#1f2937", usage: "Título de la lista y texto de documento respuesta" },
      { name: "red-500", value: "#ef4444", usage: "Borde y fondo del mensaje de error" },
      { name: "red-900", value: "#7f1d1d", usage: "Texto del mensaje de error" },
    ],
    propsInterface: `interface ListaPaginadaProps {
  titulo?: string;
  isLoading: boolean;
  error?: string | null;
  totalItems?: number;
  itemLabel?: string;
  paginaActual: number;
  totalPaginas: number;
  itemsPorPagina?: number;
  onCambiarPagina: (pagina: number) => void;
  children: ReactNode;
}`,
    variants: [
      {
        label: "Cargando (skeleton)",
        props: { isLoading: true },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={true}
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={true} ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Con error",
        props: { error: "Error del servidor" },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={false}
            error="Error del servidor"
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={false} error="Error del servidor" ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Skeleton - Card individual",
        props: {},
        render: () => <SkeletonSolicitudCard />,
        usageCode: `<SkeletonSolicitudCard />`,
      },
      {
        label: "Skeleton - Lista (3 cards)",
        props: { count: 3 },
        render: () => <SkeletonSolicitudesList count={3} />,
        usageCode: `<SkeletonSolicitudesList count={3} />`,
      },
      {
        label: "SolicitudCard - Ejemplo completo",
        props: {},
        render: () => (
          <SolicitudCard
            id={1234}
            tipo="Solicitud de Inscripción"
            estado={{ label: "Visación", variant: "estado-revision" }}
            fechaEnvio="15/06/2026"
            fechaResolucion="—"
            documentos={[
              { id: "1", nombre: "Certificado de título" },
              { id: "2", nombre: "Cédula de identidad" },
            ]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={1234}\n  tipo="Solicitud de Inscripción"\n  estado={{ label: "Visación", variant: "estado-revision" }}\n  fechaEnvio="15/06/2026"\n  documentos={[{ id: "1", nombre: "Certificado" }]}\n/>`,
      },
      {
        label: "SolicitudCard - Aprobada con resolución",
        props: {},
        render: () => (
          <SolicitudCard
            id={5678}
            tipo="Solicitud de Actualización"
            estado={{ label: "Aceptado", variant: "estado-aprobada" }}
            fechaEnvio="01/03/2026"
            fechaResolucion="10/03/2026"
            motivoResolucion="Documentación completa y verificada."
            documentoRespuesta={{ nombre: "Resolución aprobatoria" }}
            documentos={[{ id: "1", nombre: "Formulario actualización" }]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={5678}\n  tipo="Solicitud de Actualización"\n  estado={{ label: "Aceptado", variant: "estado-aprobada" }}\n  fechaEnvio="01/03/2026"\n  fechaResolucion="10/03/2026"\n  motivoResolucion="Documentación completa."\n  documentoRespuesta={{ nombre: "Resolución" }}\n  documentos={[...]}\n/>`,
      },
      {
        label: "SolicitudCard - Rechazada",
        props: {},
        render: () => (
          <SolicitudCard
            id={9012}
            tipo="Solicitud de Renuncia"
            estado={{ label: "Rechazado", variant: "estado-rechazada" }}
            fechaEnvio="20/05/2026"
            fechaResolucion="25/05/2026"
            motivoResolucion="Falta documento de respaldo."
            documentos={[{ id: "1", nombre: "Carta de renuncia" }]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={9012}\n  tipo="Solicitud de Renuncia"\n  estado={{ label: "Rechazado", variant: "estado-rechazada" }}\n  motivoResolucion="Falta documento."\n  documentos={[...]}\n/>`,
      },
    ],
  }
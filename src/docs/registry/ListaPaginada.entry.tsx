
import { useCallback, useRef, useState } from "react";
import listaPaginadaCode from "../../componentsUI/ListaPaginada.tsx?raw";
import listaPaginadaTestCode from "../../tests/ListaPaginada.test.tsx?raw";
import { ListaPaginada } from "../../componentsUI/ListaPaginada";
import { SolicitudCard } from "../../componentsUI/SolicitudCard";
import type { ComponentEntry } from "./types";

function SolicitudCardResizeWrapper({ children }: { children: (forceCompact: boolean) => React.ReactNode }) {
  const [forceCompact, setForceCompact] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 400;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(200, startWidth + delta);
      setWidth(newWidth);
      setForceCompact(newWidth < 350);
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="relative flex">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children(forceCompact)}
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-2 cursor-col-resize flex items-center justify-center shrink-0 group"
        title="Arrastrar para redimensionar"
      >
        <div className="w-1 h-10 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
      </div>
    </div>
  );
}

function SolicitudCardResizeDemo() {
  return (
    <SolicitudCardResizeWrapper>
      {(compact) => (
        <SolicitudCard
          id={1234}
          tipo="Solicitud de Inscripción Prestador"
          estado={{ label: "Aceptado", variant: "estado-aprobada" }}
          fechaEnvio="15/06/2026"
          fechaResolucion="20/06/2026"
          motivoResolucion="Documentación completa y verificada correctamente."
          documentoRespuesta={{ nombre: "Resolución aprobatoria" }}
          documentos={[
            { id: "1", nombre: "Certificado de título" },
            { id: "2", nombre: "Cédula de identidad" },
          ]}
          forceCompact={compact}
        />
      )}
    </SolicitudCardResizeWrapper>
  );
}

export const listaPaginadaEntry: ComponentEntry =   {
    name: "lista-paginada",
    group: "Otros",
    description:
      "Utiliza: paginacion, badge, skeleton-solicitud. Contenedor de lista de solicitudes con skeleton de carga, manejo de error, contador de resultados y paginación integrada.",
    code: listaPaginadaCode,
    testCode: listaPaginadaTestCode,
    dependencies: ["react-icons"],
    colors: [
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "ID de solicitud, enlaces 'Ver', acordeón de documentos" },
      { name: "Blanco", value: "#ffffff", usage: "Fondo del header de la card" },
      { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo del badge de ID y hover del acordeón" },
      { name: "Fondo (sutil)", value: "#f9fafb", usage: "Fondo de la sección de fechas" },
      { name: "Fondo (cards)", value: "#f3f4f6", usage: "Fondo de motivo de resolución y documento respuesta" },
      { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes de la card y separadores" },
      { name: "Texto (placeholder)", value: "#9ca3af", usage: "Texto del contador de resultados" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Texto del tipo de solicitud y documentos" },
      { name: "Fondos (dark)", value: "#1f2937", usage: "Título de la lista y texto de documento respuesta" },
      { name: "Bordes error, íconos", value: "#ef4444", usage: "Borde y fondo del mensaje de error" },
      { name: "Texto (QA)", value: "#7f1d1d", usage: "Texto del mensaje de error" },
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
      {
        label: "SolicitudCard - Responsive (resize)",
        props: {},
        render: () => <SolicitudCardResizeDemo />,
        usageCode: `{/* En mobile: textos más pequeños, motivo en modal */}\n<SolicitudCard\n  id={1234}\n  tipo="Solicitud de Inscripción"\n  estado={{ label: "Aceptado", variant: "estado-aprobada" }}\n  fechaEnvio="15/06/2026"\n  motivoResolucion="Documentación completa."\n  documentos={[...]}\n/>`,
      },
    ],
  }
import { useState } from "react";
import { FiChevronDown, FiExternalLink, FiFileText } from "react-icons/fi";
import { Badge, type BadgeVariant } from "./Badge";

interface Documento {
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
}

export const SolicitudCard = ({
  id,
  tipo,
  estado,
  fechaEnvio,
  fechaResolucion,
  motivoResolucion,
  documentoRespuesta,
  documentos = [],
}: SolicitudCardProps) => {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-semibold text-[#0572CE] bg-blue-50 rounded-md px-2 py-1 shrink-0">
            #{id}
          </span>
          <span className="text-sm font-medium text-gray-700 truncate">
            {tipo}
          </span>
        </div>
        <Badge
          variant={estado.variant}
          text={estado.label}
          customClass="shrink-0 ml-3"
        />
      </div>

      {/* Fechas */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 px-4 py-2 bg-gray-50 border-t border-gray-100 text-gray-500">
        <span className="text-sm">
          <span className="font-medium text-gray-600 text-sm">Envío: </span>
          {fechaEnvio ?? "—"}
        </span>
        <span className="text-sm">
          <span className="font-medium text-gray-600 text-sm">
            Resolución:{" "}
          </span>
          {fechaResolucion ?? "—"}
        </span>
      </div>

      {/* Acordeón de documentos */}
      {documentos.length > 0 && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setDocsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-[#0572CE] hover:bg-blue-50/40 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <FiFileText size={13} />
              {documentos.length} documento
              {documentos.length !== 1 ? "s" : ""}
            </span>
            <FiChevronDown
              size={14}
              className={`transition-transform duration-200 ${docsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {docsOpen && (
            <div className="pb-3 flex flex-col gap-1.5">
              {/* Motivo de resolución */}
              {motivoResolucion && (
                <div className="flex flex-col text-xs px-4 py-1.5 bg-gray-100 border-b border-gray-200">
                  <span className="font-bold text-sm text-gray-700">
                    Motivo de resolución
                  </span>
                  <span className="text-sm text-gray-600 mt-0.5">
                    {motivoResolucion}
                  </span>
                </div>
              )}

              {/* Documento de respuesta */}
              {documentoRespuesta && (
                <div className="flex items-center justify-between text-xs px-4 py-2 bg-gray-100">
                  <span className="truncate text-sm font-bold uppercase">
                    {documentoRespuesta.nombre}
                  </span>
                  <button
                    type="button"
                    onClick={documentoRespuesta.onVer}
                    className="flex items-center text-sm gap-1 text-[#0572CE] hover:underline shrink-0 ml-3 cursor-pointer"
                  >
                    Ver <FiExternalLink size={11} />
                  </button>
                </div>
              )}

              {/* Documentos */}
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between text-xs px-4 py-1 hover:bg-gray-50"
                >
                  <span className="truncate text-sm">{doc.nombre}</span>
                  <button
                    type="button"
                    onClick={doc.onVer}
                    className="flex items-center text-sm gap-1 text-[#0572CE] hover:underline shrink-0 ml-3 cursor-pointer"
                  >
                    Ver <FiExternalLink size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

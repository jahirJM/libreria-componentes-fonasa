import { useState } from "react";
import { createPortal } from "react-dom";
import { FiAlertCircle, FiChevronDown, FiExternalLink, FiFileText, FiInfo } from "react-icons/fi";
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
  /** Si true, muestra animación de solicitud resuelta */
  resuelta?: boolean;
  onClickResuelta?: () => void;
  /** Si true, fuerza vista compacta (badge como punto, textos chicos, motivo en modal) */
  forceCompact?: boolean;
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
  resuelta = false,
  onClickResuelta,
  forceCompact = false,
}: SolicitudCardProps) => {
  const [docsOpen, setDocsOpen] = useState(false);
  const [motivoModalOpen, setMotivoModalOpen] = useState(false);

  const handleClickCard = () => {
    if (resuelta && onClickResuelta) {
      onClickResuelta();
    }
  };

  return (
    <div
      onClick={handleClickCard}
      className={`border rounded-xl transition-all hover:shadow-md ${
        resuelta
          ? "border-gray-300 shadow-lg shadow-gray-300/50 cursor-pointer"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          {resuelta && (
            <span className="flex items-center text-gray-600">
              <FiAlertCircle size={18} />
            </span>
          )}
          <span className="text-xs md:text-base font-semibold text-[#0572CE] bg-blue-50 rounded-md px-2 py-1 shrink-0">
            #{id}
          </span>
          <span className="text-xs md:text-base font-medium text-gray-700 truncate">
            {tipo}
          </span>
        </div>
        {/* Badge: punto en compact, completo en normal */}
        {forceCompact ? (
          <Badge
            variant={estado.variant}
            text={estado.label}
            customClass="shrink-0 ml-3"
            compactOnMobile={false}
            forceCollapsed
          />
        ) : (
          <Badge
            variant={estado.variant}
            text={estado.label}
            customClass="shrink-0 ml-3"
            compactOnMobile
          />
        )}
      </div>

      {/* Fechas */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 px-4 py-2 bg-gray-50 border-t border-gray-100 text-gray-500">
        <span className="text-xs md:text-sm">
          <span className="font-medium text-gray-600 text-xs md:text-sm">Envío: </span>
          {fechaEnvio ?? "—"}
        </span>
        <span className="text-xs md:text-sm">
          <span className="font-medium text-gray-600 text-xs md:text-sm">Resolución: </span>
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
            <span className="flex items-center gap-1.5 text-xs md:text-sm">
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
                <>
                  {/* Mobile: botón que abre modal */}
                  <button
                    type="button"
                    onClick={() => setMotivoModalOpen(true)}
                    className="md:hidden flex items-center gap-2 text-gray-700 px-4 py-2 bg-gray-100 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <FiInfo size={14} className="text-gray-500 shrink-0" />
                    <span className="font-bold text-xs text-gray-700">
                      Motivo de resolución
                    </span>
                  </button>

                  {/* Modal mobile motivo */}
                  {motivoModalOpen &&
                    createPortal(
                      <div
                        className="md:hidden fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 p-4"
                        onClick={() => setMotivoModalOpen(false)}
                      >
                        <div
                          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700">
                              Motivo de resolución
                            </h3>
                            <button
                              onClick={() => setMotivoModalOpen(false)}
                              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                              type="button"
                              aria-label="Cerrar"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              {motivoResolucion}
                            </p>
                          </div>
                          <div className="p-4 border-t border-gray-100">
                            <button
                              onClick={() => setMotivoModalOpen(false)}
                              className="w-full py-2 bg-[#0572CE] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                              type="button"
                            >
                              Aceptar
                            </button>
                          </div>
                        </div>
                      </div>,
                      document.body,
                    )}

                  {/* Desktop: inline */}
                  <div className="hidden md:flex flex-col text-gray-700 px-4 py-1.5 bg-gray-100 border-b border-gray-200">
                    <span className="font-bold text-xs md:text-sm text-gray-700">
                      Motivo de resolución
                    </span>
                    <span className="text-xs md:text-sm text-gray-600 mt-0.5">
                      {motivoResolucion}
                    </span>
                  </div>
                </>
              )}

              {/* Documento de respuesta */}
              {documentoRespuesta && (
                <div className="flex items-center justify-between text-xs px-4 py-2 bg-gray-100">
                  <span className="truncate text-xs md:text-sm font-bold uppercase text-gray-800">
                    {documentoRespuesta.nombre}
                  </span>
                  <button
                    type="button"
                    onClick={documentoRespuesta.onVer}
                    className="flex items-center text-sm gap-1 text-[#0572CE] hover:underline shrink-0 ml-3 cursor-pointer"
                  >
                    <FiExternalLink size={11} />
                  </button>
                </div>
              )}

              {/* Documentos */}
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between text-xs px-4 py-1 hover:bg-gray-50"
                >
                  <span className="truncate text-xs md:text-sm text-gray-700">
                    {doc.nombre}
                  </span>
                  <button
                    type="button"
                    onClick={doc.onVer}
                    className="flex items-center text-sm gap-1 text-[#0572CE] hover:underline shrink-0 ml-3 cursor-pointer"
                  >
                    <FiExternalLink size={11} />
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

import { type ReactNode } from "react";
import { Paginacion } from "./Paginacion";
import { SkeletonSolicitudesList } from "./SkeletonSolicitud";

interface ListaPaginadaProps {
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
}

/**
 * Contenedor de lista paginada con skeleton de carga, manejo de error,
 * contador de resultados y paginación integrada.
 *
 * Usa SkeletonSolicitudesList como loader y Paginacion como navegador.
 */
export const ListaPaginada = ({
  titulo = "Lista de solicitudes",
  isLoading,
  error,
  totalItems = 0,
  itemLabel = "solicitud",
  paginaActual,
  totalPaginas,
  itemsPorPagina = 3,
  onCambiarPagina,
  children,
}: ListaPaginadaProps) => {
  const plural = totalItems !== 1;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl p-6">
      <section>
        <h2 className="mb-4 font-semibold text-gray-800">{titulo}</h2>

        {/* Loading skeleton */}
        {isLoading && <SkeletonSolicitudesList count={itemsPorPagina} />}

        {/* Error */}
        {!isLoading && error && (
          <div className="w-full flex items-center gap-3 bg-red-500/10 text-red-900 border border-red-500 rounded-xl px-3 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Contenido */}
        {!isLoading && !error && (
          <>
            <p className="text-xs text-gray-400 mb-3">
              {totalItems} {itemLabel}
              {plural ? "es" : ""} encontrada{plural ? "s" : ""}
            </p>
            <div className="flex flex-col gap-3">
              {children}
              <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={onCambiarPagina}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

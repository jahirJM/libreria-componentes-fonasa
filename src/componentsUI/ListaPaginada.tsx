import { type ReactNode } from "react";
import { Paginacion } from "./Paginacion";
import { SkeletonSolicitudesList } from "./SkeletonSolicitud";

interface ListaPaginadaProps {
  /** Título de la sección. @default "Lista de solicitudes" */
  titulo?: string;
  /** Si true, muestra skeleton de carga. */
  isLoading: boolean;
  /** Mensaje de error a mostrar. Si es null/undefined, no hay error. */
  error?: string | null;
  /** Total de resultados encontrados (se muestra como contador). @default 0 */
  totalItems?: number;
  /** Nombre del ítem para el texto "X {itemLabel}(es) encontrada(s)". @default "solicitud" */
  itemLabel?: string;
  /** Página activa actual (1-indexed). */
  paginaActual: number;
  /** Total de páginas disponibles. */
  totalPaginas: number;
  /** Cantidad de skeletons a mostrar durante la carga. @default 3 */
  itemsPorPagina?: number;
  /** Callback al cambiar de página. */
  onCambiarPagina: (pagina: number) => void;
  /** Contenido (lista de items/cards). */
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

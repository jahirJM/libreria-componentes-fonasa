/**
 * Skeleton loader que replica la estructura del componente InputCalendario.
 */

interface SkeletonInputCalendarioProps {
  /** Tipo de selección simulada */
  tipo?: "fecha" | "rango";
}

export function SkeletonInputCalendario({ tipo = "rango" }: SkeletonInputCalendarioProps) {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-3 bg-white">
        {/* Ícono calendario */}
        <div className="w-4 h-4 bg-gray-200 rounded shrink-0" />

        {/* Campo inicio */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="h-2 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>

        {/* Separador y campo fin (solo rango) */}
        {tipo === "rango" && (
          <>
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="h-2 bg-gray-200 rounded w-14" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </>
        )}

        {/* Chevron */}
        <div className="w-4 h-4 bg-gray-200 rounded shrink-0" />
      </div>
    </div>
  );
}

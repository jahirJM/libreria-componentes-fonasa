/**
 * Skeleton loader que replica la estructura del componente ListaPaginada.
 * Muestra el contenedor con título, cards placeholder y paginación.
 */

interface SkeletonListaPaginadaProps {
  /** Cantidad de items/cards a simular */
  itemCount?: number;
}

export function SkeletonListaPaginada({ itemCount = 3 }: SkeletonListaPaginadaProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl p-6 animate-pulse">
      {/* Título */}
      <div className="h-5 bg-gray-200 rounded w-48 mb-4" />

      {/* Contador de resultados */}
      <div className="h-3 bg-gray-200 rounded w-36 mb-3" />

      {/* Cards skeleton */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <div className="flex items-center gap-3">
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
            {/* Fechas */}
            <div className="flex gap-x-6 px-4 py-2 bg-gray-50 border-t border-gray-100">
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
          </div>
        ))}

        {/* Paginación */}
        <div className="flex items-center justify-center gap-1 mt-4">
          <div className="h-8 w-8 bg-gray-200 rounded-md" />
          <div className="h-8 w-8 bg-gray-200 rounded-md" />
          <div className="h-8 w-8 bg-gray-200 rounded-md" />
          <div className="h-8 w-8 bg-gray-200 rounded-md" />
          <div className="h-8 w-8 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}

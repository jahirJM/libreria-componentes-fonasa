/**
 * Skeleton loader que replica la estructura de SolicitudCard.
 * Se muestra mientras se cargan las solicitudes (paginación, carga inicial, etc.)
 */
export function SkeletonSolicitudCard() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>

      {/* Fechas */}
      <div className="flex gap-x-6 px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-36 bg-gray-200 rounded"></div>
      </div>

      {/* Documentos placeholder */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

interface SkeletonSolicitudesListProps {
  count?: number;
}

/**
 * Muestra N skeletons de solicitud para simular la carga de una página.
 */
export function SkeletonSolicitudesList({
  count = 3,
}: SkeletonSolicitudesListProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonSolicitudCard key={i} />
      ))}
    </div>
  );
}

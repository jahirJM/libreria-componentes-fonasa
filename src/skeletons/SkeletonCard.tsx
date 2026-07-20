/**
 * Skeleton loader que replica la estructura del componente Card.
 * Incluye header, contenido y footer opcionales.
 */

interface SkeletonCardProps {
  /** Muestra skeleton de header */
  showHeader?: boolean;
  /** Muestra skeleton de footer */
  showFooter?: boolean;
  /** Cantidad de líneas de contenido */
  contentLines?: number;
}

export function SkeletonCard({
  showHeader = true,
  showFooter = false,
  contentLines = 3,
}: SkeletonCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-2xl animate-pulse">
      {/* Header */}
      {showHeader && (
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg shrink-0" />
        </div>
      )}

      {/* Contenido */}
      <div className="space-y-2">
        {Array.from({ length: contentLines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200 rounded"
            style={{ width: `${85 - i * 10}%` }}
          />
        ))}
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded-2xl" />
          <div className="h-8 w-24 bg-gray-200 rounded-2xl" />
        </div>
      )}
    </div>
  );
}

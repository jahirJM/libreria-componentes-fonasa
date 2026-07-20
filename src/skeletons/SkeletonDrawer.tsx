/**
 * Skeleton loader que replica la estructura del componente Drawer.
 * Simula un panel lateral con header, contenido y footer.
 */

interface SkeletonDrawerProps {
  /** Cantidad de líneas de contenido */
  contentLines?: number;
  /** Muestra skeleton de footer */
  showFooter?: boolean;
}

export function SkeletonDrawer({ contentLines = 5, showFooter = true }: SkeletonDrawerProps) {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-4 py-3 border-b border-gray-100">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="h-5 bg-gray-200 rounded w-2/5" />
          <div className="h-3 bg-gray-200 rounded w-3/5" />
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded shrink-0" />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-4 space-y-4">
        {Array.from({ length: contentLines }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${95 - i * 10}%` }}
          />
        ))}

        {/* Bloque tipo formulario */}
        <div className="space-y-3 mt-4">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-9 bg-gray-200 rounded-md w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-9 bg-gray-200 rounded-md w-full" />
        </div>
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100">
          <div className="h-9 w-24 bg-gray-200 rounded-2xl" />
          <div className="h-9 w-24 bg-gray-200 rounded-2xl" />
        </div>
      )}
    </div>
  );
}

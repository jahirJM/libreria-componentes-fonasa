/**
 * Skeleton loader que replica la estructura de los componentes Table, TablaBasica y TablaDatos.
 */

interface SkeletonTablaProps {
  /** Cantidad de columnas */
  columns?: number;
  /** Cantidad de filas */
  rows?: number;
  /** Muestra columna de acciones */
  showActions?: boolean;
}

export function SkeletonTabla({ columns = 4, rows = 5, showActions = false }: SkeletonTablaProps) {
  const totalCols = showActions ? columns + 1 : columns;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="bg-gray-300">
              {Array.from({ length: totalCols }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="h-3 bg-gray-400/50 rounded w-3/4" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-gray-100">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <div
                      className="h-3 bg-gray-200 rounded"
                      style={{ width: `${60 + ((colIdx + rowIdx) % 3) * 15}%` }}
                    />
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-7 w-7 bg-gray-200 rounded-2xl" />
                      <div className="h-7 w-7 bg-gray-200 rounded-2xl" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Skeleton loader que replica la estructura del componente Modal/CustomModal.
 * Útil para representar el contenido de un modal mientras se cargan datos.
 */

interface SkeletonModalProps {
  /** Tamaño del modal */
  size?: "sm" | "md" | "lg";
  /** Cantidad de líneas de contenido */
  contentLines?: number;
}

export function SkeletonModal({ size = "md", contentLines = 4 }: SkeletonModalProps) {
  const sizeClasses = {
    sm: "w-[568px]",
    md: "w-[600px]",
    lg: "w-[800px]",
  };

  return (
    <div className={`${sizeClasses[size]} max-w-full rounded-2xl bg-white p-7 shadow-xl animate-pulse`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-6 w-6 bg-gray-200 rounded-md" />
      </div>

      {/* Contenido */}
      <div className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${90 - i * 8}%` }}
          />
        ))}
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-4 mt-6">
        <div className="h-9 w-28 bg-gray-200 rounded-2xl" />
        <div className="h-9 w-28 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}

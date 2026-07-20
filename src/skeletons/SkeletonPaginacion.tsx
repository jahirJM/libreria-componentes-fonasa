/**
 * Skeleton loader que replica la estructura del componente Paginacion.
 */

interface SkeletonPaginacionProps {
  /** Cantidad de botones de página visibles */
  pages?: number;
}

export function SkeletonPaginacion({ pages = 5 }: SkeletonPaginacionProps) {
  return (
    <div className="flex items-center justify-center gap-1 mt-4 animate-pulse">
      {/* Botón anterior */}
      <div className="h-8 w-8 bg-gray-200 rounded-md" />

      {/* Páginas */}
      {Array.from({ length: pages }).map((_, i) => (
        <div key={i} className="h-8 w-8 bg-gray-200 rounded-md" />
      ))}

      {/* Botón siguiente */}
      <div className="h-8 w-8 bg-gray-200 rounded-md" />
    </div>
  );
}

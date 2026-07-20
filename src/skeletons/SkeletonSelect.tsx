/**
 * Skeleton loader que replica la estructura del componente Select/SelectBuscable.
 */

interface SkeletonSelectProps {
  /** Muestra skeleton de label arriba */
  showLabel?: boolean;
  /** Cantidad de selects a mostrar */
  count?: number;
}

export function SkeletonSelect({ showLabel = true, count = 1 }: SkeletonSelectProps) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          {showLabel && <div className="h-3 bg-gray-200 rounded w-20" />}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

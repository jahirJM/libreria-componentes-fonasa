/**
 * Skeleton loader que replica la estructura del componente ContadorEstadistica.
 */

interface SkeletonContadorEstadisticaProps {
  /** Cantidad de tarjetas a mostrar */
  count?: number;
}

export function SkeletonContadorEstadistica({ count = 1 }: SkeletonContadorEstadisticaProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 p-5 shadow-sm animate-pulse flex-1 min-w-[200px]"
        >
          {/* Ícono */}
          <div className="h-10 w-10 bg-gray-200 rounded-xl mb-3" />

          {/* Número grande */}
          <div className="h-9 bg-gray-200 rounded w-2/3 mb-2" />

          {/* Etiqueta */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />

          {/* Descripción */}
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

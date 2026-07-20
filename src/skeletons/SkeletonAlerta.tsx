/**
 * Skeleton loader que replica la estructura del componente Alerta.
 */
export function SkeletonAlerta() {
  return (
    <div className="w-full rounded-xl border border-gray-200 px-4 py-4 pr-10 flex gap-3 items-start animate-pulse">
      {/* Ícono */}
      <div className="h-5 w-5 bg-gray-200 rounded-full shrink-0 mt-0.5" />

      {/* Contenido */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
      </div>

      {/* Botón cerrar */}
      <div className="absolute top-2 right-2 h-6 w-6 bg-gray-200 rounded-lg" />
    </div>
  );
}

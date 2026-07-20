/**
 * Skeleton loader que replica la estructura del componente CalendarioRango.
 */

interface SkeletonCalendarioRangoProps {
  /** Modo de visualización */
  mode?: "single" | "double";
}

export function SkeletonCalendarioRango({ mode = "single" }: SkeletonCalendarioRangoProps) {
  const containerWidth = mode === "double" ? "w-[680px]" : "w-[340px]";

  const CalendarGrid = () => (
    <div className="flex-1 min-w-0">
      {/* Título del mes */}
      <div className="h-4 bg-gray-200 rounded w-28 mx-auto mb-3" />

      {/* Días de la semana */}
      <div className="grid grid-cols-7 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex justify-center">
            <div className="h-3 w-5 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Cuadrícula de días */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="flex justify-center">
            <div className="h-9 w-9 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${containerWidth} bg-white rounded-xl border border-gray-200 p-4 animate-pulse`}>
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded w-36" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
      </div>

      {/* Paneles de calendario */}
      <div className={mode === "double" ? "flex gap-6" : ""}>
        <CalendarGrid />
        {mode === "double" && (
          <>
            <div className="w-px bg-gray-200 self-stretch" />
            <CalendarGrid />
          </>
        )}
      </div>

      {/* Leyenda */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-3">
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-12" />
      </div>
    </div>
  );
}

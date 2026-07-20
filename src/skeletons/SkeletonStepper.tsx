/**
 * Skeleton loader que replica la estructura del componente Stepper.
 */

interface SkeletonStepperProps {
  /** Cantidad de pasos a mostrar */
  steps?: number;
}

export function SkeletonStepper({ steps = 4 }: SkeletonStepperProps) {
  return (
    <div className="p-5 animate-pulse">
      {/* Mobile: badge */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gray-100" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>

      {/* Desktop: stepper horizontal */}
      <div className="hidden md:flex items-start justify-between">
        {Array.from({ length: steps }).map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1 relative">
            {/* Línea */}
            {i < steps - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 z-0">
                <div className="w-full h-full bg-gray-200 rounded" />
              </div>
            )}

            {/* Círculo */}
            <div className="z-10 w-10 h-10 rounded-full bg-gray-200" />

            {/* Label */}
            <div className="mt-2 h-3 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

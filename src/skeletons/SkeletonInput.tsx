/**
 * Skeleton loader que replica la estructura del componente Input.
 * Puede simular inputs con label e ícono.
 */

interface SkeletonInputProps {
  /** Muestra skeleton de label arriba */
  showLabel?: boolean;
  /** Muestra placeholder de ícono a la izquierda */
  showLeftIcon?: boolean;
  /** Cantidad de inputs a mostrar */
  count?: number;
}

export function SkeletonInput({
  showLabel = true,
  showLeftIcon = false,
  count = 1,
}: SkeletonInputProps) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          {showLabel && <div className="h-3 bg-gray-200 rounded w-24" />}
          <div className="relative flex items-center">
            {showLeftIcon && (
              <div className="absolute left-3 h-4 w-4 bg-gray-200 rounded" />
            )}
            <div
              className={`w-full h-10 bg-gray-200 rounded-md ${
                showLeftIcon ? "pl-10" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

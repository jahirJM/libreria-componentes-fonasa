/**
 * Skeleton loader que replica la estructura de los botones.
 * Puede renderizar uno o varios botones placeholder.
 */

interface SkeletonBotonesProps {
  /** Cantidad de botones a mostrar */
  count?: number;
  /** Tamaño del botón skeleton */
  size?: "sm" | "md" | "lg";
}

export function SkeletonBotones({ count = 1, size = "md" }: SkeletonBotonesProps) {
  const sizeClasses = {
    sm: "h-7 w-20",
    md: "h-9 w-28",
    lg: "h-10 w-36",
  };

  return (
    <div className="flex items-center gap-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} bg-gray-200 rounded-2xl`}
        />
      ))}
    </div>
  );
}

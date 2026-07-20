/**
 * Skeleton loader que replica la estructura del componente Switch.
 */

interface SkeletonSwitchProps {
  /** Tamaño del switch */
  tamano?: "sm" | "md" | "lg";
  /** Muestra un label al lado */
  showLabel?: boolean;
}

export function SkeletonSwitch({ tamano = "md", showLabel = true }: SkeletonSwitchProps) {
  const sizeClasses = {
    sm: "w-8 h-[18px]",
    md: "w-11 h-6",
    lg: "w-14 h-[30px]",
  };

  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className={`${sizeClasses[tamano]} bg-gray-200 rounded-full`} />
      {showLabel && <div className="h-4 bg-gray-200 rounded w-20" />}
    </div>
  );
}

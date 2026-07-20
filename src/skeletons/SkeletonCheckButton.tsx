/**
 * Skeleton loader que replica la estructura del componente CheckButton.
 */

interface SkeletonCheckButtonProps {
  /** Cantidad de opciones a mostrar */
  count?: number;
  /** Simula radio buttons (círculos) o checkboxes (cuadrados) */
  variant?: "primary" | "secondary";
}

export function SkeletonCheckButton({ count = 3, variant = "primary" }: SkeletonCheckButtonProps) {
  return (
    <div className="flex flex-col gap-y-5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-row items-center gap-x-2">
          <div
            className={`w-5 h-5 bg-gray-200 ${
              variant === "secondary" ? "rounded-full" : "rounded"
            }`}
          />
          <div
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${60 + (i % 3) * 20}px` }}
          />
        </div>
      ))}
    </div>
  );
}

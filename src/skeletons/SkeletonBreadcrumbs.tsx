/**
 * Skeleton loader que replica la estructura del componente Breadcrumbs.
 */

interface SkeletonBreadcrumbsProps {
  /** Cantidad de items simulados */
  items?: number;
  /** Tamaño del skeleton. @default "md" */
  size?: "sm" | "md" | "lg";
}

const heightMap = { sm: "h-3", md: "h-4", lg: "h-5" };

export function SkeletonBreadcrumbs({ items = 3, size = "md" }: SkeletonBreadcrumbsProps) {
  const h = heightMap[size];

  return (
    <div className="flex items-center gap-2 animate-pulse">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <div className={`${h} w-3 bg-gray-200 rounded`} />}
          <div
            className={`${h} bg-gray-200 rounded`}
            style={{ width: i === items - 1 ? "5rem" : "3.5rem" }}
          />
        </div>
      ))}
    </div>
  );
}

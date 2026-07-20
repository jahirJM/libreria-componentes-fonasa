/**
 * Skeleton loader que replica la estructura del componente Sidebar.
 * Nota: El Sidebar ya tiene un skeleton interno (SidebarSkeleton),
 * pero este archivo permite usarlo de forma independiente.
 */

interface SkeletonSidebarProps {
  /** Cantidad de ítems del menú */
  menuItems?: number;
}

export function SkeletonSidebar({ menuItems = 5 }: SkeletonSidebarProps) {
  return (
    <div className="h-full px-3 py-4 animate-pulse">
      {/* Header skeleton */}
      <div className="my-5 text-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3" />
        <hr className="text-gray-300" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-3" />
        <div className="flex items-center justify-center mt-2 mb-3 gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>
        <hr className="text-gray-300" />
      </div>

      {/* Menu items skeleton */}
      <div className="space-y-3 px-3">
        {Array.from({ length: menuItems }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <div className="h-5 w-5 bg-gray-300 rounded" />
            <div
              className="h-4 bg-gray-300 rounded"
              style={{ width: `${60 + (i % 3) * 12}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

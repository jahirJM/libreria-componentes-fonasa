/**
 * Skeleton loader que replica la estructura del componente Acordeon.
 * Muestra N ítems de acordeón como placeholders animados.
 */

interface SkeletonAcordeonProps {
  /** Cantidad de ítems a renderizar */
  items?: number;
  /** Si true, muestra bordes (simula la variante bordered) */
  bordered?: boolean;
}

export function SkeletonAcordeon({ items = 3, bordered = false }: SkeletonAcordeonProps) {
  return (
    <div
      className={`w-full animate-pulse ${
        bordered ? "rounded-lg border border-gray-300 bg-white" : ""
      }`}
    >
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-5 py-4 ${
            i < items - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded flex-1" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

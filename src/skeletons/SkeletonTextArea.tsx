/**
 * Skeleton loader que replica la estructura del componente TextArea.
 */

interface SkeletonTextAreaProps {
  /** Muestra skeleton de label arriba */
  showLabel?: boolean;
  /** Altura del textarea en píxeles */
  height?: number;
}

export function SkeletonTextArea({ showLabel = true, height = 96 }: SkeletonTextAreaProps) {
  return (
    <div className="space-y-1.5 animate-pulse">
      {showLabel && <div className="h-3 bg-gray-200 rounded w-20" />}
      <div
        className="w-full bg-gray-200 rounded-xl"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

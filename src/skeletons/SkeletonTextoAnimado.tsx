/**
 * Skeleton loader que replica la estructura del componente TextoAnimado.
 */

interface SkeletonTextoAnimadoProps {
  /** Muestra skeleton de etiqueta */
  showLabel?: boolean;
  /** Variante visual */
  variante?: "normal" | "grande" | "moneda";
}

export function SkeletonTextoAnimado({
  showLabel = true,
  variante = "normal",
}: SkeletonTextoAnimadoProps) {
  const containerClass =
    variante === "normal"
      ? "rounded-xl border border-gray-200 bg-gray-50 p-4"
      : "rounded-xl border border-gray-200 bg-gray-50 p-5 text-center";

  const textHeight = variante === "normal" ? "h-5" : "h-8";
  const textWidth = variante === "moneda" ? "w-32" : "w-40";

  return (
    <div className={`${containerClass} animate-pulse`}>
      {showLabel && (
        <div className="h-2 bg-gray-200 rounded w-24 mb-2 mx-auto" />
      )}
      <div
        className={`${textHeight} bg-gray-200 rounded ${textWidth} ${
          variante !== "normal" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

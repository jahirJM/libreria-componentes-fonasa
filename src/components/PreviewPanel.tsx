import type { ComponentVariant } from "../registry";
import { CodePanel } from "./CodePanel";

interface PreviewPanelProps {
  variant: ComponentVariant;
}

export function PreviewPanel({ variant }: PreviewPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Label de la variante */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">
          {variant.label}
        </span>
      </div>

      {/* Preview en vivo */}
      <div className="bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-sm">{variant.render()}</div>
      </div>

      {/* Código de uso */}
      <CodePanel code={variant.usageCode} />
    </div>
  );
}

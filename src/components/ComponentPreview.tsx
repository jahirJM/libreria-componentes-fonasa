import type { ComponentEntry } from "../registry";
import { CodePanel } from "./CodePanel";
import { PreviewPanel } from "./PreviewPanel";

interface ComponentPreviewProps {
  entry: ComponentEntry;
}

export function ComponentPreview({ entry }: ComponentPreviewProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{entry.name}</h2>
      {entry.description && (
        <p className="text-gray-600 mb-6">{entry.description}</p>
      )}

      {/* Código fuente completo del componente */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Código fuente
        </h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <CodePanel code={entry.code} />
        </div>
      </div>

      {/* Variantes / Ejemplos */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Ejemplos
        </h3>
        <div className="space-y-8">
          {entry.variants.map((variant) => (
            <PreviewPanel key={variant.label} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}

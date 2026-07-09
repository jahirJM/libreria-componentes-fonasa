import type { ComponentEntry } from "../../registry";
import { CodePanel } from "./CodePanel";
import { PreviewPanel } from "./PreviewPanel";

interface ComponentPreviewProps {
  entry: ComponentEntry;
}

export function ComponentPreview({ entry }: ComponentPreviewProps) {
  return (
    <section>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Componentes
      </p>
      <h2 className="text-4xl font-bold text-white mb-2">{entry.name}</h2>
      {entry.description && (
        <p className="text-gray-400 mb-8">{entry.description}</p>
      )}

      {/* Código fuente completo del componente */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-white mb-3">
          Código fuente
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Copia este componente directamente en tu proyecto.
        </p>
        <div className="rounded-lg border border-gray-800 overflow-hidden">
          <CodePanel code={entry.code} />
        </div>
      </div>

      {/* Variantes / Ejemplos */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
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

import { useState } from "react";
import type { ComponentEntry } from "../../docs/registry/types";
import { CodePanel } from "./CodePanel";
import { PreviewPanel } from "./PreviewPanel";

interface ComponentPreviewProps {
  entry: ComponentEntry;
}

export function ComponentPreview({ entry }: ComponentPreviewProps) {
  const [copiedDeps, setCopiedDeps] = useState(false);

  const installCommand = entry.dependencies
    ? `npm install ${entry.dependencies.join(" ")}`
    : "";

  async function handleCopyDeps() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopiedDeps(true);
      setTimeout(() => setCopiedDeps(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <section>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
        Componentes
      </p>
      <h2 className="text-4xl font-bold text-white mb-2">{entry.name}</h2>
      {entry.description && (
        <p className="text-gray-400 mb-8">{entry.description}</p>
      )}

      {/* Dependencias externas */}
      {entry.dependencies && entry.dependencies.length > 0 && (
        <div className="mb-8 rounded-lg border border-yellow-700/50 bg-yellow-900/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="text-sm font-semibold text-yellow-300">
              Requiere dependencias externas
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {entry.dependencies.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-md bg-yellow-800/40 px-2.5 py-0.5 text-xs font-medium text-yellow-200 border border-yellow-700/50"
              >
                {dep}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-900 px-3 py-1.5 text-xs text-gray-300 font-mono">
              {installCommand}
            </code>
            <button
              onClick={handleCopyDeps}
              className="shrink-0 rounded border border-gray-600 bg-gray-800 px-2 py-1.5 text-xs text-gray-300 hover:bg-gray-700 transition-colors"
            >
              {copiedDeps ? <span className="text-green-400">✓ Copiado</span> : "Copiar"}
            </button>
          </div>
        </div>
      )}

      {/* Colores utilizados */}
      {entry.colors && entry.colors.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-3">
            Colores utilizados
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Paleta de colores que utiliza este componente.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {entry.colors.map((color) => (
              <div
                key={color.name + color.value}
                className="rounded-lg border border-gray-800 bg-gray-900 p-3 flex flex-col gap-2"
              >
                <div
                  className="h-8 w-full rounded-md border border-gray-700"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <p className="text-xs font-medium text-gray-200 truncate">
                    {color.name}
                  </p>
                  <p className="text-[10px] font-mono text-gray-500">
                    {color.value}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payload esperado (interface) */}
      {entry.propsInterface && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-3">
            Payload esperado
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Interface TypeScript que define las props del componente.
          </p>
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <CodePanel code={entry.propsInterface} language="typescript" />
          </div>
        </div>
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

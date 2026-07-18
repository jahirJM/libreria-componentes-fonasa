import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FiCode, FiCopy, FiX } from "react-icons/fi";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";
import { CodePanel } from "../projectComponents/CodePanel";
import { FonasaToaster, fonasaToast } from "../../componentsUI/Toast";
import type { MethodEntry } from "../../docs/methods-registry/types";

function MethodPreview({ entry }: { entry: MethodEntry }) {
  const [showCode, setShowCode] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "success">("idle");

  async function handleCopyUsage() {
    try {
      await navigator.clipboard.writeText(entry.usageCode);
      fonasaToast.success("Código copiado");
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <section className="flex gap-0 overflow-hidden">
      <FonasaToaster />

      {/* Columna izquierda: contenido */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ${showCode ? "pr-4" : "pr-0"}`}>
        {/* Header */}
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          Métodos
        </p>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{entry.name}</h2>
        <p className="text-gray-500 mb-6">{entry.description}</p>

        {/* Grupo badge */}
        {entry.group && (
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
              {entry.group}
            </span>
          </div>
        )}

        {/* Firma */}
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Firma
          </p>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <CodePanel code={entry.signature} language="typescript" />
          </div>
        </div>

        {/* Demo interactiva */}
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Demo interactiva
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {entry.demo()}
          </div>
        </div>

        {/* Ejemplo de uso */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ejemplo de uso
            </p>
            <button
              onClick={handleCopyUsage}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-gray-500 hover:text-[#0572CE] hover:bg-gray-100 transition-colors"
            >
              {copyState === "success" ? (
                <span className="text-green-600 font-medium">✓ Copiado</span>
              ) : (
                <>
                  <FiCopy className="size-3.5" />
                  Copiar
                </>
              )}
            </button>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <CodePanel code={entry.usageCode} language="typescript" />
          </div>
        </div>
      </div>

      {/* Columna derecha: código fuente colapsable */}
      <div
        className={`sticky top-0 self-start transition-all duration-300 overflow-hidden shrink-0 ${
          showCode ? "w-[40%] rounded-lg border border-gray-200" : "w-auto"
        }`}
      >
        {!showCode ? (
          <button
            onClick={() => setShowCode(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-2 transition-colors cursor-pointer"
            title="Ver código fuente"
          >
            <FiCode className="size-4 text-gray-500" />
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Código fuente
            </span>
          </button>
        ) : (
          <div className="flex flex-col h-[calc(100vh-6rem)]">
            {/* Header del panel */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2.5 shrink-0">
              <span className="text-xs font-medium text-gray-600">
                Código fuente
              </span>
              <button
                onClick={() => setShowCode(false)}
                className="rounded-md p-1 text-gray-400 hover:text-gray-800 hover:bg-gray-200 transition-colors"
                title="Cerrar"
              >
                <FiX className="size-4" />
              </button>
            </div>
            {/* Code scrollable */}
            <div className="overflow-y-auto flex-1">
              <CodePanel code={entry.code} language="typescript" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function MethodPage() {
  const { name } = useParams<{ name: string }>();
  const entry = methodsRegistry.find(
    (e) => slugify(e.name) === name?.toLowerCase()
  );

  if (!entry) {
    return <Navigate to="/methods" replace />;
  }

  return <MethodPreview entry={entry} />;
}

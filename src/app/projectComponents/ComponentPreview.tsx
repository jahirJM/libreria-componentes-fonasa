import { useState } from "react";
import { Link } from "react-router-dom";
import type { ComponentEntry, ComponentVariant } from "../../docs/registry/types";
import { CodePanel } from "./CodePanel";
import { FiCode, FiCopy, FiX } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { FonasaToaster, fonasaToast } from "../../componentsUI/Toast";

interface ComponentPreviewProps {
  entry: ComponentEntry;
}

function ColorPill({ color }: { color: { name: string; value: string; usage: string } }) {
  function handleCopy() {
    navigator.clipboard.writeText(color.value);
    fonasaToast.success(`Color ${color.value} copiado`);
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 hover:border-[#0572CE] transition-colors cursor-pointer text-left"
    >
      <div
        className="size-5 rounded-md border border-gray-200 shrink-0"
        style={{ backgroundColor: color.value }}
      />
      <div className="flex flex-col">
        <span className="text-[11px] font-medium text-gray-700 leading-tight">
          {color.name}
        </span>
        <span className="text-[10px] font-mono text-gray-500 leading-tight">
          {color.value}
        </span>
      </div>
    </button>
  );
}

function VariantCodeModal({
  variant,
  onClose,
}: {
  variant: ComponentVariant;
  onClose: () => void;
}) {
  /** Formatea JSX de una línea a multilínea con props indentadas */
  function formatCode(code: string): string {
    if (code.includes("\n")) return code;
    const match = code.match(/^(<\w+)\s+(.*?)\s*(\/?>)(.*)$/s);
    if (!match) return code;
    const [, tag, propsStr, closing, rest] = match;
    const props: string[] = [];
    let current = "";
    let depth = 0;
    let inString: string | null = null;
    for (const ch of propsStr) {
      if (inString) {
        current += ch;
        if (ch === inString) inString = null;
      } else if (ch === '"' || ch === "'" || ch === "`") {
        current += ch;
        inString = ch;
      } else if (ch === "{") {
        depth++;
        current += ch;
      } else if (ch === "}") {
        depth--;
        current += ch;
      } else if (ch === " " && depth === 0 && current.trim()) {
        props.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) props.push(current.trim());
    if (props.length <= 1) return code;
    const indented = props.map((p) => `  ${p}`).join("\n");
    return `${tag}\n${indented}\n${closing}${rest}`;
  }

  const formattedCode = formatCode(variant.usageCode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <span className="text-sm font-semibold text-gray-700">
            Código — {variant.label}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FiX className="size-4" />
          </button>
        </div>
        {/* Code - vertical scroll */}
        <div className="max-h-[60vh] overflow-y-auto">
          <CodePanel code={formattedCode} />
        </div>
      </div>
    </div>
  );
}

function VariantCard({ variant }: { variant: ComponentVariant }) {
  const [showModal, setShowModal] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "success">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(variant.usageCode);
      fonasaToast.success("Código copiado");
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex flex-col h-full">
        {/* Preview */}
        <div className="bg-white p-4 flex items-center justify-center flex-1 min-h-[120px] overflow-hidden">
          <div className={variant.responsive ? "w-full relative h-[580px]" : "w-full"}>
            {variant.render()}
          </div>
        </div>
        {/* Footer con label + acciones */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2.5 bg-gray-100">
          <span className="text-xs font-medium text-gray-600 truncate">
            {variant.label}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-md p-1.5 text-gray-400 hover:text-[#0572CE] hover:bg-gray-200 transition-colors"
              title="Ver código"
            >
              <FiCode className="size-4" />
            </button>
            <button
              onClick={handleCopy}
              className="rounded-md p-1.5 text-gray-400 hover:text-[#0572CE] hover:bg-gray-200 transition-colors"
              title="Copiar código"
            >
              {copyState === "success" ? (
                <span className="text-green-600 text-xs font-medium">✓</span>
              ) : (
                <FiCopy className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <VariantCodeModal
          variant={variant}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export function ComponentPreview({ entry }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="flex gap-0 overflow-hidden">
      <FonasaToaster />
      {/* Columna izquierda: todo el contenido */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ${showCode ? "pr-4" : "pr-0"}`}>
        {/* Breadcrumb: Inicio */}
        <Link
          to="/components"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
          title="Volver al inicio"
        >
          <IoMdHome className="size-4" />
          <span className="font-medium">Inicio</span>
        </Link>

        <h2 className="text-4xl font-bold text-gray-800 mb-2">{entry.name}</h2>
        {entry.description && (
          <p className="text-gray-500 mb-3">{entry.description}</p>
        )}

        {/* Dependencias como pills */}
        {entry.dependencies && entry.dependencies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
              Requiere:
            </span>
            {entry.dependencies.map((dep) => (
              <Link
                key={dep}
                to={`/docs#dep-${dep}`}
                className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition-colors"
              >
                {dep}
              </Link>
            ))}
          </div>
        )}

        {/* Metadata: colores + interface en fila */}
        {(entry.colors?.length || entry.propsInterface) && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Colores — grid 3 cols, con sombra */}
            {entry.colors && entry.colors.length > 0 && (
              <div className="lg:w-1/2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Colores
                </p>
                <div className="grid grid-cols-3 gap-2 h-[300px] overflow-y-auto p-3 rounded-lg shadow-md border border-gray-100 content-start">
                  {entry.colors.map((color) => (
                    <ColorPill key={color.name + color.value} color={color} />
                  ))}
                </div>
              </div>
            )}

            {/* Interface — misma altura max */}
            {entry.propsInterface && (
              <div className="lg:w-1/2 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Interface
                </p>
                <div className="rounded-lg border border-gray-100 shadow-md overflow-hidden h-[300px] overflow-y-auto bg-gray-50">
                  <CodePanel code={entry.propsInterface} language="typescript" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ejemplos */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ejemplos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entry.variants.map((variant) => (
              <div
                key={variant.label}
                className={variant.responsive ? "col-span-1 sm:col-span-2" : ""}
              >
                <VariantCard variant={variant} />
              </div>
            ))}
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
              <CodePanel code={entry.code} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

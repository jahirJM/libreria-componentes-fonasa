import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import {
  EditorMarkdown,
  type EditorMarkdownMode,
} from "../../componentsUI/EditorMarkdown";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

const MODES: EditorMarkdownMode[] = ["editor", "view"];

export function EditorMarkdownPlayground() {
  const [mode, setMode] = useState<EditorMarkdownMode>("editor");
  const [placeholder, setPlaceholder] = useState("Escribe con Markdown...");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [minRows, setMinRows] = useState(4);
  const [value, setValue] = useState(
    "# Hola\n\nEscribe en **Markdown** y usa la barra de herramientas.",
  );
  const [copied, setCopied] = useState(false);

  const generatedCode =
    mode === "view"
      ? `<EditorMarkdown mode="view" value={contenido} />`
      : `const [contenido, setContenido] = useState("");

<EditorMarkdown
  value={contenido}
  onChange={setContenido}
  placeholder="${placeholder}"${minRows !== 4 ? `\n  minRows={${minRows}}` : ""}${error ? "\n  error" : ""}${disabled ? "\n  disabled" : ""}
/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silently fail */
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Panel izquierdo: controles */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Mode */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Modo
          </p>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as EditorMarkdownMode)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
          >
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Placeholder */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Placeholder
          </p>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            disabled={mode === "view"}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] disabled:bg-gray-100 disabled:opacity-60"
            placeholder="Texto del placeholder..."
          />
        </div>

        {/* minRows */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            minRows
          </p>
          <input
            type="number"
            min={2}
            max={20}
            value={minRows}
            onChange={(e) => setMinRows(Number(e.target.value) || 4)}
            disabled={mode === "view"}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] disabled:bg-gray-100 disabled:opacity-60"
          />
        </div>

        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Props
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={error} onChange={setError} tamano="sm" />
            <span className="text-xs text-gray-600">error</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={disabled} onChange={setDisabled} tamano="sm" />
            <span className="text-xs text-gray-600">disabled</span>
          </label>
        </div>
      </div>

      {/* Panel derecho: preview + codigo */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-auto border-b border-gray-200 p-6 bg-gray-50/30">
          <div className="w-full max-w-2xl mx-auto">
            <EditorMarkdown
              mode={mode}
              value={value}
              onChange={setValue}
              placeholder={placeholder}
              minRows={minRows}
              error={error}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Código generado
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <FiCheckCircle className="size-3 text-green-600" />
                  <span className="text-green-600">Copiado</span>
                </>
              ) : (
                <>
                  <FiCopy className="size-3" />
                  Copiar
                </>
              )}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CodePanel code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  );
}

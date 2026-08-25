import { useState } from "react";
import { Link } from "react-router-dom";
import type { ComponentEntry, ComponentVariant } from "../../docs/registry/types";
import { CodePanel } from "./CodePanel";
import { FiCode, FiCopy, FiX, FiTerminal, FiCheckCircle } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { fonasaToast } from "../../componentsUI/Toast";
import { CustomModal } from "../../componentsUI/CustomModal";
import { Badge } from "../../componentsUI/Badge";
import { Switch } from "../../componentsUI/Switch";

interface ComponentPreviewProps {
  entry: ComponentEntry;
}

function ColorPill({ color }: { color: { name: string; value: string; usage: string } }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(color.value);
    fonasaToast.success(`Color ${color.value} copiado`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <button
      onClick={handleCopy}
      className="relative w-full flex items-center justify-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 hover:border-[#0572CE] transition-colors cursor-pointer text-left"
    >
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/90 z-10">
          <span className="text-xs font-medium text-green-600 flex items-center gap-1">✓ Copiado</span>
        </div>
      )}
      <div
        className="size-5 rounded-md border border-gray-200 shrink-0"
        style={{ backgroundColor: color.value }}
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-700 leading-tight">
          {color.name}
        </span>
        <span className="text-xs font-mono text-gray-500 leading-tight">
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
    <CustomModal
      size="md"
      title={`Código — ${variant.label}`}
      showModal={true}
      onClose={onClose}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        <CodePanel code={formattedCode} />
      </div>
    </CustomModal>
  );
}

/** Orden de prioridad para badges fijos */
const FIXED_PATTERNS = [
  { pattern: /^(default|normal|texto|sin acciones|pocas)/i, label: "default" },
  { pattern: /secondary|secundari/i, label: "secondary" },
  { pattern: /skeleton/i, label: "skeleton" },
  { pattern: /error|rechazad/i, label: "error" },
];

function classifyVariants(variants: ComponentVariant[]) {
  const fixed: ComponentVariant[] = [];
  const rest: ComponentVariant[] = [];
  const usedIndices = new Set<number>();

  // Para cada patrón fijo, buscar la primera variante que matchee
  for (const { pattern } of FIXED_PATTERNS) {
    const idx = variants.findIndex(
      (v, i) => !usedIndices.has(i) && pattern.test(v.label)
    );
    if (idx !== -1) {
      fixed.push(variants[idx]);
      usedIndices.add(idx);
    }
  }

  // El resto va al carrusel
  for (let i = 0; i < variants.length; i++) {
    if (!usedIndices.has(i)) {
      rest.push(variants[i]);
    }
  }

  return { fixed, rest };
}

function VariantSelector({ variants }: { variants: ComponentVariant[] }) {
  const { fixed, rest } = classifyVariants(variants);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const allOrdered = [...fixed, ...rest];
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "success">("idle");

  const selected = allOrdered[selectedIdx];

  async function handleCopy() {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.usageCode);
      fonasaToast.success("Código copiado");
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl border border-gray-100 dark:border-[#1e3044] overflow-hidden bg-white dark:bg-[#0a1520]">
      {/* Left panel: variant list — always visible */}
      <div className="lg:w-48 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-[#1e3044] bg-gray-50/50 dark:bg-[#061018]/50">
        <div className="p-2 lg:p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto lg:max-h-[400px] scrollbar-none">
          {allOrdered.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setSelectedIdx(i)}
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal lg:w-full text-left ${
                selectedIdx === i
                  ? "bg-white dark:bg-[#1e3044] text-[#0572CE] shadow-sm"
                  : "text-gray-500 dark:text-[#94a3b8] hover:bg-white/60 dark:hover:bg-[#1e3044]/50 hover:text-gray-700"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel: preview + code */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100/60 dark:border-[#1e3044]">
          <span className="text-xs font-mono text-gray-400 dark:text-[#94a3b8] tabular-nums">
            {selectedIdx + 1} / {allOrdered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCodePanel((v) => !v)}
              className={`rounded-md p-1.5 text-xs transition-colors ${showCodePanel ? "text-[#0572CE] bg-[#0572CE]/10" : "text-gray-400 hover:text-[#0572CE]"}`}
              title="Ver código"
            >
              <FiCode className="size-3.5" />
            </button>
            <button
              onClick={handleCopy}
              className="rounded-md p-1.5 text-gray-400 hover:text-[#0572CE] transition-colors"
              title="Copiar código"
            >
              {copyState === "success" ? (
                <FiCheckCircle className="size-3.5 text-green-600" />
              ) : (
                <FiCopy className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 p-6 flex items-center justify-center min-h-[180px]">
          {selected && (
            <div
              key={selected.label}
              className={`animate-[blurIn_0.25s_ease-out_both] w-full ${selected.responsive ? "" : "max-w-sm mx-auto"}`}
            >
              {selected.render()}
            </div>
          )}
        </div>

        {/* Code panel — expandable */}
        {showCodePanel && selected && (
          <div className="border-t border-gray-100 dark:border-[#1e3044] animate-[fadeSlideUp_0.2s_ease-out_both]">
            <CodePanel code={selected.usageCode} />
          </div>
        )}
      </div>
    </div>
  );
}

function InstallCommand({ name, hasTest, dependencies }: { name: string; hasTest: boolean; dependencies?: string[] }) {
  const [withTests, setWithTests] = useState(false);
  const [onlyTests, setOnlyTests] = useState(false);
  const [copied, setCopied] = useState(false);

  function getCommand() {
    if (onlyTests) return `npx fonasa-ui add ${name} --only-tests`;
    if (withTests) return `npx fonasa-ui add ${name} --with-tests`;
    return `npx fonasa-ui add ${name}`;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getCommand());
      fonasaToast.success("Comando copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <FiTerminal className="size-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">Instalación</h3>
      </div>

      {/* Opciones con Switch */}
      {hasTest && (
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <Switch
              checked={withTests}
              onChange={(v) => {
                setWithTests(v);
                if (v) setOnlyTests(false);
              }}
              variante="primary"
              tamano="sm"
              disabled={onlyTests}
            />
            <span className="text-xs text-gray-600">Incluir test</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <Switch
              checked={onlyTests}
              onChange={(v) => {
                setOnlyTests(v);
                if (v) setWithTests(false);
              }}
              variante="primary"
              tamano="sm"
              disabled={withTests}
            />
            <span className="text-xs text-gray-600">Solo test</span>
          </label>
        </div>
      )}

      {/* Comando copiable */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-[#1e3044] bg-gray-50 dark:bg-[#111d2a] px-3 py-2">
        <code className="text-sm text-gray-700 dark:text-[#e2e8f0] font-mono flex-1 truncate">
          {getCommand()}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 p-1.5 rounded-md text-gray-400 hover:text-[#0572CE] hover:bg-gray-100 transition-colors"
          title="Copiar comando"
        >
          {copied ? (
            <FiCheckCircle className="size-4 text-green-600" />
          ) : (
            <FiCopy className="size-4" />
          )}
        </button>
      </div>

      {/* Dependencias requeridas — solo las del componente */}
      {dependencies && dependencies.length > 0 && !onlyTests && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Requiere:
          </span>
          {dependencies.map((dep) => (
            <Link
              key={dep}
              to={`/docs/dependencias#dep-${dep}`}
              className="inline-flex"
            >
              <Badge variant="estado-pendiente" text={dep} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function ComponentPreview({ entry }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="flex flex-col lg:flex-row gap-0 overflow-show">
      {/* Columna izquierda: todo el contenido */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ${showCode ? "lg:pr-4" : "pr-0"}`}>
        {/* Breadcrumb: Inicio */}
        <Link
          to="/components"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0572CE] transition-colors mb-3"
          title="Volver al inicio"
        >
          <IoMdHome className="size-4" />
          <span className="font-medium">Inicio</span>
        </Link>

        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">{entry.name}</h2>
        {entry.description && (
          <p className="text-gray-500 mb-3 whitespace-pre-line">
            {entry.description.split(/(\*[^*]+\*)/g).map((part, i) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <em key={i} className="text-xs text-gray-400 not-italic italic">
                  {part.slice(1, -1)}
                </em>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        )}

        {/* Instalación CLI con switch */}
        <InstallCommand name={entry.name} hasTest={!!entry.testCode} dependencies={entry.dependencies} />

        {/* Metadata: colores + interface en fila */}
        {(entry.colors?.length || entry.propsInterface) && (
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Colores — grid responsive, con sombra */}
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
          <VariantSelector variants={entry.variants} />
        </div>
      </div>

      {/* Columna derecha: código fuente colapsable — solo visible en lg+ como sidebar */}
      <div
        className={`hidden lg:block sticky top-0 self-start transition-all duration-300 overflow-hidden shrink-0 ${
          showCode ? "w-[40%] rounded-lg border border-gray-200 dark:border-[#1e3044]" : "w-auto"
        }`}
      >
        {!showCode ? (
          <button
            onClick={() => setShowCode(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-[#1e3044] bg-gray-50 dark:bg-[#111d2a] hover:bg-gray-100 dark:hover:bg-[#162536] px-3 py-2 transition-colors cursor-pointer"
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
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1e3044] bg-gray-100 dark:bg-[#061018] px-4 py-2.5 shrink-0">
              <span className="text-xs font-medium text-gray-600 dark:text-[#94a3b8]">
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

      {/* Botón "Código fuente" en móvil — visible solo en < lg */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        {!showCode && (
          <button
            onClick={() => setShowCode(true)}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white shadow-lg px-4 py-2.5 transition-colors cursor-pointer hover:bg-gray-50"
            title="Ver código fuente"
          >
            <FiCode className="size-4 text-[#0572CE]" />
            <span className="text-xs text-[#0572CE] font-medium">
              Código fuente
            </span>
          </button>
        )}
      </div>

      {/* Modal de código fuente para móvil */}
      {showCode && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowCode(false)}
          />
          <div className="relative mt-auto w-full max-h-[80vh] rounded-t-xl bg-white dark:bg-[#111d2a] border-t border-gray-200 dark:border-[#1e3044] shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1e3044] bg-gray-100 dark:bg-[#061018] px-4 py-2.5 shrink-0">
              <span className="text-sm font-medium text-gray-600 dark:text-[#94a3b8]">
                Código fuente
              </span>
              <button
                onClick={() => setShowCode(false)}
                className="rounded-md p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-200 transition-colors"
                title="Cerrar"
              >
                <FiX className="size-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <CodePanel code={entry.code} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

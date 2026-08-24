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
      <div className="rounded-xl border border-gray-200 dark:border-[#1e3044] bg-gray-50 dark:bg-[#111d2a] overflow-visible flex flex-col h-full">
        {/* Preview */}
        <div className="bg-white dark:bg-[#0a1520] p-4 flex items-center justify-center flex-1 min-h-[120px] overflow-visible rounded-t-xl">
          <div className={variant.responsive ? "w-full relative" : "w-full"}>
            {variant.render()}
          </div>
        </div>
        {/* Footer con label + acciones */}
        {!variant.noLabel && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#1e3044] px-4 py-2.5 bg-gray-100 dark:bg-[#061018]">
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
              className="rounded-md p-1.5 text-gray-400 hover:text-[#0572CE] hover:bg-gray-200 transition-colors size-7 flex items-center justify-center"
              title="Copiar código"
            >
              {copyState === "success" ? (
                <span className="text-green-600 text-sm font-medium">✓</span>
              ) : (
                <FiCopy className="size-4" />
              )}
            </button>
          </div>
        </div>
        )}
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
  const [carouselOffset, setCarouselOffset] = useState(0);
  const allOrdered = [...fixed, ...rest];
  const maxVisible = 5;

  const selected = allOrdered[selectedIdx];

  // Carrusel: items del rest que se muestran
  const visibleRest = rest.slice(carouselOffset, carouselOffset + maxVisible);
  const canScrollLeft = carouselOffset > 0;
  const canScrollRight = carouselOffset + maxVisible < rest.length;

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-4 flex-wrap overflow-visible relative z-10">
        {/* Badges fijos */}
        {fixed.map((v, i) => (
          <div key={v.label} className="relative group">
            <button
              onClick={() => setSelectedIdx(i)}
              className={`w-20 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer truncate ${
                selectedIdx === i
                  ? "bg-[#0572CE] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {v.label}
            </button>
            {/* Tooltip hover */}
            <span className="z-[99] absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[9999]">
              {v.label}
            </span>
          </div>
        ))}

        {/* Separador si hay rest */}
        {rest.length > 0 && (
          <div className="h-5 w-px bg-gray-300 mx-1" />
        )}

        {/* Carrusel de resto */}
        {rest.length > 0 && (
          <div className="flex items-center gap-1">
            {canScrollLeft && (
              <button
                onClick={() => setCarouselOffset((o) => Math.max(0, o - maxVisible))}
                className="p-1 rounded-md text-gray-400 hover:text-[#0572CE] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ‹
              </button>
            )}
            {visibleRest.map((v) => {
              const globalIdx = allOrdered.indexOf(v);
              return (
                <div key={v.label} className="relative group">
                  <button
                    onClick={() => setSelectedIdx(globalIdx)}
                    className={`w-20 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer truncate ${
                      selectedIdx === globalIdx
                        ? "bg-[#0572CE] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {v.label}
                  </button>
                  {/* Tooltip hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[9999]">
                    {v.label}
                  </span>
                </div>
              );
            })}
            {canScrollRight && (
              <button
                onClick={() => setCarouselOffset((o) => Math.min(rest.length - maxVisible, o + maxVisible))}
                className="p-1 rounded-md text-gray-400 hover:text-[#0572CE] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>

      {/* Variante seleccionada */}
      {selected && (
        <div className={selected.responsive ? "max-w-4xl" : "max-w-2xl"}>
          <VariantCard variant={selected} />
        </div>
      )}
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

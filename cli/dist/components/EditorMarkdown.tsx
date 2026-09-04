import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { FiBold, FiItalic, FiCode, FiLink, FiList } from "react-icons/fi";
import {
  MdFormatListNumbered,
  MdChecklist,
  MdFormatQuote,
  MdTitle,
} from "react-icons/md";

/* ------------------------------------------------------------------ */
/* Parser Markdown -> HTML (propio, sin dependencias)                  */
/* ------------------------------------------------------------------ */
/**
 * Conversor Markdown -> HTML acotado y seguro (sin dependencias).
 * Soporta: encabezados (#, ##, ###), negrita (**), cursiva (_ o *),
 * codigo inline (`code`), bloques de codigo (```), citas (>), enlaces
 * [txt](url), listas (-, *), listas numeradas (1.) y checklist (- [ ] / - [x]).
 *
 * Seguridad: primero escapa TODO el HTML de entrada, luego aplica las reglas
 * Markdown generando etiquetas controladas. Asi el contenido del usuario no
 * puede inyectar HTML/JS (mitiga XSS).
 */

/** Escapa caracteres HTML peligrosos. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Aplica formato inline (negrita, cursiva, codigo, enlaces) a una linea escapada. */
function inline(text: string): string {
  let t = text;
  // Codigo inline `code` (primero, para no formatear su interior).
  t = t.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  // Negrita **texto**
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Cursiva _texto_ o *texto*
  t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  t = t.replace(/_([^_]+)_/g, "<em>$1</em>");
  // Enlaces [txt](url) - solo http/https/mailto por seguridad.
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, txt: string, url: string) => {
      const clean = url.trim();
      const safe = /^(https?:|mailto:)/i.test(clean) ? clean : "#";
      return `<a href="${safe}" target="_blank" rel="noreferrer noopener">${txt}</a>`;
    },
  );
  return t;
}

type ListState = "ul" | "ol" | "task" | null;

/** Convierte Markdown (subconjunto) a HTML seguro. */
function markdownToHtml(md: string): string {
  const escaped = escapeHtml(md).replace(/\r\n/g, "\n");
  const lines = escaped.split("\n");
  const output: string[] = [];

  let currentList: ListState = null;
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const closeList = () => {
    if (currentList === "ul" || currentList === "task") output.push("</ul>");
    else if (currentList === "ol") output.push("</ol>");
    currentList = null;
  };

  const openList = (type: ListState) => {
    if (currentList === type) return;
    closeList();
    if (type === "ol") output.push("<ol>");
    else output.push('<ul class="md-list">');
    currentList = type;
  };

  for (const line of lines) {
    // Bloque de codigo ```
    if (/^```/.test(line.trim())) {
      if (inCodeBlock) {
        output.push(`<pre><code>${codeBuffer.join("\n")}</code></pre>`);
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        closeList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    const t = line.trim();

    // Linea vacia
    if (t === "") {
      closeList();
      continue;
    }

    // Encabezados
    const h = /^(#{1,3})\s+(.*)$/.exec(t);
    if (h) {
      closeList();
      const level = h[1].length;
      output.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }

    // Cita (">" quedo escapado como "&gt;")
    const q = /^&gt;\s?(.*)$/.exec(t);
    if (q) {
      closeList();
      output.push(`<blockquote>${inline(q[1])}</blockquote>`);
      continue;
    }

    // Checklist - [ ] / - [x]
    const chk = /^[-*]\s+\[( |x|X)\]\s+(.*)$/.exec(t);
    if (chk) {
      openList("task");
      const checked = chk[1].toLowerCase() === "x";
      output.push(
        `<li class="task-list-item"><input type="checkbox" disabled ${
          checked ? "checked" : ""
        }/> ${inline(chk[2])}</li>`,
      );
      continue;
    }

    // Lista numerada
    const ol = /^\d+\.\s+(.*)$/.exec(t);
    if (ol) {
      openList("ol");
      output.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    // Lista con vinetas
    const ul = /^[-*]\s+(.*)$/.exec(t);
    if (ul) {
      openList("ul");
      output.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    // Parrafo normal
    closeList();
    output.push(`<p>${inline(t)}</p>`);
  }

  if (inCodeBlock) {
    output.push(`<pre><code>${codeBuffer.join("\n")}</code></pre>`);
  }
  closeList();

  return output.join("\n");
}

/* ------------------------------------------------------------------ */
/* Estilos compartidos del render Markdown                             */
/* ------------------------------------------------------------------ */

// Clases Tailwind que dan formato al HTML generado por el parser.
// Usadas tanto por el preview del editor como por el modo vista.
const markdownStyles = [
  "[&_h1]:mb-2 [&_h1]:text-xl [&_h1]:font-bold",
  "[&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold",
  "[&_h3]:mb-1.5 [&_h3]:text-base [&_h3]:font-semibold",
  "[&_p]:mb-2 [&_p]:leading-relaxed [&_p]:last:mb-0",
  "[&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:mb-0.5",
  "[&_blockquote]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-3 [&_blockquote]:text-gray-600",
  "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs",
  "[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-3 [&_pre]:text-gray-100",
  "[&_a]:text-[#0572CE] [&_a]:underline",
  "[&_.task-list-item]:list-none [&_.task-list-item]:-ml-5",
];

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export type EditorMarkdownMode = "editor" | "view";

interface EditorMarkdownProps {
  /** Contenido Markdown. En modo `editor` es controlado (requiere `onChange`). */
  value: string;
  /**
   * Modo de uso del componente.
   * - `editor`: pestañas Write/Preview + toolbar (por defecto).
   * - `view`: renderiza el Markdown como HTML de solo lectura.
   * @default "editor"
   */
  mode?: EditorMarkdownMode;
  /** Se ejecuta al cambiar el contenido (Markdown crudo). Requerido en modo `editor`. */
  onChange?: (markdown: string) => void;
  /** Placeholder del area de texto (modo `editor`). */
  placeholder?: string;
  /** Filas minimas del area de texto (modo `editor`). @default 4 */
  minRows?: number;
  /** Muestra borde rojo de error (modo `editor`). @default false */
  error?: boolean;
  /** Deshabilita la edicion (modo `editor`). @default false */
  disabled?: boolean;
  /** Clases CSS adicionales. */
  className?: string;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
}

type Tab = "write" | "preview";

/* ------------------------------------------------------------------ */
/* Subcomponente interno: boton de la toolbar                          */
/* ------------------------------------------------------------------ */

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      aria-label={title}
      className="flex size-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* EditorMarkdown (unificado: editor + vista)                          */
/* ------------------------------------------------------------------ */

/**
 * Editor y visor Markdown unificado en un solo componente.
 *
 * - `mode="editor"` (por defecto): editor estilo GitHub con pestañas
 *   Write/Preview y toolbar que inserta sintaxis (encabezado, negrita,
 *   cursiva, cita, codigo, enlace, listas y checklist). El valor almacenado
 *   es Markdown crudo (texto).
 * - `mode="view"`: renderiza el Markdown como HTML seguro de solo lectura.
 *
 * El parser propio escapa el HTML de entrada, por lo que el contenido del
 * usuario no puede inyectar HTML/JS.
 *
 * @example
 * ```tsx
 * // Editor
 * <EditorMarkdown value={md} onChange={setMd} placeholder="Escribe en Markdown..." />
 *
 * // Solo lectura
 * <EditorMarkdown mode="view" value={md} />
 * ```
 */
export function EditorMarkdown({
  value,
  mode = "editor",
  onChange,
  placeholder,
  minRows = 4,
  error = false,
  disabled = false,
  className,
  ariaLabel,
}: EditorMarkdownProps) {
  const [tab, setTab] = useState<Tab>("write");
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const minHeight = minRows * 1.6 + 1; // rem

  const autoResize = () => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (mode === "editor" && tab === "write") {
      requestAnimationFrame(autoResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tab, mode]);

  /* --------------------------- Modo vista --------------------------- */
  if (mode === "view") {
    return (
      <div
        className={clsx(
          "markdown-view text-sm text-gray-800",
          ...markdownStyles,
          className,
        )}
        aria-label={ariaLabel}
        dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
      />
    );
  }

  /* --------------------- Helpers de edicion ------------------------- */
  const emit = (next: string) => onChange?.(next);

  const wrap = (before: string, after = before, placeholderSel = "texto") => {
    const el = areaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selection = value.slice(start, end) || placeholderSel;
    const next =
      value.slice(0, start) + before + selection + after + value.slice(end);
    emit(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + before.length + selection.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const prefixLines = (
    prefix: string | ((i: number) => string),
    placeholderLine = "elemento",
  ) => {
    const el = areaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const block = value.slice(lineStart, end) || placeholderLine;
    const lines = block.split("\n");
    const transformed = lines
      .map((line, i) => {
        const p = typeof prefix === "function" ? prefix(i) : prefix;
        return p + (line || placeholderLine);
      })
      .join("\n");
    const next = value.slice(0, lineStart) + transformed + value.slice(end);
    emit(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = lineStart + transformed.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const insertLink = () => {
    const el = areaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = value.slice(start, end) || "texto del enlace";
    const md = `[${text}](https://)`;
    const next = value.slice(0, start) + md + value.slice(end);
    emit(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + md.length - 1;
      el.setSelectionRange(pos, pos);
    });
  };

  /* --------------------------- Modo editor -------------------------- */
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-md border transition-colors",
        error ? "border-red-400" : "border-gray-300",
        "focus-within:border-[#0572CE] focus-within:ring-1 focus-within:ring-[#0572CE]",
        disabled && "bg-gray-100 opacity-60",
        className,
      )}
    >
      {/* Barra: pestañas + toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-2 py-1">
        {/* Pestañas Write / Preview */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={clsx(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              tab === "write"
                ? "bg-white text-gray-800 shadow-sm ring-1 ring-gray-200"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={clsx(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              tab === "preview"
                ? "bg-white text-gray-800 shadow-sm ring-1 ring-gray-200"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            Preview
          </button>
        </div>

        {/* Toolbar (solo en Write) */}
        {tab === "write" && !disabled && (
          <div className="flex flex-wrap items-center gap-0.5">
            <ToolbarButton title="Encabezado" onClick={() => prefixLines("### ", "Título")}>
              <MdTitle className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Negrita" onClick={() => wrap("**")}>
              <FiBold className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Cursiva" onClick={() => wrap("_")}>
              <FiItalic className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton title="Cita" onClick={() => prefixLines("> ", "cita")}>
              <MdFormatQuote className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Código" onClick={() => wrap("`", "`", "código")}>
              <FiCode className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Enlace" onClick={insertLink}>
              <FiLink className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />
            <ToolbarButton
              title="Lista numerada"
              onClick={() => prefixLines((i) => `${i + 1}. `)}
            >
              <MdFormatListNumbered className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Lista" onClick={() => prefixLines("- ")}>
              <FiList className="size-4" aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton title="Checklist" onClick={() => prefixLines("- [ ] ", "tarea")}>
              <MdChecklist className="size-4" aria-hidden="true" />
            </ToolbarButton>
          </div>
        )}
      </div>

      {/* Contenido: Write o Preview */}
      {tab === "write" ? (
        <textarea
          ref={areaRef}
          value={value}
          onChange={(e) => {
            emit(e.target.value);
            autoResize();
          }}
          disabled={disabled}
          placeholder={placeholder ?? "Escribe con Markdown..."}
          aria-label={ariaLabel}
          rows={minRows}
          className="block max-h-[70vh] w-full resize-y overflow-y-auto bg-white px-3 py-2 font-mono text-sm text-gray-800 placeholder-gray-400 outline-none"
          style={{ minHeight: `${minHeight}rem` }}
        />
      ) : (
        <div
          className={clsx(
            "markdown-preview w-full px-3 py-2 text-sm text-gray-800",
            ...markdownStyles,
          )}
          style={{ minHeight: `${minHeight}rem` }}
          dangerouslySetInnerHTML={{
            __html:
              value.trim() === ""
                ? '<p class="text-gray-400">Nada que previsualizar.</p>'
                : markdownToHtml(value),
          }}
        />
      )}
    </div>
  );
}

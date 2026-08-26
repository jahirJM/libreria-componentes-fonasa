import { useState, useCallback } from "react";
import clsx from "clsx";
import { FiCopy, FiCheck } from "react-icons/fi";

type CodeBlockVariant = "dark" | "light";

interface CodeBlockProps {
  /** Código o comando a mostrar. */
  code: string;
  /** Variante visual: "dark" (fondo oscuro) o "light" (fondo claro). @default "light" */
  variant?: CodeBlockVariant;
  /** Label opcional sobre el bloque (ej. "Terminal", "bash", "tsx"). */
  label?: string;
  /** Si true, oculta el botón de copiar. @default false */
  hideCopy?: boolean;
  /** Clases CSS adicionales para el contenedor. */
  className?: string;
  /** Si true, muestra skeleton de carga. @default false */
  isLoading?: boolean;
  /** Texto descriptivo para lectores de pantalla. */
  ariaLabel?: string;
}

const variantStyles: Record<CodeBlockVariant, { container: string; text: string; label: string; button: string; buttonActive: string }> = {
  dark: {
    container: "bg-gray-900 border-gray-700",
    text: "text-gray-100",
    label: "text-gray-400 bg-gray-800",
    button: "text-gray-400 hover:text-white hover:bg-gray-700",
    buttonActive: "text-green-400",
  },
  light: {
    container: "bg-gray-50 border-gray-200",
    text: "text-gray-800",
    label: "text-gray-500 bg-gray-100",
    button: "text-gray-500 hover:text-gray-800 hover:bg-gray-200",
    buttonActive: "text-green-600",
  },
};

/**
 * Bloque de código o comando con botón de copiar al portapapeles.
 * Ideal para mostrar snippets, comandos de terminal o configuraciones.
 *
 * @example
 * ```tsx
 * <CodeBlock code="npm install fonasa-ui" label="Terminal" />
 * <CodeBlock code={`const x = 1;\nconst y = 2;`} variant="light" label="tsx" />
 * ```
 */
export function CodeBlock({
  code,
  variant = "light",
  label,
  hideCopy = false,
  className,
  isLoading = false,
  ariaLabel,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  if (isLoading) {
    const skeletonLine = variant === "dark" ? "bg-gray-700" : "bg-gray-300";
    const skeletonHeader = variant === "dark" ? "bg-gray-800" : "bg-gray-200";
    return (
      <div className={clsx("rounded-lg border animate-pulse", variantStyles[variant].container, className)}>
        {label && <div className={clsx("h-7 rounded-t-lg", skeletonHeader)} />}
        <div className="p-4 space-y-2">
          <div className={clsx("h-4 rounded w-3/4", skeletonLine)} />
          <div className={clsx("h-4 rounded w-1/2", skeletonLine)} />
        </div>
      </div>
    );
  }

  const styles = variantStyles[variant];

  return (
    <div
      className={clsx("rounded-lg border overflow-hidden", styles.container, className)}
      role="group"
      aria-label={ariaLabel ?? "Bloque de código"}
    >
      {/* Header con label y botón copiar */}
      {(label || !hideCopy) && (
        <div className={clsx("flex items-center justify-between px-3 py-1.5", styles.label)}>
          {label && (
            <span className="text-xs font-medium select-none">{label}</span>
          )}
          {!label && <span />}
          {!hideCopy && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copiado" : "Copiar código"}
              className={clsx(
                "p-1 rounded transition-colors",
                copied ? styles.buttonActive : styles.button,
              )}
            >
              {copied ? (
                <FiCheck className="size-3.5" aria-hidden="true" />
              ) : (
                <FiCopy className="size-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Código */}
      <pre className={clsx("p-4 overflow-x-auto text-sm font-mono leading-relaxed", styles.text)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

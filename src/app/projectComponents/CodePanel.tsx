import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodePanelProps {
  code: string;
  language?: string;
}

export function CodePanel({ code, language = "tsx" }: CodePanelProps) {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <div className="relative rounded-b-lg bg-[#f8f9fa] overflow-hidden border-t border-gray-200">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        aria-label="Copiar código"
      >
        {copyState === "success" && (
          <span className="text-green-600">✓ Copiado</span>
        )}
        {copyState === "error" && (
          <span className="text-red-600">No se pudo copiar</span>
        )}
        {copyState === "idle" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
      <Highlight theme={themes.github} code={code.trim()} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <div className="flex overflow-x-auto p-4 text-sm leading-relaxed">
            <div className="flex-none pr-4 text-right select-none text-gray-400" aria-hidden="true">
              {tokens.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="flex-1 m-0">
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </Highlight>
    </div>
  );
}

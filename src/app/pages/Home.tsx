import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_REQUIREMENTS = `react: ^19.x
react-dom: ^19.x
tailwindcss: ^4.x
@tailwindcss/vite: ^4.x`;

const INSTALL_COMMAND = "npm install react react-dom tailwindcss @tailwindcss/vite";

export function Home() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col items-center text-center py-20">
      <h1 className="text-5xl font-bold text-white mb-4">Fonasa UI</h1>
      <p className="text-lg text-gray-400 max-w-xl mb-8">
        Librería de componentes React para proyectos internos de Fonasa.
        Componentes listos para copiar y pegar en tu proyecto.
      </p>

      {/* Requerimientos base */}
      <div className="w-full max-w-lg mb-10 rounded-lg border border-gray-700 bg-gray-900/60 p-6 text-left">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          Requerimientos base
        </h2>
        <pre className="text-xs text-gray-400 mb-4 font-mono leading-relaxed">{BASE_REQUIREMENTS}</pre>
        <div className="flex items-center gap-2">
          <code className="flex-1 rounded bg-gray-800 px-3 py-2 text-xs text-gray-300 font-mono overflow-x-auto">
            {INSTALL_COMMAND}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded border border-gray-600 bg-gray-800 px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 transition-colors"
          >
            {copied ? <span className="text-green-400">✓ Copiado</span> : "Copiar"}
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          to="/components"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          Ver componentes
        </Link>
        <Link
          to="/docs"
          className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
        >
          Documentación
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../componentsUI/Card";
import { BotonPrimario, BotonOutline } from "../../componentsUI/Botones";
import { FiCopy, FiPackage } from "react-icons/fi";

const BASE_REQUIREMENTS = `react: ^19.x
react-dom: ^19.x
tailwindcss: ^4.x
@tailwindcss/vite: ^4.x`;

const INSTALL_COMMAND = "npm install react react-dom tailwindcss @tailwindcss/vite";

export function Home() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

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
      <h1 className="text-5xl font-bold text-[#0572CE] mb-4">Fonasa UI</h1>
      <p className="text-lg text-gray-500 dark:text-[#94a3b8] max-w-xl mb-8">
        Librería de componentes React para proyectos internos de Fonasa.
        Componentes listos para copiar y pegar en tu proyecto.
      </p>

      {/* Requerimientos base */}
      <Card className="w-full max-w-lg mb-10 text-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FiPackage className="text-[#0572CE]" />
            Requerimientos base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-gray-500 dark:text-[#94a3b8] mb-4 font-mono leading-relaxed">
            {BASE_REQUIREMENTS}
          </pre>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-100 dark:bg-[#0a1520] border border-gray-200 dark:border-[#1e3044] px-3 py-2 text-xs text-gray-700 dark:text-[#e2e8f0] font-mono overflow-x-auto">
              {INSTALL_COMMAND}
            </code>
            <BotonOutline
              label={copied ? "✓ Copiado" : "Copiar"}
              icon={!copied ? FiCopy : undefined}
              onClick={handleCopy}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <BotonPrimario
          label="Ver componentes"
          onClick={() => navigate("/components")}
        />
        <BotonOutline
          label="Documentación"
          onClick={() => navigate("/docs")}
        />
      </div>
    </div>
  );
}

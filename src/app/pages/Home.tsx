import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../componentsUI/Card";
import { BotonPrimario, BotonOutline } from "../../componentsUI/Botones";
import { FiCopy, FiPackage } from "react-icons/fi";

const BASE_REQUIREMENTS = `react: ^19.x
react-dom: ^19.x
tailwindcss: ^4.x
@tailwindcss/vite: ^4.x`;

const INSTALL_COMMAND = "npm install react react-dom tailwindcss @tailwindcss/vite";

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let rafId: number;
    let start: number | null = null;
    const totalDuration = text.length * 100; // total ms for all characters

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / totalDuration, 1);
      const chars = Math.round(progress * text.length);
      setDisplayed(text.slice(0, chars));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setShowCursor(false), 1500);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className={`inline-block w-[2px] h-[1em] bg-[#0572CE] ml-0.5 align-middle ${showCursor ? "animate-[blink_0.8s_step-end_infinite]" : "opacity-0"}`} />
    </span>
  );
}

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
      <h1 className="text-5xl font-bold text-[#0572CE] mb-4">
        <Typewriter text="Fonasa UI" />
      </h1>
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

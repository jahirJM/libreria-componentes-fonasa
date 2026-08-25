import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { TextoAnimado } from "../../componentsUI/TextoAnimado";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

type Variante = "normal" | "grande" | "moneda" | "codigo" | "exito" | "error";

const VARIANTES: Variante[] = ["normal", "grande", "moneda", "codigo", "exito", "error"];

export function TextoAnimadoPlayground() {
  const [valor, setValor] = useState("Hola Fonasa");
  const [variante, setVariante] = useState<Variante>("normal");
  const [etiqueta, setEtiqueta] = useState("Resultado");
  const [duracion, setDuracion] = useState(200);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !previewContainerRef.current) return;
      const rect = previewContainerRef.current.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(e.clientX - rect.left, rect.width));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const generatedCode = `<TextoAnimado
  valor="${valor}"
  variante="${variante}"${etiqueta ? `\n  etiqueta="${etiqueta}"` : ""}${duracion !== 200 ? `\n  duracion={${duracion}}` : ""}
/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently fail */ }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Left panel */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Valor */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor</p>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="Texto a animar..."
          />
        </div>

        {/* Variante */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
          <select
            value={variante}
            onChange={(e) => setVariante(e.target.value as Variante)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
          >
            {VARIANTES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Etiqueta */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Etiqueta</p>
          <input
            type="text"
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="Etiqueta superior (opcional)"
          />
        </div>

        {/* Duración */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duración (ms)</p>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(Math.max(50, parseInt(e.target.value) || 200))}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            min={50}
            max={2000}
            step={50}
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div
            ref={previewContainerRef}
            className="h-full p-6 relative flex items-center overflow-auto bg-gray-50/30"
          >
            <div
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center px-4"
              style={{ width: previewWidth ?? "100%" }}
            >
              <div className="w-full max-w-sm">
                <TextoAnimado
                  valor={valor}
                  variante={variante}
                  etiqueta={etiqueta || undefined}
                  duracion={duracion}
                />
              </div>
            </div>
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
              style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}
            >
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Código generado</p>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer">
              {copied ? <><FiCheckCircle className="size-3 text-green-600" /><span className="text-green-600">Copiado</span></> : <><FiCopy className="size-3" />Copiar</>}
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

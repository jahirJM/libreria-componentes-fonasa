import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { Stepper } from "../../componentsUI/Stepper";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

interface PlaygroundPaso {
  id: string;
  label: string;
}

export function StepperPlayground() {
  const [pasos, setPasos] = useState<PlaygroundPaso[]>([
    { id: "1", label: "Datos" },
    { id: "2", label: "Documentos" },
    { id: "3", label: "Confirmación" },
  ]);
  const [pasoActual, setPasoActual] = useState(1);
  const [puedeNavegar, setPuedeNavegar] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const counter = useRef(4);
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

  const addPaso = () => {
    const id = String(counter.current);
    counter.current++;
    setPasos((prev) => [...prev, { id, label: `Paso ${id}` }]);
  };

  const removePaso = (id: string) => {
    setPasos((prev) => prev.filter((p) => p.id !== id));
    if (pasoActual > pasos.length - 1) setPasoActual(Math.max(1, pasos.length - 1));
  };

  const updatePaso = (id: string, label: string) => {
    setPasos((prev) => prev.map((p) => (p.id === id ? { ...p, label } : p)));
  };

  const generatedCode = `<Stepper
  pasos={[
${pasos.map((p) => `    { id: "${p.id}", label: "${p.label}" },`).join("\n")}
  ]}
  pasoActual={${pasoActual}}${puedeNavegar ? "\n  puedeNavegar" : ""}${forceMobile ? "\n  forceMobile" : ""}${puedeNavegar ? "\n  onCambiarPaso={(paso) => setPasoActual(paso)}" : ""}
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
        {/* Paso actual */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Paso actual</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPasoActual((p) => Math.max(1, p - 1))}
              className="px-2 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              ← Anterior
            </button>
            <span className="text-sm font-mono text-gray-700">{pasoActual}/{pasos.length}</span>
            <button
              onClick={() => setPasoActual((p) => Math.min(pasos.length, p + 1))}
              className="px-2 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={puedeNavegar} onChange={setPuedeNavegar} tamano="sm" />
            <span className="text-xs text-gray-600">puedeNavegar</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={forceMobile} onChange={setForceMobile} tamano="sm" />
            <span className="text-xs text-gray-600">forceMobile</span>
          </label>
        </div>

        {/* Steps editor */}
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pasos ({pasos.length})</p>
            <button
              onClick={addPaso}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {pasos.map((paso) => (
              <div key={paso.id} className="rounded-lg border border-gray-200 p-2 space-y-1.5 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">id: {paso.id}</span>
                  <button
                    onClick={() => removePaso(paso.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <FiTrash2 className="size-3" />
                  </button>
                </div>
                <input
                  type="text"
                  value={paso.label}
                  onChange={(e) => updatePaso(paso.id, e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                  placeholder="Label del paso"
                />
              </div>
            ))}
          </div>
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
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center w-full"
              style={{ width: previewWidth ?? "100%" }}
            >
              <div className="w-full">
                <Stepper
                  pasos={pasos}
                  pasoActual={pasoActual}
                  puedeNavegar={puedeNavegar}
                  forceMobile={forceMobile}
                  onCambiarPaso={puedeNavegar ? setPasoActual : undefined}
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

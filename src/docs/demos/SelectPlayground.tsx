import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { Select } from "../../componentsUI/Select";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

interface PlaygroundOption {
  id: string;
  value: string;
  label: string;
}

export function SelectPlayground() {
  const [placeholder, setPlaceholder] = useState("Seleccione una opción");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<PlaygroundOption[]>([
    { id: "opt-1", value: "1", label: "Opción 1" },
    { id: "opt-2", value: "2", label: "Opción 2" },
    { id: "opt-3", value: "3", label: "Opción 3" },
  ]);
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

  const addOption = () => {
    const id = `opt-${counter.current}`;
    const val = String(counter.current);
    counter.current++;
    setOptions((prev) => [...prev, { id, value: val, label: `Opción ${val}` }]);
  };

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOption = (id: string, field: "value" | "label", val: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, [field]: val } : o)));
  };

  const opciones = options.map((o) => ({ value: o.value, label: o.label }));

  const generatedCode = `const opciones = [
${options.map((o) => `  { value: "${o.value}", label: "${o.label}" },`).join("\n")}
];

<Select
  opciones={opciones}
  value={value}
  onChange={(v) => setValue(v)}
  placeholder="${placeholder}"${error ? "\n  error" : ""}${disabled ? "\n  disabled" : ""}
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
        {/* Placeholder */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Placeholder</p>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="Texto del placeholder..."
          />
        </div>

        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={error} onChange={setError} tamano="sm" />
            <span className="text-xs text-gray-600">error</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={disabled} onChange={setDisabled} tamano="sm" />
            <span className="text-xs text-gray-600">disabled</span>
          </label>
        </div>

        {/* Options editor */}
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opciones ({options.length})</p>
            <button
              onClick={addOption}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {options.map((opt) => (
              <div key={opt.id} className="rounded-lg border border-gray-200 p-2 space-y-1.5 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">{opt.id}</span>
                  <button
                    onClick={() => removeOption(opt.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <FiTrash2 className="size-3" />
                  </button>
                </div>
                <input
                  type="text"
                  value={opt.value}
                  onChange={(e) => updateOption(opt.id, "value", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                  placeholder="value"
                />
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => updateOption(opt.id, "label", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                  placeholder="label"
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
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center px-4"
              style={{ width: previewWidth ?? "100%" }}
            >
              <div className="w-full max-w-xs">
                <Select
                  opciones={opciones}
                  value={value}
                  onChange={setValue}
                  placeholder={placeholder}
                  error={error}
                  disabled={disabled}
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

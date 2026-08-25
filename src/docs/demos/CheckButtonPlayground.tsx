import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { CheckButton } from "../../componentsUI/CheckButton";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

interface PlaygroundOption {
  id: string;
  label: string;
}

export function CheckButtonPlayground() {
  const [options, setOptions] = useState<PlaygroundOption[]>([
    { id: "op-1", label: "Opción A" },
    { id: "op-2", label: "Opción B" },
    { id: "op-3", label: "Opción C" },
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>(["op-1"]);
  const [variant, setVariant] = useState<"primary" | "secondary">("primary");
  const [isDisabled, setIsDisabled] = useState(false);
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
      setPreviewWidth(Math.max(200, Math.min(e.clientX - rect.left, rect.width)));
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
    const id = `op-${counter.current++}`;
    setOptions((prev) => [...prev, { id, label: "Nueva opción" }]);
  };

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
    setSelectedItems((prev) => prev.filter((s) => s !== id));
  };

  const updateOption = (id: string, label: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, label } : o)));
  };

  const handleToggle = (opcion: { id: string }) => {
    if (variant === "secondary") {
      setSelectedItems([opcion.id]);
    } else {
      setSelectedItems((prev) =>
        prev.includes(opcion.id) ? prev.filter((s) => s !== opcion.id) : [...prev, opcion.id]
      );
    }
  };

  const optionsStr = options.map((o) => `  { id: "${o.id}", label: "${o.label}" }`).join(",\n");
  const generatedCode = `<CheckButton
  variant="${variant}"
  listaOpciones={[\n${optionsStr}\n  ]}
  selectedItems={[${selectedItems.map((s) => `"${s}"`).join(", ")}]}
  onToggle={(op) => toggle(op.id)}${isDisabled ? "\n  isDisabled" : ""}
/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
          <select value={variant} onChange={(e) => { setVariant(e.target.value as "primary" | "secondary"); setSelectedItems([]); }} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            <option value="primary">primary (checkbox)</option>
            <option value="secondary">secondary (radio)</option>
          </select>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={isDisabled} onChange={setIsDisabled} tamano="sm" />
            <span className="text-xs text-gray-600">isDisabled</span>
          </label>
        </div>
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opciones ({options.length})</p>
            <button onClick={addOption} className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer">
              <FiPlus className="size-3" />Agregar
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {options.map((opt) => (
              <div key={opt.id} className="flex items-center gap-1.5">
                <input type="text" value={opt.label} onChange={(e) => updateOption(opt.id, e.target.value)} className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" />
                <button onClick={() => removeOption(opt.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><FiTrash2 className="size-3" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div ref={previewContainerRef} className="h-full p-6 relative flex items-start overflow-auto bg-gray-50/30">
            <div className="overflow-hidden border-r border-gray-200" style={{ width: previewWidth ?? "100%" }}>
              <CheckButton
                variant={variant}
                listaOpciones={options}
                selectedItems={selectedItems}
                onToggle={handleToggle}
                isDisabled={isDisabled}
              />
            </div>
            <div onMouseDown={handleMouseDown} className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1" style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}>
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
          <div className="flex-1 overflow-y-auto"><CodePanel code={generatedCode} /></div>
        </div>
      </div>
    </div>
  );
}

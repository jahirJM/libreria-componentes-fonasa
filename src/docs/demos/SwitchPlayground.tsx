import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { Switch, SegmentedToggle } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

type ComponentType = "Switch" | "SegmentedToggle";
type VarianteSwitch = "primary" | "success" | "error" | "warning" | "neutral";
type TamanoSwitch = "sm" | "md" | "lg";

const VARIANTES: VarianteSwitch[] = ["primary", "success", "error", "warning", "neutral"];
const TAMANOS: TamanoSwitch[] = ["sm", "md", "lg"];

export function SwitchPlayground() {
  const [componentType, setComponentType] = useState<ComponentType>("Switch");
  // Switch props
  const [variante, setVariante] = useState<VarianteSwitch>("primary");
  const [tamano, setTamano] = useState<TamanoSwitch>("md");
  const [conIconos, setConIconos] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  // SegmentedToggle props
  const [option1, setOption1] = useState("Opción A");
  const [option2, setOption2] = useState("Opción B");
  const [segmentSize, setSegmentSize] = useState<"sm" | "md" | "lg">("md");
  const [segmentDisabled, setSegmentDisabled] = useState(false);
  const [segmentValue, setSegmentValue] = useState(0);

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

  const generatedCode = componentType === "Switch"
    ? `<Switch
  checked={checked}
  onChange={(v) => setChecked(v)}
  variante="${variante}"
  tamano="${tamano}"${conIconos ? "\n  conIconos" : ""}${disabled ? "\n  disabled" : ""}
/>`
    : `<SegmentedToggle
  options={["${option1}", "${option2}"]}
  value={value}
  onChange={(i) => setValue(i)}
  size="${segmentSize}"${segmentDisabled ? "\n  disabled" : ""}
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
        {/* Component type */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Componente</p>
          <select
            value={componentType}
            onChange={(e) => setComponentType(e.target.value as ComponentType)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
          >
            <option value="Switch">Switch</option>
            <option value="SegmentedToggle">SegmentedToggle</option>
          </select>
        </div>

        {componentType === "Switch" ? (
          <>
            {/* Variante */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
              <select
                value={variante}
                onChange={(e) => setVariante(e.target.value as VarianteSwitch)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
              >
                {VARIANTES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Tamaño */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tamaño</p>
              <select
                value={tamano}
                onChange={(e) => setTamano(e.target.value as TamanoSwitch)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
              >
                {TAMANOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Props */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={conIconos} onChange={setConIconos} tamano="sm" />
                <span className="text-xs text-gray-600">conIconos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={disabled} onChange={setDisabled} tamano="sm" />
                <span className="text-xs text-gray-600">disabled</span>
              </label>
            </div>
          </>
        ) : (
          <>
            {/* Options */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Opciones</p>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                placeholder="Opción 1"
              />
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                placeholder="Opción 2"
              />
            </div>

            {/* Size */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tamaño</p>
              <select
                value={segmentSize}
                onChange={(e) => setSegmentSize(e.target.value as "sm" | "md" | "lg")}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
              >
                {TAMANOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Props */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <Switch checked={segmentDisabled} onChange={setSegmentDisabled} tamano="sm" />
                <span className="text-xs text-gray-600">disabled</span>
              </label>
            </div>
          </>
        )}
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div
            ref={previewContainerRef}
            className="h-full p-6 relative flex items-center overflow-auto bg-gray-50/30"
          >
            <div
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center"
              style={{ width: previewWidth ?? "100%" }}
            >
              {componentType === "Switch" ? (
                <Switch
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                  variante={variante}
                  tamano={tamano}
                  conIconos={conIconos}
                  disabled={disabled}
                />
              ) : (
                <SegmentedToggle
                  options={[option1, option2]}
                  value={segmentValue}
                  onChange={setSegmentValue}
                  size={segmentSize}
                  disabled={segmentDisabled}
                />
              )}
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

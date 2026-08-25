import { useState, useRef, useCallback } from "react";
import { FiPlus, FiTrash2, FiCopy, FiCheckCircle, FiHeart, FiShield, FiStar, FiInfo, FiAlertCircle } from "react-icons/fi";
import {
  Acordeon,
  ItemAcordeon,
  DisparadorAcordeon,
  ContenidoAcordeon,
} from "../../componentsUI/Acordeon";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

// Available icons for the playground
const ICON_OPTIONS = [
  { value: "none", label: "Sin ícono" },
  { value: "FiShield", label: "Escudo" },
  { value: "FiHeart", label: "Corazón" },
  { value: "FiStar", label: "Estrella" },
  { value: "FiInfo", label: "Info" },
  { value: "FiAlertCircle", label: "Alerta" },
] as const;

type IconOption = typeof ICON_OPTIONS[number]["value"];

const ICON_MAP: Record<string, React.ReactNode> = {
  FiShield: <FiShield />,
  FiHeart: <FiHeart />,
  FiStar: <FiStar />,
  FiInfo: <FiInfo />,
  FiAlertCircle: <FiAlertCircle />,
};

interface PlaygroundItem {
  id: string;
  title: string;
  content: string;
  icon: IconOption;
  disabled: boolean;
}

export function AcordeonPlayground() {
  const [items, setItems] = useState<PlaygroundItem[]>([
    { id: "item-1", title: "¿Qué cubre mi plan?", content: "Consultas médicas, exámenes y hospitalización.", icon: "none", disabled: false },
    { id: "item-2", title: "¿Cómo obtengo un bono?", content: "Desde la sucursal virtual o presencialmente.", icon: "none", disabled: false },
  ]);
  const [multiple, setMultiple] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const counter = useRef(3);
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

  const addItem = () => {
    const newId = `item-${counter.current++}`;
    setItems((prev) => [
      ...prev,
      { id: newId, title: "Nuevo ítem", content: "Contenido del ítem.", icon: "none", disabled: false },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof PlaygroundItem, value: string | boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Generate code based on current state
  const generateCode = () => {
    const propsStr = [
      multiple ? " multiple" : "",
      bordered ? " bordered" : "",
      ` defaultValue={["${items[0]?.id || "item-1"}"]}`,
    ].join("");

    const itemsStr = items
      .map((item) => {
        const disabledStr = item.disabled ? " disabled" : "";
        const iconProp = item.icon !== "none" ? ` icon={<${item.icon} />}` : "";
        return `  <ItemAcordeon value="${item.id}"${disabledStr}>
    <DisparadorAcordeon${iconProp}>${item.title}</DisparadorAcordeon>
    <ContenidoAcordeon>${item.content}</ContenidoAcordeon>
  </ItemAcordeon>`;
      })
      .join("\n");

    return `<Acordeon${propsStr}>\n${itemsStr}\n</Acordeon>`;
  };

  const generatedCode = generateCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Left panel: Controls */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Props toggles */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props del Acordeón</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={multiple} onChange={setMultiple} tamano="sm" />
            <span className="text-xs text-gray-600">multiple</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={bordered} onChange={setBordered} tamano="sm" />
            <span className="text-xs text-gray-600">bordered</span>
          </label>
        </div>

        {/* Items editor */}
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Items ({items.length})</p>
            <button
              onClick={addItem}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>

          <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 p-2.5 space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">{item.id}</span>
                  <div className="flex items-center gap-1">
                    <label className="flex items-center gap-1 cursor-pointer" title="Deshabilitado">
                      <Switch
                        checked={item.disabled}
                        onChange={(v) => updateItem(item.id, "disabled", v)}
                        tamano="sm"
                        variante="warning"
                      />
                      <span className="text-xs text-gray-400">off</span>
                    </label>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Eliminar"
                    >
                      <FiTrash2 className="size-3" />
                    </button>
                  </div>
                </div>

                {/* Icon selector */}
                <select
                  value={item.icon}
                  onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] transition-colors bg-white"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] transition-colors"
                  placeholder="Título..."
                />
                <textarea
                  value={item.content}
                  onChange={(e) => updateItem(item.id, "content", e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] transition-colors resize-none"
                  rows={2}
                  placeholder="Contenido..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: Preview + Code */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Preview with resize handle */}
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div
            ref={previewContainerRef}
            className="h-full p-6 relative flex items-start overflow-auto bg-gray-50/30"
          >
            <div
              className="overflow-hidden border-r border-gray-200"
              style={{ width: previewWidth ?? "100%" }}
            >
              {items.length > 0 ? (
                <Acordeon
                  multiple={multiple}
                  bordered={bordered}
                  defaultValue={[items[0].id]}
                  key={`${multiple}-${bordered}-${items.map((i) => `${i.id}-${i.icon}-${i.disabled}`).join(",")}`}
                >
                  {items.map((item) => (
                    <ItemAcordeon key={item.id} value={item.id} disabled={item.disabled}>
                      <DisparadorAcordeon icon={item.icon !== "none" ? ICON_MAP[item.icon] : undefined}>
                        {item.title}
                      </DisparadorAcordeon>
                      <ContenidoAcordeon>{item.content}</ContenidoAcordeon>
                    </ItemAcordeon>
                  ))}
                </Acordeon>
              ) : (
                <p className="text-sm text-gray-400 text-center py-12">
                  Agrega un ítem para ver la preview
                </p>
              )}
            </div>

            {/* Resize handle */}
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
              style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}
            >
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </div>
        </div>

        {/* Generated code */}
        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Código generado</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <FiCheckCircle className="size-3 text-green-600" />
                  <span className="text-green-600">Copiado</span>
                </>
              ) : (
                <>
                  <FiCopy className="size-3" />
                  Copiar
                </>
              )}
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

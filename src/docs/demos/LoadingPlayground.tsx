import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { Loading, LoadingFonasa } from "../../componentsUI/Loading";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

export function LoadingPlayground() {
  const [variante, setVariante] = useState<"default" | "fonasa">("default");
  const [mensaje, setMensaje] = useState("Procesando...");
  const [showMensaje, setShowMensaje] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const handleMouseDown = useCallback(() => {
    isDragging.current = true; document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    const handleMouseMove = (e: MouseEvent) => { if (!isDragging.current || !previewContainerRef.current) return; const rect = previewContainerRef.current.getBoundingClientRect(); setPreviewWidth(Math.max(200, Math.min(e.clientX - rect.left, rect.width))); };
    const handleMouseUp = () => { isDragging.current = false; document.body.style.cursor = ""; document.body.style.userSelect = ""; document.removeEventListener("mousemove", handleMouseMove); document.removeEventListener("mouseup", handleMouseUp); };
    document.addEventListener("mousemove", handleMouseMove); document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const component = variante === "fonasa" ? "LoadingFonasa" : "Loading";
  const generatedCode = showMensaje ? `<${component} mensaje="${mensaje}" />` : `<${component} />`;

  const handleCopy = async () => { try { await navigator.clipboard.writeText(generatedCode); fonasaToast.success("Código copiado"); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
          <select value={variante} onChange={(e) => setVariante(e.target.value as "default" | "fonasa")} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            <option value="default">Loading</option>
            <option value="fonasa">LoadingFonasa</option>
          </select>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer"><Switch checked={showMensaje} onChange={setShowMensaje} tamano="sm" /><span className="text-xs text-gray-600">mensaje</span></label>
          {showMensaje && <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Mensaje..." />}
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div ref={previewContainerRef} className="h-full p-6 relative flex items-center justify-center overflow-auto bg-gray-50/30">
            <div className="overflow-hidden border-r border-gray-200 flex items-center justify-center" style={{ width: previewWidth ?? "100%" }}>
              {variante === "fonasa" ? <LoadingFonasa mensaje={showMensaje ? mensaje : undefined} /> : <Loading mensaje={showMensaje ? mensaje : undefined} />}
            </div>
            <div onMouseDown={handleMouseDown} className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1" style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}>
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </div>
        </div>
        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Código generado</p>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer">{copied ? <><FiCheckCircle className="size-3 text-green-600" /><span className="text-green-600">Copiado</span></> : <><FiCopy className="size-3" />Copiar</>}</button>
          </div>
          <div className="flex-1 overflow-y-auto"><CodePanel code={generatedCode} /></div>
        </div>
      </div>
    </div>
  );
}

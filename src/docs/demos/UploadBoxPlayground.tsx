import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { UploadBox } from "../../componentsUI/UploadBox";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

type Estado = "default" | "confirmacion" | "error";

export function UploadBoxPlayground() {
  const [textStrong, setTextStrong] = useState("Arrastra tu archivo aquí");
  const [text, setText] = useState("o haz click para buscar");
  const [allowedFormats, setAllowedFormats] = useState(".pdf,.doc,.jpg,.png");
  const [maxSize, setMaxSize] = useState("10MB");
  const [estado, setEstado] = useState<Estado>("default");
  const [forceCompact, setForceCompact] = useState(false);
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

  const generatedCode = `<UploadBox
  textStrong="${textStrong}"
  text="${text}"
  allowedFormats="${allowedFormats}"
  maxSize="${maxSize}"${estado === "confirmacion" ? "\n  confirmacion" : ""}${estado === "error" ? "\n  error" : ""}${forceCompact ? "\n  forceCompact" : ""}
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
        {/* textStrong */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">textStrong</p>
          <input
            type="text"
            value={textStrong}
            onChange={(e) => setTextStrong(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="Texto en negrita"
          />
        </div>

        {/* text */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">text</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="Texto normal"
          />
        </div>

        {/* allowedFormats */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">allowedFormats</p>
          <input
            type="text"
            value={allowedFormats}
            onChange={(e) => setAllowedFormats(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder=".pdf,.jpg,.png"
          />
        </div>

        {/* maxSize */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">maxSize</p>
          <input
            type="text"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
            placeholder="10MB"
          />
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</p>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as Estado)}
            className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]"
          >
            <option value="default">Default</option>
            <option value="confirmacion">Confirmación</option>
            <option value="error">Error</option>
          </select>
        </div>

        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={forceCompact} onChange={setForceCompact} tamano="sm" />
            <span className="text-xs text-gray-600">forceCompact</span>
          </label>
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
              <div className="w-full max-w-md">
                <UploadBox
                  textStrong={textStrong}
                  text={text}
                  allowedFormats={allowedFormats}
                  maxSize={maxSize}
                  confirmacion={estado === "confirmacion"}
                  error={estado === "error"}
                  forceCompact={forceCompact}
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

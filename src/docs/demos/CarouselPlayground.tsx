import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { Carousel } from "../../componentsUI/Carousel";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

export function CarouselPlayground() {
  const [cols, setCols] = useState(1);
  const [rows, setRows] = useState(1);
  const [itemCount, setItemCount] = useState(6);
  const [infinite, setInfinite] = useState(false);
  const [autoPlay, setAutoPlay] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [showArrows, setShowArrows] = useState(true);
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

  const items = Array.from({ length: itemCount }, (_, i) => ({
    id: i + 1,
    label: `Item ${i + 1}`,
    color: `hsl(${i * 30}, 70%, 60%)`,
  }));

  const propsLines = [
    `  items={items}`,
    cols !== 1 ? `  cols={${cols}}` : null,
    rows !== 1 ? `  rows={${rows}}` : null,
    infinite ? `  infinite` : null,
    autoPlay > 0 ? `  autoPlay={${autoPlay}}` : null,
    !showDots ? `  showDots={false}` : null,
    !showArrows ? `  showArrows={false}` : null,
    `  renderItem={(item) => <div>{item.label}</div>}`,
  ].filter(Boolean).join("\n");

  const generatedCode = `<Carousel\n${propsLines}\n/>`;

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
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Grilla</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">cols</label>
              <input type="number" min={1} max={5} value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" />
            </div>
            <div>
              <label className="text-xs text-gray-500">rows</label>
              <input type="number" min={1} max={5} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">items ({itemCount})</label>
            <input type="range" min={2} max={20} value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} className="w-full" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={infinite} onChange={setInfinite} tamano="sm" />
            <span className="text-xs text-gray-600">infinite</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showDots} onChange={setShowDots} tamano="sm" />
            <span className="text-xs text-gray-600">showDots</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showArrows} onChange={setShowArrows} tamano="sm" />
            <span className="text-xs text-gray-600">showArrows</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AutoPlay (ms)</p>
          <input type="number" min={0} max={10000} step={500} value={autoPlay} onChange={(e) => setAutoPlay(Number(e.target.value))} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="0 = desactivado" />
          <p className="text-xs text-gray-400">0 = desactivado</p>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div ref={previewContainerRef} className="h-full p-6 relative flex items-start overflow-auto bg-gray-50/30">
            <div className="overflow-hidden border-r border-gray-200" style={{ width: previewWidth ?? "100%" }}>
              <Carousel
                key={`${cols}-${rows}-${itemCount}-${infinite}-${autoPlay}-${showDots}-${showArrows}`}
                items={items}
                cols={cols}
                rows={rows}
                infinite={infinite}
                autoPlay={autoPlay || undefined}
                showDots={showDots}
                showArrows={showArrows}
                renderItem={(item) => (
                  <div className="h-16 rounded-lg flex items-center justify-center text-white font-medium text-xs" style={{ backgroundColor: item.color }}>
                    {item.label}
                  </div>
                )}
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

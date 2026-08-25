import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type VarianteCard } from "../../componentsUI/Card";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

const VARIANTES: VarianteCard[] = ["default", "elevada", "outline", "interactiva"];

export function CardPlayground() {
  const [variante, setVariante] = useState<VarianteCard>("default");
  const [titulo, setTitulo] = useState("Título de la tarjeta");
  const [descripcion, setDescripcion] = useState("Descripción breve del contenido.");
  const [contenido, setContenido] = useState("Este es el contenido principal de la tarjeta. Puede incluir texto, listas, o cualquier elemento.");
  const [showFooter, setShowFooter] = useState(true);
  const [footerText, setFooterText] = useState("Pie de tarjeta");
  const [isLoading, setIsLoading] = useState(false);
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

  const generatedCode = `<Card variante="${variante}"${isLoading ? " isLoading" : ""}>
  <CardHeader>
    <CardTitle>${titulo}</CardTitle>
  </CardHeader>
  <CardDescription>${descripcion}</CardDescription>
  <CardContent>${contenido}</CardContent>${showFooter ? `\n  <CardFooter>${footerText}</CardFooter>` : ""}
</Card>`;

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
          <select value={variante} onChange={(e) => setVariante(e.target.value as VarianteCard)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            {VARIANTES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showFooter} onChange={setShowFooter} tamano="sm" />
            <span className="text-xs text-gray-600">Footer</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={isLoading} onChange={setIsLoading} tamano="sm" />
            <span className="text-xs text-gray-600">isLoading</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Título..." />
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Descripción..." />
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] resize-none" rows={3} placeholder="Contenido..." />
          {showFooter && <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Footer..." />}
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div ref={previewContainerRef} className="h-full p-6 relative flex items-start overflow-auto bg-gray-50/30">
            <div className="overflow-hidden border-r border-gray-200" style={{ width: previewWidth ?? "100%" }}>
              <Card variante={variante} isLoading={isLoading}>
                <CardHeader><CardTitle>{titulo}</CardTitle></CardHeader>
                <CardDescription>{descripcion}</CardDescription>
                <CardContent><p className="text-sm text-gray-600">{contenido}</p></CardContent>
                {showFooter && <CardFooter><span className="text-xs text-gray-400">{footerText}</span></CardFooter>}
              </Card>
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

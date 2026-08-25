import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiActivity, FiUsers, FiDollarSign, FiTrendingUp, FiHeart } from "react-icons/fi";
import { ContadorEstadistica } from "../../componentsUI/ContadorEstadistica";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

type Variante = "neutral" | "primario" | "exito" | "advertencia" | "peligro";
type Tendencia = "subida" | "bajada" | "sin-cambio";

const VARIANTES: Variante[] = ["neutral", "primario", "exito", "advertencia", "peligro"];
const TENDENCIAS: Tendencia[] = ["subida", "bajada", "sin-cambio"];

const ICON_OPTIONS = [
  { value: "FiActivity", label: "Actividad" },
  { value: "FiUsers", label: "Usuarios" },
  { value: "FiDollarSign", label: "Dinero" },
  { value: "FiTrendingUp", label: "Tendencia" },
  { value: "FiHeart", label: "Corazón" },
] as const;

const ICON_MAP: Record<string, React.ReactNode> = {
  FiActivity: <FiActivity />,
  FiUsers: <FiUsers />,
  FiDollarSign: <FiDollarSign />,
  FiTrendingUp: <FiTrendingUp />,
  FiHeart: <FiHeart />,
};

export function ContadorEstadisticaPlayground() {
  const [variante, setVariante] = useState<Variante>("primario");
  const [valor, setValor] = useState(14823);
  const [prefijo, setPrefijo] = useState("");
  const [sufijo, setSufijo] = useState("");
  const [etiqueta, setEtiqueta] = useState("Beneficiarios activos");
  const [descripcion, setDescripcion] = useState("Registros actualizados hoy");
  const [icon, setIcon] = useState("FiUsers");
  const [showTendencia, setShowTendencia] = useState(true);
  const [tendenciaTipo, setTendenciaTipo] = useState<Tendencia>("subida");
  const [tendenciaTexto, setTendenciaTexto] = useState("+3,2% este mes");
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0);

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

  const generatedCode = `<ContadorEstadistica variante="${variante}">
  <ContadorEstadistica.Cabecera><${icon} /></ContadorEstadistica.Cabecera>
  <ContadorEstadistica.Metrica valor={${valor}}${prefijo ? ` prefijo="${prefijo}"` : ""}${sufijo ? ` sufijo="${sufijo}"` : ""} />
  <ContadorEstadistica.Contenido>
    <ContadorEstadistica.Etiqueta>${etiqueta}</ContadorEstadistica.Etiqueta>${descripcion ? `\n    <ContadorEstadistica.Descripcion>${descripcion}</ContadorEstadistica.Descripcion>` : ""}${showTendencia ? `\n    <ContadorEstadistica.Tendencia tipo="${tendenciaTipo}">${tendenciaTexto}</ContadorEstadistica.Tendencia>` : ""}
  </ContadorEstadistica.Contenido>
</ContadorEstadistica>`;

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
          <select value={variante} onChange={(e) => setVariante(e.target.value as Variante)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            {VARIANTES.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ícono</p>
          <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            {ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Métrica</p>
          <div className="grid grid-cols-3 gap-1.5">
            <input type="text" value={prefijo} onChange={(e) => setPrefijo(e.target.value)} className="text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Prefijo" />
            <input type="number" value={valor} onChange={(e) => { setValor(Number(e.target.value)); setResetKey((k) => k + 1); }} className="text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" />
            <input type="text" value={sufijo} onChange={(e) => setSufijo(e.target.value)} className="text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Sufijo" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <input type="text" value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Etiqueta..." />
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Descripción..." />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={showTendencia} onChange={setShowTendencia} tamano="sm" />
            <span className="text-xs text-gray-600">Tendencia</span>
          </label>
          {showTendencia && (
            <>
              <select value={tendenciaTipo} onChange={(e) => setTendenciaTipo(e.target.value as Tendencia)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
                {TENDENCIAS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input type="text" value={tendenciaTexto} onChange={(e) => setTendenciaTexto(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Texto tendencia..." />
            </>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div ref={previewContainerRef} className="h-full p-6 relative flex items-start overflow-auto bg-gray-50/30">
            <div className="overflow-hidden border-r border-gray-200" style={{ width: previewWidth ?? "100%" }}>
              <ContadorEstadistica key={resetKey} variante={variante}>
                <ContadorEstadistica.Cabecera>{ICON_MAP[icon]}</ContadorEstadistica.Cabecera>
                <ContadorEstadistica.Metrica valor={valor} prefijo={prefijo || undefined} sufijo={sufijo || undefined} />
                <ContadorEstadistica.Contenido>
                  <ContadorEstadistica.Etiqueta>{etiqueta}</ContadorEstadistica.Etiqueta>
                  {descripcion && <ContadorEstadistica.Descripcion>{descripcion}</ContadorEstadistica.Descripcion>}
                  {showTendencia && <ContadorEstadistica.Tendencia tipo={tendenciaTipo}>{tendenciaTexto}</ContadorEstadistica.Tendencia>}
                </ContadorEstadistica.Contenido>
              </ContadorEstadistica>
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

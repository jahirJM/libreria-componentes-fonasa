import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { Drawer, type DrawerPosicion, type DrawerSize } from "../../componentsUI/Drawer";
import { Switch } from "../../componentsUI/Switch";
import { BotonPrimario } from "../../componentsUI/Botones";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

const POSICIONES: DrawerPosicion[] = ["right", "left", "bottom", "top"];
const SIZES: DrawerSize[] = ["sm", "md", "lg", "xl", "full"];

export function DrawerPlayground() {
  const [posicion, setPosicion] = useState<DrawerPosicion>("right");
  const [size, setSize] = useState<DrawerSize>("md");
  const [titulo, setTitulo] = useState("Filtros");
  const [descripcion, setDescripcion] = useState("Configura los filtros de búsqueda");
  const [contenido, setContenido] = useState("Contenido del drawer. Aquí va el formulario, filtros o cualquier contenido.");
  const [cerrarAlClickFuera, setCerrarAlClickFuera] = useState(true);
  const [mostrarBotonCerrar, setMostrarBotonCerrar] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const propsLines = [
    `  isOpen={open}`,
    `  onClose={() => setOpen(false)}`,
    `  titulo="${titulo}"`,
    descripcion ? `  descripcion="${descripcion}"` : null,
    `  posicion="${posicion}"`,
    `  size="${size}"`,
    !cerrarAlClickFuera ? `  cerrarAlClickFuera={false}` : null,
    !mostrarBotonCerrar ? `  mostrarBotonCerrar={false}` : null,
  ].filter(Boolean).join("\n");
  const generatedCode = `<Drawer\n${propsLines}\n>\n  <p>${contenido}</p>\n</Drawer>`;

  const handleCopy = async () => { try { await navigator.clipboard.writeText(generatedCode); fonasaToast.success("Código copiado"); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Posición</p>
          <select value={posicion} onChange={(e) => setPosicion(e.target.value as DrawerPosicion)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            {POSICIONES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tamaño</p>
          <select value={size} onChange={(e) => setSize(e.target.value as DrawerSize)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Título..." />
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Descripción..." />
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] resize-none" rows={3} placeholder="Contenido..." />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer"><Switch checked={cerrarAlClickFuera} onChange={setCerrarAlClickFuera} tamano="sm" /><span className="text-xs text-gray-600">cerrarAlClickFuera</span></label>
          <label className="flex items-center gap-2 cursor-pointer"><Switch checked={mostrarBotonCerrar} onChange={setMostrarBotonCerrar} tamano="sm" /><span className="text-xs text-gray-600">mostrarBotonCerrar</span></label>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div className="h-full p-6 flex items-center justify-center bg-gray-50/30">
            <BotonPrimario label="Abrir Drawer" onClick={() => setIsOpen(true)} />
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} titulo={titulo} descripcion={descripcion || undefined} posicion={posicion} size={size} cerrarAlClickFuera={cerrarAlClickFuera} mostrarBotonCerrar={mostrarBotonCerrar}>
              <p className="text-sm text-gray-600">{contenido}</p>
            </Drawer>
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

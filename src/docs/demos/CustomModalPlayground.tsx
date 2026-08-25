import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { CustomModal } from "../../componentsUI/CustomModal";
import { BotonPrimario } from "../../componentsUI/Botones";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

export function CustomModalPlayground() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [title, setTitle] = useState("Detalle de solicitud");
  const [contenido, setContenido] = useState("Aquí va el contenido del modal. Puede ser un formulario, una tabla, o cualquier componente.");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedCode = `<CustomModal
  size="${size}"
  title="${title}"
  showModal={open}
  onClose={() => setOpen(false)}
>
  <p>${contenido}</p>
</CustomModal>`;

  const handleCopy = async () => { try { await navigator.clipboard.writeText(generatedCode); fonasaToast.success("Código copiado"); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tamaño</p>
          <select value={size} onChange={(e) => setSize(e.target.value as "sm" | "md" | "lg")} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            <option value="sm">sm (568px)</option>
            <option value="md">md (990px)</option>
            <option value="lg">lg (full responsive)</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Título..." />
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] resize-none" rows={4} placeholder="Contenido..." />
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div className="h-full p-6 flex items-center justify-center bg-gray-50/30">
            <BotonPrimario label="Abrir CustomModal" onClick={() => setShowModal(true)} />
            <CustomModal size={size} title={title} showModal={showModal} onClose={() => setShowModal(false)}>
              <p className="text-sm text-gray-600">{contenido}</p>
            </CustomModal>
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

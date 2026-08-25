import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import Modal from "../../componentsUI/Modal";
import { Switch } from "../../componentsUI/Switch";
import { BotonPrimario } from "../../componentsUI/Botones";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

export function ModalPlayground() {
  const [variant, setVariant] = useState<"confirmacion" | "exito" | "aceptar">("confirmacion");
  const [titulo, setTitulo] = useState("¿Confirmar envío?");
  const [subtitulo, setSubtitulo] = useState("Esta acción no se puede deshacer.");
  const [numeroSolicitud, setNumeroSolicitud] = useState("1234");
  const [showNumero, setShowNumero] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const propsLines = [
    `  modalOpen={open}`,
    `  setModalOpen={setOpen}`,
    `  variant="${variant}"`,
    `  tituloModal="${titulo}"`,
    `  subTituloModal="${subtitulo}"`,
    variant === "exito" && showNumero ? `  numeroSolicitud={${numeroSolicitud}}` : null,
    `  validacion={(ok) => console.log(ok)}`,
  ].filter(Boolean).join("\n");
  const generatedCode = `<Modal\n${propsLines}\n/>`;

  const handleCopy = async () => { try { await navigator.clipboard.writeText(generatedCode); fonasaToast.success("Código copiado"); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variante</p>
          <select value={variant} onChange={(e) => setVariant(e.target.value as "confirmacion" | "exito" | "aceptar")} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-[#0572CE]">
            <option value="confirmacion">confirmacion</option>
            <option value="exito">exito</option>
            <option value="aceptar">aceptar</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contenido</p>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Título..." />
          <textarea value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE] resize-none" rows={3} placeholder="Subtítulo..." />
        </div>
        {variant === "exito" && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer"><Switch checked={showNumero} onChange={setShowNumero} tamano="sm" /><span className="text-xs text-gray-600">numeroSolicitud</span></label>
            {showNumero && <input type="text" value={numeroSolicitud} onChange={(e) => setNumeroSolicitud(e.target.value)} className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]" placeholder="Nro solicitud..." />}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div className="h-full p-6 flex items-center justify-center bg-gray-50/30">
            <BotonPrimario label="Abrir Modal" onClick={() => setModalOpen(true)} />
            <Modal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              variant={variant}
              tituloModal={titulo}
              subTituloModal={subtitulo}
              numeroSolicitud={variant === "exito" && showNumero ? numeroSolicitud : undefined}
              validacion={(ok) => fonasaToast.info(`Resultado: ${ok}`)}
            />
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

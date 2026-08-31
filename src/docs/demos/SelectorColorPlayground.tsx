import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import { SelectorColor } from "../../componentsUI/SelectorColor";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

export function SelectorColorPlayground() {
  const [disabled, setDisabled] = useState(false);
  const [mostrarGuardar, setMostrarGuardar] = useState(false);
  const [soloColor, setSoloColor] = useState(false);
  const [color, setColor] = useState("#0572CE");
  const [copied, setCopied] = useState(false);

  const propsLines = [
    `  value="${color}"`,
    disabled ? "  disabled" : null,
    soloColor ? "  soloColor" : null,
    mostrarGuardar ? "  mostrarGuardar" : null,
    mostrarGuardar
      ? "  onGuardar={(hex) => setColor(hex)}"
      : "  onChange={(hex) => setColor(hex)}",
  ]
    .filter(Boolean)
    .join("\n");
  const generatedCode = `<SelectorColor\n${propsLines}\n/>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignorar errores de clipboard (permisos del navegador)
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Panel de controles */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={mostrarGuardar} onChange={setMostrarGuardar} tamano="sm" />
            <span className="text-xs text-gray-600">mostrarGuardar</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={soloColor} onChange={setSoloColor} tamano="sm" />
            <span className="text-xs text-gray-600">soloColor</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={disabled} onChange={setDisabled} tamano="sm" />
            <span className="text-xs text-gray-600">disabled</span>
          </label>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Color actual</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono">{color}</span>
          </div>
        </div>
      </div>

      {/* Preview + código */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-auto border-b border-gray-200 bg-gray-50/30 p-6 flex items-start">
          <SelectorColor
            value={color}
            disabled={disabled}
            soloColor={soloColor}
            mostrarGuardar={mostrarGuardar}
            onChange={mostrarGuardar ? undefined : setColor}
            onGuardar={mostrarGuardar ? setColor : undefined}
          />
        </div>
        <div className="h-40 shrink-0 flex flex-col overflow-hidden">
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

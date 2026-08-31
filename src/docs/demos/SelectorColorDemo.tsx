import { useState } from "react";
import { SelectorColor } from "../../componentsUI/SelectorColor";

/** Demo con estado: variante que guarda al confirmar con el botón. */
export function SelectorColorConGuardarDemo() {
  const [color, setColor] = useState("#0572CE");
  return (
    <div className="flex flex-col items-center gap-4 w-full min-h-[420px]">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono">{color}</span>
      </div>
      <SelectorColor value={color} mostrarGuardar onGuardar={setColor} />
    </div>
  );
}

/** Demo con estado: variante que actualiza en vivo mientras se elige. */
export function SelectorColorEnVivoDemo() {
  const [color, setColor] = useState("#16a34a");
  return (
    <div className="flex flex-col items-center gap-4 w-full min-h-[420px]">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono">{color}</span>
      </div>
      <SelectorColor value={color} onChange={setColor} />
    </div>
  );
}

/** Demo con estado: variante que solo muestra el color como botón, con tamaño ajustable. */
export function SelectorColorSoloColorDemo() {
  const [color, setColor] = useState("#0572CE");
  const [size, setSize] = useState(32);
  return (
    <div className="flex flex-col items-center gap-4 w-full min-h-[420px]">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-mono">{color}</span>
      </div>
      <SelectorColor value={color} soloColor size={size} onChange={setColor} />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <span>Tamaño</span>
        <input
          type="range"
          min={16}
          max={80}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="accent-[#0572CE]"
        />
        <span className="font-mono w-10 text-right">{size}px</span>
      </label>
    </div>
  );
}

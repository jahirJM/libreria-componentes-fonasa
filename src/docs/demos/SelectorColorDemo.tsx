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

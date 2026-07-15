import { useState } from "react";
import { Stepper } from "../../componentsUI/Stepper";

export function StepperDemo({
  pasos,
  navegable,
}: {
  pasos: { id: string; label: string }[];
  navegable?: boolean;
}) {
  const [paso, setPaso] = useState(1);
  return (
    <div>
      <Stepper
        pasos={pasos}
        pasoActual={paso}
        onCambiarPaso={setPaso}
        puedeNavegar={navegable}
      />
      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => setPaso((p) => Math.max(1, p - 1))}
          className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
          className="px-3 py-1 text-xs bg-[#0572CE] text-white rounded hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
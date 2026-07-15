import { useState } from "react";
import { Stepper } from "../../componentsUI/Stepper";
import { BotonPrimario, BotonSecundario } from "../../componentsUI/Botones";

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
        <BotonSecundario
          label="Anterior"
          onClick={() => setPaso((p) => Math.max(1, p - 1))}
        />
        <BotonPrimario
          label="Siguiente"
          onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
        />
      </div>
    </div>
  );
}

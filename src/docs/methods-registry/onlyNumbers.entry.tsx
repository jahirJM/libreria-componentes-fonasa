import { useState } from "react";
import soloNumerosCode from "../../methods/soloNumeros.ts?raw";
import { soloNumeros } from "../../methods/soloNumeros";
import { Input } from "../../componentsUI/Input";
import { TextoAnimado } from "../../componentsUI/TextoAnimado";
import type { MethodEntry } from "./types";

function SoloNumerosDemo() {
  const [valor, setValor] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValor(soloNumeros(e.target.value));
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Solo números
        </label>
        <Input
          type="text"
          value={valor}
          onChange={handleChange}
          placeholder="Escribe cualquier cosa..."
        />
      </div>

      {/* Resultado animado */}
      {valor && (
        <TextoAnimado valor={valor} variante="codigo" etiqueta="Filtrado" />
      )}

      <p className="text-xs text-gray-400">
        Intenta escribir letras, símbolos o espacios — solo se conservan los dígitos.
      </p>
    </div>
  );
}

export const soloNumerosEntry: MethodEntry = {
  name: "Solo Números",
  description:
    "Utiliza: TextoAnimado. Filtra un input dejando solo caracteres numéricos. Útil para campos de teléfono, montos, códigos, etc.",
  code: soloNumerosCode,
  group: "Validación",
  signature: `function soloNumeros(valor: string): string`,
  demo: () => <SoloNumerosDemo />,
  usageCode: `import { soloNumeros } from "@/methods/soloNumeros";
import { TextoAnimado } from "@/componentsUI/TextoAnimado";

const [telefono, setTelefono] = useState("");

<Input
  value={telefono}
  onChange={(e) => setTelefono(soloNumeros(e.target.value))}
  placeholder="Solo números"
/>
<TextoAnimado valor={telefono} variante="codigo" etiqueta="Filtrado" />`,
};

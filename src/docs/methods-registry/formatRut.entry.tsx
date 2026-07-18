import { useState } from "react";
import formatRutCode from "../../methods/formatRut.ts?raw";
import { formatearRut, limpiarRut, validarRut } from "../../methods/formatRut";
import { Input } from "../../componentsUI/Input";
import { TextoAnimado } from "../../componentsUI/TextoAnimado";
import type { MethodEntry } from "./types";

function FormateoRutDemo() {
  const [valor, setValor] = useState("");
  const [esValido, setEsValido] = useState<boolean | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = limpiarRut(e.target.value);
    const formateado = formatearRut(raw);
    setValor(formateado);

    if (raw.length >= 2) {
      setEsValido(validarRut(raw));
    } else {
      setEsValido(null);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Ingresa un RUT
        </label>
        <Input
          type="text"
          value={valor}
          onChange={handleChange}
          placeholder="12.345.678-5"
          maxLength={12}
          error={esValido === false}
        />
      </div>

      {/* Resultado animado */}
      {valor && (
        <TextoAnimado
          valor={valor}
          variante={esValido === null ? "normal" : esValido ? "exito" : "error"}
          etiqueta={esValido === null ? "Formateado" : esValido ? "RUT válido" : "RUT inválido"}
        />
      )}
    </div>
  );
}

export const formatRutEntry: MethodEntry = {
  name: "Formateo de RUT",
  description:
    "Utiliza: TextoAnimado. Formatea, limpia y valida RUT chileno. El input solo acepta números y la letra K, y se formatea automáticamente con puntos y guión.",
  code: formatRutCode,
  group: "Formateo",
  signature: `function formatearRut(valor: string): string
function limpiarRut(valor: string): string
function validarRut(rut: string): boolean`,
  demo: () => <FormateoRutDemo />,
  usageCode: `import { formatearRut, limpiarRut, validarRut } from "@/methods/formatRut";
import { TextoAnimado } from "@/componentsUI/TextoAnimado";

const [rut, setRut] = useState("");
const [esValido, setEsValido] = useState<boolean | null>(null);

function handleChange(e) {
  const raw = limpiarRut(e.target.value);
  setRut(formatearRut(raw));
  if (raw.length >= 2) setEsValido(validarRut(raw));
}

<Input value={rut} onChange={handleChange} placeholder="12.345.678-5" maxLength={12} />
<TextoAnimado
  valor={rut}
  variante={esValido ? "exito" : "error"}
  etiqueta={esValido ? "RUT válido" : "RUT inválido"}
/>`,
};

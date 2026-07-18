import { useState } from "react";
import formatearMonedaCode from "../../methods/formatearMoneda.ts?raw";
import { formatearMoneda, procesarInputMoneda } from "../../methods/formatearMoneda";
import { Input } from "../../componentsUI/Input";
import { TextoAnimado } from "../../componentsUI/TextoAnimado";
import type { MethodEntry } from "./types";

function FormatearMonedaDemo() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState("$0");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const { formateado } = procesarInputMoneda(raw);
    setInput(formateado === "$0" ? "" : formateado);
    setResultado(formateado);
  }

  // Ejemplos rápidos
  const ejemplos = [50000, 150000, 1500000, 25000000];

  return (
    <div className="w-full max-w-md space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Ingresa un monto
        </label>
        <Input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="$0"
        />
      </div>

      {/* Resultado animado usando TextoAnimado */}
      <TextoAnimado valor={resultado} variante="moneda" etiqueta="Valor formateado" />

      {/* Ejemplos clickeables */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          Prueba rápida
        </p>
        <div className="flex flex-wrap gap-2">
          {ejemplos.map((monto) => (
            <button
              key={monto}
              type="button"
              onClick={() => {
                const formateado = formatearMoneda(monto);
                setInput(formateado);
                setResultado(formateado);
              }}
              className="rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-[#0572CE] hover:text-[#0572CE] hover:bg-blue-50 transition-all duration-200 active:scale-95"
            >
              {formatearMoneda(monto)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const formatearMonedaEntry: MethodEntry = {
  name: "Formateo de Moneda",
  description:
    "Utiliza: TextoAnimado. Formatea números como pesos chilenos (CLP) con separador de miles. Incluye procesador de input en tiempo real y extractor de valor numérico.",
  code: formatearMonedaCode,
  group: "Formateo",
  signature: `function formatearMoneda(valor: number | string): string
function limpiarMoneda(valor: string): number
function procesarInputMoneda(valor: string): { formateado: string; numerico: number }`,
  demo: () => <FormatearMonedaDemo />,
  usageCode: `import { formatearMoneda, procesarInputMoneda, limpiarMoneda } from "@/methods/formatearMoneda";
import { TextoAnimado } from "@/componentsUI/TextoAnimado";

// Formatear un número directamente
formatearMoneda(1500000);  // "$1.500.000"
formatearMoneda(-250000);  // "-$250.000"

// En un input reactivo con TextoAnimado
const [monto, setMonto] = useState("");
const [resultado, setResultado] = useState("$0");

function handleChange(e) {
  const { formateado } = procesarInputMoneda(e.target.value);
  setMonto(formateado);
  setResultado(formateado);
}

<Input value={monto} onChange={handleChange} placeholder="$0" />
<TextoAnimado valor={resultado} variante="moneda" etiqueta="Total" />

// Extraer valor numérico para enviar al backend
const numerico = limpiarMoneda("$1.500.000"); // 1500000`,
};

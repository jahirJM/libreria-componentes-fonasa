import { useState } from "react";
import textoAnimadoCode from "../../componentsUI/TextoAnimado.tsx?raw";
import { TextoAnimado } from "../../componentsUI/TextoAnimado";
import { Input } from "../../componentsUI/Input";
import type { ComponentEntry } from "./types";

function DemoNormal() {
  const [valor, setValor] = useState("Hola Fonasa");
  return (
    <div className="w-full space-y-3">
      <Input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Escribe algo..."
      />
      <TextoAnimado valor={valor} etiqueta="Resultado" />
    </div>
  );
}

function DemoGrande() {
  const [valor, setValor] = useState("$1.500.000");
  const ejemplos = ["$50.000", "$150.000", "$1.500.000", "$25.000.000"];
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-2 flex-wrap">
        {ejemplos.map((ej) => (
          <button
            key={ej}
            type="button"
            onClick={() => setValor(ej)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-[#0572CE] hover:text-[#0572CE] transition-all active:scale-95"
          >
            {ej}
          </button>
        ))}
      </div>
      <TextoAnimado valor={valor} variante="grande" etiqueta="Monto" />
    </div>
  );
}

function DemoMoneda() {
  const [monto, setMonto] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const soloDigitos = e.target.value.replace(/[^0-9]/g, "");
    const numero = parseInt(soloDigitos, 10) || 0;
    const formateado = numero > 0
      ? `$${numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
      : "";
    setMonto(formateado);
  }
  return (
    <div className="w-full space-y-3">
      <Input type="text" value={monto} onChange={handleChange} placeholder="Ingresa un monto..." />
      <TextoAnimado valor={monto || "$0"} variante="moneda" etiqueta="Total" />
    </div>
  );
}

function DemoCodigo() {
  const [valor, setValor] = useState("console.log('hola')");
  return (
    <div className="w-full space-y-3">
      <Input type="text" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Código..." />
      <TextoAnimado valor={valor} variante="codigo" etiqueta="Output" />
    </div>
  );
}

function DemoExito() {
  return (
    <TextoAnimado valor="Operación completada con éxito" variante="exito" etiqueta="Estado" />
  );
}

function DemoError() {
  return (
    <TextoAnimado valor="Error al procesar la solicitud" variante="error" etiqueta="Estado" />
  );
}

export const textoAnimadoEntry: ComponentEntry = {
  name: "Texto Animado",
  description:
    "Componente que muestra un valor con animación suave tipo slot-machine al cambiar. Ideal para resultados de formateo, montos, o cualquier dato dinámico.",
  code: textoAnimadoCode,
  colors: [
    { name: "Fondo (sutil)", value: "#f9fafb", usage: "Fondo variante normal" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Fondo degradado variante grande" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes del contenedor" },
    { name: "Fondos (dark)", value: "#1f2937", usage: "Texto principal variantes normal y grande" },
    { name: "Fondos (overlay)", value: "#111827", usage: "Fondo variante código" },
    { name: "Fondo (aprobado)", value: "#f0fdf4", usage: "Fondo variante moneda" },
    { name: "Fondo (éxito)", value: "#dcfce7", usage: "Borde variante moneda" },
    { name: "Ícono confirmación", value: "#22c55e", usage: "Texto variante código" },
    { name: "Texto (aprobado)", value: "#15803d", usage: "Texto variante moneda" },
    { name: "Fondo (aprobado)", value: "#f0fdf4", usage: "Fondo variante éxito" },
    { name: "Fondo (éxito)", value: "#dcfce7", usage: "Borde variante éxito" },
    { name: "Texto (aprobado)", value: "#15803d", usage: "Texto variante éxito" },
    { name: "Fondo (rechazado)", value: "#fef2f2", usage: "Fondo variante error" },
    { name: "Fondo (error)", value: "#fee2e2", usage: "Borde variante error" },
    { name: "Texto (rechazado)", value: "#b91c1c", usage: "Texto variante error" },
  ],
  propsInterface: `type Variante = "normal" | "grande" | "moneda" | "codigo" | "exito" | "error";

interface TextoAnimadoProps {
  /** El valor/texto a mostrar con animación */
  valor: string;
  /** Variante visual del contenedor */
  variante?: Variante;
  /** Etiqueta superior (opcional) */
  etiqueta?: string;
  /** Duración de la animación en ms (default: 200) */
  duracion?: number;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}`,
  variants: [
    {
      label: "Normal (input reactivo)",
      props: { valor: "Hola Fonasa", etiqueta: "Resultado" },
      render: () => <DemoNormal />,
      usageCode: `<TextoAnimado valor={miValor} etiqueta="Resultado" />`,
    },
    {
      label: "Grande (montos)",
      props: { valor: "$1.500.000", variante: "grande" },
      render: () => <DemoGrande />,
      usageCode: `<TextoAnimado valor="$1.500.000" variante="grande" etiqueta="Monto" />`,
    },
    {
      label: "Moneda",
      props: { valor: "$0", variante: "moneda" },
      render: () => <DemoMoneda />,
      usageCode: `<TextoAnimado valor={montoFormateado} variante="moneda" etiqueta="Total" />`,
    },
    {
      label: "Código",
      props: { valor: "console.log('hola')", variante: "codigo" },
      render: () => <DemoCodigo />,
      usageCode: `<TextoAnimado valor={codigo} variante="codigo" etiqueta="Output" />`,
    },
    {
      label: "Éxito",
      props: { valor: "Operación completada", variante: "exito" },
      render: () => <DemoExito />,
      usageCode: `<TextoAnimado valor="Operación completada con éxito" variante="exito" etiqueta="Estado" />`,
    },
    {
      label: "Error",
      props: { valor: "Error al procesar", variante: "error" },
      render: () => <DemoError />,
      usageCode: `<TextoAnimado valor="Error al procesar la solicitud" variante="error" etiqueta="Estado" />`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => (
        <div className="max-w-xs">
          <TextoAnimado valor="" variante="grande" etiqueta="Resultado" isLoading />
        </div>
      ),
      usageCode: `<TextoAnimado valor="" variante="grande" etiqueta="Resultado" isLoading />`,
    },
  ],
};

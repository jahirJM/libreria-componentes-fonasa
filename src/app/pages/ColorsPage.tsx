import { useState } from "react";
import { FonasaToaster, fonasaToast } from "../../componentsUI/Toast";

interface ColorSwatch {
  name: string;
  value: string;
  textClass?: string;
  description?: string;
}

interface ColorSection {
  title: string;
  description?: string;
  colors: ColorSwatch[];
}

function ColorPreview({ color }: { color: ColorSwatch }) {
  const isBackground =
    color.name.toLowerCase().includes("fondo") ||
    color.description?.toLowerCase().includes("fondo") ||
    color.name.includes("50") ||
    color.name.includes("100");

  const isText =
    color.name.toLowerCase().includes("texto") ||
    color.description?.toLowerCase().includes("texto") ||
    color.description?.toLowerCase().includes("párrafo");

  const isBorder =
    color.name.toLowerCase().includes("borde") ||
    color.description?.toLowerCase().includes("borde") ||
    color.description?.toLowerCase().includes("divider");

  const isButton =
    color.description?.toLowerCase().includes("botón") ||
    color.description?.toLowerCase().includes("botones") ||
    color.description?.toLowerCase().includes("hover");

  if (isButton) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          className="px-4 py-2 text-white text-xs font-medium rounded-md"
          style={{ backgroundColor: color.value }}
        >
          Botón ejemplo
        </button>
        <span className="text-[10px] text-gray-500">Botón</span>
      </div>
    );
  }

  if (isText) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium" style={{ color: color.value }}>
          Texto de ejemplo
        </p>
        <span className="text-[10px] text-gray-500">Texto</span>
      </div>
    );
  }

  if (isBorder) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-full h-10 rounded-md bg-white"
          style={{ border: `2px solid ${color.value}` }}
        />
        <span className="text-[10px] text-gray-500">Borde</span>
      </div>
    );
  }

  if (isBackground) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-full h-10 rounded-md flex items-center justify-center"
          style={{ backgroundColor: color.value }}
        >
          <span className="text-[10px] text-gray-700">Contenido</span>
        </div>
        <span className="text-[10px] text-gray-500">Fondo</span>
      </div>
    );
  }

  // Default: muestra como un badge/pill
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full"
        style={{ backgroundColor: color.value }}
      >
        {color.name}
      </span>
      <span className="text-[10px] text-gray-500">Badge</span>
    </div>
  );
}

function Swatch({ color }: { color: ColorSwatch }) {
  const [copied, setCopied] = useState(false);

  const isLight =
    color.value.toLowerCase().includes("ff") ||
    color.value.toLowerCase().includes("fa") ||
    color.value.toLowerCase().includes("f7") ||
    color.value.toLowerCase().includes("e8") ||
    color.value.toLowerCase().includes("d4") ||
    ["#ffffff", "#fafdff", "#D4E8F7"].some(
      (c) => c.toLowerCase() === color.value.toLowerCase()
    );

  function handleCopy() {
    navigator.clipboard.writeText(color.value);
    fonasaToast.success(`Color ${color.value} copiado`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="relative group flex flex-col gap-1.5 cursor-pointer"
      onClick={handleCopy}
    >
      <div
        className="h-20 w-full rounded-lg border border-gray-200 shadow-sm flex items-end p-2 hover:ring-2 hover:ring-[#0572CE] transition-all relative"
        style={{ backgroundColor: color.value }}
      >
        <span
          className={`text-[10px] font-mono font-medium ${isLight ? "text-gray-800" : "text-white"}`}
        >
          {color.value}
        </span>

        {/* Check overlay */}
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
            <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Hover preview */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 hidden group-hover:block">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[160px]">
          <ColorPreview color={color} />
        </div>
        <div className="w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">{color.name}</p>
        {color.description && (
          <p className="text-xs text-gray-500">{color.description}</p>
        )}
      </div>
    </div>
  );
}

export function slugifySection(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Section({ section }: { section: ColorSection }) {
  return (
    <div id={slugifySection(section.title)} className="mb-10 scroll-mt-20">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{section.title}</h3>
      {section.description && (
        <p className="text-sm text-gray-500 mb-4">{section.description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {section.colors.map((color) => (
          <Swatch key={color.name + color.value} color={color} />
        ))}
      </div>
    </div>
  );
}

export const colorSections: ColorSection[] = [
  {
    title: "Colores Institucionales",
    description:
      "Paleta principal de Fonasa. Estos son los colores oficiales usados en títulos, acciones principales y elementos de marca.",
    colors: [
      {
        name: "Color primario (prestadores naturales)",
        value: "#008CB5",
        description: "Títulos, stepper, textos activos",
      },
      {
        name: "Color primario (fonasa)",
        value: "#0572CE",
        description: "Sidebar, botones primarios, spinner",
      },
      {
        name: "Color secundario (fondos)",
        value: "rgba(1,91,147,0.68)",
        description: "Badge documentos, hover acciones",
      },
      {
        name: "Color secundario (fondos)",
        value: "#D4E8F7",
        description: "Elementos informativos/opcionales",
      },
      {
        name: "Color secundario (fondos)",
        value: "#fafdff",
        description: "Fondo footer",
      },
    ],
  },
  {
    title: "Grises — Estados y Fondos",
    description:
      "Escala de grises usada para estados deshabilitados, bordes, fondos neutros y textos secundarios.",
    colors: [
      { name: "Fondo (sutil)", value: "#f9fafb", description: "gray-50" },
      { name: "Fondo (cards)", value: "#f3f4f6", description: "gray-100" },
      { name: "Bordes (suaves)", value: "#e5e7eb", description: "gray-200" },
      { name: "Bordes (dividers)", value: "#d1d5db", description: "gray-300" },
      { name: "Texto (placeholder)", value: "#9ca3af", description: "gray-400" },
      { name: "Texto (secundario)", value: "#6b7280", description: "gray-500" },
      { name: "Texto (medio)", value: "#4b5563", description: "gray-600" },
      { name: "Texto (fondos claros)", value: "#374151", description: "gray-700" },
      { name: "Fondos (dark)", value: "#1f2937", description: "gray-800" },
      { name: "Fondos (overlay)", value: "#111827", description: "gray-900" },
      { name: "Texto (párrafos)", value: "#414951", description: "Secondary" },
    ],
  },
  {
    title: "Azules — Selecciones e Información",
    description:
      "Tonos azules para estados de selección, revisión, hovers e indicadores informativos.",
    colors: [
      {
        name: "blue-50",
        value: "#eff6ff",
        description: "Fondo badge revisión",
      },
      {
        name: "blue-100",
        value: "#dbeafe",
        description: "Fondo selecciones",
      },
      {
        name: "blue-300",
        value: "#93c5fd",
        description: "Bordes selección",
      },
      { name: "blue-600", value: "#2563eb", description: "Botones hover" },
      {
        name: "blue-700",
        value: "#1d4ed8",
        description: "Texto badge revisión",
      },
      { name: "blue-800", value: "#1e40af", description: "Texto links" },
      { name: "blue-900", value: "#1e3a5f", description: "Focus ring inputs" },
    ],
  },
  {
    title: "Estados — Badges",
    description:
      "Colores de fondo y texto para los badges de estado (aprobado, rechazado, pendiente).",
    colors: [
      { name: "Fondo (aprobado)", value: "#f0fdf4", description: "green-50" },
      { name: "Texto (aprobado)", value: "#15803d", description: "green-700" },
      { name: "Fondo (rechazado)", value: "#fef2f2", description: "red-50" },
      { name: "Texto (rechazado)", value: "#b91c1c", description: "red-700" },
      { name: "Fondo (pendiente)", value: "#fefce8", description: "yellow-50" },
      { name: "Texto (pendiente)", value: "#a16207", description: "yellow-700" },
    ],
  },
  {
    title: "Notificaciones / Respuestas",
    description:
      "Colores de fondo y texto para toasts, alertas y mensajes de respuesta del sistema.",
    colors: [
      { name: "Fondo (éxito)", value: "#dcfce7", description: "green-100" },
      { name: "Texto (éxito)", value: "#166534", description: "green-800" },
      { name: "Fondo (error)", value: "#fee2e2", description: "red-100" },
      { name: "Texto (error)", value: "#991b1b", description: "red-800" },
      { name: "Fondo (precaución)", value: "#fef9c3", description: "yellow-100" },
      { name: "Texto (precaución)", value: "#78350f", description: "amber-900" },
    ],
  },
  {
    title: "Barras de Entorno",
    description:
      "Colores de fondo y texto para las barras indicadoras de entorno (desarrollo y QA).",
    colors: [
      { name: "Fondo (desarrollo)", value: "#ca8a04", description: "yellow-600" },
      { name: "Texto (desarrollo)", value: "#713f12", description: "yellow-900" },
      { name: "Fondo (QA)", value: "#dc2626", description: "red-600" },
      { name: "Texto (QA)", value: "#7f1d1d", description: "red-900" },
    ],
  },
  {
    title: "Variantes",
    description:
      "Colores auxiliares para íconos, bordes, botones y acciones.",
    colors: [
      { name: "Ícono confirmación", value: "#22c55e", description: "green-500" },
      { name: "Borde confirmación", value: "#16a34a", description: "green-600" },
      { name: "Bordes error, íconos", value: "#ef4444", description: "red-500" },
      { name: "Botón eliminar", value: "#dc2626", description: "red-600" },
      { name: "Borde pendiente", value: "#ca8a04", description: "yellow-600" },
      { name: "Ícono advertencia", value: "#f59e0b", description: "amber-500" },
      { name: "Botón advertencia hover", value: "#d97706", description: "amber-600" },
      { name: "Hover botón toast éxito", value: "#06b6d4", description: "cyan-500" },
      { name: "Botón toast éxito", value: "#0891b2", description: "cyan-600" },
    ],
  },
];

export function ColorsPage() {
  return (
    <div>
      <FonasaToaster />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Paleta de Colores
        </h1>
        <p className="text-gray-500">
          Colores institucionales y funcionales usados en los componentes de
          Fonasa. Organizados por propósito para facilitar la consistencia
          visual.
        </p>
      </div>

      {colorSections.map((section) => (
        <Section key={section.title} section={section} />
      ))}
    </div>
  );
}

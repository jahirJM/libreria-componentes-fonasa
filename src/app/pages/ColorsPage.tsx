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
  const isLight =
    color.value.toLowerCase().includes("ff") ||
    color.value.toLowerCase().includes("fa") ||
    color.value.toLowerCase().includes("f7") ||
    color.value.toLowerCase().includes("e8") ||
    color.value.toLowerCase().includes("d4") ||
    ["#ffffff", "#fafdff", "#D4E8F7"].some(
      (c) => c.toLowerCase() === color.value.toLowerCase()
    );

  return (
    <div className="relative group flex flex-col gap-1.5">
      <div
        className="h-20 w-full rounded-lg border border-gray-200 shadow-sm flex items-end p-2"
        style={{ backgroundColor: color.value }}
      >
        <span
          className={`text-[10px] font-mono font-medium ${isLight ? "text-gray-800" : "text-white"}`}
        >
          {color.value}
        </span>
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

function Section({ section }: { section: ColorSection }) {
  return (
    <div className="mb-10">
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

const colorSections: ColorSection[] = [
  {
    title: "Colores Institucionales",
    description:
      "Paleta principal de Fonasa. Estos son los colores oficiales usados en títulos, acciones principales y elementos de marca.",
    colors: [
      {
        name: "Primary (Celeste/Teal)",
        value: "#008CB5",
        description: "Títulos, stepper, textos activos",
      },
      {
        name: "Azul Fonasa",
        value: "#0572CE",
        description: "Sidebar, botones primarios, spinner",
      },
      {
        name: "Azul Oscuro",
        value: "rgba(1,91,147,0.68)",
        description: "Badge documentos, hover acciones",
      },
      {
        name: "Celeste Claro",
        value: "#D4E8F7",
        description: "Elementos informativos/opcionales",
      },
      {
        name: "Blanco Azulado",
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
      { name: "gray-50", value: "#f9fafb", description: "Fondo sutil" },
      { name: "gray-100", value: "#f3f4f6", description: "Fondo cards" },
      { name: "gray-200", value: "#e5e7eb", description: "Bordes suaves" },
      { name: "gray-300", value: "#d1d5db", description: "Bordes, dividers" },
      { name: "gray-400", value: "#9ca3af", description: "Texto placeholder" },
      { name: "gray-500", value: "#6b7280", description: "Texto secundario" },
      { name: "gray-600", value: "#4b5563", description: "Texto medio" },
      {
        name: "gray-700",
        value: "#374151",
        description: "Texto en fondos claros",
      },
      {
        name: "gray-800",
        value: "#1f2937",
        description: "Fondos dark, bordes dark",
      },
      {
        name: "gray-900",
        value: "#111827",
        description: "Overlay, fondos oscuros",
      },
      {
        name: "Secondary (texto)",
        value: "#414951",
        description: "Párrafos, spans, listas",
      },
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
    title: "Verdes — Éxito y Aprobación",
    description:
      "Indicadores de estado exitoso, documentos válidos y solicitudes aprobadas.",
    colors: [
      {
        name: "green-50",
        value: "#f0fdf4",
        description: "Fondo badge aprobada",
      },
      {
        name: "green-100",
        value: "#dcfce7",
        description: "Fondo confirmación",
      },
      {
        name: "green-500",
        value: "#22c55e",
        description: "Ícono confirmación",
      },
      {
        name: "green-600",
        value: "#16a34a",
        description: "Borde confirmación",
      },
      {
        name: "green-700",
        value: "#15803d",
        description: "Texto badge aprobada",
      },
      {
        name: "green-800",
        value: "#166534",
        description: "Texto éxito fuerte",
      },
    ],
  },
  {
    title: "Rojos — Errores y Rechazos",
    description:
      "Indicadores de error, validaciones fallidas, solicitudes rechazadas y alertas críticas.",
    colors: [
      { name: "red-50", value: "#fef2f2", description: "Fondo badge rechazada" },
      { name: "red-100", value: "#fee2e2", description: "Fondo error suave" },
      { name: "red-500", value: "#ef4444", description: "Bordes error, íconos" },
      { name: "red-600", value: "#dc2626", description: "Botón eliminar" },
      { name: "red-700", value: "#b91c1c", description: "Texto badge rechazada" },
      { name: "red-800", value: "#991b1b", description: "Texto error fuerte" },
      {
        name: "red-900",
        value: "#7f1d1d",
        description: "Barra entorno QA",
      },
    ],
  },
  {
    title: "Amarillos — Advertencias y Pendientes",
    description:
      "Estados pendientes, badges de espera y barras de advertencia de entorno.",
    colors: [
      {
        name: "yellow-50",
        value: "#fefce8",
        description: "Fondo badge pendiente",
      },
      {
        name: "yellow-100",
        value: "#fef9c3",
        description: "Fondo warning suave",
      },
      {
        name: "yellow-600",
        value: "#ca8a04",
        description: "Borde pendiente",
      },
      {
        name: "yellow-700",
        value: "#a16207",
        description: "Texto badge pendiente",
      },
      {
        name: "yellow-900",
        value: "#713f12",
        description: "Barra entorno dev",
      },
    ],
  },
  {
    title: "Ámbar — Alertas",
    description:
      "Tonos ámbar para mensajes de advertencia y alertas no críticas.",
    colors: [
      {
        name: "amber-500",
        value: "#f59e0b",
        description: "Ícono advertencia",
      },
      {
        name: "amber-600",
        value: "#d97706",
        description: "Botón advertencia hover",
      },
      {
        name: "amber-900",
        value: "#78350f",
        description: "Texto advertencia fuerte",
      },
    ],
  },
  {
    title: "Cyan — Acciones y Feedback",
    description: "Tonos cyan/teal para acciones de confirmación y feedback positivo.",
    colors: [
      {
        name: "cyan-500",
        value: "#06b6d4",
        description: "Hover botón toast éxito",
      },
      {
        name: "cyan-600",
        value: "#0891b2",
        description: "Botón toast éxito",
      },
    ],
  },
];

export function ColorsPage() {
  return (
    <div>
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

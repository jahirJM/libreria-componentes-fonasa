import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
}

/**
 * Calcula el rango visible de páginas centrado en la página actual.
 * Muestra hasta 5 páginas y se desplaza al navegar.
 */
function calcularRangoVisible(
  paginaActual: number,
  totalPaginas: number,
): number[] {
  const maxVisible = 5;

  if (totalPaginas <= maxVisible) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  // Centrar en la página actual
  let inicio = paginaActual - Math.floor(maxVisible / 2);
  let fin = inicio + maxVisible - 1;

  // Ajustar si se sale por la izquierda
  if (inicio < 1) {
    inicio = 1;
    fin = maxVisible;
  }

  // Ajustar si se sale por la derecha
  if (fin > totalPaginas) {
    fin = totalPaginas;
    inicio = totalPaginas - maxVisible + 1;
  }

  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
}

export const Paginacion = ({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  isLoading = false,
}: PaginacionProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-1 mt-4 animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-8 bg-gray-200 rounded-md" />
        ))}
        <div className="h-8 w-8 bg-gray-200 rounded-md" />
      </div>
    );
  }

  if (totalPaginas <= 1) return null;

  const rangoVisible = calcularRangoVisible(paginaActual, totalPaginas);
  const hayAnterior = paginaActual > 1;
  const haySiguiente = paginaActual < totalPaginas;

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        type="button"
        disabled={!hayAnterior}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className="p-1.5 rounded-md text-[#0572CE] hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronLeft className="size-4" />
      </button>

      {rangoVisible.map((pagina) => (
        <button
          key={pagina}
          type="button"
          onClick={() => onCambiarPagina(pagina)}
          className={`cursor-pointer min-w-[32px] h-8 px-2 rounded-md text-xs font-medium transition-colors ${
            pagina === paginaActual
              ? "bg-[#0572CE] text-white shadow-sm"
              : "text-[#0572CE] hover:bg-blue-100"
          }`}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        disabled={!haySiguiente}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="p-1.5 rounded-md text-[#0572CE] hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight className="size-4" />
      </button>
    </div>
  );
};

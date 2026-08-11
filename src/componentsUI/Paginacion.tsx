import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
  /** Si true, fuerza la vista compacta (3 primeros + ... + 3 últimos) */
  forceCompact?: boolean;
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

  let inicio = paginaActual - Math.floor(maxVisible / 2);
  let fin = inicio + maxVisible - 1;

  if (inicio < 1) {
    inicio = 1;
    fin = maxVisible;
  }

  if (fin > totalPaginas) {
    fin = totalPaginas;
    inicio = totalPaginas - maxVisible + 1;
  }

  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
}

/**
 * Calcula el rango compacto: primera + ... + última.
 * Si hay 3 o menos páginas, muestra todas sin ellipsis.
 */
function calcularRangoCompacto(
  totalPaginas: number,
): (number | "ellipsis")[] {
  if (totalPaginas <= 3) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  return [1, "ellipsis" as const, totalPaginas];
}

export const Paginacion = ({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  isLoading = false,
  forceCompact = false,
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
  const rangoCompacto = calcularRangoCompacto(totalPaginas);
  const hayAnterior = paginaActual > 1;
  const haySiguiente = paginaActual < totalPaginas;

  const botonPagina = (pagina: number) => (
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
  );

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

      {/* Vista desktop (sm+): rango normal */}
      <div className={forceCompact ? "hidden" : "hidden sm:flex items-center gap-1"}>
        {rangoVisible.map((pagina) => botonPagina(pagina))}
      </div>

      {/* Vista mobile (< sm) o forceCompact: 3 primeros + ... + 3 últimos */}
      <div className={forceCompact ? "flex items-center gap-1" : "flex sm:hidden items-center gap-1"}>
        {rangoCompacto.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="min-w-[32px] h-8 flex items-center justify-center text-xs text-gray-400">
              ...
            </span>
          ) : (
            botonPagina(item)
          )
        )}
      </div>

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

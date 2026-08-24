import { useState, useCallback, useRef, type ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import clsx from "clsx";

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

export interface CarouselProps<T> {
  /** Array de items a mostrar en el carrusel. */
  items: T[];
  /** Función que renderiza cada item. Recibe el item y su índice global. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Columnas por página. @default 1 */
  cols?: number;
  /** Filas por página. @default 1 */
  rows?: number;
  /** Página activa controlada (0-indexed). Si se omite, maneja estado interno. */
  page?: number;
  /** Callback al cambiar de página. */
  onPageChange?: (page: number) => void;
  /** Gap entre items (clases Tailwind). @default "gap-3" */
  gap?: string;
  /** Clases adicionales para el contenedor externo. */
  className?: string;
  /** Si true, muestra indicadores de página (dots). @default true */
  showDots?: boolean;
  /** Si true, muestra botones de navegación. @default true */
  showArrows?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Carrusel genérico con grilla configurable (cols × rows por página).
 * Soporta modo controlado y no controlado. Transición de deslizamiento horizontal.
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={colores}
 *   cols={3}
 *   rows={3}
 *   renderItem={(color) => (
 *     <div style={{ backgroundColor: color.value }} className="size-10 rounded" />
 *   )}
 * />
 * ```
 */
export function Carousel<T>({
  items,
  renderItem,
  cols = 1,
  rows = 1,
  page,
  onPageChange,
  gap = "gap-3",
  className,
  showDots = true,
  showArrows = true,
}: CarouselProps<T>) {
  const itemsPerPage = cols * rows;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = useState(0);
  const currentPage = isControlled ? page : internalPage;
  const trackRef = useRef<HTMLDivElement>(null);

  const goToPage = useCallback(
    (newPage: number) => {
      const clamped = Math.max(0, Math.min(newPage, totalPages - 1));
      if (!isControlled) {
        setInternalPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [isControlled, totalPages, onPageChange]
  );

  const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  return (
    <div className={clsx("flex flex-col", className)}>
      {/* Slide container */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {/* Render all pages as flex children */}
          {Array.from({ length: totalPages }, (_, pageIdx) => {
            const startIdx = pageIdx * itemsPerPage;
            const pageItems = items.slice(startIdx, startIdx + itemsPerPage);

            return (
              <div
                key={pageIdx}
                className="w-full flex-shrink-0"
              >
                <div
                  className={clsx("grid", gap)}
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, auto))`,
                  }}
                >
                  {pageItems.map((item, idx) => (
                    <div key={startIdx + idx}>
                      {renderItem(item, startIdx + idx)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      {totalPages > 1 && (showDots || showArrows) && (
        <div className="flex items-center justify-center gap-2 mt-3">
          {/* Previous arrow */}
          {showArrows && (
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className={clsx(
                "p-1 rounded-md transition-colors cursor-pointer",
                currentPage === 0
                  ? "text-gray-300 !cursor-not-allowed"
                  : "text-gray-500 hover:text-[#0572CE] hover:bg-gray-100"
              )}
              aria-label="Página anterior"
            >
              <LuChevronLeft className="size-4" />
            </button>
          )}

          {/* Dots */}
          {showDots && (
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={clsx(
                    "size-2 rounded-full transition-colors duration-200 cursor-pointer",
                    i === currentPage
                      ? "bg-[#0572CE]"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Next arrow */}
          {showArrows && (
            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className={clsx(
                "p-1 rounded-md transition-colors cursor-pointer",
                currentPage === totalPages - 1
                  ? "text-gray-300 !cursor-not-allowed"
                  : "text-gray-500 hover:text-[#0572CE] hover:bg-gray-100"
              )}
              aria-label="Página siguiente"
            >
              <LuChevronRight className="size-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

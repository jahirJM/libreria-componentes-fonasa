import { useCallback, useRef, useState } from "react";
import { Paginacion } from "../../componentsUI/Paginacion";

export function PaginacionDemo({ totalPaginas }: { totalPaginas: number }) {
  const [pagina, setPagina] = useState(1);
  return (
    <Paginacion
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      onCambiarPagina={setPagina}
    />
  );
}

function PaginacionResponsiveWrapper({ children }: { children: (forceCompact: boolean) => React.ReactNode }) {
  const [forceCompact, setForceCompact] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleResize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setForceCompact(el.offsetWidth < 350);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 400;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(200, startWidth + delta);
      setWidth(newWidth);
      setTimeout(handleResize, 0);
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [handleResize]);

  return (
    <div className="relative flex">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children(forceCompact)}
      </div>
      {/* Handle de resize */}
      <div
        onMouseDown={handleMouseDown}
        className="w-2 cursor-col-resize flex items-center justify-center shrink-0 group"
        title="Arrastrar para redimensionar"
      >
        <div className="w-1 h-10 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
      </div>
    </div>
  );
}

export function PaginacionResizeDemo() {
  const [pagina, setPagina] = useState(1);

  return (
    <PaginacionResponsiveWrapper>
      {(compact) => (
        <Paginacion
          paginaActual={pagina}
          totalPaginas={20}
          onCambiarPagina={setPagina}
          forceCompact={compact}
        />
      )}
    </PaginacionResponsiveWrapper>
  );
}
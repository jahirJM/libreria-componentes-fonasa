import { useCallback, useEffect, useRef, useState } from "react";
import { Stepper } from "../../componentsUI/Stepper";
import { BotonPrimario, BotonSecundario } from "../../componentsUI/Botones";

function StepperResponsiveWrapper({ children }: { children: (forceMobile: boolean) => React.ReactNode }) {
  const [forceMobile, setForceMobile] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const initialWidth = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (initialWidth.current === null) {
          initialWidth.current = w;
        }
        setForceMobile(w < initialWidth.current * 0.7);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 600;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(200, startWidth + delta);
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="relative flex">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children(forceMobile)}
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

export function StepperDemo({
  pasos,
  navegable,
  forceMobile,
  conResize,
}: {
  pasos: { id: string; label: string }[];
  navegable?: boolean;
  forceMobile?: boolean;
  conResize?: boolean;
}) {
  const [paso, setPaso] = useState(1);

  const botones = (
    <div className="flex justify-center gap-2 mt-2">
      <BotonSecundario
        label="Anterior"
        onClick={() => setPaso((p) => Math.max(1, p - 1))}
      />
      <BotonPrimario
        label="Siguiente"
        onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
      />
    </div>
  );

  if (conResize) {
    return (
      <StepperResponsiveWrapper>
        {(mobile) => (
          <div>
            <Stepper
              pasos={pasos}
              pasoActual={paso}
              onCambiarPaso={setPaso}
              puedeNavegar={navegable}
              forceMobile={mobile}
            />
            {botones}
          </div>
        )}
      </StepperResponsiveWrapper>
    );
  }

  return (
    <div>
      <Stepper
        pasos={pasos}
        pasoActual={paso}
        onCambiarPaso={setPaso}
        puedeNavegar={navegable}
        forceMobile={forceMobile}
      />
      {botones}
    </div>
  );
}

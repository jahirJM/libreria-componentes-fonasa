import { useCallback, useRef, useState } from "react";
import { Select } from "../../componentsUI/Select";

function SelectResponsiveWrapper({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 400;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(80, startWidth + delta);
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
        className="relative overflow-hidden min-w-0"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children}
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

const opciones = [
  { value: "1", label: "Opción con texto largo para probar truncado" },
  { value: "2", label: "Otra opción también larga" },
  { value: "3", label: "Seleccione una prestación médica" },
];

export function SelectResizeDemo() {
  const [valor, setValor] = useState("1");

  return (
    <SelectResponsiveWrapper>
      <Select
        opciones={opciones}
        value={valor}
        onChange={setValor}
        placeholder="Seleccione una opción"
      />
    </SelectResponsiveWrapper>
  );
}

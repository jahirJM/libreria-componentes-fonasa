import { useCallback, useRef, useState } from "react";
import { SelectBuscable } from "../../componentsUI/SelectBuscable";

function SelectBuscableResponsiveWrapper({ children }: { children: React.ReactNode }) {
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
        className="relative overflow-hidden"
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
  { value: "1", label: "Consulta médica general ambulatoria" },
  { value: "2", label: "Examen de laboratorio clínico completo" },
  { value: "3", label: "Radiografía de tórax anteroposterior" },
  { value: "4", label: "Atención kinesiológica respiratoria" },
];

export function SelectBuscableResizeDemo() {
  const [valor, setValor] = useState("1");

  return (
    <SelectBuscableResponsiveWrapper>
      <SelectBuscable
        opciones={opciones}
        value={valor}
        onChange={setValor}
        placeholder="Seleccione prestación"
      />
    </SelectBuscableResponsiveWrapper>
  );
}

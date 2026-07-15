import { useState, useRef, useCallback } from "react";
import type { ComponentVariant } from "../../registry";
import { CodePanel } from "./CodePanel";

interface PreviewPanelProps {
  variant: ComponentVariant;
}

export function PreviewPanel({ variant }: PreviewPanelProps) {
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(e.clientX - rect.left, rect.width));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="rounded-lg border border-gray-800 overflow-hidden">
      {/* Label de la variante */}
      <div className="border-b border-gray-800 bg-gray-900 px-4 py-2">
        <span className="text-sm font-medium text-gray-300">
          {variant.label}
        </span>
      </div>

      {/* Preview en vivo */}
      <div
        ref={containerRef}
        className="bg-white p-8 flex items-start relative"
      >
        {variant.responsive ? (
          <>
            <div
              className="overflow-hidden border-r border-gray-200 @container"
              style={{ width: previewWidth ?? "100%" }}
            >
              {variant.render()}
            </div>
            {/* Handle de resize */}
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
              style={{ left: previewWidth ? `calc(${previewWidth}px + 2rem - 6px)` : "calc(100% - 2rem - 6px)" }}
            >
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </>
        ) : (
          <div className="w-full max-w-sm mx-auto">
            {variant.render()}
          </div>
        )}
      </div>

      {/* Código de uso */}
      <CodePanel code={variant.usageCode} />
    </div>
  );
}

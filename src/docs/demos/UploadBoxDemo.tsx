import { useCallback, useEffect, useRef, useState } from "react";
import { UploadBox } from "../../componentsUI/UploadBox";

function UploadBoxResponsiveWrapper({ children }: { children: (forceCompact: boolean) => React.ReactNode }) {
  const [forceCompact, setForceCompact] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        // sm breakpoint = 640px
        setForceCompact(w < 300);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth ?? 400;

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ev.clientX - startX;
      const newWidth = Math.max(100, startWidth + delta);
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

export function UploadBoxResizeDemo() {
  return (
    <UploadBoxResponsiveWrapper>
      {(compact) => (
        <UploadBox
          textStrong="Arrastra tu archivo aquí"
          text="o haz click para buscar"
          forceCompact={compact}
        />
      )}
    </UploadBoxResponsiveWrapper>
  );
}

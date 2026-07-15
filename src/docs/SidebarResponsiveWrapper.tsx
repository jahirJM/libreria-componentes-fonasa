import { useEffect, useRef, useState } from "react";

export function SidebarResponsiveWrapper({ children }: { children: (isOpen: boolean) => React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsOpen(width >= 500);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden">
      {children(isOpen)}
    </div>
  );
}
import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarItem {
  /** Texto visible del link */
  label: string;
  /** Ruta o href de destino */
  path: string;
  /** Si true, el match de activo es exacto (útil para "/" o home) */
  exact?: boolean;
}

export type NavbarVariant = "underline" | "pill";

export interface NavbarProps {
  /** Lista de items de navegación */
  items: NavbarItem[];
  /** Ruta activa actual */
  activePath?: string;
  /** Estilo del indicador activo: "underline" (barrita) o "pill" (botón redondeado) */
  variant?: NavbarVariant;
  /** URL o src del logo */
  logoSrc?: string;
  /** Alt text del logo */
  logoAlt?: string;
  /** Elemento custom para reemplazar el logo (tiene prioridad sobre logoSrc) */
  logoElement?: ReactNode;
  /** Título junto al logo */
  title?: string;
  /** Callback al hacer clic en un item */
  onNavigate?: (path: string) => void;
  /** Callback al hacer clic en el logo/título */
  onLogoClick?: () => void;
  /** Clases CSS adicionales para el contenedor nav */
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isActive(itemPath: string, activePath: string, exact?: boolean): boolean {
  if (exact) return activePath === itemPath;
  return activePath === itemPath || activePath.startsWith(itemPath + "/");
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar({
  items,
  activePath = "/",
  variant = "underline",
  logoSrc,
  logoAlt = "Logo",
  logoElement,
  title,
  onNavigate,
  onLogoClick,
  className = "",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Calculate the indicator position based on the active item
  const updateIndicator = useCallback(() => {
    const container = navContainerRef.current;
    if (!container) return;

    const activeItem = items.find((item) => isActive(item.path, activePath, item.exact));
    if (!activeItem) {
      setIndicatorStyle(null);
      return;
    }

    const activeEl = itemRefs.current.get(activeItem.path);
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - containerRect.left + itemRect.width / 2 - 12, // center a 24px bar
      width: 24,
    });

    // Enable transition after first paint so it doesn't animate on mount
    if (!hasAnimated) {
      requestAnimationFrame(() => setHasAnimated(true));
    }
  }, [activePath, items, hasAnimated]);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen && !mobileClosing) {
      setMobileClosing(true);
      setTimeout(() => {
        setMobileOpen(false);
        setMobileClosing(false);
      }, 200);
    }
  }, [activePath]);

  // Close on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => {
      if (mq.matches) {
        setMobileOpen(false);
        setMobileClosing(false);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Recalculate indicator on activePath or items change
  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  const handleItemClick = (path: string) => {
    onNavigate?.(path);
    closeMobile();
  };

  const closeMobile = () => {
    setMobileClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, 200);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-14 border-b border-gray-200 dark:border-[#1e3044] bg-white dark:bg-[#061018] shadow-sm transition-colors duration-200 ${className}`}
      >
        <div className="flex h-full items-center justify-between px-6">
          {/* Logo + Title + Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onLogoClick}
              className="flex items-center gap-2 focus:outline-none"
            >
              {logoElement ? (
                logoElement
              ) : logoSrc ? (
                <img src={logoSrc} alt={logoAlt} className="h-8 w-auto" />
              ) : null}
              {title && (
                <span className="text-lg font-bold text-[#0572CE]">
                  {title}
                </span>
              )}
            </button>

            {/* Desktop navigation */}
            <div ref={navContainerRef} className="relative hidden lg:flex items-center gap-1" role="navigation" aria-label="Navegación principal">
              {items.map((item) => {
                const active = isActive(item.path, activePath, item.exact);
                const pillClasses = active
                  ? "bg-[#0572CE] text-white rounded-2xl border border-transparent"
                  : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white rounded-2xl border border-transparent";
                const underlineClasses = active
                  ? "text-[#0572CE]"
                  : "text-gray-600 dark:text-[#94a3b8] hover:text-[#0572CE]";

                return (
                  <button
                    key={item.path}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.path, el);
                    }}
                    type="button"
                    onClick={() => handleItemClick(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                      variant === "pill" ? pillClasses : underlineClasses
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Animated underline indicator (only for "underline" variant) */}
              {variant === "underline" && indicatorStyle && (
                <span
                  className="absolute bottom-0 h-0.5 rounded-full bg-[#0572CE]"
                  style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    transition: hasAnimated ? "left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                  }}
                />
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => mobileOpen ? closeMobile() : setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#0572CE] hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay + panel */}
      {mobileOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/30 lg:hidden ${
              mobileClosing ? "animate-[fadeOut_0.2s_ease-in_both]" : "animate-[fadeIn_0.2s_ease-out_both]"
            }`}
            onClick={closeMobile}
            aria-hidden="true"
          />
          <aside
            className={`fixed top-14 right-0 bottom-0 z-45 w-72 max-w-[85vw] bg-white dark:bg-[#061018] border-l border-gray-200 dark:border-[#1e3044] shadow-lg overflow-y-auto lg:hidden ${
              mobileClosing ? "animate-[slideOutRight_0.2s_ease-in_both]" : "animate-[slideInRight_0.25s_ease-out_both]"
            }`}
            role="navigation"
            aria-label="Menú de navegación móvil"
          >
            <div className="p-4 space-y-1">
              {items.map((item) => {
                const active = isActive(item.path, activePath, item.exact);
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleItemClick(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full text-left block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#0572CE] text-white"
                        : "text-gray-700 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#111d2a] hover:text-[#0572CE]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

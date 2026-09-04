import { useState, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarVerticalItem {
  /** Texto visible del link */
  label: string;
  /** Ruta o href de destino */
  path: string;
  /** Ícono opcional (ReactNode para flexibilidad) */
  icon?: ReactNode;
  /** Si true, el match de activo es exacto (útil para "/" o home) */
  exact?: boolean;
}

export interface NavbarVerticalSection {
  /** Título de la sección (opcional) */
  title?: string;
  /** Items de navegación en esta sección */
  items: NavbarVerticalItem[];
}

export interface NavbarVerticalProps {
  /** Lista de items de navegación (simple) */
  items?: NavbarVerticalItem[];
  /** Secciones agrupadas (alternativa a items) */
  sections?: NavbarVerticalSection[];
  /** Ruta activa actual */
  activePath?: string;
  /** URL o src del logo */
  logoSrc?: string;
  /** Alt text del logo */
  logoAlt?: string;
  /** Elemento custom para reemplazar el logo */
  logoElement?: ReactNode;
  /** Título del navbar */
  title?: string;
  /** Si true, el navbar se muestra colapsado (solo íconos) */
  collapsed?: boolean;
  /** Si true, muestra el botón para colapsar/expandir (default: true) */
  collapsible?: boolean;
  /** Callback al hacer clic en un item */
  onNavigate?: (path: string) => void;
  /** Callback al hacer clic en el logo/título */
  onLogoClick?: () => void;
  /** Callback al colapsar/expandir */
  onToggleCollapse?: (collapsed: boolean) => void;
  /** Contenido adicional al final del navbar (ej: botón de logout) */
  footer?: ReactNode;
  /** Callback para cerrar sesión (muestra botón de logout en el footer) */
  onLogout?: () => void;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isActive(itemPath: string, activePath: string, exact?: boolean): boolean {
  if (exact) return activePath === itemPath;
  return activePath === itemPath || activePath.startsWith(itemPath + "/");
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

interface NavItemProps {
  item: NavbarVerticalItem;
  active: boolean;
  collapsed: boolean;
  onNavigate?: (path: string) => void;
}

function NavItem({ item, active, collapsed, onNavigate }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={() => onNavigate?.(item.path)}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer ${
        active
          ? "bg-[#0572CE] text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#0572CE]"
      }`}
    >
      {item.icon && (
        <span className={`flex-shrink-0 text-lg ${active ? "text-white" : "text-gray-500"}`}>
          {item.icon}
        </span>
      )}
      <span
        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100"
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Navbar vertical — barra de navegación lateral con soporte para
 * logo, título, secciones agrupadas, estado colapsado (solo íconos)
 * y footer personalizable.
 *
 * Al colapsar, el ancho se reduce y los textos se ocultan de forma
 * simultánea con una transición fluida. Muestra solo los íconos
 * con separadores entre secciones.
 *
 * @example
 * ```tsx
 * <NavbarVertical
 *   items={[
 *     { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
 *     { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
 *   ]}
 *   activePath="/inicio"
 *   logoSrc="/fonasa-favicon.ico"
 *   title="Mi App"
 *   collapsible
 *   onNavigate={(path) => navigate(path)}
 * />
 * ```
 */
export function NavbarVertical({
  items = [],
  sections,
  activePath = "/",
  logoSrc,
  logoAlt = "Logo",
  logoElement,
  title,
  collapsed = false,
  collapsible = true,
  onNavigate,
  onLogoClick,
  onToggleCollapse,
  footer,
  onLogout,
  className = "",
}: NavbarVerticalProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const isCollapsed = onToggleCollapse ? collapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!collapsed);
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  // Resolve navigation items (sections take priority)
  const resolvedSections: NavbarVerticalSection[] = sections ?? [{ items }];

  return (
    <div className={`relative flex-shrink-0 h-full ${className}`}>
      <nav
        className={`flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
        aria-label="Navegación vertical"
      >
        {/* Header: Logo + Title */}
        <div className="border-b border-gray-200 py-4 px-3">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="flex-shrink-0">
              {onLogoClick ? (
                <button
                  type="button"
                  onClick={onLogoClick}
                  className="flex items-center focus:outline-none cursor-pointer"
                >
                  {logoElement ? (
                    logoElement
                  ) : logoSrc ? (
                    <img src={logoSrc} alt={logoAlt} className="h-8 w-auto" />
                  ) : null}
                </button>
              ) : (
                <div className="flex items-center">
                  {logoElement ? (
                    logoElement
                  ) : logoSrc ? (
                    <img src={logoSrc} alt={logoAlt} className="h-8 w-auto" />
                  ) : null}
                </div>
              )}
            </div>

            {/* Title */}
            {title && (
              <span
                className={`text-lg font-bold text-[#0572CE] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100 flex-1"
                }`}
              >
                {title}
              </span>
            )}
          </div>
        </div>

      {/* Navigation items */}
      <div className={`flex-1 overflow-y-auto py-4 space-y-3 transition-all duration-300 ease-in-out ${isCollapsed ? "px-2" : "px-3"}`}>
        {resolvedSections.map((section, sIdx) => (
          <div key={sIdx}>
            {/* Separator between sections */}
            {sIdx > 0 && (
              <hr className="my-3 border-gray-200" />
            )}
            {/* Section title */}
            {section.title && !isCollapsed && (
              <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  active={isActive(item.path, activePath, item.exact)}
                  collapsed={isCollapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {(footer || onLogout) && (
        <div className={`border-t border-gray-200 py-3 transition-all duration-300 ease-in-out ${isCollapsed ? "px-2" : "px-3"}`}>
          {footer}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title={isCollapsed ? "Cerrar sesión" : undefined}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 cursor-pointer"
            >
              <span className="flex-shrink-0 text-lg">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
                </svg>
              </span>
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed ? "max-w-0 opacity-0" : "max-w-48 opacity-100"
                }`}
              >
                Cerrar sesión
              </span>
            </button>
          )}
        </div>
      )}
    </nav>

      {/* Toggle button — always visible, positioned at the right edge */}
      {collapsible && (
        <button
          type="button"
          onClick={handleToggle}
          className="absolute top-5 -right-3 z-10 p-1 rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-[#0572CE] shadow-sm transition-colors duration-150 cursor-pointer"
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <svg
            className={`size-4 transition-transform duration-300 ease-in-out ${isCollapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default NavbarVertical;

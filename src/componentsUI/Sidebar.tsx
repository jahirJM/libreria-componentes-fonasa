import { useState } from "react";
import type { IconType } from "react-icons";
import { LuUserRound, LuChevronDown } from "react-icons/lu";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarSubItem {
  label: string;
  path: string;
  /** Ícono opcional del subítem */
  icon?: IconType;
  /** Si true, el subítem se renderiza deshabilitado */
  isBlocked?: boolean;
  /** Tooltip cuando está bloqueado */
  blockedTooltip?: string;
}

export interface SidebarMenuItem {
  /** Texto visible del ítem */
  label: string;
  /** Ruta de destino */
  path: string;
  /** Ícono de react-icons */
  icon: IconType;
  /** Si true, el ítem se renderiza deshabilitado */
  isBlocked?: boolean;
  /** Tooltip cuando está bloqueado */
  blockedTooltip?: string;
  /** Subítems opcionales para menú desplegable */
  subItems?: SidebarSubItem[];
}

export interface SidebarProps {
  /** Nombre del usuario conectado */
  userName?: string;
  /** Título del panel */
  title?: string;
  /** Lista de ítems de navegación */
  menuItems?: SidebarMenuItem[];
  /** Ruta activa actual */
  activePath?: string;
  /** Visibilidad del sidebar (mobile) */
  isOpen?: boolean;
  /** Estado de carga — muestra skeleton */
  loading?: boolean;
  /** Callback al navegar */
  onNavigate?: (path: string) => void;
  /**
   * Clases CSS de posicionamiento del <aside>.
   * Por defecto usa `fixed top-14 left-0 z-20 w-62 h-[calc(100vh-3.5rem)]`
   * para comportamiento real en producción.
   */
  className?: string;
}

// ─── SidebarHeader ────────────────────────────────────────────────────────────

interface SidebarHeaderProps {
  title: string;
  userName: string;
}

function SidebarHeader({ title, userName }: SidebarHeaderProps) {
  return (
    <div className="my-5 text-center">
      <h2 className="text-gray-500 font-bold text-xl mb-3">{title}</h2>
      <hr className="text-gray-300" />
      <h3 className="mt-2 text-gray-500 text-sm">Usuario Conectado:</h3>
      <div className="flex items-center justify-center mt-2 mb-3">
        <LuUserRound className="text-[#0572CE] text-xl me-2" />
        <h3 className="text-[#0572CE] text-sm font-bold">{userName}</h3>
      </div>
      <hr className="text-gray-300" />
    </div>
  );
}

// ─── SidebarItem ──────────────────────────────────────────────────────────────

interface SidebarItemProps {
  item: SidebarMenuItem;
  isActive: boolean;
  activePath: string;
  onNavigate?: (path: string) => void;
}

function SidebarItem({ item, isActive, activePath, onNavigate }: SidebarItemProps) {
  const Icon = item.icon;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = (item.subItems?.length ?? 0) > 0;

  if (item.isBlocked) {
    return (
      <div
        className="flex items-center p-2 rounded-lg transition-colors duration-100 bg-gray-300 cursor-not-allowed opacity-60"
        title={item.blockedTooltip ?? "Esta opción no está disponible"}
      >
        <Icon className="flex-shrink-0 text-lg text-gray-500" />
        <span className="ml-3 font-semibold text-gray-500">{item.label}</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (hasSubItems) setIsExpanded((prev) => !prev);
          else onNavigate?.(item.path);
        }}
        className={`w-full flex items-center p-2 rounded-lg group transition-colors duration-100 ${
          isActive
            ? "bg-[#0572CE] text-white"
            : "text-gray-900 hover:bg-[#0572CE] hover:text-white"
        }`}
      >
        <Icon
          className={`flex-shrink-0 text-lg transition-colors duration-100 ${
            isActive ? "text-white" : "text-[#0572CE] group-hover:text-white"
          }`}
        />
        <span
          className={`ml-3 flex-1 text-left font-semibold transition-colors duration-100 ${
            isActive ? "text-white" : "text-[#0572CE] group-hover:text-white"
          }`}
        >
          {item.label}
        </span>
        {hasSubItems && (
          <LuChevronDown
            className={`text-sm transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            } ${isActive ? "text-white" : "text-[#0572CE] group-hover:text-white"}`}
          />
        )}
      </button>

      {hasSubItems && (
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-in-out"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
        >
          <ul className="overflow-hidden mt-1 space-y-1 pl-8">
            {item.subItems!.map((sub, i) => {
              const isSubActive = activePath === sub.path;
              const SubIcon = sub.icon;

              if (sub.isBlocked) {
                return (
                  <li key={i}>
                    <div
                      className="w-full flex items-center text-left px-2 py-1.5 text-sm rounded-lg bg-gray-300 cursor-not-allowed opacity-60"
                      title={sub.blockedTooltip ?? "Esta opción no está disponible"}
                    >
                      {SubIcon && (
                        <SubIcon className="shrink-0 text-sm mr-2 text-gray-500" />
                      )}
                      <span className="font-semibold text-gray-500">{sub.label}</span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(sub.path)}
                    className={`w-full flex items-center text-left px-2 py-1.5 text-sm rounded-lg group transition-colors duration-100 ${
                      isSubActive
                        ? "bg-[#0572CE] text-white font-semibold"
                        : "text-gray-600 hover:bg-[#0572CE] hover:text-white"
                    }`}
                  >
                    {SubIcon && (
                      <SubIcon
                        className={`shrink-0 text-base mr-2 transition-colors duration-100 ${
                          isSubActive ? "text-white" : "text-gray-600 group-hover:text-white"
                        }`}
                      />
                    )}
                    {sub.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

// ─── SidebarMenu ─────────────────────────────────────────────────────────────

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  activePath: string;
  onNavigate?: (path: string) => void;
}

function SidebarMenu({ items, activePath, onNavigate }: SidebarMenuProps) {
  const isActive = (item: SidebarMenuItem) => {
    // Si tiene subItems, el padre NO se marca activo (solo los subItems se marcan)
    if (item.subItems && item.subItems.length > 0) {
      return false;
    }
    return activePath === item.path || activePath.startsWith(`${item.path}/`);
  };

  return (
    <ul className="space-y-2 font-medium px-3 text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <SidebarItem
            item={item}
            isActive={isActive(item)}
            activePath={activePath}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

// ─── SidebarSkeleton ──────────────────────────────────────────────────────────

function SidebarSkeleton() {
  return (
    <div className="h-full px-3 py-4 animate-pulse">
      {/* Header skeleton */}
      <div className="my-5 text-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3" />
        <hr className="text-gray-300" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-3" />
        <div className="flex items-center justify-center mt-2 mb-3 gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>
        <hr className="text-gray-300" />
      </div>

      {/* Menu items skeleton */}
      <div className="space-y-3 px-3">
        <div className="flex items-center gap-3 p-2">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded flex-1" />
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-4 bg-gray-300 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  userName = "Usuario",
  title = "Gestión del Beneficiario",
  menuItems = [],
  activePath = "",
  isOpen = true,
  loading = false,
  onNavigate,
  className = "fixed top-14 left-0 z-20 w-62 h-[calc(100vh-3.5rem)]",
}: SidebarProps) {
  return (
    <aside
      id="sidebar"
      className={`${className} bg-gray-100 border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <div className="h-full px-3 py-4 overflow-y-auto scrollbar-none">
          <SidebarHeader title={title} userName={userName} />
          <SidebarMenu
            items={menuItems}
            activePath={activePath}
            onNavigate={onNavigate}
          />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;

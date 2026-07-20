import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuMenu, LuX, LuSearch, LuChevronDown } from "react-icons/lu";
import { registry } from "../../docs/registry";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
    isActive
      ? "bg-[#0572CE] text-white"
      : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#0572CE] text-white"
      : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
  }`;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Cerrar al redimensionar a desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isComponentsSection = location.pathname.startsWith("/components");
  const isMethodsSection = location.pathname.startsWith("/methods");

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-99 h-14 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex h-full items-center justify-between px-6">
          {/* Logo + Título + Navegación */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="/fonasa-favicon.ico"
                alt="Fonasa"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-[#0572CE]">
                Fonasa UI
              </span>
            </NavLink>

            {/* Navegación desktop — oculta en < lg */}
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/" end className={navLinkClass}>
                Inicio
              </NavLink>
              <NavLink to="/components" className={navLinkClass}>
                Componentes
              </NavLink>
              <NavLink to="/methods" className={navLinkClass}>
                Métodos
              </NavLink>
              <NavLink to="/colors" className={navLinkClass}>
                Colores
              </NavLink>
              <NavLink to="/docs" className={navLinkClass}>
                Docs
              </NavLink>
            </div>
          </div>

          {/* Botón hamburguesa — visible solo en < lg */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-[#0572CE] hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <LuX className="size-6" /> : <LuMenu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Overlay + Menú móvil */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-97 bg-black/30 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Panel lateral móvil */}
          <aside className="fixed top-14 right-0 bottom-0 z-98 w-72 max-w-[85vw] bg-white border-l border-gray-200 shadow-lg overflow-y-auto lg:hidden animate-slide-in-right">
            <div className="p-4">
              {/* Navegación principal */}
              <div className="space-y-1 mb-4">
                <NavLink to="/" end className={mobileLinkClass}>
                  Inicio
                </NavLink>
                <NavLink to="/components" className={mobileLinkClass}>
                  Componentes
                </NavLink>
                <NavLink to="/methods" className={mobileLinkClass}>
                  Métodos
                </NavLink>
                <NavLink to="/colors" className={mobileLinkClass}>
                  Colores
                </NavLink>
                <NavLink to="/docs" className={mobileLinkClass}>
                  Docs
                </NavLink>
              </div>

              {/* Sidebar de componentes si estamos en esa sección */}
              {isComponentsSection && (
                <MobileComponentsList location={location} />
              )}

              {/* Sidebar de métodos si estamos en esa sección */}
              {isMethodsSection && (
                <>
                  <hr className="my-3 border-gray-200" />
                  <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Métodos
                  </p>
                  <div className="space-y-0.5 mt-1">
                    <NavLink
                      to="/methods/constructor-filtros"
                      className={mobileLinkClass}
                    >
                      ⚙️ Constructor de Filtros
                    </NavLink>
                    {methodsRegistry.map((entry) => (
                      <NavLink
                        key={entry.name}
                        to={`/methods/${slugify(entry.name)}`}
                        className={mobileLinkClass}
                      >
                        {entry.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

// ─── MobileComponentsList ─────────────────────────────────────────────────────

interface MobileComponentsListProps {
  location: ReturnType<typeof useLocation>;
}

function MobileComponentsList({ location }: MobileComponentsListProps) {
  const [filter, setFilter] = useState("");

  const filteredRegistry = useMemo(() => {
    if (!filter.trim()) return registry;
    const term = filter.toLowerCase().trim();
    return registry.filter(
      (entry) =>
        entry.name.toLowerCase().includes(term) ||
        entry.group?.toLowerCase().includes(term) ||
        entry.description?.toLowerCase().includes(term)
    );
  }, [filter]);

  const ungrouped = filteredRegistry.filter((entry) => !entry.group);
  const grouped = filteredRegistry.reduce<Record<string, typeof registry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {}
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(grouped).forEach((g) => {
      initial[g] = registry
        .filter((e) => e.group === g)
        .some((e) => location.pathname === `/components/${slugify(e.name)}`);
    });
    return initial;
  });

  const effectiveOpenGroups = useMemo(() => {
    if (filter.trim()) {
      const allOpen: Record<string, boolean> = {};
      Object.keys(grouped).forEach((g) => (allOpen[g] = true));
      return allOpen;
    }
    return openGroups;
  }, [filter, openGroups, grouped]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <>
      <hr className="my-3 border-gray-200" />
      <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
        Componentes
      </p>

      {/* Filtro */}
      <div className="relative mt-2 mb-2">
        <LuSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar componente..."
          className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-8 pr-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#0572CE] focus:outline-none focus:ring-1 focus:ring-[#0572CE] transition-colors"
        />
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <LuX className="size-3.5" />
          </button>
        )}
      </div>

      {/* Sin resultados */}
      {filter.trim() && filteredRegistry.length === 0 && (
        <p className="px-3 py-2 text-xs text-gray-500 italic">
          Sin resultados para "{filter}"
        </p>
      )}

      {/* Componentes sin grupo */}
      <div className="space-y-0.5 mt-1">
        {ungrouped.map((entry) => (
          <NavLink
            key={entry.name}
            to={`/components/${slugify(entry.name)}`}
            className={mobileLinkClass}
          >
            {entry.name}
          </NavLink>
        ))}
      </div>

      {/* Sub-secciones agrupadas */}
      {Object.entries(grouped).map(([groupName, entries]) => {
        const isOpen = effectiveOpenGroups[groupName] ?? false;
        return (
          <div key={groupName} className="mt-1">
            <button
              type="button"
              onClick={() => toggleGroup(groupName)}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-900 hover:bg-[#0572CE] hover:text-white transition-colors duration-100 group"
            >
              <span className="font-semibold">{groupName}</span>
              <LuChevronDown
                className={`text-xs transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-0.5 pl-3 mt-0.5">
                  {entries.map((entry) => (
                    <NavLink
                      key={entry.name}
                      to={`/components/${slugify(entry.name)}`}
                      className={mobileLinkClass}
                    >
                      {entry.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

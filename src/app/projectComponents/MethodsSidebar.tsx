import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { methodsRegistry } from "../../docs/methods-registry";
import { slugify } from "../../docs/registry/slugify";
import { Input } from "../../componentsUI/Input";

interface IndicatorStyle {
  top: number;
  height: number;
  opacity: number;
}

export function MethodsSidebar() {
  const location = useLocation();
  const isMethodsSection = location.pathname.startsWith("/methods");

  const [filter, setFilter] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>({ top: 0, height: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        top: linkRect.top - navRect.top,
        height: linkRect.height,
        opacity: 1,
      });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, updateIndicator]);

  // Filtrar entries según el texto de búsqueda
  const filteredRegistry = useMemo(() => {
    if (!filter.trim()) return methodsRegistry;
    const term = filter.toLowerCase().trim();
    return methodsRegistry.filter(
      (entry) =>
        entry.name.toLowerCase().includes(term) ||
        entry.group?.toLowerCase().includes(term) ||
        entry.description?.toLowerCase().includes(term)
    );
  }, [filter]);

  // Separar métodos con grupo y sin grupo
  const ungrouped = filteredRegistry.filter((entry) => !entry.group);
  const grouped = filteredRegistry.reduce<Record<string, typeof methodsRegistry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {},
  );

  // Determinar qué grupos empiezan abiertos
  const initialOpen = Object.entries(grouped).reduce<Record<string, boolean>>(
    (acc, [groupName, entries]) => {
      acc[groupName] =
        !!filter.trim() ||
        entries.some(
          (e) => location.pathname === `/methods/${slugify(e.name)}`,
        );
      return acc;
    },
    {},
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(initialOpen);

  // Cuando hay filtro activo, forzar todos los grupos abiertos
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
    setTimeout(updateIndicator, 50);
    setTimeout(updateIndicator, 220);
  };

  // Recalculate indicator when filter changes
  useEffect(() => {
    const timer = setTimeout(updateIndicator, 60);
    return () => clearTimeout(timer);
  }, [filter, updateIndicator]);

  if (!isMethodsSection) return null;

  return (
    <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 dark:border-[#1e3044] bg-gray-100 dark:bg-[#061018] p-4 transition-colors duration-200">
      {/* Filtro de búsqueda */}
      <div className="mt-3 mb-2">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar método..."
          leftIcon={<LuSearch className="size-3.5" />}
        />
      </div>

      {/* Mensaje sin resultados */}
      {filter.trim() && filteredRegistry.length === 0 && (
        <p className="px-3 py-2 text-xs text-gray-500 italic">
          Sin resultados para "{filter}"
        </p>
      )}

      {/* Lista de métodos */}
      <div className="ml-3 mt-2 border-l-2 border-gray-300 pl-3">
        <nav ref={navRef} className="relative flex flex-col gap-0.5 text-sm font-medium">
          {/* Sliding indicator */}
          <div
            className="absolute left-0 right-0 rounded-lg bg-[#0572CE] pointer-events-none z-0 transition-all duration-250 ease-in-out"
            style={{
              top: indicator.top,
              height: indicator.height,
              opacity: indicator.opacity,
            }}
          />

          {/* Métodos sin grupo */}
          {ungrouped.map((entry) => {
            const path = `/methods/${slugify(entry.name)}`;
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={entry.name}
                to={path}
                data-active={isActive}
                className={`relative z-10 rounded-lg px-3 py-1.5 transition-colors duration-100 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#0572CE] hover:bg-[#D4E8F7] dark:hover:bg-[#0572CE]/20"
                }`}
              >
                {entry.name}
              </NavLink>
            );
          })}

          {/* Builders group (Constructor de Filtros) */}
          {(() => {
            const builderLabel = "Constructor de Filtros";
            const builderPath = "/methods/constructor-filtros";
            // Hide if filter is active and doesn't match
            if (filter.trim() && !builderLabel.toLowerCase().includes(filter.toLowerCase().trim())) {
              return null;
            }
            const groupName = "Builders";
            const isOpen = filter.trim() ? true : (effectiveOpenGroups[groupName] ?? location.pathname === builderPath);
            const isActive = location.pathname === builderPath;
            const groupIsActive = isActive && !isOpen;
            return (
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(groupName)}
                  data-active={groupIsActive}
                  className={`relative z-10 w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 group ${
                    groupIsActive
                      ? "text-white font-semibold"
                      : "text-gray-900 hover:bg-[#D4E8F7] dark:hover:bg-[#0572CE]/20"
                  }`}
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
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <NavLink
                        to={builderPath}
                        data-active={isActive && isOpen}
                        className={`relative z-10 rounded-lg pl-6 pr-3 py-1.5 text-sm transition-colors duration-100 ${
                          isActive
                            ? "text-white font-semibold"
                            : "text-[#0572CE] hover:bg-[#D4E8F7] dark:hover:bg-[#0572CE]/20"
                        }`}
                      >
                        {builderLabel}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Sub-secciones agrupadas */}
          {Object.entries(grouped).map(([groupName, entries]) => {
            const isOpen = effectiveOpenGroups[groupName] ?? false;
            const hasActiveChild = entries.some(
              (e) => location.pathname === `/methods/${slugify(e.name)}`
            );
            const groupIsActive = hasActiveChild && !isOpen;
            return (
              <div key={groupName} className="mt-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(groupName)}
                  data-active={groupIsActive}
                  className={`relative z-10 w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 group ${
                    groupIsActive
                      ? "text-white font-semibold"
                      : "text-gray-900 hover:bg-[#D4E8F7] dark:hover:bg-[#0572CE]/20"
                  }`}
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
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      {entries.map((entry) => {
                        const path = `/methods/${slugify(entry.name)}`;
                        const isActive = location.pathname === path;
                        return (
                          <NavLink
                            key={entry.name}
                            to={path}
                            data-active={isActive && isOpen}
                            className={`relative z-10 rounded-lg pl-6 pr-3 py-1.5 text-sm transition-colors duration-100 ${
                              isActive
                                ? "text-white font-semibold"
                                : "text-[#0572CE] hover:bg-[#D4E8F7] dark:hover:bg-[#0572CE]/20"
                            }`}
                          >
                            {entry.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

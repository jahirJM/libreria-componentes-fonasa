import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { registry } from "../../docs/registry";
import { slugify } from "../../docs/registry/slugify";
import { Input } from "../../componentsUI/Input";

interface IndicatorStyle {
  top: number;
  height: number;
  opacity: number;
}

export function Sidebar() {
  const location = useLocation();
  const isComponentsSection = location.pathname.startsWith("/components");

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
    // Small delay to allow DOM to update after route change
    const timer = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, updateIndicator]);

  // Filtrar entries según el texto de búsqueda
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

  // Separar componentes con grupo y sin grupo (excluir iconos del sidebar)
  const ungrouped = filteredRegistry.filter((entry) => !entry.group && entry.name !== "iconos");
  const grouped = filteredRegistry.reduce<Record<string, typeof registry>>(
    (acc, entry) => {
      if (entry.group) {
        if (!acc[entry.group]) acc[entry.group] = [];
        acc[entry.group].push(entry);
      }
      return acc;
    },
    {},
  );

  // Determinar qué grupos empiezan abiertos (si la ruta activa pertenece al grupo, o si hay filtro activo)
  const initialOpen = Object.entries(grouped).reduce<Record<string, boolean>>(
    (acc, [groupName, entries]) => {
      acc[groupName] =
        !!filter.trim() ||
        entries.some(
          (e) => location.pathname === `/components/${slugify(e.name)}`,
        );
      return acc;
    },
    {},
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    ...initialOpen,
  });

  // Cuando hay filtro activo, forzar todos los grupos abiertos
  const effectiveOpenGroups = useMemo(() => {
    if (filter.trim()) {
      const allOpen: Record<string, boolean> = { __componentes__: true };
      Object.keys(grouped).forEach((g) => (allOpen[g] = true));
      return allOpen;
    }
    return openGroups;
  }, [filter, openGroups, grouped]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    // Recalculate indicator after group toggle animation
    setTimeout(updateIndicator, 50);
    setTimeout(updateIndicator, 220);
  };

  // Recalculate indicator when filter changes
  useEffect(() => {
    const timer = setTimeout(updateIndicator, 60);
    return () => clearTimeout(timer);
  }, [filter, updateIndicator]);

  if (!isComponentsSection) return null;

  return (
    <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 dark:border-[#1e3044] bg-gray-100 dark:bg-[#061018] p-4 transition-colors duration-200">
      {/* Filtro de búsqueda */}
      <div className="mt-3 mb-2">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar componente..."
          leftIcon={<LuSearch className="size-3.5" />}
        />
      </div>

      {/* Mensaje sin resultados */}
      {filter.trim() && filteredRegistry.length === 0 && (
        <p className="px-3 py-2 text-xs text-gray-500 italic">
          Sin resultados para "{filter}"
        </p>
      )}

      {/* Lista de componentes */}
      <div className="ml-3 mt-2 border-l-2 border-gray-300 dark:border-[#1e3044] pl-3">
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

          {/* Componentes sin grupo */}
          {ungrouped.map((entry) => {
            const path = `/components/${slugify(entry.name)}`;
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={entry.name}
                to={path}
                data-active={isActive}
                className={`relative z-10 rounded-lg px-3 py-1.5 transition-colors duration-100 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#0572CE] hover:bg-[#0572CE]/10"
                }`}
              >
                {entry.name}
              </NavLink>
            );
          })}

          {/* Sub-secciones agrupadas */}
          {Object.entries(grouped)
            .sort(([a], [b]) => {
              if (a === "Otros") return 1;
              if (b === "Otros") return -1;
              return a.localeCompare(b, "es");
            })
            .map(([groupName, entries]) => {
            const isOpen = effectiveOpenGroups[groupName] ?? false;
            const hasActiveChild = entries.some(
              (e) => location.pathname === `/components/${slugify(e.name)}`
            );
            // Show indicator on group header when collapsed with active child
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
                      : "text-gray-900 dark:text-[#e2e8f0] hover:bg-[#0572CE]/10"
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
                    <div className="flex flex-col gap-0.5 pl-3 mt-0.5">
                      {entries.map((entry) => {
                        const path = `/components/${slugify(entry.name)}`;
                        const isActive = location.pathname === path;
                        return (
                          <NavLink
                            key={entry.name}
                            to={path}
                            data-active={isActive && isOpen}
                            className={`relative z-10 rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 ${
                              isActive
                                ? "text-white font-semibold"
                                : "text-[#0572CE] hover:bg-[#0572CE]/10"
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

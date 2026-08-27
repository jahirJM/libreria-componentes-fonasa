import { useState } from "react";
import { FiHome, FiFileText, FiBarChart2, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";
import { NavbarVertical } from "../../componentsUI/NavbarVertical";

// ─── Demo: Basic with icons ───────────────────────────────────────────────────

export function NavbarVerticalBasicDemo() {
  const [activePath, setActivePath] = useState("/inicio");

  const items = [
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
    { label: "Usuarios", path: "/usuarios", icon: <FiUsers /> },
    { label: "Configuración", path: "/configuracion", icon: <FiSettings /> },
  ];

  return (
    <div className="h-[420px] w-full flex">
      <NavbarVertical
        items={items}
        activePath={activePath}
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Mi App"
        collapsible
        onNavigate={(path) => setActivePath(path)}
        onLogoClick={() => setActivePath("/inicio")}
      />
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Contenido principal
      </div>
    </div>
  );
}

// ─── Demo: With sections ──────────────────────────────────────────────────────

export function NavbarVerticalSectionsDemo() {
  const [activePath, setActivePath] = useState("/dashboard");

  const sections = [
    {
      title: "General",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: <FiHome />, exact: true },
        { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
      ],
    },
    {
      title: "Administración",
      items: [
        { label: "Usuarios", path: "/usuarios", icon: <FiUsers /> },
        { label: "Configuración", path: "/configuracion", icon: <FiSettings /> },
      ],
    },
  ];

  return (
    <div className="h-[420px] w-full flex">
      <NavbarVertical
        sections={sections}
        activePath={activePath}
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Panel Admin"
        onNavigate={(path) => setActivePath(path)}
        onLogoClick={() => setActivePath("/dashboard")}
      />
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Contenido principal
      </div>
    </div>
  );
}

// ─── Demo: Collapsible ────────────────────────────────────────────────────────

export function NavbarVerticalCollapsibleDemo() {
  const [activePath, setActivePath] = useState("/inicio");
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
    { label: "Usuarios", path: "/usuarios", icon: <FiUsers /> },
    { label: "Configuración", path: "/configuracion", icon: <FiSettings /> },
  ];

  return (
    <div className="h-[420px] w-full flex">
      <NavbarVertical
        items={items}
        activePath={activePath}
        collapsed={collapsed}
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Mi App"
        onNavigate={(path) => setActivePath(path)}
        onLogoClick={() => setActivePath("/inicio")}
        onToggleCollapse={(val) => setCollapsed(val)}
      />
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Contenido principal
      </div>
    </div>
  );
}

// ─── Demo: With footer ────────────────────────────────────────────────────────

export function NavbarVerticalFooterDemo() {
  const [activePath, setActivePath] = useState("/inicio");
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
  ];

  const footer = (
    <button
      type="button"
      title={collapsed ? "Cerrar sesión" : undefined}
      className={`w-full flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors cursor-pointer ${
        collapsed ? "justify-center px-2" : "px-3"
      }`}
    >
      <FiLogOut className="flex-shrink-0 text-lg" />
      {!collapsed && <span>Cerrar sesión</span>}
    </button>
  );

  return (
    <div className="h-[420px] w-full flex">
      <NavbarVertical
        items={items}
        activePath={activePath}
        collapsed={collapsed}
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Mi App"
        footer={footer}
        onNavigate={(path) => setActivePath(path)}
        onLogoClick={() => setActivePath("/inicio")}
        onToggleCollapse={(val) => setCollapsed(val)}
      />
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Contenido principal
      </div>
    </div>
  );
}

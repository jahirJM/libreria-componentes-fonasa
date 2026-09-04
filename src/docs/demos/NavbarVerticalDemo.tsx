import { useEffect, useState } from "react";
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

// ─── Demo: Con logout (onLogout) ──────────────────────────────────────────────

export function NavbarVerticalLogoutDemo() {
  const [activePath, setActivePath] = useState("/inicio");
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
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
        onLogout={() => setActivePath("/inicio")}
      />
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">
        Contenido principal
      </div>
    </div>
  );
}

// ─── Demo: Guía responsive (layout que envuelve al navbar) ────────────────────
//
// El navbar NO cambia. Este layout es lo que se copia en el proyecto consumidor
// para lograr el comportamiento responsive: en pantallas grandes el navbar
// empuja el contenido; en pantallas chicas se fija por encima con un backdrop.

/** true si el viewport es md+ (>= 768px). */
function useEsDesktop() {
  const [esDesktop, setEsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setEsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return esDesktop;
}

export function NavbarVerticalResponsiveDemo() {
  const [activePath, setActivePath] = useState("/inicio");
  const esDesktop = useEsDesktop();
  const [collapsed, setCollapsed] = useState(!esDesktop);

  const items = [
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
  ];

  const mobileAbierto = !esDesktop && !collapsed;

  return (
    <div className="relative h-[420px] w-full flex overflow-hidden rounded-lg border border-gray-200">
      {/* Backdrop — solo en movil cuando el navbar esta abierto */}
      <div
        className={`absolute inset-0 z-40 bg-gray-900/40 transition-opacity duration-300 md:hidden ${
          mobileAbierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setCollapsed(true)}
        aria-hidden="true"
      />
      {/* Navbar: estatico en md+, fixed sobre el contenido en movil */}
      <div className="z-50 h-full max-md:absolute max-md:inset-y-0 max-md:left-0">
        <NavbarVertical
          items={items}
          activePath={activePath}
          collapsible
          collapsed={collapsed}
          logoSrc="/fonasa-favicon.ico"
          logoAlt="Fonasa"
          title="Mi App"
          onNavigate={(path) => {
            setActivePath(path);
            if (!esDesktop) setCollapsed(true);
          }}
          onToggleCollapse={setCollapsed}
        />
      </div>
      {/* Contenido: reserva el ancho del navbar colapsado solo en movil */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400 max-md:pl-20">
        Contenido principal (achica la ventana para ver el modo móvil)
      </main>
    </div>
  );
}

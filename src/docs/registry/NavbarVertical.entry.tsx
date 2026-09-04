import navbarVerticalCode from "../../componentsUI/NavbarVertical.tsx?raw";
import type { ComponentEntry } from "./types";
import {
  NavbarVerticalBasicDemo,
  NavbarVerticalSectionsDemo,
  NavbarVerticalCollapsibleDemo,
  NavbarVerticalFooterDemo,
  NavbarVerticalLogoutDemo,
  NavbarVerticalResponsiveDemo,
} from "../demos/NavbarVerticalDemo";

export const navbarVerticalEntry: ComponentEntry = {
  name: "navbar-vertical",
  group: "Navbar",
  description:
    "Utiliza: navbar. Barra de navegación vertical (lateral) con soporte para logo, título, secciones agrupadas, estado colapsado con íconos, footer personalizable y botón de cerrar sesión (onLogout). Nota sobre responsive: el componente NO se modifica para adaptarse a móvil; el comportamiento responsive se logra en el layout que lo envuelve. En pantallas grandes (md o más) el navbar va en el flujo normal y empuja el contenido; en pantallas chicas (menos de md) el layout debe fijar el navbar por encima del contenido con una capa oscura (backdrop) detrás, de modo que no empuje ni tape el contenido. Ver la variante 'Guía responsive (layout)' para el detalle de cómo montarlo.",
  code: navbarVerticalCode,
  dependencies: ["react-icons"],
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Fondo del ítem activo, texto del título y hover de ítems" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del navbar y texto/ícono del ítem activo" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Bordes del contenedor, separadores entre header/footer y contenido" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Íconos inactivos y texto de títulos de sección" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto de ítems inactivos" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Hover de ítems inactivos y botón de colapsar" },
    { name: "Texto (secciones)", value: "#9ca3af", usage: "Texto de encabezados de sección (uppercase)" },
  ],
  propsInterface: `interface NavbarVerticalItem {
  /** Texto visible del link */
  label: string;
  /** Ruta o href de destino */
  path: string;
  /** Ícono opcional (ReactNode para flexibilidad) */
  icon?: ReactNode;
  /** Si true, el match de activo es exacto (útil para "/" o home) */
  exact?: boolean;
}

interface NavbarVerticalSection {
  /** Título de la sección (opcional) */
  title?: string;
  /** Items de navegación en esta sección */
  items: NavbarVerticalItem[];
}

interface NavbarVerticalProps {
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
}`,
  variants: [
    {
      label: "Básico con íconos",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
          { label: "Usuarios", path: "/usuarios" },
          { label: "Configuración", path: "/configuracion" },
        ],
        activePath: "/inicio",
        logoSrc: "/fonasa-favicon.ico",
        title: "Mi App",
      },
      render: () => <NavbarVerticalBasicDemo />,
      usageCode: `import { FiHome, FiFileText, FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";

<NavbarVertical
  items={[
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
    { label: "Usuarios", path: "/usuarios", icon: <FiUsers /> },
    { label: "Configuración", path: "/configuracion", icon: <FiSettings /> },
  ]}
  activePath={activePath}
  logoSrc="/fonasa-favicon.ico"
  logoAlt="Fonasa"
  title="Mi App"
  onNavigate={(path) => setActivePath(path)}
  onLogoClick={() => navigate("/")}
/>`,
      responsive: true,
    },
    {
      label: "Con secciones agrupadas",
      props: {
        sections: [
          { title: "General", items: [{ label: "Dashboard", path: "/dashboard" }, { label: "Reportes", path: "/reportes" }] },
          { title: "Administración", items: [{ label: "Usuarios", path: "/usuarios" }, { label: "Configuración", path: "/configuracion" }] },
        ],
        activePath: "/dashboard",
        title: "Panel Admin",
      },
      render: () => <NavbarVerticalSectionsDemo />,
      usageCode: `import { FiHome, FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";

<NavbarVertical
  sections={[
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
  ]}
  activePath={activePath}
  logoSrc="/fonasa-favicon.ico"
  title="Panel Admin"
  onNavigate={(path) => setActivePath(path)}
/>`,
      responsive: true,
    },
    {
      label: "Colapsable (toggle)",
      props: {
        collapsed: false,
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
        ],
        activePath: "/inicio",
      },
      render: () => <NavbarVerticalCollapsibleDemo />,
      usageCode: `import { FiHome, FiFileText, FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";

const [collapsed, setCollapsed] = useState(false);

<NavbarVertical
  items={[
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
    { label: "Usuarios", path: "/usuarios", icon: <FiUsers /> },
    { label: "Configuración", path: "/configuracion", icon: <FiSettings /> },
  ]}
  activePath={activePath}
  collapsed={collapsed}
  logoSrc="/fonasa-favicon.ico"
  title="Mi App"
  onNavigate={(path) => setActivePath(path)}
  onToggleCollapse={(val) => setCollapsed(val)}
/>`,
      responsive: true,
    },
    {
      label: "Con footer (logout)",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
        ],
        activePath: "/inicio",
        footer: "Botón de cerrar sesión",
      },
      render: () => <NavbarVerticalFooterDemo />,
      usageCode: `import { FiHome, FiFileText, FiBarChart2, FiLogOut } from "react-icons/fi";

<NavbarVertical
  items={[
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
  ]}
  activePath={activePath}
  logoSrc="/fonasa-favicon.ico"
  title="Mi App"
  footer={
    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors">
      <FiLogOut />
      <span>Cerrar sesión</span>
    </button>
  }
  onNavigate={(path) => setActivePath(path)}
/>`,
      responsive: true,
    },
    {
      label: "Botón cerrar sesión (onLogout)",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
        ],
        activePath: "/inicio",
      },
      render: () => <NavbarVerticalLogoutDemo />,
      usageCode: `// Con la prop onLogout el navbar muestra automáticamente un botón
// "Cerrar sesión" en el footer (con ícono y estilo de hover rojo).
// No necesitas construir el botón manualmente.

<NavbarVertical
  items={[
    { label: "Inicio", path: "/inicio", icon: <FiHome />, exact: true },
    { label: "Solicitudes", path: "/solicitudes", icon: <FiFileText /> },
    { label: "Reportes", path: "/reportes", icon: <FiBarChart2 /> },
  ]}
  activePath={activePath}
  logoSrc="/fonasa-favicon.ico"
  title="Mi App"
  onNavigate={(path) => setActivePath(path)}
  onLogout={() => cerrarSesion()}
/>`,
      responsive: true,
    },
    {
      label: "Guía responsive (layout)",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
        ],
        activePath: "/inicio",
      },
      render: () => <NavbarVerticalResponsiveDemo />,
      usageCode: `/*
  IMPORTANTE: el componente NavbarVertical NO se modifica para ser responsive.
  El comportamiento móvil se arma en el LAYOUT que envuelve al navbar.

  La idea, en palabras simples:

  - En pantallas grandes (md o más): el navbar vive dentro del flujo normal
    de la página, ocupa su columna a la izquierda y "empuja" el contenido
    hacia la derecha. Todo se ve como un panel lateral clásico.

  - En pantallas chicas (menos de md): el navbar deja de empujar el contenido.
    Se "despega" y flota por encima de la página, pegado al borde izquierdo.
    Detrás aparece una capa oscura (backdrop) que cubre el resto de la
    pantalla; al tocarla, el navbar se cierra. Así el menú no aplasta ni
    deforma el contenido en móvil.

  Piezas que copias en TU layout (no en el componente):

  1) Un detector de tamaño de pantalla (useEsDesktop con matchMedia) para
     saber si estás en md+ o en móvil.
  2) El estado del navbar: en móvil arranca colapsado (cerrado) y se cierra
     solo al navegar; en desktop arranca abierto.
  3) Tres detalles visuales en el JSX del layout:
     - El navbar se fija (posición fija) por encima del contenido SOLO en móvil.
     - Una capa oscura (backdrop) visible SOLO en móvil, que cierra al tocarla.
     - El contenido reserva a la izquierda el ancho del navbar colapsado SOLO
       en móvil, para que nada quede tapado.
*/

import { useEffect, useState } from "react";

// 1) Detector de pantalla md+ (>= 768px)
function useEsDesktop() {
  const [esDesktop, setEsDesktop] = useState(
    () => typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setEsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return esDesktop;
}

function MainLayout() {
  const esDesktop = useEsDesktop();
  // 2) En móvil arranca cerrado; en desktop, abierto.
  const [collapsed, setCollapsed] = useState(!esDesktop);
  useEffect(() => { setCollapsed(!esDesktop); }, [esDesktop]);

  const mobileAbierto = !esDesktop && !collapsed;

  return (
    <div className="flex h-screen">
      {/* Capa oscura (backdrop): solo en móvil, cierra al tocar */}
      <div
        className={\`fixed inset-0 z-40 bg-gray-900/40 transition-opacity duration-300 md:hidden \${
          mobileAbierto ? "opacity-100" : "pointer-events-none opacity-0"
        }\`}
        onClick={() => setCollapsed(true)}
        aria-hidden="true"
      />

      {/* Navbar: fijo sobre el contenido en móvil, estático en desktop */}
      <div className="z-50 h-full max-md:fixed max-md:inset-y-0 max-md:left-0">
        <NavbarVertical
          /* ...tus props: items/sections, activePath, etc. */
          collapsible
          collapsed={collapsed}
          onToggleCollapse={setCollapsed}
          onNavigate={(path) => {
            navigate(path);
            if (!esDesktop) setCollapsed(true); // cierra al navegar en móvil
          }}
        />
      </div>

      {/* Contenido: reserva el ancho del navbar colapsado solo en móvil */}
      <main className="flex-1 overflow-y-auto p-6 max-md:pl-20">
        {/* <Outlet /> o tu contenido */}
      </main>
    </div>
  );
}`,
      responsive: true,
    },
  ],
};

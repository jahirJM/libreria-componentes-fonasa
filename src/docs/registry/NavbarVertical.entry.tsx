import navbarVerticalCode from "../../componentsUI/NavbarVertical.tsx?raw";
import type { ComponentEntry } from "./types";
import {
  NavbarVerticalBasicDemo,
  NavbarVerticalSectionsDemo,
  NavbarVerticalCollapsibleDemo,
  NavbarVerticalFooterDemo,
} from "../demos/NavbarVerticalDemo";

export const navbarVerticalEntry: ComponentEntry = {
  name: "navbar-vertical",
  group: "Navbar",
  description:
    "Utiliza: navbar. Barra de navegación vertical (lateral) con soporte para logo, título, secciones agrupadas, estado colapsado con íconos y footer personalizable.",
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
  ],
};

import navbarCode from "../../componentsUI/Navbar.tsx?raw";
import { Navbar } from "../../componentsUI/Navbar";
import type { ComponentEntry } from "./types";
import { useState } from "react";

// ─── Demo wrapper to handle state ─────────────────────────────────────────────

function NavbarDemo() {
  const [active, setActive] = useState("/inicio");

  const items = [
    { label: "Inicio", path: "/inicio", exact: true },
    { label: "Solicitudes", path: "/solicitudes" },
    { label: "Reportes", path: "/reportes" },
    { label: "Configuración", path: "/configuracion" },
  ];

  return (
    <div className="relative h-16 w-full">
      <Navbar
        items={items}
        activePath={active}
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Mi App"
        onNavigate={(path) => setActive(path)}
        onLogoClick={() => setActive("/inicio")}
        className="!fixed !relative"
      />
    </div>
  );
}

function NavbarMinimalDemo() {
  const [active, setActive] = useState("/dashboard");

  const items = [
    { label: "Dashboard", path: "/dashboard", exact: true },
    { label: "Usuarios", path: "/usuarios" },
    { label: "Ajustes", path: "/ajustes" },
  ];

  return (
    <div className="relative h-16 w-full">
      <Navbar
        items={items}
        activePath={active}
        title="Panel"
        onNavigate={(path) => setActive(path)}
        className="!fixed !relative"
      />
    </div>
  );
}

function NavbarPillDemo() {
  const [active, setActive] = useState("/inicio");

  const items = [
    { label: "Inicio", path: "/inicio", exact: true },
    { label: "Solicitudes", path: "/solicitudes" },
    { label: "Reportes", path: "/reportes" },
    { label: "Configuración", path: "/configuracion" },
  ];

  return (
    <div className="relative h-16 w-full">
      <Navbar
        items={items}
        activePath={active}
        variant="pill"
        logoSrc="/fonasa-favicon.ico"
        logoAlt="Fonasa"
        title="Mi App"
        onNavigate={(path) => setActive(path)}
        onLogoClick={() => setActive("/inicio")}
        className="!fixed !relative"
      />
    </div>
  );
}

// ─── Registry entry ───────────────────────────────────────────────────────────

export const navbarEntry: ComponentEntry = {
  name: "navbar",
  description:
    "Barra de navegación superior fija con logo, título, links con indicador activo (barrita inferior) y menú móvil responsive.",
  code: navbarCode,
  colors: [
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Texto activo, barrita indicadora, título y color del botón hamburguesa" },
    { name: "Bordes (suaves)", value: "#e5e7eb", usage: "Borde inferior del navbar y borde lateral del panel móvil" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del navbar y texto del link activo en móvil" },
    { name: "Texto (secundario)", value: "#6b7280", usage: "Texto de links inactivos en desktop" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto de links inactivos en móvil" },
    { name: "Fondo (cards)", value: "#f3f4f6", usage: "Hover del botón hamburguesa y hover de links móviles" },
  ],
  propsInterface: `type NavbarVariant = "underline" | "pill";

interface NavbarItem {
  /** Texto visible del link */
  label: string;
  /** Ruta o href de destino */
  path: string;
  /** Si true, el match de activo es exacto (útil para "/" o home) */
  exact?: boolean;
}

interface NavbarProps {
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
  /** Título junto al logo */
  title?: string;
  /** Callback al hacer clic en un item */
  onNavigate?: (path: string) => void;
  /** Callback al hacer clic en el logo/título */
  onLogoClick?: () => void;
  /** Clases CSS adicionales para el contenedor nav */
  className?: string;
}`,
  variants: [
    {
      label: "Con logo y título",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
          { label: "Configuración", path: "/configuracion" },
        ],
        activePath: "/inicio",
        logoSrc: "/fonasa-favicon.ico",
        title: "Mi App",
      },
      render: () => <NavbarDemo />,
      usageCode: `<Navbar
  items={[
    { label: "Inicio", path: "/inicio", exact: true },
    { label: "Solicitudes", path: "/solicitudes" },
    { label: "Reportes", path: "/reportes" },
    { label: "Configuración", path: "/configuracion" },
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
      label: "Solo título (sin logo)",
      props: {
        items: [
          { label: "Dashboard", path: "/dashboard", exact: true },
          { label: "Usuarios", path: "/usuarios" },
          { label: "Ajustes", path: "/ajustes" },
        ],
        activePath: "/dashboard",
        title: "Panel",
      },
      render: () => <NavbarMinimalDemo />,
      usageCode: `<Navbar
  items={[
    { label: "Dashboard", path: "/dashboard", exact: true },
    { label: "Usuarios", path: "/usuarios" },
    { label: "Ajustes", path: "/ajustes" },
  ]}
  activePath={activePath}
  title="Panel"
  onNavigate={(path) => setActivePath(path)}
/>`,
      responsive: true,
    },
    {
      label: "Estilo pill (botón)",
      props: {
        items: [
          { label: "Inicio", path: "/inicio", exact: true },
          { label: "Solicitudes", path: "/solicitudes" },
          { label: "Reportes", path: "/reportes" },
          { label: "Configuración", path: "/configuracion" },
        ],
        activePath: "/inicio",
        variant: "pill",
        logoSrc: "/fonasa-favicon.ico",
        title: "Mi App",
      },
      render: () => <NavbarPillDemo />,
      usageCode: `<Navbar
  items={[
    { label: "Inicio", path: "/inicio", exact: true },
    { label: "Solicitudes", path: "/solicitudes" },
    { label: "Reportes", path: "/reportes" },
    { label: "Configuración", path: "/configuracion" },
  ]}
  activePath={activePath}
  variant="pill"
  logoSrc="/fonasa-favicon.ico"
  logoAlt="Fonasa"
  title="Mi App"
  onNavigate={(path) => setActivePath(path)}
  onLogoClick={() => navigate("/")}
/>`,
      responsive: true,
    },
  ],
};

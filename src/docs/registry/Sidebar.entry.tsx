import sidebarCode from "../../componentsUI/Sidebar.tsx?raw"
import { FaFileMedical, FaHospital, FaUserCircle, FaUsers } from "react-icons/fa";
import type { ComponentEntry } from "./types";
import Sidebar from "../../componentsUI/Sidebar";
import { SidebarResponsiveWrapper } from "../SidebarResponsiveWrapper";
import { useState } from "react";
import { SidebarDemo } from "../demos/SidebarDemo";

export const sidebarEntry: ComponentEntry =   {
    name: "Sidebar",
    description:
      "Barra lateral de navegación con ítems de menú, subítems desplegables, estado activo y toggle de visibilidad.",
    code: sidebarCode,
    dependencies: ["react-icons"],
    propsInterface: `interface SidebarSubItem {
  label: string;
  path: string;
  /** Ícono opcional del subítem */
  icon?: IconType;
  /** Si true, el subítem se renderiza deshabilitado */
  isBlocked?: boolean;
  /** Tooltip cuando está bloqueado */
  blockedTooltip?: string;
}

interface SidebarMenuItem {
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

interface SidebarProps {
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
  /** Clases CSS de posicionamiento del aside */
  className?: string;
}`,
    variants: [
      {
        label: "Skeleton (loading)",
        props: { loading: true },
        responsive: true,
        render: () => (
          <SidebarResponsiveWrapper>
            {(isOpen) => (
              <Sidebar
                loading
                isOpen={isOpen}
                className="absolute top-0 left-0 z-20 w-62 h-full"
              />
            )}
          </SidebarResponsiveWrapper>
        ),
        usageCode: `<Sidebar loading isOpen={true} />`,
      },
      {
        label: "Interactivo (con subItems e íconos)",
        props: {},
        responsive: true,
        render: () => <SidebarDemo />,
        usageCode: `<Sidebar
  isOpen={isOpen}
  userName="Juan Pérez"
  title="Gestión del Beneficiario"
  activePath={location.pathname}
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1", icon: FaUserCircle },
        { label: "Subitem 2", path: "/item-2/subitem-2", icon: FaFileMedical },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
    { label: "Item 4", path: "/item-4", icon: FaHospital },
  ]}
  onNavigate={(path) => navigate(path)}
/>`,
      },
      {
        label: "Sin íconos en subItems",
        props: {},
        responsive: true,
        render: () => {
          const [activePath, setActivePath] = useState("/item-1");
          return (
            <SidebarResponsiveWrapper>
              {(isOpen) => (
                <Sidebar
                  isOpen={isOpen}
                  userName="María López"
                  title="Panel de Control"
                  activePath={activePath}
                  className="absolute top-0 left-0 z-20 w-62 h-full"
                  menuItems={[
                    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
                    {
                      label: "Item 2",
                      path: "/item-2",
                      icon: FaUsers,
                      subItems: [
                        { label: "Subitem 1", path: "/item-2/subitem-1" },
                        { label: "Subitem 2", path: "/item-2/subitem-2" },
                        { label: "Subitem 3", path: "/item-2/subitem-3" },
                      ],
                    },
                    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
                  ]}
                  onNavigate={(path) => setActivePath(path)}
                />
              )}
            </SidebarResponsiveWrapper>
          );
        },
        usageCode: `<Sidebar
  isOpen={isOpen}
  userName="María López"
  title="Panel de Control"
  activePath={activePath}
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1" },
        { label: "Subitem 2", path: "/item-2/subitem-2" },
        { label: "Subitem 3", path: "/item-2/subitem-3" },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaFileMedical },
  ]}
  onNavigate={(path) => setActivePath(path)}
/>`,
      },
      {
        label: "Items y subItems bloqueados",
        props: { isBlocked: true },
        responsive: true,
        render: () => (
          <SidebarResponsiveWrapper>
            {(isOpen) => (
              <Sidebar
                isOpen={isOpen}
                userName="Admin"
                title="Administración"
                activePath="/item-1"
                className="absolute top-0 left-0 z-20 w-62 h-full"
                menuItems={[
                  { label: "Item 1", path: "/item-1", icon: FaUserCircle },
                  {
                    label: "Item 2",
                    path: "/item-2",
                    icon: FaUsers,
                    subItems: [
                      { label: "Subitem 1", path: "/item-2/subitem-1" },
                      { label: "Subitem 2", path: "/item-2/subitem-2", isBlocked: true },
                    ],
                  },
                  { label: "Item 3", path: "/item-3", icon: FaHospital, isBlocked: true },
                ]}
                onNavigate={() => {}}
              />
            )}
          </SidebarResponsiveWrapper>
        ),
        usageCode: `<Sidebar
  menuItems={[
    { label: "Item 1", path: "/item-1", icon: FaUserCircle },
    {
      label: "Item 2",
      path: "/item-2",
      icon: FaUsers,
      subItems: [
        { label: "Subitem 1", path: "/item-2/subitem-1" },
        { label: "Subitem 2", path: "/item-2/subitem-2", isBlocked: true },
      ],
    },
    { label: "Item 3", path: "/item-3", icon: FaHospital, isBlocked: true },
  ]}
/>`,
      },
    ],
  }
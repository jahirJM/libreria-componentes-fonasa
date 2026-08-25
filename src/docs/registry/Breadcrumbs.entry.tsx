import breadcrumbsCode from "../../componentsUI/Breadcrumbs.tsx?raw";
import { Breadcrumbs } from "../../componentsUI/Breadcrumbs";
import { SkeletonBreadcrumbs } from "../../skeletons/SkeletonBreadcrumbs";
import type { ComponentEntry } from "./types";

export const breadcrumbsEntry: ComponentEntry = {
  name: "breadcrumbs",
  group: "Navegacion",
  description:
    "Componente de migas de pan para navegación jerárquica. Estilo minimalista con soporte para separadores, colapso automático e integración con routers.",
  code: breadcrumbsCode,
  dependencies: ["clsx"],
  colors: [
    { name: "Texto (secundario)", value: "#6b7280", usage: "Texto de items navegables (gray-500)" },
    { name: "Fondos (dark)", value: "#1f2937", usage: "Texto del item activo (gray-800)" },
    { name: "Texto (placeholder)", value: "#9ca3af", usage: "Separadores y ellipsis (gray-400)" },
    { name: "Color primario (fonasa)", value: "#0572CE", usage: "Hover en links de navegación" },
  ],
  propsInterface: `interface BreadcrumbItem {
  /** Text label displayed for this breadcrumb */
  label: string;
  /** URL or path to navigate to. If omitted, item is rendered as plain text (current page). */
  href?: string;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
}

type BreadcrumbsSize = "sm" | "md" | "lg";
type BreadcrumbsSeparator = "slash" | "chevron" | "dot" | "custom";

interface BreadcrumbsProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Visual separator between items. @default "chevron" */
  separator?: BreadcrumbsSeparator;
  /** Custom icon/element used as separator when separator="custom" */
  customSeparator?: ReactNode;
  /** Size variant. @default "md" */
  size?: BreadcrumbsSize;
  /** Maximum items to show before collapsing with ellipsis. 0 = no collapse. @default 0 */
  maxItems?: number;
  /** Custom class for the nav container */
  className?: string;
  /** Called when a breadcrumb link is clicked. Receives the item and its index. */
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
  /** Render links as a custom component (e.g. React Router Link). Receives href and children. */
  renderLink?: (href: string, children: ReactNode) => ReactNode;
  /** Show home icon on the first item. @default false */
  showHomeIcon?: boolean;
}`,
  variants: [
    {
      label: "Básico (chevron)",
      props: { separator: "chevron" },
      render: () => (
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: "Bonificaciones", href: "/bonificaciones" },
            { label: "Detalle solicitud" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  items={[
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Bonificaciones", href: "/bonificaciones" },
    { label: "Detalle solicitud" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Separador slash",
      props: { separator: "slash" },
      render: () => (
        <Breadcrumbs
          separator="slash"
          items={[
            { label: "Inicio", href: "/" },
            { label: "Trámites", href: "/tramites" },
            { label: "Licencia médica" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  separator="slash"
  items={[
    { label: "Inicio", href: "/" },
    { label: "Trámites", href: "/tramites" },
    { label: "Licencia médica" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Separador dot",
      props: { separator: "dot" },
      render: () => (
        <Breadcrumbs
          separator="dot"
          items={[
            { label: "Inicio", href: "/" },
            { label: "Mi cuenta", href: "/cuenta" },
            { label: "Datos personales" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  separator="dot"
  items={[
    { label: "Inicio", href: "/" },
    { label: "Mi cuenta", href: "/cuenta" },
    { label: "Datos personales" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Con ícono de inicio",
      props: { showHomeIcon: true },
      render: () => (
        <Breadcrumbs
          showHomeIcon
          items={[
            { label: "Inicio", href: "/" },
            { label: "Prestadores", href: "/prestadores" },
            { label: "Consulta de prestadores" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  showHomeIcon
  items={[
    { label: "Inicio", href: "/" },
    { label: "Prestadores", href: "/prestadores" },
    { label: "Consulta de prestadores" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Colapsado (maxItems)",
      props: { maxItems: 3 },
      render: () => (
        <Breadcrumbs
          maxItems={3}
          items={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: "Bonificaciones", href: "/bonificaciones" },
            { label: "Solicitud", href: "/solicitud" },
            { label: "Revisión", href: "/revision" },
            { label: "Confirmación" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  maxItems={3}
  items={[
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Bonificaciones", href: "/bonificaciones" },
    { label: "Solicitud", href: "/solicitud" },
    { label: "Revisión", href: "/revision" },
    { label: "Confirmación" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Tamaño pequeño (sm)",
      props: { size: "sm" },
      render: () => (
        <Breadcrumbs
          size="sm"
          items={[
            { label: "Inicio", href: "/" },
            { label: "Ayuda", href: "/ayuda" },
            { label: "Preguntas frecuentes" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  size="sm"
  items={[
    { label: "Inicio", href: "/" },
    { label: "Ayuda", href: "/ayuda" },
    { label: "Preguntas frecuentes" },
  ]}
/>`,
    },
    {
      label: "Tamaño grande (lg)",
      props: { size: "lg" },
      render: () => (
        <Breadcrumbs
          size="lg"
          items={[
            { label: "Inicio", href: "/" },
            { label: "Beneficios", href: "/beneficios" },
            { label: "GES / AUGE" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `<Breadcrumbs
  size="lg"
  items={[
    { label: "Inicio", href: "/" },
    { label: "Beneficios", href: "/beneficios" },
    { label: "GES / AUGE" },
  ]}
/>`,
    },
    {
      label: "Con React Router (renderLink)",
      props: { renderLink: true },
      render: () => (
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Sucursales", href: "/sucursales" },
            { label: "Región Metropolitana" },
          ]}
          renderLink={(href, children) => (
            <a href={href} onClick={(e) => e.preventDefault()}>
              {children}
            </a>
          )}
        />
      ),
      usageCode: `import { Link } from "react-router-dom";

<Breadcrumbs
  items={[
    { label: "Inicio", href: "/" },
    { label: "Sucursales", href: "/sucursales" },
    { label: "Región Metropolitana" },
  ]}
  renderLink={(href, children) => <Link to={href}>{children}</Link>}
/>`,
    },
    {
      label: "Separador personalizado (custom)",
      props: { separator: "custom" },
      render: () => (
        <Breadcrumbs
          separator="custom"
          customSeparator={<span className="text-sm">→</span>}
          items={[
            { label: "Inicio", href: "/" },
            { label: "Consultas", href: "/consultas" },
            { label: "Estado de solicitud" },
          ]}
          onNavigate={(item) => console.log("Navegar a:", item.href)}
        />
      ),
      usageCode: `import { FiArrowRight } from "react-icons/fi";

<Breadcrumbs
  separator="custom"
  customSeparator={<FiArrowRight size={14} />}
  items={[
    { label: "Inicio", href: "/" },
    { label: "Consultas", href: "/consultas" },
    { label: "Estado de solicitud" },
  ]}
  onNavigate={(item) => router.push(item.href!)}
/>`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => (
        <div className="space-y-4">
          <SkeletonBreadcrumbs items={4} />
          <SkeletonBreadcrumbs items={3} size="sm" />
          <SkeletonBreadcrumbs items={2} size="lg" />
        </div>
      ),
      usageCode: `import { SkeletonBreadcrumbs } from "@/skeletons";

<SkeletonBreadcrumbs items={4} />
<SkeletonBreadcrumbs items={3} size="sm" />
<SkeletonBreadcrumbs items={2} size="lg" />`,
    },
  ],
};

import clsx from "clsx";
import type { ReactNode } from "react";

export interface BreadcrumbItem {
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
}

const sizeClasses: Record<BreadcrumbsSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

function SeparatorIcon({ type, size, custom }: { type: BreadcrumbsSeparator; size: BreadcrumbsSize; custom?: ReactNode }) {
  const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;

  if (type === "custom" && custom) {
    return (
      <span className="text-gray-400 mx-1.5 flex items-center" aria-hidden="true">
        {custom}
      </span>
    );
  }

  if (type === "slash") {
    return (
      <span className="text-gray-400 mx-1.5 select-none" aria-hidden="true">
        /
      </span>
    );
  }

  if (type === "dot") {
    return (
      <span className="text-gray-400 mx-1.5 select-none" aria-hidden="true">
        ·
      </span>
    );
  }

  // chevron (default)
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      className="text-gray-400 mx-1.5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ size }: { size: BreadcrumbsSize }) {
  const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M2.5 6.5L8 2l5.5 4.5V13a1 1 0 01-1 1h-3V10H6.5v4h-3a1 1 0 01-1-1V6.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Breadcrumbs navigation component with a clean, minimal design.
 * Supports dynamic items, multiple separators, collapsing, and custom link rendering.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: "Inicio", href: "/" },
 *     { label: "Servicios", href: "/servicios" },
 *     { label: "Detalle" },
 *   ]}
 *   onNavigate={(item) => router.push(item.href!)}
 * />
 * ```
 */
export function Breadcrumbs({
  items,
  separator = "chevron",
  customSeparator,
  size = "md",
  maxItems = 0,
  className,
  onNavigate,
  renderLink,
  showHomeIcon = false,
}: BreadcrumbsProps) {
  const shouldCollapse = maxItems > 0 && items.length > maxItems;

  const visibleItems = shouldCollapse
    ? [...items.slice(0, 1), { label: "..." } as BreadcrumbItem, ...items.slice(-(maxItems - 1))]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={clsx("flex items-center", sizeClasses[size], className)}>
      <ol className="flex items-center flex-wrap gap-y-1">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.label === "...";
          const isFirst = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && <SeparatorIcon type={separator} size={size} custom={customSeparator} />}

              {isEllipsis ? (
                <span className="text-gray-400 font-medium select-none px-0.5">…</span>
              ) : isLast || !item.href ? (
                <span
                  className={clsx(
                    "font-medium text-gray-800 truncate max-w-50",
                    isLast && "pointer-events-none"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  <span className="flex items-center gap-1">
                    {isFirst && showHomeIcon && <HomeIcon size={size} />}
                    {item.icon}
                    {item.label}
                  </span>
                </span>
              ) : renderLink ? (
                renderLink(
                  item.href,
                  <span className="flex items-center gap-1 text-gray-500 hover:text-[#0572CE] transition-colors duration-150">
                    {isFirst && showHomeIcon && <HomeIcon size={size} />}
                    {item.icon}
                    {item.label}
                  </span>
                )
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(item, index);
                    }
                  }}
                  className="flex items-center gap-1 text-gray-500 hover:text-[#0572CE] transition-colors duration-150 truncate max-w-50"
                >
                  {isFirst && showHomeIcon && <HomeIcon size={size} />}
                  {item.icon}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

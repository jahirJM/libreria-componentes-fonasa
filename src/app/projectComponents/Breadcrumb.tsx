import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FiChevronRight } from "react-icons/fi";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Reusable breadcrumb navigation component.
 * First item always renders a home icon linking to "/".
 * Intermediate items are clickable links, and the last item is plain text (current page).
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex items-center gap-1.5 text-sm text-gray-400 mb-3"
    >
      {/* Home icon */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-[#0572CE] transition-colors"
        title="Inicio"
      >
        <IoMdHome className="size-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="inline-flex items-center gap-1.5">
            <FiChevronRight className="size-3 text-gray-300" />
            {isLast || !item.to ? (
              <span className="font-medium text-gray-500">{item.label}</span>
            ) : (
              <Link
                to={item.to}
                className="font-medium hover:text-[#0572CE] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

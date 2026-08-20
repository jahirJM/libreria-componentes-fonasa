import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

type Variant = "primary" | "secondary";

/** Row data for TablaDatos. Must have `id` and dynamic properties per column. */
export interface DataTableRow {
  /** Unique row ID. */
  id: string;
  [key: string]: string | number | undefined;
}

interface DataTableProps {
  /** Additional CSS classes for the header. */
  customClass?: string;
  /** Header color variant: "primary" (cyan) or "secondary" (dark gray). @default "primary" */
  variant?: Variant;
  /** Array of data to render as rows. */
  data: DataTableRow[];
  /** Visible column names (header labels). */
  headers: string[];
  /** Property keys to display in each column (must match the keys in each row). */
  columns: string[];
  /** Callback when editing a row. If provided, shows the edit button. */
  onEdit?: (item: DataTableRow) => void;
  /** Callback when deleting a row. If provided, shows the delete button. */
  onDelete?: (item: DataTableRow) => void;
  /** If true, forces mobile view (stacked cards). @default false */
  forceCompact?: boolean;
}

/**
 * Responsive data table with grid view on desktop and stacked cards on mobile.
 * Supports edit/delete actions per row.
 *
 * @example
 * ```tsx
 * <TablaDatos
 *   headers={["Nombre", "RUT", "Fecha"]}
 *   columns={["nombre", "rut", "fecha"]}
 *   data={[{ id: "1", nombre: "Juan", rut: "12.345.678-9", fecha: "2025-01-15" }]}
 *   onEdit={(item) => editItem(item)}
 *   onDelete={(item) => deleteItem(item)}
 * />
 * ```
 */
export const TablaDatos = ({
  customClass = "",
  variant = "primary",
  data = [],
  headers = [],
  columns = [],
  onEdit,
  onDelete,
  forceCompact = false,
}: DataTableProps) => {
  const variantStyles: Record<Variant, string> = {
    primary: "bg-[#008CB5]",
    secondary: "bg-[#414951]",
  };

  const showActions = Boolean(onEdit || onDelete);

  const headerClass = `rounded-t-md p-2 ${customClass} ${variantStyles[variant]}`.trim();

  const gridStyle = (count: number) =>
    showActions
      ? { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr)) 100px` }
      : { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };

  return (
    <div className="w-full">
      {/* Desktop view: grid table */}
      <div className={forceCompact ? "hidden" : "hidden lg:block"}>
        <div className={headerClass}>
          <div
            className="grid items-center gap-4 text-white font-semibold px-3"
            style={gridStyle(headers.length)}
          >
            {headers.map((header, index) => (
              <div className="text-sm" key={`${header}-${index}`}>
                {header}
              </div>
            ))}
          </div>
        </div>

        <div>
          {data.map((item, index) => {
            const isLast = index === data.length - 1;
            const rowClass = `grid items-center gap-4 bg-white border-gray-400 p-3 ${
              isLast ? "rounded-b-md border" : "border-t border-r border-l"
            }`;

            return (
              <div
                key={item.id ?? index}
                className={rowClass}
                style={gridStyle(columns.length)}
              >
                {columns.map((col) => (
                  <div className="text-sm text-gray-700" key={col}>
                    {item[col] ?? "-"}
                  </div>
                ))}
                {showActions && (
                  <div className="flex items-center justify-center gap-3">
                    {onEdit && (
                      <button
                        type="button"
                        className="cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
                        onClick={() => onEdit(item)}
                      >
                        <MdOutlineEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
                        onClick={() => onDelete(item)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile view: stacked cards */}
      <div
        className={
          forceCompact
            ? "flex flex-col gap-3"
            : "lg:hidden flex flex-col gap-3"
        }
      >
        {data.map((item, index) => (
          <div
            key={item.id ?? index}
            className="bg-white border-l-4 border-l-[#008CB5] border border-gray-200 rounded-xl p-4 pb-1 shadow-sm"
          >
            <div className="flex flex-col gap-1.5">
              {columns.map((col, colIdx) => (
                <div key={col} className="flex justify-between items-start">
                  <span className="text-sm text-gray-500 font-medium">
                    {headers[colIdx]}
                  </span>
                  <span className="text-xs text-gray-800 text-right max-w-[60%]">
                    {item[col] ?? "-"}
                  </span>
                </div>
              ))}
            </div>

            {showActions && (
              <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
                {onEdit && (
                  <button
                    type="button"
                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#008CB5]"
                    onClick={() => onEdit(item)}
                  >
                    <MdOutlineEdit size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className="cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                    onClick={() => onDelete(item)}
                  >
                    <FaRegTrashAlt size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

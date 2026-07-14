import clsx from "clsx";
import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type TableHTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
} from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
  ocultable?: boolean;
  redimensionable?: boolean;
}

const CELDA_CONTRAIDA = "w-0 max-w-[1px] overflow-hidden p-0 m-0";
const CELDA_CONTRAIDA_CONTENIDO = "...";

export const Table = ({
  classTable,
  classTh,
  nombreColumnas,
  children,
  ocultable = false,
  redimensionable = false,
  ...props
}: TableProps) => {
  const [columnasContraidas, setColumnasContraidas] = useState<Set<number>>(
    new Set(),
  );
  const [anchos, setAnchos] = useState<number[]>([]);
  const [resizingIndex, setResizingIndex] = useState<number | null>(null);
  const resizingCol = useRef<number | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const didDrag = useRef(false);

  const toggleColumna = (index: number) => {
    if (!ocultable) return;
    if (didDrag.current) return;
    setColumnasContraidas((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const onMouseDown = useCallback(
    (e: React.MouseEvent, colIndex: number) => {
      if (!redimensionable) return;
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
      resizingCol.current = colIndex;
      setResizingIndex(colIndex);
      startX.current = e.clientX;
      startWidth.current = anchos[colIndex] || 150;

      const onMouseMove = (ev: MouseEvent) => {
        if (resizingCol.current === null) return;
        didDrag.current = true;
        const diff = ev.clientX - startX.current;
        const newWidth = Math.max(50, startWidth.current + diff);
        setAnchos((prev) => {
          const next = [...prev];
          next[resizingCol.current!] = newWidth;
          return next;
        });
      };

      const onMouseUp = () => {
        resizingCol.current = null;
        setResizingIndex(null);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        setTimeout(() => {
          didDrag.current = false;
        }, 0);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [anchos, redimensionable],
  );

  const processChildren = (bodyChildren: ReactNode): ReactNode => {
    if (!ocultable && !redimensionable) return bodyChildren;

    return Children.map(bodyChildren, (row) => {
      if (!isValidElement(row)) return row;

      const cells = Children.map(
        (row.props as { children?: ReactNode }).children,
        (cell, cellIndex) => {
          if (!isValidElement(cell)) return cell;

          const contraida = columnasContraidas.has(cellIndex);

          if (contraida) {
            return cloneElement(
              cell as React.ReactElement<Record<string, unknown>>,
              {
                className: clsx(
                  (cell.props as { className?: string }).className || "",
                  CELDA_CONTRAIDA,
                ),
                children: <span className="text-xs text-gray-400">{CELDA_CONTRAIDA_CONTENIDO}</span>,
              },
            );
          }

          const style: React.CSSProperties | undefined =
            redimensionable && anchos[cellIndex]
              ? { width: `${anchos[cellIndex]}px`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
              : undefined;

          return cloneElement(
            cell as React.ReactElement<Record<string, unknown>>,
            {
              ...(style ? { style } : {}),
            },
          );
        },
      );

      return cloneElement(row as React.ReactElement<Record<string, unknown>>, {
        children: cells,
      });
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={clsx("w-full", classTable)} {...props}>
          <thead>
            <tr className="bg-blue-900 text-xs">
              {nombreColumnas.map((col, i) => {
                const contraida = columnasContraidas.has(i);
                return (
                  <th
                    key={i}
                    style={
                      !contraida && redimensionable && anchos[i]
                        ? { width: `${anchos[i]}px` }
                        : undefined
                    }
                    className={clsx(
                      "px-4 py-3 text-left font-semibold text-white relative select-none overflow-hidden text-ellipsis whitespace-nowrap",
                      { "cursor-pointer hover:bg-blue-800": ocultable },
                      { [CELDA_CONTRAIDA]: contraida, "border-x border-blue-700 text-center": contraida },
                      classTh,
                    )}
                    onClick={() => toggleColumna(i)}
                  >
                    {contraida ? "..." : col}
                    {redimensionable && !contraida && (
                      <span
                        onMouseDown={(e) => onMouseDown(e, i)}
                        onClick={(e) => e.stopPropagation()}
                        className={clsx(
                          "absolute right-0 top-0 h-full w-1.5 cursor-col-resize transition-colors",
                          resizingIndex === i
                            ? "bg-white/60"
                            : "hover:bg-white/40",
                        )}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{processChildren(children)}</tbody>
        </table>
      </div>
    </div>
  );
};

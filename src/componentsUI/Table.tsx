import type { ReactNode, TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
}

export const Table = ({
  classTable,
  classTh,
  nombreColumnas,
  children,
  ...props
}: TableProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full ${classTable ?? ""}`} {...props}>
          <thead>
            <tr className="bg-blue-900 text-xs">
              {nombreColumnas.map((columna, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left font-semibold text-white ${classTh ?? ""}`}
                >
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

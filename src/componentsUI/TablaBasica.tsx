import clsx from "clsx";
import type { ReactNode, TableHTMLAttributes } from "react";

interface TablaBasicaProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
}

export const TablaBasica = ({
  classTable,
  classTh,
  nombreColumnas,
  children,
  ...props
}: TablaBasicaProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden text-gray-700">
      <div className="overflow-x-auto">
        <table className={clsx("w-full", classTable)} {...props}>
          <thead>
            <tr className="bg-blue-900 text-xs">
              {nombreColumnas.map((columna, index) => (
                <th
                  key={index}
                  className={clsx(
                    "px-4 py-3 text-left font-semibold text-white",
                    classTh,
                  )}
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

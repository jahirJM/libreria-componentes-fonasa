import clsx from "clsx";
import type { ReactNode, TableHTMLAttributes } from "react";

interface TablaBasicaProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Clases CSS adicionales para el <table>. */
  classTable?: string;
  /** Clases CSS adicionales para los <th>. */
  classTh?: string;
  /** Nombres de las columnas del header. */
  nombreColumnas: string[];
  /** Filas de la tabla (renderizar <tr> con <td>). */
  children: ReactNode;
}

/**
 * Tabla HTML simple con header azul oscuro y scroll horizontal.
 * Para tablas más complejas con columnas ocultables/redimensionables, usar Table.
 *
 * @example
 * ```tsx
 * <TablaBasica nombreColumnas={["Nombre", "RUT", "Estado"]}>
 *   <tr><td className="px-4 py-2">Juan</td><td className="px-4 py-2">12.345.678-9</td><td className="px-4 py-2">Activo</td></tr>
 * </TablaBasica>
 * ```
 */
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
                  scope="col"
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

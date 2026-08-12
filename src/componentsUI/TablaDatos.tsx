import clsx from "clsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

type Variant = "primary" | "secondary";

export interface TablaDatoFila {
  id: string;
  [key: string]: string | number | undefined;
}

interface TablaDatosProps {
  isDisabled?: boolean;
  customClass?: string;
  variant?: Variant;
  listaDatos: TablaDatoFila[];
  listaHeaders: string[];
  columnas: string[];
  botonEdit?: (item: TablaDatoFila) => void;
  botonDelete?: (item: TablaDatoFila) => void;
  /** Si true, fuerza la vista mobile (tarjetas apiladas) */
  forceCompact?: boolean;
}

export const TablaDatos = ({
  customClass = "",
  variant = "primary",
  listaDatos = [],
  listaHeaders = [],
  columnas = [],
  botonEdit,
  botonDelete,
  forceCompact = false,
}: TablaDatosProps) => {
  const baseStyles = "rounded-t-md p-2";
  const variantStyles = {
    primary: "bg-[#008CB5]",
    secondary: "bg-[#414951]",
  };

  const mostrarAcciones = Boolean(botonEdit || botonDelete);

  return (
    <div className="w-full">
      {/* ── Vista desktop: tabla grid ── */}
      <div className={forceCompact ? "hidden" : "hidden lg:block"}>
        <div
          className={clsx(baseStyles, customClass, variantStyles[variant])}
        >
          <div
            className="grid items-center gap-4 text-white font-semibold px-3"
            style={
              !mostrarAcciones
                ? { gridTemplateColumns: `repeat(${listaHeaders.length}, minmax(0, 1fr))` }
                : { gridTemplateColumns: `repeat(${listaHeaders.length}, minmax(0, 1fr)) 100px` }
            }
          >
            {listaHeaders.map((header, index) => (
              <div className='text-sm' key={`${header}-${index}`}>{header}</div>
            ))}
          </div>
        </div>

        <div>
          {listaDatos.map((item, index) => (
            <div
              key={item.id ?? index}
              className={clsx(
                "grid items-center gap-4 bg-white border-gray-400 p-3",
                index === listaDatos.length - 1
                  ? "rounded-b-md border"
                  : "border-t border-r border-l"
              )}
              style={
                !mostrarAcciones
                  ? { gridTemplateColumns: `repeat(${columnas.length}, minmax(0, 1fr))` }
                  : { gridTemplateColumns: `repeat(${columnas.length}, minmax(0, 1fr)) 100px` }
              }
            >
              {columnas.map((columna) => (
                <div className="text-sm text-gray-700" key={columna}>
                  {item[columna] ?? "-"}
                </div>
              ))}
              {mostrarAcciones && (
                <div className="flex items-center justify-center gap-3">
                  {botonEdit && (
                    <button
                      type="button"
                      className="cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
                      onClick={() => botonEdit(item)}
                    >
                      <MdOutlineEdit />
                    </button>
                  )}
                  {botonDelete && (
                    <button
                      type="button"
                      className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
                      onClick={() => botonDelete(item)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Vista mobile: tarjetas apiladas ── */}
      <div className={forceCompact ? "flex flex-col gap-3" : "lg:hidden flex flex-col gap-3"}>
        {listaDatos.map((item, index) => (
          <div
            key={item.id ?? index}
            className="bg-white border-l-4 border-l-[#008CB5] border border-gray-200 rounded-xl p-4 pb-1 shadow-sm"
          >
            <div className="flex flex-col gap-1.5">
              {columnas.map((columna, colIdx) => (
                <div key={columna} className="flex justify-between items-start">
                  <span className="text-sm text-gray-500 font-medium">
                    {listaHeaders[colIdx]}
                  </span>
                  <span className="text-xs text-gray-800 text-right max-w-[60%]">
                    {item[columna] ?? "-"}
                  </span>
                </div>
              ))}
            </div>

            {mostrarAcciones && (
              <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
                {botonEdit && (
                  <button
                    type="button"
                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#008CB5]"
                    onClick={() => botonEdit(item)}
                  >
                    <MdOutlineEdit size={16} />
                  </button>
                )}
                {botonDelete && (
                  <button
                    type="button"
                    className="cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                    onClick={() => botonDelete(item)}
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

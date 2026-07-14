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
}

export const TablaDatos = ({
  customClass = "",
  variant = "primary",
  listaDatos = [],
  listaHeaders = [],
  columnas = [],
  botonEdit,
  botonDelete,
}: TablaDatosProps) => {
  const baseStyles = "mt-5 rounded-t-md p-2";
  const variantStyles = {
    primary: "bg-(--primary-color)",
    secondary: "bg-(--secondary-color)",
  };

  const mostrarAcciones = Boolean(botonEdit || botonDelete);

  return (
    <div className="w-full">
      <div
        className={clsx(baseStyles, customClass, variantStyles[variant])}
      >
        <div
          className={clsx(
            "grid items-center gap-4 text-white font-semibold px-3",
            mostrarAcciones
              ? "grid-cols-[repeat(auto-fit,minmax(120px,1fr))_100px]"
              : "grid-cols-3"
          )}
          style={
            !mostrarAcciones
              ? {
                  gridTemplateColumns: `repeat(${listaHeaders.length}, minmax(0, 1fr))`,
                }
              : {
                  gridTemplateColumns: `repeat(${listaHeaders.length}, minmax(0, 1fr)) 100px`,
                }
          }
        >
          {listaHeaders.map((header, index) => (
            <div key={`${header}-${index}`}>{header}</div>
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
                ? {
                    gridTemplateColumns: `repeat(${columnas.length}, minmax(0, 1fr))`,
                  }
                : {
                    gridTemplateColumns: `repeat(${columnas.length}, minmax(0, 1fr)) 100px`,
                  }
            }
          >
            {columnas.map((columna) => (
              <div className="text-sm" key={columna}>
                {item[columna] ?? "-"}
              </div>
            ))}
            {mostrarAcciones && (
              <div className="flex items-center justify-center gap-3">
                {botonEdit && (
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
                    onClick={() => botonEdit(item)}
                  >
                    <MdOutlineEdit />
                  </button>
                )}
                {botonDelete && (
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-2xl transition-all ease-in-out duration-300"
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
  );
};

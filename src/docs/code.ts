import sidebarCode from "../componentsUI/Sidebar.tsx?raw";

export { sidebarCode };

export const inputCode = `import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  error?: boolean;
  value?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  copyable?: boolean;
  type?: "text" | "email" | "number" | "password" | "tel" | "url" | "file";
}

export function Input({
  error = false,
  disabled,
  value,
  type = "text",
  className,
  leftIcon,
  rightIcon,
  loading = false,
  copyable = false,
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center">
      {leftIcon && (
        <div className="absolute left-3 text-gray-500">{leftIcon}</div>
      )}

      <input
        type={type}
        disabled={disabled || loading}
        {...(type !== "file" ? { value } : {})}
        {...props}
        className={clsx(
          "w-full rounded-md border px-3 py-2 text-sm text-black placeholder-gray-500 outline-none transition-colors",
          "focus:border-blue-900 focus:ring-2 focus:ring-blue-900",
          {
            "border-gray-300 bg-white": !error,
            "border-red-500 focus:border-red-500 focus:ring-red-500": error,
            "bg-gray-100 opacity-50 cursor-not-allowed": disabled || loading,
            "pl-10": leftIcon,
            "pr-10": rightIcon || copyable || loading,
          },
          className,
        )}
      />

      {loading && (
        <div className="absolute right-3 text-gray-500">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      )}

      {!loading && rightIcon && (
        <div className="absolute right-3 text-gray-500">{rightIcon}</div>
      )}

      {!loading && copyable && (
        <button
          type="button"
          className="absolute right-3 text-gray-500 hover:text-blue-900"
        >
          <FiCopy />
        </button>
      )}
    </div>
  );
}
`;

export const labelCode = `import clsx from "clsx";
import { PiWarningCircleBold } from "react-icons/pi";
import { IndicadorRequerido } from "./IndicadorRequerido";
import { type LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  indicador?: boolean;
  error?: boolean;
}

export const Label = ({
  className,
  text,
  indicador = false,
  error = false,
  ...props
}: LabelProps) => {
  return (
    <label
      className={clsx("text-sm text-gray-600 flex items-center gap-2", className)}
      {...props}
    >
      {text}
      {indicador && <IndicadorRequerido />}
      {error && (
        <span className="inline-flex items-center gap-1 text-red-400 text-xs font-medium">
          <PiWarningCircleBold className="text-sm" />
          requerido
        </span>
      )}
    </label>
  );
};
`;

export const textAreaCode = `import clsx from "clsx";
import { type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = ({
  error = false,
  className,
  disabled,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      disabled={disabled}
      className={clsx(
        "w-full placeholder:text-sm text-sm border rounded-xl px-3 py-1.5 text-gray-600",
        "focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none",
        "transition-colors duration-150",
        {
          "bg-gray-200 cursor-not-allowed opacity-60": disabled,
          "bg-white": !disabled,
          "border-red-500 focus:ring-red-500 focus:border-red-500": error,
          "border-gray-300": !error,
        },
        className,
      )}
      {...props}
    />
  );
};
`;

export const tableCode = `import clsx from "clsx";
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
              ? { width: \`\${anchos[cellIndex]}px\`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
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
                        ? { width: \`\${anchos[i]}px\` }
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
`;

export const tablaBasicaCode = `import clsx from "clsx";
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
};`;

export const selectCode = `import { type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
  children: ReactNode;
}

export const Select = ({
  error,
  className,
  children,
  disabled,
  ...props
}: SelectProps) => {
  return (
    <select
      disabled={disabled}
      className={\`placeholder:text-sm
        text-sm
        border rounded-xl px-3 py-1.5 text-gray-600
        focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none
        \${disabled ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-white"}
        \${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
        \${className ?? ""}\`}
      {...props}
    >
      {children}
    </select>
  );
};`;

export const botonesCode = `import type { IconType } from "react-icons";
import React from "react";

interface BotonesProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}

export const BotonConfirmar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type,
}: BotonesProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={\`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 \${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
      }\`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonCancelar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
}: BotonesProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={\`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 \${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-500 cursor-pointer"
      }\`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonPrimario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type = "button",
  customClass = "",
}: BotonesProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={\`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 \${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#0572CE] hover:bg-blue-700 cursor-pointer"
      } \${customClass}\`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonSecundario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
}: BotonesProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={\`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 \${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
      }\`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};`;

export const toastCode = `import { toast, Toaster } from "sonner";

/**
 * Componente Toaster configurado con estilos de Fonasa.
 * Colocar una vez en el layout principal de la app.
 */
export const FonasaToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "text-sm font-medium",
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
        },
      }}
    />
  );
};

/**
 * Funciones utilitarias para mostrar toasts con estilos Fonasa.
 */
export const fonasaToast = {
  success: (mensaje: string) => {
    toast.success(mensaje, {
      style: {
        background: "#ecfdf5",
        border: "1px solid #0572CE",
        color: "#064e3b",
      },
    });
  },

  error: (mensaje: string) => {
    toast.error(mensaje, {
      style: {
        background: "#fef2f2",
        border: "1px solid #dc2626",
        color: "#991b1b",
      },
    });
  },

  info: (mensaje: string) => {
    toast.info(mensaje, {
      style: {
        background: "#eff6ff",
        border: "1px solid #0572CE",
        color: "#1e3a5f",
      },
    });
  },

  warning: (mensaje: string) => {
    toast.warning(mensaje, {
      style: {
        background: "#fffbeb",
        border: "1px solid #d97706",
        color: "#92400e",
      },
    });
  },
};`;

export const loadingCode = `interface FullLoadingProps {
  mensaje?: string;
}

export const Loading = ({ mensaje }: FullLoadingProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-50">
      <div className="bg-white p-4 rounded-full mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
      </div>
      <p className="text-white text-lg font-semibold">{mensaje}</p>
    </div>
  );
};

interface LoadingSectionProps {
  mensaje?: string;
}

export const LoadingSection = ({ mensaje }: LoadingSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
      </div>
      <p className="text-sm font-bold mt-3">{mensaje}</p>
    </div>
  );
};

/**
 * Loading con el favicon de Fonasa en el centro del spinner.
 * Estilo sección (no fullscreen). Requiere /fonasa-favicon.ico en public.
 */
export const LoadingFonasa = ({ mensaje }: FullLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Spinner exterior */}
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-[#0572CE] border-b-[#0572CE]"></div>
        {/* Favicon centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/fonasa-favicon.ico" alt="Fonasa" className="h-9 w-9" />
        </div>
      </div>
      {mensaje && (
        <p className="text-sm font-bold mt-3">{mensaje}</p>
      )}
    </div>
  );
};`;

export const badgeCode = `import clsx from "clsx";

export type BadgeVariant =
  | "counter"
  | "documentos"
  | "especialidad"
  | "estado-pendiente"
  | "estado-revision"
  | "estado-aprobada"
  | "estado-rechazada"
  | "estado-default";

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
  customClass?: string;
}

export const Badge = ({ variant, text, customClass = "" }: BadgeProps) => {
  const baseStyles =
    "text-[10px] px-2 py-0.5 rounded-full font-bold text-sm!";

  const variantStyles = {
    counter: "bg-gray-100 text-gray-500 border border-gray-200",
    documentos: "bg-(--different-color) text-white!",
    especialidad: "bg-gray-100 text-gray-500 border border-gray-200",
    "estado-pendiente":
      "bg-yellow-100 text-yellow-800! border border-yellow-300",
    "estado-revision": "bg-blue-100 text-blue-800! border border-blue-300",
    "estado-aprobada":
      "bg-green-100! text-green-800! border border-green-300",
    "estado-rechazada": "bg-red-100 text-red-800! border border-red-300",
    "estado-default": "bg-gray-100 text-gray-700! border border-gray-300",
  };

  return (
    <span className={clsx(baseStyles, variantStyles[variant], customClass)}>
      {text}
    </span>
  );
};`;

export const checkButtonCode = `import clsx from "clsx";
import React from "react";

type Variant = "primary" | "secondary";

interface Opcion {
  id: string;
  label: string;
}

interface CheckButtonProps {
  listaOpciones?: Opcion[];
  selectedItems?: string[];
  onToggle: (opcion: Opcion) => void;
  customClass?: string;
  customClassItem?: string;
  customClassLabel?: string;
  isDisabled?: boolean;
  variant?: Variant;
}

export const CheckButton = ({
  listaOpciones,
  selectedItems,
  onToggle,
  customClass = "",
  customClassItem = "",
  customClassLabel = "",
  isDisabled = false,
  variant = "primary",
}: CheckButtonProps) => {
  const opciones: Opcion[] =
    variant === "secondary"
      ? listaOpciones ?? [
          { id: "si", label: "Sí" },
          { id: "no", label: "No" },
        ]
      : listaOpciones ?? [];

  return (
    <div className={clsx("flex flex-col gap-y-5", customClass)}>
      {opciones.map((opcion) => {
        const checked = selectedItems?.includes(opcion.id);
        return (
          <div
            key={opcion.id}
            className={clsx(
              "flex flex-row items-center gap-x-2",
              customClassItem
            )}
          >
            <input
              id={opcion.id}
              type={variant === "secondary" ? "radio" : "checkbox"}
              name={variant === "secondary" ? "radio-group" : opcion.id}
              checked={checked}
              disabled={isDisabled}
              onChange={() => onToggle(opcion)}
              className={clsx(
                "w-5 h-5 cursor-pointer",
                "accent-(--primary-color)",
                variant === "secondary" && "rounded-full",
                isDisabled && "cursor-default! opacity-60"
              )}
            />
            <label
              htmlFor={opcion.id}
              className={clsx(
                isDisabled && "opacity-60 cursor-default",
                customClassLabel
              )}
            >
              {opcion.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};`;

export const uploadBoxCode = `import clsx from "clsx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface UploadBoxProps {
  text: string;
  textStrong: string;
  customClass?: string;
  confirmacion?: boolean;
  error?: boolean;
}

export const UploadBox = ({
  text,
  textStrong,
  customClass = "",
  confirmacion = false,
  error = false,
}: UploadBoxProps) => {
  return (
    <div
      className={clsx(
        "cursor-pointer flex flex-col justify-center items-center w-full p-5",
        "rounded-md border-dotted border-2",
        "transition-colors duration-200",
        error
          ? "bg-red-50 border-red-300 hover:bg-red-100"
          : "bg-gray-200 border-gray-300 hover:bg-gray-100",
        customClass
      )}
    >
      {error ? (
        <>
          <MdCancel size={32} className="fill-red-500" />
          <p className="mb-0 text-center select-none text-red-600">
            <strong>{textStrong}</strong> {text}
          </p>
          <p className="mb-0 select-none italic text-sm! mt-2 text-red-500">
            {"Haz click aquí para subir un archivo válido"}
          </p>
        </>
      ) : confirmacion ? (
        <>
          <FaRegCheckCircle size={32} className="fill-green-500" />
          <p className="mb-0 text-center select-none">
            <strong>{textStrong}</strong> {text}
          </p>
          <p className="mb-0 select-none italic text-sm! mt-2">
            {"Haz click aqui para subir un nuevo documento"}
          </p>
        </>
      ) : (
        <>
          <AiOutlineCloudUpload size={32} />
          <p className="mb-0 text-center select-none">
            <strong>{textStrong}</strong> {text}
          </p>
          <p className="mb-0 select-none">
            .pdf,.doc,.docx,.jpg,.jpeg,.png (Max 10MB)
          </p>
        </>
      )}
    </div>
  );
};`;

export const tablaDatosCode = `import clsx from "clsx";
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
      <div className={clsx(baseStyles, customClass, variantStyles[variant])}>
        <div
          className={clsx(
            "grid items-center gap-4 text-white font-semibold px-3"
          )}
          style={
            !mostrarAcciones
              ? { gridTemplateColumns: \`repeat(\${listaHeaders.length}, minmax(0, 1fr))\` }
              : { gridTemplateColumns: \`repeat(\${listaHeaders.length}, minmax(0, 1fr)) 100px\` }
          }
        >
          {listaHeaders.map((header, index) => (
            <div key={\`\${header}-\${index}\`}>{header}</div>
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
                ? { gridTemplateColumns: \`repeat(\${columnas.length}, minmax(0, 1fr))\` }
                : { gridTemplateColumns: \`repeat(\${columnas.length}, minmax(0, 1fr)) 100px\` }
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
                  <button type="button" className="cursor-pointer hover:bg-gray-200 p-2 rounded-2xl" onClick={() => botonEdit(item)}>
                    <MdOutlineEdit />
                  </button>
                )}
                {botonDelete && (
                  <button type="button" className="cursor-pointer hover:bg-gray-200 p-2 rounded-2xl" onClick={() => botonDelete(item)}>
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
};`;

export const skeletonSolicitudCode = `/**
 * Skeleton loader que replica la estructura de SolicitudCard.
 * Se muestra mientras se cargan las solicitudes.
 */
export function SkeletonSolicitudCard() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex gap-x-6 px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-36 bg-gray-200 rounded"></div>
      </div>
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

interface SkeletonSolicitudesListProps {
  count?: number;
}

export function SkeletonSolicitudesList({ count = 3 }: SkeletonSolicitudesListProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonSolicitudCard key={i} />
      ))}
    </div>
  );
}`;

export const paginacionCode = `import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}

function calcularRangoVisible(
  paginaActual: number,
  totalPaginas: number,
): number[] {
  const maxVisible = 5;

  if (totalPaginas <= maxVisible) {
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  let inicio = paginaActual - Math.floor(maxVisible / 2);
  let fin = inicio + maxVisible - 1;

  if (inicio < 1) {
    inicio = 1;
    fin = maxVisible;
  }

  if (fin > totalPaginas) {
    fin = totalPaginas;
    inicio = totalPaginas - maxVisible + 1;
  }

  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
}

export const Paginacion = ({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
}: PaginacionProps) => {
  if (totalPaginas <= 1) return null;

  const rangoVisible = calcularRangoVisible(paginaActual, totalPaginas);
  const hayAnterior = paginaActual > 1;
  const haySiguiente = paginaActual < totalPaginas;

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        type="button"
        disabled={!hayAnterior}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className="p-1.5 rounded-md text-[#0572CE] hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronLeft className="size-4" />
      </button>

      {rangoVisible.map((pagina) => (
        <button
          key={pagina}
          type="button"
          onClick={() => onCambiarPagina(pagina)}
          className={\`cursor-pointer min-w-[32px] h-8 px-2 rounded-md text-xs font-medium transition-colors \${
            pagina === paginaActual
              ? "bg-[#0572CE] text-white shadow-sm"
              : "text-[#0572CE] hover:bg-blue-100"
          }\`}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        disabled={!haySiguiente}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="p-1.5 rounded-md text-[#0572CE] hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight className="size-4" />
      </button>
    </div>
  );
};`;

export const stepperCode = `interface Paso {
  id: string;
  label: string;
}

interface StepperProps {
  pasos: Paso[];
  pasoActual: number;
  onCambiarPaso?: (paso: number) => void;
  puedeNavegar?: boolean;
}

export const Stepper = ({
  pasos,
  pasoActual,
  onCambiarPaso,
  puedeNavegar = false,
}: StepperProps) => {
  return (
    <div className="p-5 z-60">
      {/* Mobile: solo badge con paso actual */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0572CE] text-sm font-semibold text-[#0572CE]">
          {pasoActual}/{pasos.length}
        </div>
        <span className="font-semibold text-gray-700">
          {pasos[pasoActual - 1]?.label}
        </span>
      </div>

      {/* Desktop sm+: stepper horizontal */}
      <div className="hidden md:flex items-start justify-between">
        {pasos.map((paso, index) => (
          <div
            key={paso.id}
            className="flex flex-col items-center flex-1 relative"
          >
            {/* Línea */}
            {index < pasos.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 z-0">
                <div className="w-full h-full bg-gray-300 rounded" />
                <div
                  className="absolute top-0 left-0 h-full bg-[#0572CE] rounded transition-all duration-300"
                  style={{
                    width: index < pasoActual - 1 ? "100%" : "0%",
                  }}
                />
              </div>
            )}

            {/* Círculo */}
            <div
              className={\`z-10 w-10 h-10 rounded-full text-white flex items-center justify-center select-none \${
                index + 1 <= pasoActual ? "bg-[#0572CE]" : "bg-gray-300"
              } \${puedeNavegar ? "cursor-pointer" : "cursor-default"}\`}
              onClick={() => puedeNavegar && onCambiarPaso?.(index + 1)}
            >
              {index + 1}
            </div>

            {/* Label */}
            <p
              className={\`mt-2 text-sm text-center max-w-25 \${
                index + 1 <= pasoActual ? "text-[#0572CE] font-medium" : "text-gray-500"
              }\`}
            >
              {paso.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};`;

export const listaPaginadaCode = `import { type ReactNode } from "react";
import { Paginacion } from "./Paginacion";
import { SkeletonSolicitudesList } from "./SkeletonSolicitud";

interface ListaPaginadaProps {
  titulo?: string;
  isLoading: boolean;
  error?: string | null;
  totalItems?: number;
  itemLabel?: string;
  paginaActual: number;
  totalPaginas: number;
  itemsPorPagina?: number;
  onCambiarPagina: (pagina: number) => void;
  children: ReactNode;
}

/**
 * Contenedor de lista paginada con skeleton de carga, manejo de error,
 * contador de resultados y paginación integrada.
 */
export const ListaPaginada = ({
  titulo = "Lista de solicitudes",
  isLoading,
  error,
  totalItems = 0,
  itemLabel = "solicitud",
  paginaActual,
  totalPaginas,
  itemsPorPagina = 3,
  onCambiarPagina,
  children,
}: ListaPaginadaProps) => {
  const plural = totalItems !== 1;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl p-6">
      <section>
        <h2 className="mb-4 font-semibold text-gray-800">{titulo}</h2>

        {isLoading && <SkeletonSolicitudesList count={itemsPorPagina} />}

        {!isLoading && error && (
          <div className="w-full flex items-center gap-3 bg-red-500/10 text-red-900 border border-red-500 rounded-xl px-3 py-4">
            Error: {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            <p className="text-xs text-gray-400 mb-3">
              {totalItems} {itemLabel}{plural ? "es" : ""} encontrada{plural ? "s" : ""}
            </p>
            <div className="flex flex-col gap-3">
              {children}
              <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={onCambiarPagina}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};`;

export const customModalCode = `import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { BiX } from "react-icons/bi";

interface CustomModalProps {
  size: "sm" | "md" | "lg";
  title?: string;
  height?: string;
  children: React.ReactNode;
  showModal: boolean;
  fullHeight?: boolean;
  onShow?: () => void;
  onClose?: () => void;
}

const sizeClasses = {
  sm: "w-[568px]",
  md: "w-[990px]",
  lg: "w-full md:w-[48rem] lg:w-[80rem]",
};

export const CustomModal = ({
  size,
  title,
  children,
  showModal,
  onShow,
  onClose,
}: CustomModalProps) => {
  useEffect(() => {
    if (showModal && onShow) {
      onShow();
    }
  }, [showModal, onShow]);

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={() => onClose?.()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={\`\${sizeClasses[size]} transform
                    overflow-hidden
                    rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all max-h-[95dvh]
                    flex flex-col\`}
                >
                  {/* Header fijo */}
                  <div className="flex justify-between items-center mb-3 shrink-0">
                    <p className="font-bold text-base text-blue-900">
                      {title}
                    </p>
                    <button
                      onClick={onClose}
                      className="text-gray-700 p-1 rounded-md hover:bg-gray-700/10 cursor-pointer"
                    >
                      <BiX className="size-4" />
                    </button>
                  </div>

                  {/* Contenido con scroll */}
                  <div className="overflow-y-auto flex-1">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};`;

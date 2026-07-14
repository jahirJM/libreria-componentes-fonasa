import { useState } from "react";
import { Input } from "./componentsUI/Input";
import { Label } from "./componentsUI/Label";
import { CustomModal } from "./componentsUI/CustomModal";
import { TextArea } from "./componentsUI/TextArea";
import { Table } from "./componentsUI/Table";
import { Select } from "./componentsUI/Select";
import { BotonConfirmar, BotonCancelar, BotonPrimario, BotonSecundario } from "./componentsUI/Botones";
import { FonasaToaster, fonasaToast } from "./componentsUI/Toast";
import { Loading, LoadingSection, LoadingFonasa } from "./componentsUI/Loading";
import { Badge } from "./componentsUI/Badge";
import { CheckButton } from "./componentsUI/CheckButton";
import { UploadBox } from "./componentsUI/UploadBox";
import { TablaDatos } from "./componentsUI/TablaDatos";
import { SkeletonSolicitudCard, SkeletonSolicitudesList } from "./componentsUI/SkeletonSolicitud";
import { Paginacion } from "./componentsUI/Paginacion";
import { Stepper } from "./componentsUI/Stepper";
import { ListaPaginada } from "./componentsUI/ListaPaginada";
import { SolicitudCard } from "./componentsUI/SolicitudCard";

export interface ComponentVariant {
  label: string;
  props: Record<string, unknown>;
  render: () => React.ReactNode;
  usageCode: string;
}

export interface ComponentEntry {
  name: string;
  description?: string;
  code: string;
  dependencies?: string[];
  propsInterface?: string;
  variants: ComponentVariant[];
}

const inputCode = `interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  placeholder,
  error,
  disabled,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={\`rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 \${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        } \${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "bg-white"}\`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}`;

const labelCode = `import { IndicadorRequerido } from "./IndicadorRequerido";
import { type LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  indicador?: boolean;
}

export const Label = ({
  className,
  text,
  indicador = false,
  ...props
}: LabelProps) => {
  return (
    <label className={\`text-sm text-gray-600 \${className ?? ""}\`} {...props}>
      {text} {indicador && <IndicadorRequerido />}
    </label>
  );
};`;

const textAreaCode = `import { type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  className?: string;
}

export const TextArea = ({
  error,
  className,
  disabled,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      disabled={disabled}
      className={\`placeholder:text-sm text-sm
        border rounded-xl px-3 py-1.5 text-gray-600
        focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none
        transition-colors duration-150
        \${disabled ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-white"}
        \${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
        \${className ?? ""}\`}
      {...props}
    />
  );
};`;

const tableCode = `import type { ReactNode, TableHTMLAttributes } from "react";

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
        <table className={\`w-full \${classTable ?? ""}\`} {...props}>
          <thead>
            <tr className="bg-blue-900 text-xs">
              {nombreColumnas.map((columna, index) => (
                <th
                  key={index}
                  className={\`px-4 py-3 text-left font-semibold text-white \${classTh ?? ""}\`}
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

const selectCode = `import { type ReactNode, type SelectHTMLAttributes } from "react";

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

const botonesCode = `import type { IconType } from "react-icons";
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

const toastCode = `import { toast, Toaster } from "sonner";

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

const loadingCode = `interface FullLoadingProps {
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

const badgeCode = `import clsx from "clsx";

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

const checkButtonCode = `import clsx from "clsx";
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

const uploadBoxCode = `import clsx from "clsx";
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

const tablaDatosCode = `import clsx from "clsx";
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

const skeletonSolicitudCode = `/**
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

const paginacionCode = `import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

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
        className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
              ? "bg-(--primary-color) text-white"
              : "text-gray-600 hover:bg-gray-100"
          }\`}
        >
          {pagina}
        </button>
      ))}

      <button
        type="button"
        disabled={!haySiguiente}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight className="size-4" />
      </button>
    </div>
  );
};`;

const stepperCode = `interface Paso {
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

const listaPaginadaCode = `import { type ReactNode } from "react";
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

const customModalCode = `import { Dialog, Transition } from "@headlessui/react";
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

function ModalDemo({ size, title }: { size: "sm" | "md" | "lg"; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        Abrir Modal ({size})
      </button>
      <CustomModal size={size} title={title} showModal={open} onClose={() => setOpen(false)}>
        <p className="text-gray-700">Contenido de ejemplo dentro del modal.</p>
      </CustomModal>
    </>
  );
}

function CheckButtonDemo({ variant, opciones, isDisabled }: { variant?: "primary" | "secondary"; opciones?: { id: string; label: string }[]; isDisabled?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const handleToggle = (opcion: { id: string; label: string }) => {
    if (variant === "secondary") {
      setSelected([opcion.id]);
    } else {
      setSelected((prev) =>
        prev.includes(opcion.id) ? prev.filter((i) => i !== opcion.id) : [...prev, opcion.id]
      );
    }
  };
  return (
    <CheckButton
      variant={variant}
      listaOpciones={opciones}
      selectedItems={selected}
      onToggle={handleToggle}
      isDisabled={isDisabled}
    />
  );
}

function PaginacionDemo({ totalPaginas }: { totalPaginas: number }) {
  const [pagina, setPagina] = useState(1);
  return <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />;
}

function StepperDemo({ pasos, navegable }: { pasos: { id: string; label: string }[]; navegable?: boolean }) {
  const [paso, setPaso] = useState(1);
  return (
    <div>
      <Stepper pasos={pasos} pasoActual={paso} onCambiarPaso={setPaso} puedeNavegar={navegable} />
      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => setPaso((p) => Math.max(1, p - 1))}
          className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => setPaso((p) => Math.min(pasos.length, p + 1))}
          className="px-3 py-1 text-xs bg-[#0572CE] text-white rounded hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

function ListaPaginadaDemo() {
  const [pagina, setPagina] = useState(1);
  const items = [
    "Solicitud #001 - Inscripción",
    "Solicitud #002 - Actualización",
    "Solicitud #003 - Renuncia",
    "Solicitud #004 - Inscripción",
    "Solicitud #005 - Actualización",
  ];
  const itemsPorPagina = 2;
  const totalPaginas = Math.ceil(items.length / itemsPorPagina);
  const itemsPagina = items.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina);

  return (
    <ListaPaginada
      titulo="Mis solicitudes"
      isLoading={false}
      totalItems={items.length}
      itemLabel="solicitud"
      paginaActual={pagina}
      totalPaginas={totalPaginas}
      itemsPorPagina={itemsPorPagina}
      onCambiarPagina={setPagina}
    >
      {itemsPagina.map((item, i) => (
        <div key={i} className="p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700">
          {item}
        </div>
      ))}
    </ListaPaginada>
  );
}

export const registry: ComponentEntry[] = [
  {
    name: "Input",
    description: "Campo de texto reutilizable con soporte para estados de error y deshabilitado.",
    code: inputCode,
    propsInterface: `interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}`,
    variants: [
      {
        label: "Normal",
        props: { placeholder: "Ingrese texto" },
        render: () => <Input placeholder="Ingrese texto" />,
        usageCode: `<Input placeholder="Ingrese texto" />`,
      },
      {
        label: "Con Label",
        props: { label: "Email", placeholder: "tu@email.com" },
        render: () => <Input label="Email" placeholder="tu@email.com" />,
        usageCode: `<Input label="Email" placeholder="tu@email.com" />`,
      },
      {
        label: "Error",
        props: { placeholder: "Ingrese texto", error: "Campo requerido" },
        render: () => (
          <Input placeholder="Ingrese texto" error="Campo requerido" />
        ),
        usageCode: `<Input placeholder="Ingrese texto" error="Campo requerido" />`,
      },
      {
        label: "Deshabilitado",
        props: { placeholder: "No disponible", disabled: true },
        render: () => <Input placeholder="No disponible" disabled />,
        usageCode: `<Input placeholder="No disponible" disabled />`,
      },
    ],
  },
  {
    name: "Label",
    description: "Etiqueta de texto con soporte para indicador de campo requerido.",
    code: labelCode,
    propsInterface: `interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  indicador?: boolean;
}`,
    variants: [
      {
        label: "Normal",
        props: { text: "Nombre" },
        render: () => <Label text="Nombre" />,
        usageCode: `<Label text="Nombre" />`,
      },
      {
        label: "Con indicador requerido",
        props: { text: "Email", indicador: true },
        render: () => <Label text="Email" indicador />,
        usageCode: `<Label text="Email" indicador />`,
      },
      {
        label: "Con clase personalizada",
        props: { text: "Teléfono", className: "font-bold" },
        render: () => <Label text="Teléfono" className="font-bold" />,
        usageCode: `<Label text="Teléfono" className="font-bold" />`,
      },
    ],
  },
  {
    name: "CustomModal",
    description: "Modal con animaciones de transición, tamaños configurables (sm, md, lg), header con título y botón de cierre.",
    code: customModalCode,
    dependencies: ["@headlessui/react", "react-icons"],
    propsInterface: `interface CustomModalProps {
  size: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
  showModal: boolean;
  onShow?: () => void;
  onClose?: () => void;
}`,
    variants: [
      {
        label: "Small",
        props: { size: "sm", title: "Modal Pequeño" },
        render: () => <ModalDemo size="sm" title="Modal Pequeño" />,
        usageCode: `<CustomModal size="sm" title="Modal Pequeño" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Medium",
        props: { size: "md", title: "Modal Mediano" },
        render: () => <ModalDemo size="md" title="Modal Mediano" />,
        usageCode: `<CustomModal size="md" title="Modal Mediano" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Large",
        props: { size: "lg", title: "Modal Grande" },
        render: () => <ModalDemo size="lg" title="Modal Grande" />,
        usageCode: `<CustomModal size="lg" title="Modal Grande" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
    ],
  },
  {
    name: "TextArea",
    description: "Campo de texto multilínea con soporte para estados de error y deshabilitado.",
    code: textAreaCode,
    propsInterface: `interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  className?: string;
}`,
    variants: [
      {
        label: "Normal",
        props: { placeholder: "Escribe aquí..." },
        render: () => <TextArea placeholder="Escribe aquí..." />,
        usageCode: `<TextArea placeholder="Escribe aquí..." />`,
      },
      {
        label: "Con error",
        props: { placeholder: "Escribe aquí...", error: true },
        render: () => <TextArea placeholder="Escribe aquí..." error />,
        usageCode: `<TextArea placeholder="Escribe aquí..." error />`,
      },
      {
        label: "Deshabilitado",
        props: { placeholder: "No disponible", disabled: true },
        render: () => <TextArea placeholder="No disponible" disabled />,
        usageCode: `<TextArea placeholder="No disponible" disabled />`,
      },
    ],
  },
  {
    name: "Table (Simple)",
    description: "Tabla HTML simple con header estilizado, columnas configurables y contenedor con bordes redondeados.",
    code: tableCode,
    propsInterface: `interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  classTable?: string;
  classTh?: string;
  nombreColumnas: string[];
  children: ReactNode;
}`,
    variants: [
      {
        label: "Básica",
        props: { nombreColumnas: ["Nombre", "Email", "Rol"] },
        render: () => (
          <Table nombreColumnas={["Nombre", "Email", "Rol"]}>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">Juan Pérez</td>
              <td className="px-4 py-2 text-sm">juan@email.com</td>
              <td className="px-4 py-2 text-sm">Admin</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">María López</td>
              <td className="px-4 py-2 text-sm">maria@email.com</td>
              <td className="px-4 py-2 text-sm">Usuario</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["Nombre", "Email", "Rol"]}>\n  <tr>\n    <td className="px-4 py-2 text-sm">Juan Pérez</td>\n    <td className="px-4 py-2 text-sm">juan@email.com</td>\n    <td className="px-4 py-2 text-sm">Admin</td>\n  </tr>\n</Table>`,
      },
      {
        label: "Con clases personalizadas",
        props: { nombreColumnas: ["ID", "Estado"], classTable: "text-center", classTh: "text-center" },
        render: () => (
          <Table nombreColumnas={["ID", "Estado"]} classTable="text-center" classTh="text-center">
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">001</td>
              <td className="px-4 py-2 text-sm">Activo</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-2 text-sm">002</td>
              <td className="px-4 py-2 text-sm">Inactivo</td>
            </tr>
          </Table>
        ),
        usageCode: `<Table nombreColumnas={["ID", "Estado"]} classTable="text-center" classTh="text-center">\n  <tr>\n    <td className="px-4 py-2 text-sm">001</td>\n    <td className="px-4 py-2 text-sm">Activo</td>\n  </tr>\n</Table>`,
      },
    ],
  },
  {
    name: "Select",
    description: "Select desplegable con soporte para estados de error y deshabilitado.",
    code: selectCode,
    propsInterface: `interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
  children: ReactNode;
}`,
    variants: [
      {
        label: "Normal",
        props: {},
        render: () => (
          <Select>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
            <option value="2">Opción 2</option>
          </Select>
        ),
        usageCode: `<Select>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n  <option value="2">Opción 2</option>\n</Select>`,
      },
      {
        label: "Con error",
        props: { error: true },
        render: () => (
          <Select error>
            <option value="">Seleccione una opción</option>
            <option value="1">Opción 1</option>
          </Select>
        ),
        usageCode: `<Select error>\n  <option value="">Seleccione una opción</option>\n  <option value="1">Opción 1</option>\n</Select>`,
      },
      {
        label: "Deshabilitado",
        props: { disabled: true },
        render: () => (
          <Select disabled>
            <option value="">No disponible</option>
          </Select>
        ),
        usageCode: `<Select disabled>\n  <option value="">No disponible</option>\n</Select>`,
      },
    ],
  },
  {
    name: "Botones",
    description: "Conjunto de botones (Confirmar, Cancelar, Primario, Secundario) con soporte para íconos y estado deshabilitado.",
    code: botonesCode,
    dependencies: ["react-icons"],
    propsInterface: `interface BotonesProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}`,
    variants: [
      {
        label: "BotonConfirmar",
        props: { label: "Confirmar" },
        render: () => <BotonConfirmar label="Confirmar" />,
        usageCode: `<BotonConfirmar label="Confirmar" />`,
      },
      {
        label: "BotonCancelar",
        props: { label: "Cancelar" },
        render: () => <BotonCancelar label="Cancelar" />,
        usageCode: `<BotonCancelar label="Cancelar" />`,
      },
      {
        label: "BotonPrimario",
        props: { label: "Guardar" },
        render: () => <BotonPrimario label="Guardar" />,
        usageCode: `<BotonPrimario label="Guardar" />`,
      },
      {
        label: "BotonSecundario",
        props: { label: "Volver" },
        render: () => <BotonSecundario label="Volver" />,
        usageCode: `<BotonSecundario label="Volver" />`,
      },
      {
        label: "Deshabilitado",
        props: { label: "No disponible", isDisabled: true },
        render: () => <BotonPrimario label="No disponible" isDisabled />,
        usageCode: `<BotonPrimario label="No disponible" isDisabled />`,
      },
    ],
  },
  {
    name: "Toast (Sonner)",
    description: "Notificaciones toast con estilos Fonasa. Incluye variantes de éxito, error, info y advertencia.",
    code: toastCode,
    dependencies: ["sonner"],
    propsInterface: `// No recibe props como componente.
// Se usa via funciones utilitarias:

fonasaToast.success(mensaje: string): void;
fonasaToast.error(mensaje: string): void;
fonasaToast.info(mensaje: string): void;
fonasaToast.warning(mensaje: string): void;

// El Toaster se coloca una vez en el layout:
<FonasaToaster />`,
    variants: [
      {
        label: "Éxito",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() => fonasaToast.success("Operación realizada correctamente")}
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm hover:bg-cyan-500"
            >
              Mostrar Toast Éxito
            </button>
          </>
        ),
        usageCode: `fonasaToast.success("Operación realizada correctamente")`,
      },
      {
        label: "Error",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() => fonasaToast.error("Ocurrió un error al procesar la solicitud")}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-500"
            >
              Mostrar Toast Error
            </button>
          </>
        ),
        usageCode: `fonasaToast.error("Ocurrió un error al procesar la solicitud")`,
      },
      {
        label: "Info",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() => fonasaToast.info("Se ha enviado un correo de verificación")}
              className="px-4 py-2 bg-[#0572CE] text-white rounded-xl text-sm hover:bg-blue-700"
            >
              Mostrar Toast Info
            </button>
          </>
        ),
        usageCode: `fonasaToast.info("Se ha enviado un correo de verificación")`,
      },
      {
        label: "Advertencia",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() => fonasaToast.warning("Su sesión expirará en 5 minutos")}
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm hover:bg-amber-500"
            >
              Mostrar Toast Advertencia
            </button>
          </>
        ),
        usageCode: `fonasaToast.warning("Su sesión expirará en 5 minutos")`,
      },
    ],
  },
  {
    name: "Loading",
    description: "Componentes de carga: Loading (pantalla completa), LoadingSection (en sección), LoadingFonasa (con favicon de Fonasa al centro).",
    code: loadingCode,
    propsInterface: `interface FullLoadingProps {
  mensaje?: string;
}

// Loading: pantalla completa con overlay
// LoadingSection: en sección sin overlay
// LoadingFonasa: con favicon de Fonasa al centro`,
    variants: [
      {
        label: "Loading (fullscreen)",
        props: { mensaje: "Cargando datos..." },
        render: () => (
          <div className="relative h-48 w-full rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
              <div className="bg-white p-3 rounded-full mb-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#0572CE]"></div>
              </div>
              <p className="text-white text-sm font-semibold">Cargando datos...</p>
            </div>
          </div>
        ),
        usageCode: `<Loading mensaje="Cargando datos..." />`,
      },
      {
        label: "LoadingSection",
        props: { mensaje: "Procesando..." },
        render: () => (
          <div className="py-8">
            <LoadingSection mensaje="Procesando..." />
          </div>
        ),
        usageCode: `<LoadingSection mensaje="Procesando..." />`,
      },
      {
        label: "LoadingFonasa (con favicon)",
        props: { mensaje: "Cargando..." },
        render: () => (
          <div className="py-8">
            <LoadingFonasa mensaje="Cargando..." />
          </div>
        ),
        usageCode: `<LoadingFonasa mensaje="Cargando..." />`,
      },
    ],
  },
  {
    name: "Badge",
    description: "Badge/pill para indicar estados, contadores y categorías. Variantes de color según contexto.",
    code: badgeCode,
    dependencies: ["clsx"],
    propsInterface: `type BadgeVariant =
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
}`,
    variants: [
      {
        label: "Pendiente",
        props: { variant: "estado-pendiente", text: "Pendiente" },
        render: () => <Badge variant="estado-pendiente" text="Pendiente" />,
        usageCode: `<Badge variant="estado-pendiente" text="Pendiente" />`,
      },
      {
        label: "En revisión",
        props: { variant: "estado-revision", text: "En revisión" },
        render: () => <Badge variant="estado-revision" text="En revisión" />,
        usageCode: `<Badge variant="estado-revision" text="En revisión" />`,
      },
      {
        label: "Aprobada",
        props: { variant: "estado-aprobada", text: "Aprobada" },
        render: () => <Badge variant="estado-aprobada" text="Aprobada" />,
        usageCode: `<Badge variant="estado-aprobada" text="Aprobada" />`,
      },
      {
        label: "Rechazada",
        props: { variant: "estado-rechazada", text: "Rechazada" },
        render: () => <Badge variant="estado-rechazada" text="Rechazada" />,
        usageCode: `<Badge variant="estado-rechazada" text="Rechazada" />`,
      },
      {
        label: "Counter",
        props: { variant: "counter", text: "12" },
        render: () => <Badge variant="counter" text="12" />,
        usageCode: `<Badge variant="counter" text="12" />`,
      },
      {
        label: "Default",
        props: { variant: "estado-default", text: "Sin estado" },
        render: () => <Badge variant="estado-default" text="Sin estado" />,
        usageCode: `<Badge variant="estado-default" text="Sin estado" />`,
      },
    ],
  },
  {
    name: "CheckButton",
    description: "Checkbox/radio button group con variantes primary (checkbox múltiple) y secondary (radio single).",
    code: checkButtonCode,
    dependencies: ["clsx"],
    propsInterface: `interface Opcion {
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
  variant?: "primary" | "secondary";
}`,
    variants: [
      {
        label: "Checkbox (primary)",
        props: { variant: "primary" },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
              { id: "opcion3", label: "Opción 3" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }, { id: "opcion2", label: "Opción 2" }]}\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Radio (secondary)",
        props: { variant: "secondary" },
        render: () => <CheckButtonDemo variant="secondary" />,
        usageCode: `<CheckButton\n  variant="secondary"\n  selectedItems={selected}\n  onToggle={handleToggle}\n/>`,
      },
      {
        label: "Deshabilitado",
        props: { variant: "primary", isDisabled: true },
        render: () => (
          <CheckButtonDemo
            variant="primary"
            isDisabled
            opciones={[
              { id: "opcion1", label: "Opción 1" },
              { id: "opcion2", label: "Opción 2" },
            ]}
          />
        ),
        usageCode: `<CheckButton\n  variant="primary"\n  listaOpciones={[{ id: "opcion1", label: "Opción 1" }]}\n  selectedItems={[]}\n  onToggle={handleToggle}\n  isDisabled\n/>`,
      },
    ],
  },
  {
    name: "UploadBox",
    description: "Zona de carga de archivos con estados: default, confirmación y error. Estilo drag & drop.",
    code: uploadBoxCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface UploadBoxProps {
  text: string;
  textStrong: string;
  customClass?: string;
  confirmacion?: boolean;
  error?: boolean;
}`,
    variants: [
      {
        label: "Default",
        props: { textStrong: "Arrastra tu archivo aquí", text: "o haz click para buscar" },
        render: () => <UploadBox textStrong="Arrastra tu archivo aquí" text="o haz click para buscar" />,
        usageCode: `<UploadBox textStrong="Arrastra tu archivo aquí" text="o haz click para buscar" />`,
      },
      {
        label: "Confirmación",
        props: { textStrong: "documento.pdf", text: "subido correctamente", confirmacion: true },
        render: () => <UploadBox textStrong="documento.pdf" text="subido correctamente" confirmacion />,
        usageCode: `<UploadBox textStrong="documento.pdf" text="subido correctamente" confirmacion />`,
      },
      {
        label: "Error",
        props: { textStrong: "archivo.exe", text: "formato no válido", error: true },
        render: () => <UploadBox textStrong="archivo.exe" text="formato no válido" error />,
        usageCode: `<UploadBox textStrong="archivo.exe" text="formato no válido" error />`,
      },
    ],
  },
  {
    name: "TablaDatos",
    description: "Tabla con grid dinámico, variantes de color en header, y botones de editar/eliminar por fila. Incluye su propio Skeleton loader.",
    code: tablaDatosCode,
    dependencies: ["clsx", "react-icons"],
    propsInterface: `interface TablaDatoFila {
  id: string;
  [key: string]: string | number | undefined;
}

interface TablaDatosProps {
  isDisabled?: boolean;
  customClass?: string;
  variant?: "primary" | "secondary";
  listaDatos: TablaDatoFila[];
  listaHeaders: string[];
  columnas: string[];
  botonEdit?: (item: TablaDatoFila) => void;
  botonDelete?: (item: TablaDatoFila) => void;
}`,
    variants: [
      {
        label: "Sin acciones",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "RUT", "Edad"]}
            columnas={["nombre", "rut", "edad"]}
            listaDatos={[
              { id: "1", nombre: "Juan Pérez", rut: "12.345.678-9", edad: "35" },
              { id: "2", nombre: "María López", rut: "98.765.432-1", edad: "28" },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "RUT", "Edad"]}\n  columnas={["nombre", "rut", "edad"]}\n  listaDatos={[{ id: "1", nombre: "Juan", rut: "12.345.678-9", edad: "35" }]}\n/>`,
      },
      {
        label: "Con acciones (editar/eliminar)",
        props: {},
        render: () => (
          <TablaDatos
            listaHeaders={["Nombre", "Email", "Acciones"]}
            columnas={["nombre", "email"]}
            listaDatos={[
              { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
              { id: "2", nombre: "María López", email: "maria@email.com" },
            ]}
            botonEdit={(item) => alert(`Editar: ${item.nombre}`)}
            botonDelete={(item) => alert(`Eliminar: ${item.nombre}`)}
          />
        ),
        usageCode: `<TablaDatos\n  listaHeaders={["Nombre", "Email", "Acciones"]}\n  columnas={["nombre", "email"]}\n  listaDatos={datos}\n  botonEdit={(item) => handleEdit(item)}\n  botonDelete={(item) => handleDelete(item)}\n/>`,
      },
      {
        label: "Variante secondary",
        props: { variant: "secondary" },
        render: () => (
          <TablaDatos
            variant="secondary"
            listaHeaders={["Código", "Descripción"]}
            columnas={["codigo", "descripcion"]}
            listaDatos={[
              { id: "1", codigo: "A01", descripcion: "Consulta general" },
              { id: "2", codigo: "B02", descripcion: "Especialidad" },
            ]}
          />
        ),
        usageCode: `<TablaDatos\n  variant="secondary"\n  listaHeaders={["Código", "Descripción"]}\n  columnas={["codigo", "descripcion"]}\n  listaDatos={datos}\n/>`,
      },
    ],
  },
  {
    name: "Stepper",
    description: "Stepper horizontal para formularios multi-paso. Responsive: en mobile muestra badge, en desktop muestra línea de progreso con círculos.",
    code: stepperCode,
    propsInterface: `interface Paso {
  id: string;
  label: string;
}

interface StepperProps {
  pasos: Paso[];
  pasoActual: number;
  onCambiarPaso?: (paso: number) => void;
  puedeNavegar?: boolean;
}`,
    variants: [
      {
        label: "3 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            pasos={[
              { id: "1", label: "Datos personales" },
              { id: "2", label: "Documentos" },
              { id: "3", label: "Confirmación" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Datos" }, { id: "2", label: "Docs" }, { id: "3", label: "Confirmar" }]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "5 pasos",
        props: { pasoActual: 1 },
        render: () => (
          <StepperDemo
            pasos={[
              { id: "1", label: "Inicio" },
              { id: "2", label: "Datos" },
              { id: "3", label: "Documentos" },
              { id: "4", label: "Revisión" },
              { id: "5", label: "Envío" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={[{ id: "1", label: "Inicio" }, ...]}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n/>`,
      },
      {
        label: "Navegable (click en pasos)",
        props: { puedeNavegar: true },
        render: () => (
          <StepperDemo
            navegable
            pasos={[
              { id: "1", label: "Paso 1" },
              { id: "2", label: "Paso 2" },
              { id: "3", label: "Paso 3" },
              { id: "4", label: "Paso 4" },
            ]}
          />
        ),
        usageCode: `<Stepper\n  pasos={pasos}\n  pasoActual={pasoActual}\n  onCambiarPaso={setPaso}\n  puedeNavegar\n/>`,
      },
    ],
  },
  {
    name: "Lista de Solicitudes",
    description: "Utiliza: Paginación, Badge, SkeletonSolicitud. Contenedor de lista de solicitudes con skeleton de carga, manejo de error, contador de resultados y paginación integrada.",
    code: listaPaginadaCode,
    dependencies: ["react-icons"],
    propsInterface: `interface ListaPaginadaProps {
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
}`,
    variants: [
      {
        label: "Cargando (skeleton)",
        props: { isLoading: true },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={true}
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={true} ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Con error",
        props: { error: "Error del servidor" },
        render: () => (
          <ListaPaginada
            titulo="Mis solicitudes"
            isLoading={false}
            error="Error del servidor"
            totalItems={0}
            paginaActual={1}
            totalPaginas={1}
            onCambiarPagina={() => {}}
          >
            {null}
          </ListaPaginada>
        ),
        usageCode: `<ListaPaginada isLoading={false} error="Error del servidor" ...>\n  {null}\n</ListaPaginada>`,
      },
      {
        label: "Skeleton - Card individual",
        props: {},
        render: () => <SkeletonSolicitudCard />,
        usageCode: `<SkeletonSolicitudCard />`,
      },
      {
        label: "Skeleton - Lista (3 cards)",
        props: { count: 3 },
        render: () => <SkeletonSolicitudesList count={3} />,
        usageCode: `<SkeletonSolicitudesList count={3} />`,
      },
      {
        label: "SolicitudCard - Ejemplo completo",
        props: {},
        render: () => (
          <SolicitudCard
            id={1234}
            tipo="Solicitud de Inscripción"
            estado={{ label: "Visación", variant: "estado-revision" }}
            fechaEnvio="15/06/2026"
            fechaResolucion="—"
            documentos={[
              { id: "1", nombre: "Certificado de título" },
              { id: "2", nombre: "Cédula de identidad" },
            ]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={1234}\n  tipo="Solicitud de Inscripción"\n  estado={{ label: "Visación", variant: "estado-revision" }}\n  fechaEnvio="15/06/2026"\n  documentos={[{ id: "1", nombre: "Certificado" }]}\n/>`,
      },
      {
        label: "SolicitudCard - Aprobada con resolución",
        props: {},
        render: () => (
          <SolicitudCard
            id={5678}
            tipo="Solicitud de Actualización"
            estado={{ label: "Aceptado", variant: "estado-aprobada" }}
            fechaEnvio="01/03/2026"
            fechaResolucion="10/03/2026"
            motivoResolucion="Documentación completa y verificada."
            documentoRespuesta={{ nombre: "Resolución aprobatoria" }}
            documentos={[
              { id: "1", nombre: "Formulario actualización" },
            ]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={5678}\n  tipo="Solicitud de Actualización"\n  estado={{ label: "Aceptado", variant: "estado-aprobada" }}\n  fechaEnvio="01/03/2026"\n  fechaResolucion="10/03/2026"\n  motivoResolucion="Documentación completa."\n  documentoRespuesta={{ nombre: "Resolución" }}\n  documentos={[...]}\n/>`,
      },
      {
        label: "SolicitudCard - Rechazada",
        props: {},
        render: () => (
          <SolicitudCard
            id={9012}
            tipo="Solicitud de Renuncia"
            estado={{ label: "Rechazado", variant: "estado-rechazada" }}
            fechaEnvio="20/05/2026"
            fechaResolucion="25/05/2026"
            motivoResolucion="Falta documento de respaldo."
            documentos={[
              { id: "1", nombre: "Carta de renuncia" },
            ]}
          />
        ),
        usageCode: `<SolicitudCard\n  id={9012}\n  tipo="Solicitud de Renuncia"\n  estado={{ label: "Rechazado", variant: "estado-rechazada" }}\n  motivoResolucion="Falta documento."\n  documentos={[...]}\n/>`,
      },
    ],
  },
  {
    name: "Paginación",
    description: "Paginación genérica con rango visible de hasta 5 páginas, centrada en la página actual. Flechas de navegación anterior/siguiente.",
    code: paginacionCode,
    dependencies: ["react-icons"],
    propsInterface: `interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
}`,
    variants: [
      {
        label: "Pocas páginas (3)",
        props: { totalPaginas: 3 },
        render: () => <PaginacionDemo totalPaginas={3} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={3} onCambiarPagina={setPagina} />`,
      },
      {
        label: "Muchas páginas (10)",
        props: { totalPaginas: 10 },
        render: () => <PaginacionDemo totalPaginas={10} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={10} onCambiarPagina={setPagina} />`,
      },
      {
        label: "20 páginas",
        props: { totalPaginas: 20 },
        render: () => <PaginacionDemo totalPaginas={20} />,
        usageCode: `<Paginacion paginaActual={pagina} totalPaginas={20} onCambiarPagina={setPagina} />`,
      },
    ],
  },
];

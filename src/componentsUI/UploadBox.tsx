import clsx from "clsx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

interface UploadBoxProps {
  text: string;
  textStrong: string;
  customClass?: string;
  confirmacion?: boolean;
  error?: boolean;
  /** Formatos permitidos, ej: ".pdf,.doc,.docx,.jpg" */
  allowedFormats?: string;
  /** Tamaño máximo, ej: "10MB" */
  maxSize?: string;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
  /** Si true, fuerza la vista compacta (solo ícono + max size) */
  forceCompact?: boolean;
}

export const UploadBox = ({
  text,
  textStrong,
  customClass = "",
  confirmacion = false,
  error = false,
  allowedFormats = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = "10MB",
  isLoading = false,
  forceCompact = false,
}: UploadBoxProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full p-5 rounded-md border-dotted border-2 border-gray-200 bg-gray-100 animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-56" />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "cursor-pointer flex flex-col justify-center items-center w-full p-5",
        "rounded-md border-dotted border-2",
        "transition-colors duration-200",
        error
          ? "bg-red-50 border-red-500 hover:bg-red-100"
          : "bg-gray-200 border-gray-300 hover:bg-gray-100",
        customClass
      )}
    >
      {error ? (
        <>
          {/* Vista compacta: ícono + max en fila */}
          <div className={clsx("flex-row items-center justify-center gap-2", forceCompact ? "flex" : "flex sm:hidden")}>
            <MdCancel size={32} className="fill-red-500 shrink-0" />
            <span className="select-none text-xs text-red-500">Max {maxSize}</span>
          </div>
          {/* Vista completa */}
          <div className={clsx("flex-col items-center", forceCompact ? "hidden" : "hidden sm:flex")}>
            <MdCancel size={32} className="fill-red-500" />
            <p className="mb-0 text-center select-none text-red-600">
              <strong>{textStrong}</strong> {text}
            </p>
            <p className="mb-0 select-none italic text-sm! mt-2 text-red-500">
              Haz click aquí para subir un archivo válido
            </p>
          </div>
        </>
      ) : confirmacion ? (
        <>
          {/* Vista compacta: ícono + max en fila */}
          <div className={clsx("flex-row items-center justify-center gap-2", forceCompact ? "flex" : "flex sm:hidden")}>
            <FaRegCheckCircle size={32} className="fill-green-500 shrink-0" />
            <span className="select-none text-xs text-gray-500">Max {maxSize}</span>
          </div>
          {/* Vista completa */}
          <div className={clsx("flex-col items-center", forceCompact ? "hidden" : "hidden sm:flex")}>
            <FaRegCheckCircle size={32} className="fill-green-500" />
            <p className="mb-0 text-center select-none text-gray-700">
              <strong>{textStrong}</strong> {text}
            </p>
            <p className="mb-0 select-none italic text-sm! mt-2 text-gray-500">
              Haz click aqui para subir un nuevo documento
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Vista compacta: ícono + max en fila */}
          <div className={clsx("flex-row items-center justify-center gap-2", forceCompact ? "flex" : "flex sm:hidden")}>
            <AiOutlineCloudUpload size={32} className="text-gray-600 shrink-0" />
            <span className="select-none text-xs text-gray-500">Max {maxSize}</span>
          </div>
          {/* Vista completa */}
          <div className={clsx("flex-col items-center", forceCompact ? "hidden" : "hidden sm:flex")}>
            <AiOutlineCloudUpload size={32} className="text-gray-600" />
            <p className="mb-0 text-center select-none text-gray-700">
              <strong>{textStrong}</strong> {text}
            </p>
            <p className="mb-0 select-none text-gray-500">
              {allowedFormats}
            </p>
            <p className="mb-0 select-none text-gray-500 text-xs mt-1">
              Max {maxSize}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

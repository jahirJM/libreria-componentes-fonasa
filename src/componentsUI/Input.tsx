import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  /** Muestra borde rojo indicando error de validación. @default false */
  error?: boolean;
  /** Valor controlado del input. */
  value?: string;
  /** Ícono a la izquierda del input. */
  leftIcon?: ReactNode;
  /** Ícono a la derecha del input. */
  rightIcon?: ReactNode;
  /** Muestra un spinner de carga dentro del input (deshabilita interacción). @default false */
  loading?: boolean;
  /** Muestra un botón de copiar a la derecha. @default false */
  copyable?: boolean;
  /** Tipo HTML del input. @default "text" */
  type?: "text" | "email" | "number" | "password" | "tel" | "url" | "file";
  /** Si true, muestra skeleton de carga en lugar del input. @default false */
  isLoading?: boolean;
}

/**
 * Input de texto con soporte para íconos, estado de error, carga y botón de copiar.
 *
 * @example
 * ```tsx
 * <Input
 *   value={nombre}
 *   onChange={(e) => setNombre(e.target.value)}
 *   placeholder="Ingrese nombre"
 *   error={!nombre}
 *   leftIcon={<FiUser />}
 * />
 * ```
 */
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
  isLoading = false,
  ...props
}: InputProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-full h-10 bg-gray-200 rounded-md" />
      </div>
    );
  }

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
          "text-ellipsis overflow-hidden whitespace-nowrap",
          "focus:border-[#0572CE] focus:ring-2 focus:ring-[#0572CE]",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
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

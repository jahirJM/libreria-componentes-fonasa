import clsx from "clsx";
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

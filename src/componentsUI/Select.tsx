import { type ReactNode, type SelectHTMLAttributes } from "react";

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
      className={`placeholder:text-sm
        text-sm
        border rounded-xl px-3 py-1.5 text-gray-600
        focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none
        ${disabled ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-white"}
        ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
        ${className ?? ""}`}
      {...props}
    >
      {children}
    </select>
  );
};

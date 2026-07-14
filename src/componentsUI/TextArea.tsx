import { type TextareaHTMLAttributes } from "react";

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
      className={`placeholder:text-sm text-sm
        border rounded-xl px-3 py-1.5 text-gray-600
        focus:ring-[#0572CE] focus:border-[#0572CE] focus:outline-none
        transition-colors duration-150
        ${disabled ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-white"}
        ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
        ${className ?? ""}`}
      {...props}
    />
  );
};

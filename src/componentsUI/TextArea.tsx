import clsx from "clsx";
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

import clsx from "clsx";
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
        <span className="inline-flex items-center gap-1 text-red-500 text-xs font-medium">
          <PiWarningCircleBold className="text-sm" />
          requerido
        </span>
      )}
    </label>
  );
};

import { IndicadorRequerido } from "./IndicadorRequerido";
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
    <label className={`text-sm text-gray-600 ${className ?? ""}`} {...props}>
      {text} {indicador && <IndicadorRequerido />}
    </label>
  );
};

import clsx from "clsx";
import { PiWarningCircleBold } from "react-icons/pi";
import { IndicadorRequerido } from "./IndicadorRequerido";
import { type LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Texto del label. */
  text: string;
  /** Si true, muestra el asterisco rojo de campo requerido. @default false */
  indicador?: boolean;
  /** Si true, muestra un mensaje "requerido" con ícono de advertencia. @default false */
  error?: boolean;
}

/**
 * Label de formulario con indicador de campo requerido y estado de error.
 *
 * @example
 * ```tsx
 * <Label text="RUT" htmlFor="rut" indicador error={!rut} />
 * ```
 */
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
        <span className="inline-flex items-center gap-1 text-red-500 text-xs font-medium" role="alert">
          <PiWarningCircleBold className="text-sm" aria-hidden="true" />
          requerido
        </span>
      )}
    </label>
  );
};

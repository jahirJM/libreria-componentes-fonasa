import clsx from "clsx";
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
                "text-gray-700 cursor-pointer",
                isDisabled && "opacity-60 cursor-default!",
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
};

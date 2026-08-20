import clsx from "clsx";

type Variant = "primary" | "secondary";

/** Opción individual para el CheckButton. */
interface Opcion {
  /** Identificador único de la opción. */
  id: string;
  /** Texto visible de la opción. */
  label: string;
}

interface CheckButtonProps {
  /** Lista de opciones a renderizar. En variant "secondary" tiene opciones por defecto (Sí/No). */
  listaOpciones?: Opcion[];
  /** IDs de las opciones actualmente seleccionadas. */
  selectedItems?: string[];
  /** Callback al seleccionar/deseleccionar una opción. Recibe la opción completa. */
  onToggle: (opcion: Opcion) => void;
  /** Clases CSS adicionales para el contenedor. */
  customClass?: string;
  /** Clases CSS adicionales para cada ítem. */
  customClassItem?: string;
  /** Clases CSS adicionales para los labels. */
  customClassLabel?: string;
  /** Deshabilita todas las opciones. @default false */
  isDisabled?: boolean;
  /** "primary" = checkboxes múltiples, "secondary" = radio buttons (selección única). @default "primary" */
  variant?: Variant;
  /** Si true, muestra skeleton de carga. @default false */
  isLoading?: boolean;
}

/**
 * Grupo de checkboxes o radio buttons con soporte de skeleton.
 * Usa variant "primary" para selección múltiple o "secondary" para selección única (radio).
 *
 * @example
 * ```tsx
 * <CheckButton
 *   listaOpciones={[{ id: "1", label: "Opción A" }, { id: "2", label: "Opción B" }]}
 *   selectedItems={["1"]}
 *   onToggle={(op) => toggle(op.id)}
 * />
 * ```
 */
export const CheckButton = ({
  listaOpciones,
  selectedItems,
  onToggle,
  customClass = "",
  customClassItem = "",
  customClassLabel = "",
  isDisabled = false,
  variant = "primary",
  isLoading = false,
}: CheckButtonProps) => {
  const opciones: Opcion[] =
    variant === "secondary"
      ? listaOpciones ?? [
          { id: "si", label: "Sí" },
          { id: "no", label: "No" },
        ]
      : listaOpciones ?? [];

  if (isLoading) {
    return (
      <div className={clsx("flex flex-col gap-y-5 animate-pulse", customClass)}>
        {Array.from({ length: opciones.length || 3 }).map((_, i) => (
          <div key={i} className="flex flex-row items-center gap-x-2">
            <div className={clsx("w-5 h-5 bg-gray-200", variant === "secondary" ? "rounded-full" : "rounded")} />
            <div className="h-4 bg-gray-200 rounded" style={{ width: `${60 + (i % 3) * 20}px` }} />
          </div>
        ))}
      </div>
    );
  }

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

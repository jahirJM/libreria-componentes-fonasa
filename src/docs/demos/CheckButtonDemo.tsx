import { useState } from "react";
import { CheckButton } from "../../componentsUI/CheckButton";

export function CheckButtonDemo({
  variant,
  opciones,
  isDisabled,
}: {
  variant?: "primary" | "secondary";
  opciones?: { id: string; label: string }[];
  isDisabled?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const handleToggle = (opcion: { id: string; label: string }) => {
    if (variant === "secondary") {
      setSelected([opcion.id]);
    } else {
      setSelected((prev) =>
        prev.includes(opcion.id)
          ? prev.filter((i) => i !== opcion.id)
          : [...prev, opcion.id],
      );
    }
  };
  return (
    <CheckButton
      variant={variant}
      listaOpciones={opciones}
      selectedItems={selected}
      onToggle={handleToggle}
      isDisabled={isDisabled}
    />
  );
}
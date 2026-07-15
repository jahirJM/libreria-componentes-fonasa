import { useState } from "react";
import { CustomModal } from "../../componentsUI/CustomModal";
import { BotonPrimario } from "../../componentsUI/Botones";

export function ModalDemo({
  size,
  title,
}: {
  size: "sm" | "md" | "lg";
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <BotonPrimario
        label="Abrir Modal"
        onClick={() => setOpen(true)}
      />
      <span className="text-xs text-gray-500">({size})</span>
      <CustomModal
        size={size}
        title={title}
        showModal={open}
        onClose={() => setOpen(false)}
      >
        <p className="text-gray-700">Contenido de ejemplo dentro del modal.</p>
      </CustomModal>
    </div>
  );
}

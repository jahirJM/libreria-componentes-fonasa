import { useState } from "react";
import { CustomModal } from "../../componentsUI/CustomModal";

export function ModalDemo({
  size,
  title,
}: {
  size: "sm" | "md" | "lg";
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
      >
        Abrir Modal ({size})
      </button>
      <CustomModal
        size={size}
        title={title}
        showModal={open}
        onClose={() => setOpen(false)}
      >
        <p className="text-gray-700">Contenido de ejemplo dentro del modal.</p>
      </CustomModal>
    </>
  );
}
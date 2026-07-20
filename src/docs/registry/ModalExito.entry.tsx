import { useState } from "react";
import modalCode from "../../componentsUI/Modal.tsx?raw";
import Modal from "../../componentsUI/Modal";
import { BotonPrimario } from "../../componentsUI/Botones";
import { SkeletonModal } from "../../skeletons/SkeletonModal";
import type { ComponentEntry } from "./types";

function ModalExitoDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <BotonPrimario label="Abrir Modal" onClick={() => setOpen(true)} />
      {open && (
        <span className="text-xs text-gray-500">Se cierra automáticamente en 5s</span>
      )}
      <Modal
        modalOpen={open}
        setModalOpen={setOpen}
        variant="exito"
        subTituloModal="Operación realizada con éxito"
        numeroSolicitud={1234}
      />
    </div>
  );
}

function ModalExitoSinNumeroDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <BotonPrimario label="Abrir Modal" onClick={() => setOpen(true)} />
      <Modal
        modalOpen={open}
        setModalOpen={setOpen}
        variant="exito"
        subTituloModal="Datos guardados correctamente"
      />
    </div>
  );
}

export const modalExitoEntry: ComponentEntry = {
  name: "Modal - Notificación",
  description:
    "Utiliza: Label. Modal de éxito con ícono de check verde, mensaje y número de solicitud opcional. Se cierra automáticamente después de 5 segundos.",
  code: modalCode,
  group: "Modales",
  dependencies: ["react-icons"],
  colors: [
    { name: "Negro/50", value: "rgba(0,0,0,0.5)", usage: "Overlay/backdrop del modal" },
    { name: "Blanco", value: "#ffffff", usage: "Fondo del contenedor del modal" },
    { name: "Ícono confirmación", value: "#22c55e", usage: "Ícono de check (FaRegCheckCircle)" },
    { name: "Texto (fondos claros)", value: "#374151", usage: "Texto del número de solicitud" },
  ],
  propsInterface: `interface ModalProps {
  setModalOpen: (open: boolean) => void;
  modalOpen: boolean;
  tituloModal?: string;
  subTituloModal?: string;
  variant?: "confirmacion" | "exito" | "aceptar";
  validacion?: (resultado: boolean) => void;
  closeButton?: boolean;
  numeroSolicitud?: number | string | null;
}`,
  variants: [
    {
      label: "Éxito (auto-close 5s)",
      props: { variant: "exito" },
      render: () => <ModalExitoDemo />,
      usageCode: `<Modal\n  modalOpen={open}\n  setModalOpen={setOpen}\n  variant="exito"\n  subTituloModal="Operación realizada con éxito"\n  numeroSolicitud={1234}\n/>`,
    },
    {
      label: "Éxito sin número de solicitud",
      props: { variant: "exito" },
      render: () => <ModalExitoSinNumeroDemo />,
      usageCode: `<Modal\n  modalOpen={open}\n  setModalOpen={setOpen}\n  variant="exito"\n  subTituloModal="Datos guardados correctamente"\n/>`,
    },
    {
      label: "Skeleton",
      props: {},
      render: () => <SkeletonModal size="sm" contentLines={3} />,
      usageCode: `import { SkeletonModal } from "@/skeletons";

<SkeletonModal size="sm" contentLines={3} />`,
    },
  ],
};

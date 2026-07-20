import customModalCode from "../../componentsUI/CustomModal.tsx?raw"
import { ModalDemo } from "../demos/ModalDemo";
import { SkeletonModal } from "../../skeletons/SkeletonModal";
import type { ComponentEntry } from "./types";

export const customModalEntry: ComponentEntry =  {
    name: "Modal - Info",
    description:
      "Utiliza: Botones. Modal con animaciones de transición, tamaños configurables (sm, md, lg), header con título y botón de cierre.",
    code: customModalCode,
    group: "Modales",
    dependencies: ["@headlessui/react", "react-icons"],
    colors: [
      { name: "Blanco", value: "#ffffff", usage: "Fondo del modal" },
      { name: "Fondos (dark)", value: "rgba(31,41,55,0.5)", usage: "Overlay de fondo" },
      { name: "Focus ring inputs", value: "#1e3a5f", usage: "Título del modal" },
      { name: "Texto (fondos claros)", value: "#374151", usage: "Ícono de cierre" },
    ],
    propsInterface: `interface CustomModalProps {
  size: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
  showModal: boolean;
  onShow?: () => void;
  onClose?: () => void;
}`,
    variants: [
      {
        label: "Small",
        props: { size: "sm", title: "Modal Pequeño" },
        render: () => <ModalDemo size="sm" title="Modal Pequeño" />,
        usageCode: `<CustomModal size="sm" title="Modal Pequeño" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Medium",
        props: { size: "md", title: "Modal Mediano" },
        render: () => <ModalDemo size="md" title="Modal Mediano" />,
        usageCode: `<CustomModal size="md" title="Modal Mediano" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Large",
        props: { size: "lg", title: "Modal Grande" },
        render: () => <ModalDemo size="lg" title="Modal Grande" />,
        usageCode: `<CustomModal size="lg" title="Modal Grande" showModal={open} onClose={() => setOpen(false)}>\n  <p>Contenido</p>\n</CustomModal>`,
      },
      {
        label: "Skeleton",
        props: {},
        render: () => <SkeletonModal size="md" contentLines={4} />,
        usageCode: `import { SkeletonModal } from "@/skeletons";

// Usar dentro de un CustomModal para simular carga de contenido:
<SkeletonModal size="md" contentLines={4} />`,
      },
    ],
  }
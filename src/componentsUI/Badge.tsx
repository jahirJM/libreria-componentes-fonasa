import clsx from "clsx";

export type BadgeVariant =
  | "counter"
  | "documentos"
  | "especialidad"
  | "estado-pendiente"
  | "estado-revision"
  | "estado-aprobada"
  | "estado-rechazada"
  | "estado-default";

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
  customClass?: string;
}

export const Badge = ({ variant, text, customClass = "" }: BadgeProps) => {
  const baseStyles =
    "text-[10px] px-2 py-0.5 rounded-full font-bold text-sm!";

  const variantStyles = {
    counter: "bg-gray-100 text-gray-500 border border-gray-200",
    documentos: "bg-(--different-color) text-white!",
    especialidad: "bg-gray-100 text-gray-500 border border-gray-200",
    "estado-pendiente":
      "bg-yellow-100 text-yellow-800! border border-yellow-300",
    "estado-revision": "bg-blue-100 text-blue-800! border border-blue-300",
    "estado-aprobada":
      "bg-green-100! text-green-800! border border-green-300",
    "estado-rechazada": "bg-red-100 text-red-800! border border-red-300",
    "estado-default": "bg-gray-100 text-gray-700! border border-gray-300",
  };

  return (
    <span className={clsx(baseStyles, variantStyles[variant], customClass)}>
      {text}
    </span>
  );
};

import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Variantes del contenedor Card.
 * - default: borde suave redondeado, minimalista (inspirado en Airbnb)
 * - elevada: sin borde visible, sombra ligera para elevar sobre fondo
 * - outline: borde más definido, sin sombra
 * - interactiva: hover con sombra sutil, para cards clickeables
 */
export type VarianteCard = "default" | "elevada" | "outline" | "interactiva";

const ESTILOS_VARIANTE: Record<VarianteCard, string> = {
  default: "border border-gray-200 rounded-2xl",
  elevada: "rounded-2xl shadow-md shadow-gray-100",
  outline: "border-2 border-gray-300 rounded-2xl",
  interactiva:
    "border border-gray-200 rounded-2xl transition-shadow duration-200 hover:shadow-md hover:shadow-gray-100 cursor-pointer",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variante?: VarianteCard;
  children?: ReactNode;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
}

export const Card = ({
  variante = "default",
  className,
  children,
  isLoading = false,
  ...props
}: CardProps) => {
  if (isLoading) {
    return (
      <div
        className={clsx(
          "flex flex-col gap-4 bg-white p-6 text-gray-900 animate-pulse",
          ESTILOS_VARIANTE[variante],
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg shrink-0" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="h-3 bg-gray-200 rounded w-3/5" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded-2xl" />
          <div className="h-8 w-24 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 bg-white p-6 text-gray-900",
        ESTILOS_VARIANTE[variante],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Encabezado de la card. Grid automático para acomodar CardAction.
 */
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div
    className={clsx(
      "flex items-start justify-between gap-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export const CardTitle = ({ className, children, ...props }: CardTitleProps) => (
  <h3
    className={clsx("text-base font-semibold leading-snug text-gray-900", className)}
    {...props}
  >
    {children}
  </h3>
);

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => (
  <p className={clsx("text-sm text-gray-500 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

/**
 * Elemento alineado a la derecha del header.
 */
interface CardActionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardAction = ({ className, children, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={clsx("shrink-0 self-start", className)}
    {...props}
  >
    {children}
  </div>
);

/**
 * Contenido libre de la card.
 */
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardContent = ({ className, children, ...props }: CardContentProps) => (
  <div className={clsx(className)} {...props}>
    {children}
  </div>
);

/**
 * Pie de la card. Sin separador — fluye naturalmente con el contenido.
 */
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
  <div
    className={clsx("flex items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
);

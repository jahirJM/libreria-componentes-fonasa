import { toast, Toaster } from "sonner";

/**
 * Componente Toaster configurado con estilos de Fonasa.
 * Colocar una vez en el layout principal de la app.
 */
export const FonasaToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "text-sm font-medium",
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
        },
      }}
    />
  );
};

/**
 * Funciones utilitarias para mostrar toasts con estilos Fonasa.
 */
export const fonasaToast = {
  success: (mensaje: string) => {
    toast.success(mensaje, {
      style: {
        background: "#ecfdf5",
        border: "1px solid #0572CE",
        color: "#064e3b",
      },
    });
  },

  error: (mensaje: string) => {
    toast.error(mensaje, {
      style: {
        background: "#fef2f2",
        border: "1px solid #dc2626",
        color: "#991b1b",
      },
    });
  },

  info: (mensaje: string) => {
    toast.info(mensaje, {
      style: {
        background: "#eff6ff",
        border: "1px solid #0572CE",
        color: "#1e3a5f",
      },
    });
  },

  warning: (mensaje: string) => {
    toast.warning(mensaje, {
      style: {
        background: "#fffbeb",
        border: "1px solid #d97706",
        color: "#92400e",
      },
    });
  },
};

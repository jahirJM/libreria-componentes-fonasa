import { fonasaToast, FonasaToaster } from "../../componentsUI/Toast";
import toastCode from "../../componentsUI/Toast.tsx?raw"
import type { ComponentEntry } from "./types";

export const toastEntry: ComponentEntry =   {
    name: "Toast (Sonner)",
    description:
      "Notificaciones toast con estilos Fonasa. Incluye variantes de éxito, error, info y advertencia.",
    code: toastCode,
    dependencies: ["sonner"],
    propsInterface: `// No recibe props como componente.
// Se usa via funciones utilitarias:

fonasaToast.success(mensaje: string): void;
fonasaToast.error(mensaje: string): void;
fonasaToast.info(mensaje: string): void;
fonasaToast.warning(mensaje: string): void;

// El Toaster se coloca una vez en el layout:
<FonasaToaster />`,
    variants: [
      {
        label: "Éxito",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.success("Operación realizada correctamente")
              }
              className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm hover:bg-cyan-500"
            >
              Mostrar Toast Éxito
            </button>
          </>
        ),
        usageCode: `fonasaToast.success("Operación realizada correctamente")`,
      },
      {
        label: "Error",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.error("Ocurrió un error al procesar la solicitud")
              }
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-500"
            >
              Mostrar Toast Error
            </button>
          </>
        ),
        usageCode: `fonasaToast.error("Ocurrió un error al procesar la solicitud")`,
      },
      {
        label: "Info",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.info("Se ha enviado un correo de verificación")
              }
              className="px-4 py-2 bg-[#0572CE] text-white rounded-xl text-sm hover:bg-blue-700"
            >
              Mostrar Toast Info
            </button>
          </>
        ),
        usageCode: `fonasaToast.info("Se ha enviado un correo de verificación")`,
      },
      {
        label: "Advertencia",
        props: {},
        render: () => (
          <>
            <FonasaToaster />
            <button
              onClick={() =>
                fonasaToast.warning("Su sesión expirará en 5 minutos")
              }
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm hover:bg-amber-500"
            >
              Mostrar Toast Advertencia
            </button>
          </>
        ),
        usageCode: `fonasaToast.warning("Su sesión expirará en 5 minutos")`,
      },
    ],
  }
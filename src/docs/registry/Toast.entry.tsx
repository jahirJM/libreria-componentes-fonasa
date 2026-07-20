import { fonasaToast, FonasaToaster } from "../../componentsUI/Toast";
import { BotonConfirmar, BotonCancelar, BotonPrimario, BotonSecundario } from "../../componentsUI/Botones";
import toastCode from "../../componentsUI/Toast.tsx?raw"
import type { ComponentEntry } from "./types";

export const toastEntry: ComponentEntry =   {
    name: "Toast (Sonner)",
    description:
      "Utiliza: Botones. Notificaciones toast con estilos Fonasa. Incluye variantes de éxito, error, info y advertencia.",
    code: toastCode,
    dependencies: ["sonner"],
    colors: [
      { name: "Fondo (éxito)", value: "#dcfce7", usage: "Fondo toast éxito" },
      { name: "Color primario (fonasa)", value: "#0572CE", usage: "Borde toast éxito e info" },
      { name: "Texto (éxito)", value: "#166534", usage: "Texto toast éxito" },
      { name: "Fondo (rechazado)", value: "#fef2f2", usage: "Fondo toast error" },
      { name: "Botón eliminar", value: "#dc2626", usage: "Borde toast error" },
      { name: "Texto (error)", value: "#991b1b", usage: "Texto toast error" },
      { name: "Fondo badge revisión", value: "#eff6ff", usage: "Fondo toast info" },
      { name: "Focus ring inputs", value: "#1e3a5f", usage: "Texto toast info" },
      { name: "Fondo (pendiente)", value: "#fefce8", usage: "Fondo toast advertencia" },
      { name: "Botón advertencia hover", value: "#d97706", usage: "Borde toast advertencia" },
      { name: "Texto (precaución)", value: "#78350f", usage: "Texto toast advertencia" },
    ],
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
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonConfirmar
              label="Mostrar Toast Éxito"
              onClick={() =>
                fonasaToast.success("Operación realizada correctamente")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.success("Operación realizada correctamente")`,
      },
      {
        label: "Error",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonCancelar
              label="Mostrar Toast Error"
              onClick={() =>
                fonasaToast.error("Ocurrió un error al procesar la solicitud")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.error("Ocurrió un error al procesar la solicitud")`,
      },
      {
        label: "Info",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonPrimario
              label="Mostrar Toast Info"
              onClick={() =>
                fonasaToast.info("Se ha enviado un correo de verificación")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.info("Se ha enviado un correo de verificación")`,
      },
      {
        label: "Advertencia",
        props: {},
        render: () => (
          <div className="flex justify-center w-full">
            <FonasaToaster />
            <BotonSecundario
              label="Mostrar Toast Advertencia"
              onClick={() =>
                fonasaToast.warning("Su sesión expirará en 5 minutos")
              }
            />
          </div>
        ),
        usageCode: `fonasaToast.warning("Su sesión expirará en 5 minutos")`,
      },
    ],
  }

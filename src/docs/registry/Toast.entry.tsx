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
      { name: "green-50", value: "#ecfdf5", usage: "Fondo toast éxito" },
      { name: "Azul Fonasa", value: "#0572CE", usage: "Borde toast éxito e info" },
      { name: "green-900", value: "#064e3b", usage: "Texto toast éxito" },
      { name: "red-50", value: "#fef2f2", usage: "Fondo toast error" },
      { name: "red-600", value: "#dc2626", usage: "Borde toast error" },
      { name: "red-900", value: "#991b1b", usage: "Texto toast error" },
      { name: "blue-50", value: "#eff6ff", usage: "Fondo toast info" },
      { name: "blue-900", value: "#1e3a5f", usage: "Texto toast info" },
      { name: "amber-50", value: "#fffbeb", usage: "Fondo toast advertencia" },
      { name: "amber-600", value: "#d97706", usage: "Borde toast advertencia" },
      { name: "amber-900", value: "#92400e", usage: "Texto toast advertencia" },
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

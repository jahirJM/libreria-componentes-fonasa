import { BotonConfirmar, BotonCancelar } from "./Botones";
import { Label } from "./Label";
import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

interface ModalProps {
  /** Setter del estado de apertura del modal. */
  setModalOpen: (open: boolean) => void;
  /** Controla si el modal está visible. */
  modalOpen: boolean;
  /** Título del modal. @default "Titulo de modal" */
  tituloModal?: string;
  /** Texto del cuerpo del modal. @default "Subtitulo de modal" */
  subTituloModal?: string;
  /** Variante: "confirmacion" (Sí/No), "exito" (auto-cierre 5s), "aceptar" (solo Aceptar). @default "confirmacion" */
  variant?: "confirmacion" | "exito" | "aceptar";
  /** Callback con el resultado de la acción (true = confirmó, false = canceló/cerró). */
  validacion?: (resultado: boolean) => void;
  /** Muestra botón de cierre (reservado). */
  closeButton?: boolean;
  /** Número de solicitud a mostrar (solo en variant "exito"). */
  numeroSolicitud?: number | string | null;
}

/**
 * Modal simple de confirmación, éxito o aceptación.
 * Se cierra al hacer click en el backdrop. La variante "exito" se auto-cierra a los 5 segundos.
 *
 * @example
 * ```tsx
 * <Modal
 *   modalOpen={open}
 *   setModalOpen={setOpen}
 *   tituloModal="¿Confirmar envío?"
 *   subTituloModal="Esta acción no se puede deshacer."
 *   variant="confirmacion"
 *   validacion={(ok) => ok && enviar()}
 * />
 * ```
 */
export default function Modal({
  modalOpen,
  setModalOpen,
  tituloModal = "Titulo de modal",
  subTituloModal = "Subtitulo de modal",
  variant = "confirmacion",
  validacion,
  numeroSolicitud,
}: ModalProps) {
  useEffect(() => {
    if (variant === "exito" && modalOpen) {
      const timer = setTimeout(() => {
        setModalOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [variant, modalOpen, setModalOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        validacion?.(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, setModalOpen, validacion]);

  if (!modalOpen) return null;

  const handleBackdropClick = () => {
    setModalOpen(false);
    if (validacion) {
      validacion(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {variant === "confirmacion" ? (
        <div
          className="bg-white rounded-lg shadow-lg w-[50%] max-w-full p-5 h-fit max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Label text={tituloModal} className="text-xl mb-4 font-bold text-[#0572CE]" />
          <section>
            <div className="flex flex-col gap-4 p-4">
              <div className="text-left whitespace-pre-line">
                {subTituloModal.split(". ").map((sentence, index) => {
                  if (sentence.trim()) {
                    return (
                      <p key={index} className="mb-3 text-gray-700">
                        {sentence.trim()}
                        {index < subTituloModal.split(". ").length - 1
                          ? "."
                          : ""}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <section className="flex flex-row gap-x-5 justify-center mt-4">
                <BotonCancelar
                  label="No"
                  customClass="w-32"
                  onClick={() => {
                    validacion?.(false);
                    setModalOpen(false);
                  }}
                />
                <BotonConfirmar
                  label="Sí"
                  customClass="w-32"
                  onClick={() => {
                    validacion?.(true);
                    setModalOpen(false);
                  }}
                />
              </section>
            </div>
          </section>
        </div>
      ) : null}

      {variant === "aceptar" ? (
        <div
          className="bg-white rounded-lg shadow-lg w-[50%] max-w-full p-5 h-fit max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Label text={tituloModal} className="text-xl mb-4 font-bold text-[#0572CE]" />
          <section>
            <div className="flex flex-col gap-4 p-4">
              <div className="text-left whitespace-pre-line">
                {subTituloModal.split(". ").map((sentence, index) => {
                  if (sentence.trim()) {
                    return (
                      <p key={index} className="mb-3 text-gray-700">
                        {sentence.trim()}
                        {index < subTituloModal.split(". ").length - 1
                          ? "."
                          : ""}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <section className="flex flex-row gap-x-5 justify-center mt-4">
                <BotonConfirmar
                  label="Aceptar"
                  customClass="w-32"
                  onClick={() => {
                    validacion?.(true);
                    setModalOpen(false);
                  }}
                />
              </section>
            </div>
          </section>
        </div>
      ) : null}

      {variant === "exito" ? (
        <div
          className="flex flex-col bg-white rounded-lg shadow-lg w-[30%] h-fit p-5 justify-center items-center text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <FaRegCheckCircle size={32} className="fill-green-500 mb-2" />
          <Label text={subTituloModal} className="text-center" />
          {numeroSolicitud && (
            <p className="text-gray-700 font-semibold mt-2">
              Solicitud #{numeroSolicitud}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

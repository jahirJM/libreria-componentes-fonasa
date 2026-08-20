import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { BiX } from "react-icons/bi";

interface CustomModalProps {
  /** Ancho del modal: "sm" (568px), "md" (990px), "lg" (full responsive). */
  size: "sm" | "md" | "lg";
  /** Título del modal mostrado en el header. */
  title?: string;
  /** Altura personalizada (no utilizado actualmente, reservado). */
  height?: string;
  /** Contenido del cuerpo del modal. */
  children: React.ReactNode;
  /** Controla la visibilidad del modal. */
  showModal: boolean;
  /** Fuerza altura completa (reservado). */
  fullHeight?: boolean;
  /** Callback al abrir el modal. */
  onShow?: () => void;
  /** Callback al cerrar el modal. */
  onClose?: () => void;
}

const sizeClasses = {
  sm: "w-[568px]",
  md: "w-[990px]",
  lg: "w-full md:w-[48rem] lg:w-[80rem]",
};

/**
 * Modal con transiciones animadas basado en Headless UI.
 * Soporta 3 tamaños y scroll interno automático para contenido largo.
 *
 * @example
 * ```tsx
 * <CustomModal size="md" title="Detalle" showModal={open} onClose={() => setOpen(false)}>
 *   <p>Contenido del modal</p>
 * </CustomModal>
 * ```
 */
export const CustomModal = ({
  size,
  title,
  children,
  showModal,
  onShow,
  onClose,
}: CustomModalProps) => {
  useEffect(() => {
    if (showModal && onShow) {
      onShow();
    }
  }, [showModal, onShow]);

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={() => onClose?.()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${sizeClasses[size]} transform
                    overflow-hidden
                    rounded-2xl bg-white p-7 text-left align-middle shadow-xl transition-all max-h-[95dvh]
                    flex flex-col`}
                >
                  {/* Header fijo */}
                  <div className="flex justify-between items-center mb-3 shrink-0">
                    <p className="font-bold text-base text-blue-900">
                      {title}
                    </p>
                    <button
                      onClick={onClose}
                      className="text-gray-700 p-1 rounded-md hover:bg-gray-700/10 cursor-pointer"
                    >
                      <BiX className="size-4" />
                    </button>
                  </div>

                  {/* Contenido con scroll */}
                  <div className="overflow-y-auto flex-1">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

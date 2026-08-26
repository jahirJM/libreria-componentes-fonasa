interface LoadingProps {
  /** Mensaje opcional debajo del spinner. */
  mensaje?: string;
}

/**
 * Spinner de carga circular con fondo oscuro semi-transparente.
 *
 * @example
 * ```tsx
 * <Loading mensaje="Procesando..." />
 * ```
 */
export const Loading = ({ mensaje }: LoadingProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]" aria-hidden="true"></div>
      </div>
      {mensaje ? (
        <p className="text-white text-sm font-bold mt-3">{mensaje}</p>
      ) : (
        <span className="sr-only">Cargando</span>
      )}
    </div>
  );
};

/**
 * Loading con el favicon de Fonasa en el centro del spinner,
 * dentro de un círculo blanco. Requiere `/fonasa-favicon.ico` en public.
 */
export const LoadingFonasa = ({ mensaje }: LoadingProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]" aria-hidden="true"></div>
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <img src="/fonasa-favicon.ico" alt="" className="h-9 w-9" />
        </div>
      </div>
      {mensaje ? (
        <p className="text-white text-sm font-bold mt-3">{mensaje}</p>
      ) : (
        <span className="sr-only">Cargando</span>
      )}
    </div>
  );
};

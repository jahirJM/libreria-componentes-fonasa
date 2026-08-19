interface LoadingProps {
  mensaje?: string;
}

export const Loading = ({ mensaje }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8">
      <div className="bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
      </div>
      {mensaje && (
        <p className="text-white text-sm font-bold mt-3">{mensaje}</p>
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
    <div className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8">
      <div className="relative bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/fonasa-favicon.ico" alt="Fonasa" className="h-9 w-9" />
        </div>
      </div>
      {mensaje && (
        <p className="text-white text-sm font-bold mt-3">{mensaje}</p>
      )}
    </div>
  );
};

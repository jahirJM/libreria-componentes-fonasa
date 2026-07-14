interface FullLoadingProps {
  mensaje?: string;
}

export const Loading = ({ mensaje }: FullLoadingProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-50">
      <div className="bg-white p-4 rounded-full mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
      </div>
      <p className="text-white text-lg font-semibold">{mensaje}</p>
    </div>
  );
};

interface LoadingSectionProps {
  mensaje?: string;
}

export const LoadingSection = ({ mensaje }: LoadingSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8">
      <div className="bg-white p-4 rounded-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0572CE]"></div>
      </div>
      <p className="text-white text-sm font-bold mt-3">{mensaje}</p>
    </div>
  );
};

/**
 * Loading con el favicon de Fonasa en el centro del spinner.
 * Estilo sección (no fullscreen). Requiere `/fonasa-favicon.ico` en public.
 */
export const LoadingFonasa = ({ mensaje }: FullLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900/70 rounded-xl p-8">
      <div className="relative">
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

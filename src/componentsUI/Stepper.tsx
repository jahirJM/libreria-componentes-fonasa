interface Paso {
  id: string;
  label: string;
}

interface StepperProps {
  pasos: Paso[];
  pasoActual: number;
  onCambiarPaso?: (paso: number) => void;
  puedeNavegar?: boolean;
  /** Fuerza la vista mobile (badge) sin importar el breakpoint */
  forceMobile?: boolean;
}

export const Stepper = ({
  pasos,
  pasoActual,
  onCambiarPaso,
  puedeNavegar = false,
  forceMobile = false,
}: StepperProps) => {
  return (
    <div className="p-5 z-60">
      {/* Mobile: solo badge con paso actual */}
      <div
        className={
          forceMobile ? "flex items-center gap-3" : "flex items-center gap-3 md:hidden"
        }
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0572CE] text-sm font-semibold text-[#0572CE]">
          {pasoActual}/{pasos.length}
        </div>
        <span className="font-semibold text-gray-700">
          {pasos[pasoActual - 1]?.label}
        </span>
      </div>

      {/* Desktop sm+: stepper horizontal */}
      {!forceMobile && (
        <div className="hidden md:flex items-start justify-between">
          {pasos.map((paso, index) => (
            <div
              key={paso.id}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Línea */}
              {index < pasos.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-1 z-0">
                  <div className="w-full h-full bg-gray-300 rounded" />
                  <div
                    className="absolute top-0 left-0 h-full bg-[#0572CE] rounded transition-all duration-300"
                    style={{
                      width: index < pasoActual - 1 ? "100%" : "0%",
                    }}
                  />
                </div>
              )}

              {/* Círculo */}
              <div
                className={`z-10 w-10 h-10 rounded-full text-white flex items-center justify-center select-none ${
                  index + 1 <= pasoActual ? "bg-[#0572CE]" : "bg-gray-300"
                } ${puedeNavegar ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => puedeNavegar && onCambiarPaso?.(index + 1)}
              >
                {index + 1}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-sm text-center max-w-25 ${
                  index + 1 <= pasoActual ? "text-[#0572CE] font-medium" : "text-gray-500"
                }`}
              >
                {paso.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Asterisco rojo que indica campo obligatorio. Se usa junto al componente Label.
 *
 * @example
 * ```tsx
 * <label>Nombre <IndicadorRequerido /></label>
 * ```
 */
export const IndicadorRequerido = () => {
  return <span className="text-red-500">*</span>;
};

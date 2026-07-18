/**
 * Formatea un RUT chileno con puntos y guión.
 * Máximo 9 caracteres (sin formato): 8 dígitos + 1 dígito verificador.
 * Ejemplo: "123456789" → "12.345.678-9"
 */
export function formatearRut(valor: string): string {
  // Limpiar: solo números y k/K
  let limpio = valor.replace(/[^0-9kK]/g, "").toUpperCase();

  // Máximo 9 caracteres (RUT chileno: hasta 8 dígitos + 1 DV)
  if (limpio.length > 9) {
    limpio = limpio.slice(0, 9);
  }

  if (limpio.length === 0) return "";

  // Separar cuerpo y dígito verificador
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  if (cuerpo.length === 0) return dv;

  // Agregar puntos al cuerpo
  const formateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formateado}-${dv}`;
}

/**
 * Limpia un string dejando solo caracteres válidos para RUT (números y K).
 * Limita a máximo 9 caracteres.
 */
export function limpiarRut(valor: string): string {
  return valor.replace(/[^0-9kK]/g, "").toUpperCase().slice(0, 9);
}

/**
 * Valida si un RUT chileno es válido mediante el algoritmo módulo 11.
 */
export function validarRut(rut: string): boolean {
  const limpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();

  if (limpio.length < 2) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const dvEsperado =
    resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  return dv === dvEsperado;
}

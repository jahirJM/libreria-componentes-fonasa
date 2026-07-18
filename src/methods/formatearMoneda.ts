/**
 * Formatea un número como moneda chilena (CLP).
 * Ejemplo: 1500000 → "$1.500.000"
 *
 * Incluye separador de miles con punto (estándar chileno).
 */
export function formatearMoneda(valor: number | string): string {
  const numero = typeof valor === "string" ? parseInt(valor.replace(/[^0-9-]/g, ""), 10) : valor;

  if (isNaN(numero)) return "$0";

  const esNegativo = numero < 0;
  const absoluto = Math.abs(numero);
  const formateado = absoluto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${esNegativo ? "-" : ""}$${formateado}`;
}

/**
 * Extrae solo el valor numérico de un string formateado como moneda.
 * Ejemplo: "$1.500.000" → 1500000
 */
export function limpiarMoneda(valor: string): number {
  const limpio = valor.replace(/[^0-9-]/g, "");
  const numero = parseInt(limpio, 10);
  return isNaN(numero) ? 0 : numero;
}

/**
 * Formatea un input de moneda en tiempo real.
 * Retorna el string formateado para mostrar y el valor numérico.
 */
export function procesarInputMoneda(valor: string): {
  formateado: string;
  numerico: number;
} {
  const soloDigitos = valor.replace(/[^0-9]/g, "");
  const numero = parseInt(soloDigitos, 10) || 0;
  return {
    formateado: formatearMoneda(numero),
    numerico: numero,
  };
}

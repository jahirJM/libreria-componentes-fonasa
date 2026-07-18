/**
 * Filtra un string dejando solo caracteres numéricos.
 * Útil para inputs que solo deben aceptar números.
 */
export function soloNumeros(valor: string): string {
  return valor.replace(/[^0-9]/g, "");
}

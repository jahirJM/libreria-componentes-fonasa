/**
 * Convierte el nombre de un componente a un slug URL-safe.
 * Ejemplo: "Modal - Tipo 1 (Confirmación/Aceptar)" → "modal-tipo-1-confirmacion-aceptar"
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9]+/g, "-") // reemplazar caracteres especiales con guión
    .replace(/^-+|-+$/g, ""); // quitar guiones al inicio/final
}

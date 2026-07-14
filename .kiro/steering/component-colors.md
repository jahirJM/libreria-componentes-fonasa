# Regla: Colores utilizados en componentes

Cada vez que se cree o registre un nuevo componente en `src/registry.tsx`, se debe identificar y registrar los colores que utiliza.

## Formato

Agregar el campo `colors` en la entrada del componente en `src/registry.tsx` con un array de objetos que representan los colores usados:

```tsx
{
  name: "MiComponente",
  description: "...",
  code: miComponenteCode,
  colors: [
    { name: "Primary (Celeste/Teal)", value: "#008CB5", usage: "Texto activo del stepper" },
    { name: "gray-200", value: "#e5e7eb", usage: "Bordes del contenedor" },
  ],
  variants: [...]
}
```

## Reglas

1. **Siempre agregar `colors`** — Es obligatorio para todos los componentes registrados.
2. **Incluir TODOS los colores usados** — Revisar el código fuente del componente e identificar:
   - Colores Tailwind usados en clases (`bg-blue-600`, `text-gray-700`, `border-red-500`, etc.)
   - Colores hexadecimales usados en estilos inline o clases personalizadas (`bg-[#0572CE]`, `text-[#008CB5]`, etc.)
   - Colores con opacidad (`rgba(...)`, colores con `/50`, etc.)
3. **Mapear al nombre institucional** — Si el color coincide con uno de la paleta institucional de Fonasa (definida en `ColorsPage.tsx`), usar el nombre institucional. Si no existe en la paleta, usar el nombre de la clase Tailwind.
4. **Documentar el uso** — En el campo `usage` describir brevemente para qué se usa ese color dentro del componente.
5. **Registrar colores nuevos en la paleta** — Si el componente introduce un color que NO existe en la paleta de `ColorsPage.tsx`, se debe agregar a la sección correspondiente (o crear una nueva sección si es necesario).

## Estructura del campo

```tsx
interface ComponentColor {
  name: string;   // Nombre del color (institucional o Tailwind)
  value: string;  // Valor hex, rgb o rgba
  usage: string;  // Descripción breve de su uso en el componente
}
```

## Ejemplo completo

```tsx
{
  name: "Badge",
  description: "Badge/pill para indicar estados...",
  code: badgeCode,
  colors: [
    { name: "yellow-50", value: "#fefce8", usage: "Fondo badge pendiente" },
    { name: "yellow-700", value: "#a16207", usage: "Texto badge pendiente" },
    { name: "blue-50", value: "#eff6ff", usage: "Fondo badge revisión" },
    { name: "blue-700", value: "#1d4ed8", usage: "Texto badge revisión" },
    { name: "green-50", value: "#f0fdf4", usage: "Fondo badge aprobada" },
    { name: "green-700", value: "#15803d", usage: "Texto badge aprobada" },
    { name: "red-50", value: "#fef2f2", usage: "Fondo badge rechazada" },
    { name: "red-700", value: "#b91c1c", usage: "Texto badge rechazada" },
  ],
  variants: [...]
}
```

## Visualización

El campo `colors` se muestra automáticamente en la página del componente como una sección "Colores utilizados" con swatches visuales, ubicada después de las dependencias y antes del payload esperado.

## Detección de colores nuevos

Cuando se detecta un color nuevo (no existente en `ColorsPage.tsx`):
1. Agregarlo a la sección correspondiente en `colorSections` dentro de `ColorsPage.tsx`
2. Incluir `name`, `value` y `description` con el contexto de uso
3. Si no encaja en ninguna sección existente, crear una nueva sección con título y descripción apropiados

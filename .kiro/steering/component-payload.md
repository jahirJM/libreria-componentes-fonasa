---
inclusion: always
---

# Regla: Payload esperado (propsInterface)

Cada vez que se cree o registre un nuevo componente en `src/registry.tsx`, se debe incluir el campo `propsInterface` con la interface TypeScript que define las props del componente.

## Formato

```tsx
{
  name: "MiComponente",
  description: "...",
  code: miComponenteCode,
  propsInterface: `interface MiComponenteProps {
  propRequerida: string;
  propOpcional?: number;
  onAccion: (valor: string) => void;
}`,
  variants: [...]
}
```

## Reglas

1. **Siempre agregar `propsInterface`** — Es obligatorio para todos los componentes registrados.
2. **Incluir la interface principal** y cualquier tipo auxiliar necesario (enums, types, sub-interfaces).
3. **Usar TypeScript válido** — El string debe ser código TS correcto con formato legible.
4. **Si el componente no recibe props** (como funciones utilitarias tipo Toast), documentar las funciones disponibles con sus firmas.

## Ejemplo con tipos auxiliares

```tsx
propsInterface: `type BadgeVariant = "pendiente" | "aprobada" | "rechazada";

interface BadgeProps {
  variant: BadgeVariant;
  text: string;
  customClass?: string;
}`,
```

## Visualización

El campo `propsInterface` se muestra automáticamente en el previsualizador como una sección "Payload esperado" con syntax highlighting TypeScript, ubicada antes del código fuente completo.

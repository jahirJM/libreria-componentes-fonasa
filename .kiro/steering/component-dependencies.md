---
inclusion: always
---

# Regla: Dependencias en componentes nuevos

Cada vez que se agregue un nuevo componente a la librería (`src/componentsUI/`), se debe:

1. **Identificar dependencias externas**: Revisar si el componente importa paquetes que no son parte del proyecto base (React, React DOM, Tailwind CSS).

2. **Documentar en el registry**: Si el componente requiere librerías adicionales, agregar el campo `dependencies` en su entrada de `src/registry.tsx` con un array de los nombres de los paquetes npm requeridos.

   ```tsx
   {
     name: "MiComponente",
     description: "...",
     code: miComponenteCode,
     dependencies: ["@headlessui/react", "react-icons"], // ← obligatorio si usa libs externas
     variants: [...]
   }
   ```

3. **Si NO requiere dependencias externas**: No agregar el campo `dependencies` (o dejarlo vacío). Los componentes que solo usan React y Tailwind no necesitan este campo.

## Paquetes base (no necesitan ser declarados)

- `react`
- `react-dom`
- `tailwindcss`
- `@tailwindcss/vite`

## Ejemplo de componente CON dependencias

El `CustomModal` usa `@headlessui/react` y `react-icons`, por lo tanto su entrada en el registry incluye:

```tsx
dependencies: ["@headlessui/react", "react-icons"],
```

Esto hace que en la vista del componente aparezca un banner de advertencia con el comando de instalación copiable.

## Ejemplo de componente SIN dependencias

El `Input`, `Label`, `TextArea` y `Table` solo usan React y Tailwind, por lo que no llevan el campo `dependencies`.

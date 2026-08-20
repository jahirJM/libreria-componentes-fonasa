---
inclusion: always
---

# Regla: Convencion de idioma

## Principio general

El codigo se escribe en ingles. Todo lo que el usuario final o el desarrollador consumidor ve (UI, documentacion, mensajes del CLI) se escribe en espanol.

## En ingles (codigo)

- Nombres de variables, constantes y funciones
- Nombres de interfaces, types y enums
- Nombres de props y parametros
- Nombres de archivos de componentes (ej. `UploadBox.tsx`, `SelectBuscable.tsx`)
- Comentarios tecnicos dentro del codigo (explicaciones de logica, TODOs)
- Nombres de clases CSS custom (si las hubiera)
- Keys de objetos internos
- Nombres de hooks y utilidades

### Ejemplos

```tsx
// Correcto
const isLoading = true;
const handleSubmit = () => {};
interface PaginationProps { currentPage: number; totalPages: number; }
function formatDate(date: Date): string {}

// Incorrecto
const estaCargando = true;
const manejarEnvio = () => {};
interface PropsPaginacion { paginaActual: number; }
```

## En espanol (contenido visible)

- Textos en la UI (labels, placeholders, mensajes de error, tooltips)
- Descriptions y nombres en el registry (`name` sigue siendo kebab-case pero en espanol: `tabla-basica`, `boton-clave-unica`)
- Documentacion (README, steering files, comentarios de uso)
- Mensajes del CLI (outputs, confirmaciones, errores)
- Variantes y demos en el previsualizador
- Contenido de `propsInterface` usa ingles (es codigo), pero la description del campo `usage` en `colors` va en espanol
- Strings que se rendericen como texto visible en demos

### Ejemplos

```tsx
// Props del componente (ingles)
interface AlertProps {
  type: "success" | "error" | "warning";
  message: string;
  dismissible?: boolean;
}

// Uso en la demo (espanol en textos visibles)
<Alert type="success" message="Operacion realizada con exito" />

// Registry entry
{
  name: "alerta",
  description: "Componente de alerta con variantes de exito, error y advertencia.",
  colors: [
    { name: "Exito (fondo)", value: "#dcfce7", usage: "Fondo de alerta exitosa" }
  ]
}
```

## Casos limite

| Elemento | Idioma | Motivo |
|----------|--------|--------|
| Nombre de archivo del componente | Ingles o espanol segun nombre establecido | Mantener consistencia con lo existente (ej. `Paginacion.tsx` ya existe) |
| Nombre en el registry (`name`) | Espanol kebab-case | Es lo que el usuario escribe en el CLI |
| Props y types | Ingles | Es codigo |
| JSDoc / comentarios de API | Ingles | Es documentacion tecnica del codigo |
| Mensajes de console.log en CLI | Espanol | El usuario los lee |
| Strings de error en componentes | Espanol | El usuario final los ve |

## Nota sobre componentes existentes

No se requiere refactorizar componentes existentes que ya mezclen idiomas. La regla aplica para codigo nuevo y modificaciones significativas. Si se reescribe un componente completo, aplicar la convencion.

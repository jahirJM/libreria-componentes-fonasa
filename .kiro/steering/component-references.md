---
inclusion: always
---

# Regla: Referencias entre componentes

Cuando un componente de la librería reutiliza otro componente que también está registrado en el registry, se debe:

1. **Nombrar la dependencia interna** al inicio de la `description` del componente que lo usa, con formato:
   `"Utiliza: [NombreComponente]. Descripción del componente..."`

2. **Agregar el componente reutilizado como entrada independiente** en el registry si aún no existe, para que el desarrollador pueda consultarlo por separado.

## Ejemplo

Si `lista-paginada` usa internamente `paginacion` y `badge`:

```tsx
{
  name: "lista-paginada",
  description: "Utiliza: paginacion, badge. Contenedor de solicitudes con skeleton de carga, error y paginación.",
  ...
}
```

Esto permite al desarrollador:
- Saber qué sub-componentes necesita copiar también
- Navegar rápidamente al componente referenciado en el sidebar

## Regla inversa

Si un componente se extrae como genérico (ej. paginacion), debe existir como entrada propia en el registry, incluso si también aparece como variante dentro de otro componente compuesto.

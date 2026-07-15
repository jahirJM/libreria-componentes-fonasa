# Regla: Layout de la página de componente

La vista de cada componente en `ComponentPreview` sigue un orden visual fijo. **Siempre** se debe mantener esta estructura al modificar o crear componentes.

## Orden de secciones (de arriba a abajo)

### 1. Header (full width)
- **Título** del componente (h2, bold, blanco)
- **Descripción** debajo del título
- **Dependencias** como pills clickeables debajo de la descripción (linkan a `/docs#dep-nombre`)

### 2. Metadata en fila horizontal (colores a la izquierda, interface a la derecha)
- **Colores**: pills compactas con swatch de color + nombre + valor hex. Clickeables para copiar el valor. Muestran "Copiado" al hacer click.
- **Interface (propsInterface)**: bloque de código TypeScript con syntax highlighting. Se muestra a la derecha de los colores, ocupando el espacio restante.

### 3. Ejemplos (grid horizontal de 3 columnas)
- Las variantes se muestran como cards en un grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Cada card muestra:
  - Preview en vivo del componente (fondo blanco)
  - Footer con label de la variante + dos íconos: `<>` (ver código en modal) y copiar
- El modal de código formatea automáticamente el JSX a multilínea (una prop por línea).

### 4. Panel lateral derecho: Código fuente (colapsable)
- Un botón horizontal "Código fuente" con ícono `<>` alineado a la derecha.
- Al clickear, se expande horizontalmente al **40%** del ancho, mostrando el código fuente completo del componente con scroll vertical.
- El contenido de la izquierda se comprime para acomodar el panel.
- Se puede cerrar con el botón X en el header del panel.
- Usa `sticky top-20` para seguir el scroll.

## Reglas adicionales

1. **No usar `max-w-4xl`** ni constraints similares en el layout principal — el contenido debe usar todo el ancho disponible del `main`.
2. **Las dependencias NO se muestran como banner/disclaimer grande** — solo pills compactas que linkan a `/docs#dep-nombre`.
3. **Los colores son clickeables** para copiar el valor hex, con feedback "Copiado".
4. **El código fuente NO se muestra como sección separada abajo** — siempre vive en el panel lateral colapsable a la derecha.
5. **El `main` en `ComponentsLayout`** debe tener `min-w-0 overflow-hidden` para evitar desbordamiento del panel de código.

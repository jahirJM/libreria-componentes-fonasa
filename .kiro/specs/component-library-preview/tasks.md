# Tareas de Implementación

## Task 1: Crear componente Input reutilizable

- [x] 1.1 Crear `src/components/Input.tsx` con props: label, placeholder, error, disabled, value, onChange
- [x] 1.2 Estilizar con Tailwind CSS: bordes, focus ring, estado error (borde rojo + mensaje), estado disabled (opacity reducida, cursor not-allowed)
- [x] 1.3 Verificar que el componente renderiza correctamente con cada combinación de props

## Task 2: Crear registro de componentes

- [x] 2.1 Crear `src/registry.tsx` con la interfaz `ComponentEntry` y `ComponentVariant`
- [x] 2.2 Registrar el componente Input con su código fuente completo como string
- [x] 2.3 Definir 3 variantes para Input: normal (con placeholder), error (con mensaje de error), deshabilitado

## Task 3: Crear componente CodePanel

- [x] 3.1 Crear `src/components/CodePanel.tsx` que recibe `code: string` y lo muestra en `<pre><code>`
- [x] 3.2 Aplicar estilos básicos de syntax highlighting con Tailwind (fondo oscuro, texto monospace, padding)
- [x] 3.3 Implementar botón de copiar usando `navigator.clipboard.writeText()`
- [x] 3.4 Mostrar feedback visual tras copiar: ícono check (éxito) o mensaje de error (fallo)

## Task 4: Crear componente PreviewPanel

- [x] 4.1 Crear `src/components/PreviewPanel.tsx` que recibe `variants: ComponentVariant[]`
- [x] 4.2 Renderizar cada variante con su label como subtítulo y el componente en vivo debajo
- [x] 4.3 Aplicar estilos con Tailwind: fondo claro, padding, separación entre variantes

## Task 5: Crear componente ComponentPreview

- [x] 5.1 Crear `src/components/ComponentPreview.tsx` que recibe `entry: ComponentEntry`
- [x] 5.2 Mostrar nombre del componente como heading (h2)
- [x] 5.3 Layout: PreviewPanel y CodePanel lado a lado (flex-row en desktop, flex-col en mobile < 768px)

## Task 6: Integrar en App

- [x] 6.1 Actualizar `src/App.tsx` para importar el registry y renderizar un `ComponentPreview` por cada entry
- [x] 6.2 Aplicar layout general con Tailwind: contenedor centrado, padding, max-width

## Task 7: Agregar tests

- [x] 7.1 Instalar `fast-check` y configurar vitest si no está configurado
- [x] 7.2 Escribir property test: fidelidad del código (display y copy preservan el source exacto)
- [x] 7.3 Escribir property test: todas las variantes se renderizan
- [x] 7.4 Escribir property test: nombre del componente aparece como heading
- [x] 7.5 Escribir unit tests: error en clipboard muestra mensaje, Input tiene 3 variantes, layout responsive

# Documento de Requisitos

## Introducción

Sistema de previsualización de componentes para la librería interna de Fonasa. Permite mostrar el código fuente de componentes React (estilo copy-paste, sin instalación vía npm) junto con una vista previa en vivo del componente renderizado. El primer componente a incluir es un Input reutilizable.

## Glosario

- **Previsualizador**: Aplicación web que muestra el código fuente y la vista previa en vivo de componentes React.
- **Panel_Código**: Sección de la interfaz que muestra el código fuente del componente en formato legible.
- **Panel_Preview**: Sección de la interfaz que renderiza el componente en vivo.
- **Componente_Registrado**: Componente React incluido en la librería con su código fuente asociado y configuración de preview.
- **Input**: Primer componente registrado en la librería; campo de texto reutilizable con soporte para estados de error y deshabilitado.

## Requisitos

### Requisito 1: Visualización de código fuente

**User Story:** Como desarrollador, quiero ver el código fuente completo de un componente, para poder copiarlo y usarlo en mi proyecto.

#### Criterios de Aceptación

1. WHEN un desarrollador selecciona un Componente_Registrado, THE Panel_Código SHALL mostrar el código fuente completo del componente en formato texto con indentación preservada.
2. WHEN el código fuente se muestra en el Panel_Código, THE Previsualizador SHALL aplicar resaltado de sintaxis al código TypeScript/JSX.
3. WHEN un desarrollador hace clic en el botón de copiar, THE Panel_Código SHALL copiar el código fuente completo al portapapeles del sistema.
4. IF el copiado al portapapeles falla, THEN THE Panel_Código SHALL mostrar un mensaje de error indicando que la copia no se realizó.

### Requisito 2: Vista previa en vivo del componente

**User Story:** Como desarrollador, quiero ver una vista previa interactiva del componente, para poder evaluar su apariencia y comportamiento antes de copiarlo.

#### Criterios de Aceptación

1. WHEN un desarrollador selecciona un Componente_Registrado, THE Panel_Preview SHALL renderizar el componente con sus props por defecto.
2. THE Panel_Preview SHALL mostrar el componente interactivo, permitiendo al usuario interactuar con él (escribir texto, hacer clic, etc.).
3. WHEN el componente tiene variantes (por ejemplo, estado error o deshabilitado), THE Panel_Preview SHALL mostrar ejemplos de cada variante relevante.

### Requisito 3: Registro del componente Input

**User Story:** Como desarrollador, quiero que el componente Input esté disponible en la librería, para poder visualizar su código y preview.

#### Criterios de Aceptación

1. THE Previsualizador SHALL incluir el componente Input como Componente_Registrado con su código fuente completo.
2. WHEN el componente Input se muestra en el Panel_Preview, THE Previsualizador SHALL renderizar variantes que incluyan: estado normal, estado con error, y estado deshabilitado.
3. THE Previsualizador SHALL mostrar el componente Input con texto placeholder visible en cada variante para demostrar su funcionalidad.

### Requisito 4: Estructura de la página de previsualización

**User Story:** Como desarrollador, quiero una página organizada que muestre tanto el código como la vista previa, para poder evaluar un componente de forma rápida.

#### Criterios de Aceptación

1. THE Previsualizador SHALL mostrar el Panel_Código y el Panel_Preview de forma simultánea en la misma vista para cada Componente_Registrado.
2. THE Previsualizador SHALL mostrar el nombre del componente como encabezado identificador en la vista de previsualización.
3. WHEN la ventana del navegador tiene un ancho menor a 768px, THE Previsualizador SHALL apilar el Panel_Preview y el Panel_Código verticalmente.

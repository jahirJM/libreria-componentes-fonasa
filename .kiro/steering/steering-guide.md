---
inclusion: manual
---

# Guia de Steering Files del proyecto

Este documento describe cada steering file configurado en `.kiro/steering/` y su proposito. Los steerings son reglas que Kiro aplica automaticamente durante el desarrollo asistido para mantener consistencia en el proyecto.

## Listado de steerings activos

### component-naming

**Archivo:** `component-naming.md`
**Inclusion:** always
**Proposito:** Forzar que los nombres de componentes en el registry sigan la convencion kebab-case sin tildes, espacios ni caracteres especiales.

**Por que existe:** Los nombres se usan como argumento directo del CLI (`fonasa-ui add <nombre>`). Sin esta regla, los nombres podrian tener mayusculas, tildes o espacios que complican el uso del CLI.

**Que aplica:**
- Nombres solo en minusculas separados por guion
- Sin tildes (paginacion, no paginación)
- Sin parentesis ni simbolos
- PascalCase se convierte a kebab-case (CheckButton -> check-button)
- Aplica tambien a las referencias en `internalDeps`

---

### component-colors

**Archivo:** `component-colors.md`
**Inclusion:** always
**Proposito:** Restringir los colores usados en componentes a la paleta institucional definida en `ColorsPage.tsx`.

**Por que existe:** Mantener coherencia visual en todos los componentes y evitar colores arbitrarios que rompan la identidad institucional.

**Que aplica:**
- Solo se pueden usar colores de la paleta (institucionales, grises, azules, estados, notificaciones, variantes)
- Si un color no existe en la paleta, se sustituye por el mas cercano visualmente
- Cada entry debe declarar el campo `colors` con nombre, valor hex y uso
- No se agregan colores nuevos a la paleta sin autorizacion

---

### component-dependencies

**Archivo:** `component-dependencies.md`
**Inclusion:** always
**Proposito:** Documentar dependencias npm externas de cada componente en su entrada del registry.

**Por que existe:** El previsualizador muestra un banner de advertencia cuando un componente necesita paquetes adicionales, y el CLI informa al usuario que debe instalarlos.

**Que aplica:**
- Si un componente importa paquetes fuera de react, react-dom y tailwindcss, debe declarar `dependencies` en su entry
- Los paquetes base no se declaran
- Componentes sin dependencias externas no necesitan el campo

---

### component-payload

**Archivo:** `component-payload.md`
**Inclusion:** always
**Proposito:** Obligar a incluir la interface TypeScript de props (`propsInterface`) en cada componente registrado.

**Por que existe:** El previsualizador muestra una seccion "Payload esperado" con syntax highlighting que permite al desarrollador ver las props sin abrir el codigo fuente.

**Que aplica:**
- Campo `propsInterface` obligatorio en toda entrada del registry
- Debe ser TypeScript valido y legible
- Incluir interfaces auxiliares, types y enums si los hay
- Para componentes sin props (como Toast), documentar las firmas de funciones disponibles

---

### component-references

**Archivo:** `component-references.md`
**Inclusion:** always
**Proposito:** Documentar cuando un componente reutiliza otro componente del registry.

**Por que existe:** Permite al CLI resolver dependencias internas automaticamente y al desarrollador saber que sub-componentes necesita copiar.

**Que aplica:**
- Si un componente usa otro del registry, la description debe empezar con `"Utiliza: X, Y."`
- El componente referenciado debe existir como entrada independiente
- Los nombres referenciados deben ser kebab-case (misma regla que component-naming)

---

### no-build-verification

**Archivo:** `no-build-verification.md`
**Inclusion:** always
**Proposito:** Prohibir la ejecucion de builds o type-checks como paso de verificacion.

**Por que existe:** El proyecto es grande y la compilacion toma demasiado tiempo. Los diagnosticos del IDE son instantaneos y suficientes para verificar errores.

**Que aplica:**
- No ejecutar `tsc`, `vite build`, `npm run build` ni variantes
- Usar exclusivamente diagnosticos del IDE para verificar cambios
- Es una regla de workflow, no afecta el codigo producido

---

## Como agregar un nuevo steering

1. Crear un archivo `.md` en `.kiro/steering/`
2. Agregar el front-matter con el tipo de inclusion:
   - `inclusion: always` — Se aplica en toda interaccion
   - `inclusion: fileMatch` + `fileMatchPattern: '<glob>'` — Se aplica solo cuando se trabaja con archivos que matcheen el patron
   - `inclusion: manual` — Solo se incluye cuando el usuario lo referencia explicitamente
3. Documentar la regla con titulo, proposito y reglas concretas
4. Actualizar este archivo con la nueva entrada

## Notas

- Los steerings no son validaciones automaticas del codigo. Son instrucciones que Kiro sigue durante la asistencia.
- No reemplazan linters ni formatters, pero complementan la consistencia en areas donde esas herramientas no llegan (metadata del registry, paleta de colores, convenciones de naming custom).

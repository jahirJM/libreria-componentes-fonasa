---
inclusion: always
---

# Regla: Convención de nombres de componentes en el registry

## Formato obligatorio

Todos los nombres de componentes registrados en `src/docs/registry/*.entry.tsx` (campo `name`) **DEBEN** seguir la convención **kebab-case** sin tildes ni caracteres especiales:

- Todo en minúsculas
- Palabras separadas por guión (`-`)
- Sin tildes ni acentos (`á` → `a`, `ó` → `o`, `ú` → `u`, `ñ` → `n`)
- Sin espacios
- Sin paréntesis ni caracteres especiales

## Motivo

Los nombres se usan directamente como argumento del CLI (`fonasa-ui add <nombre>`). Un nombre con espacios, tildes o mayúsculas obliga al usuario a:
- Ponerlo entre comillas
- Recordar capitalización exacta
- Escribir caracteres especiales

Con kebab-case el comando es simple y predecible:
```bash
fonasa-ui add tabla-avanzada
fonasa-ui add select-buscable
fonasa-ui add boton-clave-unica
```

## Ejemplos

| Incorrecto | Correcto |
|---|---|
| `"Tabla - Avanzada"` | `"tabla-avanzada"` |
| `"Select Buscable"` | `"select-buscable"` |
| `"Paginación"` | `"paginacion"` |
| `"Modal - Notificación"` | `"modal-notificacion"` |
| `"Toast (Sonner)"` | `"toast"` |
| `"Contador Estadística"` | `"contador-estadistica"` |
| `"Botón ClaveÚnica"` | `"boton-clave-unica"` |
| `"CheckButton"` | `"check-button"` |
| `"UploadBox"` | `"upload-box"` |
| `"TextArea"` | `"textarea"` |

## Reglas de conversión

1. Si el nombre es una sola palabra sin mayúsculas internas → dejar en minúscula: `badge`, `input`, `label`
2. Si es PascalCase → separar palabras con guión: `CheckButton` → `check-button`
3. Si tiene espacios → reemplazar por guión: `Select Buscable` → `select-buscable`
4. Si tiene tildes → quitar tilde: `Paginación` → `paginacion`
5. Si tiene paréntesis u otros símbolos → eliminarlos: `Toast (Sonner)` → `toast`
6. Si tiene guiones con espacios → guión sin espacios: `Tabla - Básica` → `tabla-basica`

## Aplica también a internalDeps

Las referencias en la descripción (`"Utiliza: X, Y."`) y las dependencias internas resueltas por el CLI deben usar los mismos nombres kebab-case:

```tsx
description: "Utiliza: paginacion, badge. Contenedor de lista..."
```

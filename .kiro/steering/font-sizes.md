# Regla: Tamaños de fuente estandarizados

## Principio

Todos los tamaños de texto en la plataforma y en los componentes de la libreria **DEBEN** usar exclusivamente las clases de la escala estandar de Tailwind CSS. No se permite usar valores arbitrarios como `text-[10px]`, `text-[11px]`, `text-[0.8rem]`, etc.

## Clases permitidas

| Clase | Tamaño | Uso tipico |
|-------|--------|------------|
| `text-xs` | 12px / 0.75rem | Labels secundarios, metadata, tooltips, badges |
| `text-sm` | 14px / 0.875rem | Texto de soporte, inputs, botones pequenos |
| `text-base` | 16px / 1rem | Texto de parrafos, contenido principal |
| `text-lg` | 18px / 1.125rem | Subtitulos, titulos de tarjetas |
| `text-xl` | 20px / 1.25rem | Titulos de seccion |
| `text-2xl` | 24px / 1.5rem | Titulos de pagina secundarios |
| `text-3xl` | 30px / 1.875rem | Titulos de pagina |
| `text-4xl` | 36px / 2.25rem | Titulos principales, heroes |
| `text-5xl` | 48px / 3rem | Titulos hero grandes |

## Prohibido

- `text-[Npx]` — Cualquier valor arbitrario en pixeles
- `text-[Nrem]` — Cualquier valor arbitrario en rem
- `text-[Nem]` — Cualquier valor arbitrario en em
- `style="font-size: ..."` inline en componentes React (excepto en templates HTML como emails)

## Regla de sustitucion

Si un diseno requiere un tamano entre dos valores de la escala, elegir el mas cercano:

- Menor a 12px → usar `text-xs`
- 13px-14px → usar `text-sm`
- 15px-16px → usar `text-base`
- 17px-18px → usar `text-lg`

## Excepcion

Los templates de email HTML (como los definidos en `RecursosPage.tsx` dentro de strings literales con `style=""`) pueden usar `font-size` inline porque los clientes de email no soportan Tailwind.

## Aplica a

- `src/componentsUI/` — Componentes de la libreria
- `src/app/` — Paginas y componentes de la plataforma
- Cualquier archivo `.tsx` nuevo que se cree en el proyecto

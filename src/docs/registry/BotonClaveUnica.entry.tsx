import { BotonClaveUnica } from "../../componentsUI/BotonClaveUnica";
import botonClaveUnicaCode from "../../componentsUI/BotonClaveUnica.tsx?raw";
import botonClaveUnicaTestCode from "../../tests/BotonClaveUnica.test.tsx?raw";
import type { ComponentEntry } from "./types";

export const botonClaveUnicaEntry: ComponentEntry = {
  name: "boton-clave-unica",
  description:
    "Botón oficial de inicio de sesión con ClaveÚnica según la guía de Gobierno Digital.\n*Para más información revisar documentación oficial en:\nhttps://wikiguias.digital.gob.cl/Manuales/BotónCU*",
  code: botonClaveUnicaCode,
  testCode: botonClaveUnicaTestCode,
  group: "Botones",
  colors: [
    { name: "ClaveÚnica (contenedor)", value: "#0F69C4", usage: "Fondo del botón estándar" },
    { name: "ClaveÚnica (hover)", value: "#0B4E91", usage: "Fondo en estado hover y focus" },
    { name: "ClaveÚnica (active)", value: "#07305A", usage: "Fondo en estado pressed/active" },
    { name: "ClaveÚnica (focus outline)", value: "#FFBE5C", usage: "Outline al hacer focus" },
    { name: "ClaveÚnica alto contraste", value: "#625AF6", usage: "Fondo botón alto contraste / dark mode" },
    { name: "ClaveÚnica alto contraste (hover)", value: "#4943B6", usage: "Hover alto contraste" },
  ],
  propsInterface: `type RoundedVariant = "none" | "middle" | "full";
type ColorVariant = "estandar" | "highContrast";
type WidthVariant = "fit" | "full";

interface BotonClaveUnicaProps {
  /** URL de redirección para autenticación ClaveÚnica */
  href?: string;
  /** Texto del botón. Valores recomendados: "Iniciar sesión" o "ClaveÚnica" */
  label?: string;
  /** Variante de esquinas: "none" | "middle" | "full" */
  rounded?: RoundedVariant;
  /** Variante de color: "estandar" | "highContrast" */
  colorVariant?: ColorVariant;
  /** Variante de ancho: "fit" | "full" */
  width?: WidthVariant;
  /** Si true, renderiza como <button> en vez de <a> */
  asButton?: boolean;
  /** Callback onClick (solo cuando asButton=true) */
  onClick?: () => void;
  /** Si true, muestra skeleton de carga */
  isLoading?: boolean;
  /** Clases CSS adicionales */
  customClass?: string;
}`,
  variants: [
    {
      label: "Estándar — Iniciar sesión",
      props: { href: "#", label: "Iniciar sesión" },
      render: () => (
        <div className="flex justify-center w-full p-6 bg-white rounded">
          <BotonClaveUnica href="#" label="Iniciar sesión" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";
// Ícono disponible en: @/public/logos/gobierno/svg/ico-clave-unica.svg

<!-- HTML oficial (guía Gobierno Digital) -->
<a class="btn-cu btn-m btn-color-estandar" href="#"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</a>

<!-- React -->
<BotonClaveUnica href="/auth/claveunica" label="Iniciar sesión" />`,
    },
    {
      label: "Estándar — ClaveÚnica",
      props: { href: "#", label: "ClaveÚnica" },
      render: () => (
        <div className="flex justify-center w-full p-6 bg-white rounded">
          <BotonClaveUnica href="#" label="ClaveÚnica" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial (guía Gobierno Digital) -->
<a class="btn-cu btn-m btn-color-estandar" href="#"
    aria-label="Continuar con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">ClaveÚnica</span>
</a>

<!-- React -->
<BotonClaveUnica href="#" label="ClaveÚnica" />`,
    },
    {
      label: "Redondeado medio",
      props: { href: "#", rounded: "middle" },
      render: () => (
        <div className="flex justify-center gap-4 w-full p-6 bg-white rounded">
          <BotonClaveUnica href="#" label="Iniciar sesión" rounded="middle" />
          <BotonClaveUnica href="#" label="ClaveÚnica" rounded="middle" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial -->
<a class="btn-cu btn-m btn-color-estandar rounded-middle" href="#"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</a>

<!-- React -->
<BotonClaveUnica href="#" label="Iniciar sesión" rounded="middle" />`,
    },
    {
      label: "Redondeado full",
      props: { href: "#", rounded: "full" },
      render: () => (
        <div className="flex justify-center gap-4 w-full p-6 bg-white rounded">
          <BotonClaveUnica href="#" label="Iniciar sesión" rounded="full" />
          <BotonClaveUnica href="#" label="ClaveÚnica" rounded="full" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial -->
<a class="btn-cu btn-m btn-color-estandar rounded-full" href="#"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</a>

<!-- React -->
<BotonClaveUnica href="#" label="Iniciar sesión" rounded="full" />`,
    },
    {
      label: "Alto contraste (dark mode)",
      props: { href: "#", colorVariant: "highContrast" },
      render: () => (
        <div className="flex justify-center gap-4 w-full p-6 bg-gray-800 rounded">
          <BotonClaveUnica href="#" label="Iniciar sesión" colorVariant="highContrast" />
          <BotonClaveUnica href="#" label="ClaveÚnica" colorVariant="highContrast" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial -->
<a class="btn-cu btn-m btn-color-highContrast" href="#"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</a>

<!-- React -->
<BotonClaveUnica href="#" colorVariant="highContrast" />`,
    },
    {
      label: "Ancho flexible (btn-fw)",
      props: { href: "#", width: "full" },
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full p-6 bg-white rounded">
          <BotonClaveUnica href="#" label="Iniciar sesión" width="full" />
          <BotonClaveUnica href="#" label="ClaveÚnica" width="full" />
        </div>
      ),
      responsive: true,
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial -->
<a class="btn-cu btn-m btn-color-estandar btn-fw" href="#"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</a>

<!-- React -->
<BotonClaveUnica href="#" label="Iniciar sesión" width="full" />`,
    },
    {
      label: "Como <button>",
      props: { asButton: true },
      render: () => (
        <div className="flex justify-center gap-4 w-full p-6 bg-white rounded">
          <BotonClaveUnica asButton onClick={() => alert("Redirigiendo...")} label="Iniciar sesión" />
          <BotonClaveUnica asButton onClick={() => alert("Redirigiendo...")} label="ClaveÚnica" />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<!-- HTML oficial con <button> -->
<button class="btn-cu btn-m btn-color-estandar" type="button"
    aria-label="Iniciar sesión con ClaveÚnica">
    <span class="cl-claveunica" aria-hidden="true"></span>
    <span class="texto" aria-hidden="true">Iniciar sesión</span>
</button>

<!-- React -->
<BotonClaveUnica asButton onClick={handleLogin} label="Iniciar sesión" />`,
    },
    {
      label: "Skeleton",
      props: { isLoading: true },
      render: () => (
        <div className="flex justify-center w-full p-6 bg-white rounded">
          <BotonClaveUnica isLoading />
        </div>
      ),
      usageCode: `import { BotonClaveUnica } from "@/componentsUI/BotonClaveUnica";

<BotonClaveUnica isLoading />`,
    },
  ],
};

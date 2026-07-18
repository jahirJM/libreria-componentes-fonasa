import acordeonCode from "../../componentsUI/Acordeon.tsx?raw";
import {
  Acordeon,
  ItemAcordeon,
  DisparadorAcordeon,
  ContenidoAcordeon,
} from "../../componentsUI/Acordeon";
import { FiHeart, FiShield } from "react-icons/fi";
import type { ComponentEntry } from "./types";

export const acordeonEntry: ComponentEntry = {
  name: "Acordeon",
  description:
    "Acordeon con soporte para múltiples ítems abiertos, ítems deshabilitados, bordes y modo controlado.",
  code: acordeonCode,
  dependencies: ["clsx", "react-icons"],
  colors: [
    { name: "white", value: "#ffffff", usage: "Fondo del contenedor" },
    {
      name: "gray-200",
      value: "#e5e7eb",
      usage: "Separador entre ítems (divide-y) y borde",
    },
    { name: "gray-400", value: "#9ca3af", usage: "Chevron en estado cerrado" },
    { name: "gray-600", value: "#4b5563", usage: "Texto del contenido" },
    { name: "gray-900", value: "#111827", usage: "Texto del disparador" },
    {
      name: "blue-900",
      value: "#1e3a8a",
      usage: "Hover del disparador, chevron activo y focus ring",
    },
  ],
  propsInterface: `interface AcordeonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (valores: string[]) => void;
  multiple?: boolean;
}

interface ItemAcordeonProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

interface DisparadorAcordeonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> {
  icon?: ReactNode;
}

interface ContenidoAcordeonProps extends HTMLAttributes<HTMLDivElement> {}`,
  variants: [
    {
      label: "Básico",
      props: { defaultValue: ["cobertura"] },
      render: () => (
        <Acordeon defaultValue={["cobertura"]} className="max-w-lg">
          <ItemAcordeon value="cobertura">
            <DisparadorAcordeon>
              ¿Qué cubre mi plan de salud?
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              Tu plan cubre consultas médicas, exámenes de laboratorio y
              hospitalización según el nivel de atención contratado.
            </ContenidoAcordeon>
          </ItemAcordeon>
          <ItemAcordeon value="bonos">
            <DisparadorAcordeon>
              ¿Cómo obtengo un bono de atención?
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              Puedes generarlo desde la sucursal virtual o en cualquier sucursal
              presencial con tu Cédula de Identidad.
            </ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `<Acordeon defaultValue={["cobertura"]} className="max-w-lg">
  <ItemAcordeon value="cobertura">
    <DisparadorAcordeon>¿Qué cubre mi plan de salud?</DisparadorAcordeon>
    <ContenidoAcordeon>
      Tu plan cubre consultas médicas, exámenes de laboratorio y
      hospitalización según el nivel de atención contratado.
    </ContenidoAcordeon>
  </ItemAcordeon>
  <ItemAcordeon value="bonos">
    <DisparadorAcordeon>¿Cómo obtengo un bono de atención?</DisparadorAcordeon>
    <ContenidoAcordeon>
      Puedes generarlo desde la sucursal virtual o en cualquier
      sucursal presencial con tu Cédula de Identidad.
    </ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
    {
      label: "Múltiples abiertos",
      props: { multiple: true },
      render: () => (
        <Acordeon
          multiple
          defaultValue={["horario", "contacto"]}
          className="max-w-lg"
        >
          <ItemAcordeon value="horario">
            <DisparadorAcordeon>Horario de atención</DisparadorAcordeon>
            <ContenidoAcordeon>
              Lunes a viernes de 8:30 a 17:00 horas en sucursales a nivel
              nacional.
            </ContenidoAcordeon>
          </ItemAcordeon>
          <ItemAcordeon value="contacto">
            <DisparadorAcordeon>Canales de contacto</DisparadorAcordeon>
            <ContenidoAcordeon>
              Call center, sucursal virtual y atención presencial en sucursales.
            </ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `<Acordeon multiple defaultValue={["horario", "contacto"]} className="max-w-lg">
  <ItemAcordeon value="horario">
    <DisparadorAcordeon>Horario de atención</DisparadorAcordeon>
    <ContenidoAcordeon>
      Lunes a viernes de 8:30 a 17:00 horas en sucursales a nivel nacional.
    </ContenidoAcordeon>
  </ItemAcordeon>
  <ItemAcordeon value="contacto">
    <DisparadorAcordeon>Canales de contacto</DisparadorAcordeon>
    <ContenidoAcordeon>
      Call center, sucursal virtual y atención presencial en sucursales.
    </ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
    {
      label: "Con bordes",
      props: { bordered: true },
      render: () => (
        <Acordeon
          bordered
          defaultValue={["plan"]}
          className="max-w-lg"
        >
          <ItemAcordeon value="plan">
            <DisparadorAcordeon>
              ¿Cómo cambio mi tramo de Fonasa?
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              Puedes actualizar tu tramo enviando tu declaración de renta o
              acreditando tus ingresos en una sucursal.
            </ContenidoAcordeon>
          </ItemAcordeon>
          <ItemAcordeon value="cargas">
            <DisparadorAcordeon>
              ¿Cómo agrego una carga familiar?
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              La solicitud se realiza en línea adjuntando los documentos que
              acrediten el parentesco.
            </ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `<Acordeon bordered defaultValue={["plan"]} className="max-w-lg">
  <ItemAcordeon value="plan">
    <DisparadorAcordeon>¿Cómo cambio mi tramo de Fonasa?</DisparadorAcordeon>
    <ContenidoAcordeon>
      Puedes actualizar tu tramo enviando tu declaración de renta o
      acreditando tus ingresos en una sucursal.
    </ContenidoAcordeon>
  </ItemAcordeon>
  <ItemAcordeon value="cargas">
    <DisparadorAcordeon>¿Cómo agrego una carga familiar?</DisparadorAcordeon>
    <ContenidoAcordeon>
      La solicitud se realiza en línea adjuntando los documentos que
      acrediten el parentesco.
    </ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
    {
      label: "Con ícono",
      props: { icon: "FiShield" },
      render: () => (
        <Acordeon defaultValue={["seguro"]} className="max-w-lg">
          <ItemAcordeon value="seguro">
            <DisparadorAcordeon icon={<FiShield />}>
              Cobertura de seguro catastrófico
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              Aplica cuando los gastos médicos superan el tope anual definido
              según tu tramo.
            </ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `<Acordeon defaultValue={["seguro"]} className="max-w-lg">
  <ItemAcordeon value="seguro">
    <DisparadorAcordeon icon={<FiShield />}>
      Cobertura de seguro catastrófico
    </DisparadorAcordeon>
    <ContenidoAcordeon>
      Aplica cuando los gastos médicos superan el tope anual definido
      según tu tramo.
    </ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
    {
      label: "Ítem deshabilitado",
      props: { disabled: true },
      render: () => (
        <Acordeon defaultValue={["reembolso"]} className="max-w-lg">
          <ItemAcordeon value="reembolso">
            <DisparadorAcordeon>Reembolso de prestaciones</DisparadorAcordeon>
            <ContenidoAcordeon>
              Solicita el reembolso presentando la documentación médica en
              sucursal o a través de la sucursal virtual.
            </ContenidoAcordeon>
          </ItemAcordeon>
          <ItemAcordeon value="proximo" disabled>
            <DisparadorAcordeon>
              Trámite próximamente disponible
            </DisparadorAcordeon>
            <ContenidoAcordeon>Contenido no disponible aún.</ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `<Acordeon defaultValue={["reembolso"]} className="max-w-lg">
  <ItemAcordeon value="reembolso">
    <DisparadorAcordeon>Reembolso de prestaciones</DisparadorAcordeon>
    <ContenidoAcordeon>
      Solicita el reembolso presentando la documentación médica en
      sucursal o a través de la sucursal virtual.
    </ContenidoAcordeon>
  </ItemAcordeon>
  <ItemAcordeon value="proximo" disabled>
    <DisparadorAcordeon>Trámite próximamente disponible</DisparadorAcordeon>
    <ContenidoAcordeon>Contenido no disponible aún.</ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
    {
      label: "Controlado",
      props: { value: ["favoritos"] },
      render: () => (
        <Acordeon value={["favoritos"]} className="max-w-lg">
          <ItemAcordeon value="favoritos">
            <DisparadorAcordeon icon={<FiHeart />}>
              Prestaciones más consultadas
            </DisparadorAcordeon>
            <ContenidoAcordeon>
              Este ítem permanece abierto porque el estado se controla desde el
              componente padre mediante <code>value</code> y{" "}
              <code>onValueChange</code>.
            </ContenidoAcordeon>
          </ItemAcordeon>
        </Acordeon>
      ),
      usageCode: `const [abiertos, setAbiertos] = useState(["favoritos"]);

<Acordeon value={abiertos} onValueChange={setAbiertos} className="max-w-lg">
  <ItemAcordeon value="favoritos">
    <DisparadorAcordeon icon={<FiHeart />}>
      Prestaciones más consultadas
    </DisparadorAcordeon>
    <ContenidoAcordeon>
      Este ítem permanece abierto porque el estado se controla desde
      el componente padre mediante value y onValueChange.
    </ContenidoAcordeon>
  </ItemAcordeon>
</Acordeon>`,
    },
  ],
};

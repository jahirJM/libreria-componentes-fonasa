"use client";

import clsx from "clsx";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { FiChevronDown } from "react-icons/fi";

/* -------------------------------------------------------------------------------------------------
 * Contexto raíz: maneja qué ítems están abiertos
 * ----------------------------------------------------------------------------------------------- */

interface ContextoAcordeonProps {
  valoresAbiertos: string[];
  alternarValor: (valor: string) => void;
  multiple: boolean;
  bordered: boolean;
}

const ContextoAcordeon = createContext<ContextoAcordeonProps | null>(null);

function useContextoAcordeon() {
  const contexto = useContext(ContextoAcordeon);
  if (!contexto) {
    throw new Error(
      "Los componentes <ItemAcordeon>, <DisparadorAcordeon> y <ContenidoAcordeon> deben usarse dentro de <Acordeon>.",
    );
  }
  return contexto;
}

/* -------------------------------------------------------------------------------------------------
 * Contexto de ítem: maneja el estado individual (valor, deshabilitado, abierto)
 * ----------------------------------------------------------------------------------------------- */

interface ContextoItemProps {
  valor: string;
  deshabilitado: boolean;
  abierto: boolean;
}

const ContextoItem = createContext<ContextoItemProps | null>(null);

function useContextoItem() {
  const contexto = useContext(ContextoItem);
  if (!contexto) {
    throw new Error(
      "<DisparadorAcordeon> y <ContenidoAcordeon> deben usarse dentro de <ItemAcordeon>.",
    );
  }
  return contexto;
}

/* -------------------------------------------------------------------------------------------------
 * Acordeon (raíz)
 * ----------------------------------------------------------------------------------------------- */

interface AcordeonProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue"
> {
  /** Ítems abiertos por defecto (no controlado). @default [] */
  defaultValue?: string[];
  /** Ítems abiertos (controlado). Pasa este prop para manejar el estado externamente. */
  value?: string[];
  /** Callback que recibe el nuevo array de valores abiertos al expandir/colapsar. */
  onValueChange?: (valores: string[]) => void;
  /** Permite abrir múltiples ítems a la vez. @default false */
  multiple?: boolean;
  /** Si true, muestra bordes alrededor del acordeón y entre ítems. @default false */
  bordered?: boolean;
  children: ReactNode;
}

/**
 * Contenedor de acordeón accesible con animación suave de altura.
 * Soporta modo controlado/no-controlado y apertura múltiple o simple.
 *
 * @example
 * ```tsx
 * <Acordeon defaultValue={["item-1"]} multiple>
 *   <ItemAcordeon value="item-1">
 *     <DisparadorAcordeon>Pregunta 1</DisparadorAcordeon>
 *     <ContenidoAcordeon>Respuesta 1</ContenidoAcordeon>
 *   </ItemAcordeon>
 *   <ItemAcordeon value="item-2">
 *     <DisparadorAcordeon>Pregunta 2</DisparadorAcordeon>
 *     <ContenidoAcordeon>Respuesta 2</ContenidoAcordeon>
 *   </ItemAcordeon>
 * </Acordeon>
 * ```
 */
export function Acordeon({
  defaultValue = [],
  value,
  onValueChange,
  multiple = false,
  bordered = false,
  className,
  children,
  ...props
}: AcordeonProps) {
  const [valoresInternos, setValoresInternos] =
    useState<string[]>(defaultValue);

  const esControlado = value !== undefined;
  const valoresAbiertos = esControlado ? value : valoresInternos;

  function alternarValor(valorItem: string) {
    const estaAbierto = valoresAbiertos.includes(valorItem);

    let nuevosValores: string[];
    if (estaAbierto) {
      nuevosValores = valoresAbiertos.filter((v) => v !== valorItem);
    } else {
      nuevosValores = multiple ? [...valoresAbiertos, valorItem] : [valorItem];
    }

    if (!esControlado) setValoresInternos(nuevosValores);
    onValueChange?.(nuevosValores);
  }

  return (
    <ContextoAcordeon.Provider
      value={{ valoresAbiertos, alternarValor, multiple, bordered }}
    >
      <div
        {...props}
        className={clsx(
          "w-full",
          bordered && "rounded-lg border border-gray-300 bg-white",
          className,
        )}
      >
        {bordered ? (
          <div>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </ContextoAcordeon.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ItemAcordeon
 * ----------------------------------------------------------------------------------------------- */

interface ItemAcordeonProps extends HTMLAttributes<HTMLDivElement> {
  /** Identificador único del ítem. Debe coincidir con los valores de `defaultValue`/`value` del padre. */
  value: string;
  /** Deshabilita la interacción con este ítem. @default false */
  disabled?: boolean;
  children: ReactNode;
}

export function ItemAcordeon({
  value,
  disabled = false,
  className,
  children,
  ...props
}: ItemAcordeonProps) {
  const { valoresAbiertos } = useContextoAcordeon();
  const abierto = valoresAbiertos.includes(value);

  return (
    <ContextoItem.Provider
      value={{ valor: value, deshabilitado: disabled, abierto }}
    >
      <div
        {...props}
        data-state={abierto ? "abierto" : "cerrado"}
        data-disabled={disabled ? "" : undefined}
        className={clsx(
          "group",
          disabled && "opacity-50",
          className,
        )}
      >
        {children}
      </div>
    </ContextoItem.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * DisparadorAcordeon (header clickeable)
 * ----------------------------------------------------------------------------------------------- */

interface DisparadorAcordeonProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  children: ReactNode;
  /** Ícono custom a mostrar antes del texto. */
  icon?: ReactNode;
}

export function DisparadorAcordeon({
  children,
  icon,
  className,
  ...props
}: DisparadorAcordeonProps) {
  const { alternarValor } = useContextoAcordeon();
  const { valor, deshabilitado, abierto } = useContextoItem();

  return (
    <button
      {...props}
      type="button"
      disabled={deshabilitado}
      aria-expanded={abierto}
      aria-controls={`acordeon-contenido-${valor}`}
      id={`acordeon-disparador-${valor}`}
      onClick={() => alternarValor(valor)}
      className={clsx(
        "flex w-full items-center gap-3 px-5 py-4 text-left",
        "text-sm font-medium transition-colors duration-150",
        deshabilitado
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer",
        !deshabilitado && (abierto
          ? "text-gray-900"
          : "text-gray-700 hover:text-gray-900"),
        "outline-none focus-visible:ring-2 focus-visible:ring-[#0572CE]/40 focus-visible:ring-offset-1 rounded",
        className,
      )}
    >
      {icon && (
        <span
          className={clsx(
            "shrink-0 text-base transition-colors duration-150",
            deshabilitado ? "text-gray-300" : "text-gray-500",
          )}
        >
          {icon}
        </span>
      )}

      <span className="flex-1">{children}</span>

      <FiChevronDown
        className={clsx(
          "shrink-0 h-4 w-4 transition-transform duration-200",
          abierto && "rotate-180",
          deshabilitado ? "text-gray-300" : "text-gray-500",
        )}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ContenidoAcordeon
 * ----------------------------------------------------------------------------------------------- */

interface ContenidoAcordeonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ContenidoAcordeon({
  children,
  className,
  ...props
}: ContenidoAcordeonProps) {
  const { abierto, valor } = useContextoItem();
  const contenidoRef = useRef<HTMLDivElement>(null);
  const [altura, setAltura] = useState(0);

  useEffect(() => {
    const nodo = contenidoRef.current;
    if (!nodo) return;

    const actualizarAltura = () => setAltura(nodo.scrollHeight);
    actualizarAltura();

    const observer = new ResizeObserver(actualizarAltura);
    observer.observe(nodo);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      id={`acordeon-contenido-${valor}`}
      role="region"
      aria-labelledby={`acordeon-disparador-${valor}`}
      aria-hidden={!abierto}
      style={{ maxHeight: abierto ? `${altura}px` : "0px" }}
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
    >
      <div
        ref={contenidoRef}
        {...props}
        className={clsx(
          "px-5 pb-5 pt-0 text-sm leading-relaxed text-gray-600",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

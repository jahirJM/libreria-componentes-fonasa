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
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (valores: string[]) => void;
  multiple?: boolean;
  /** Si true, muestra bordes alrededor del acordeón y entre ítems */
  bordered?: boolean;
  children: ReactNode;
}

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
  value: string;
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
  const { valoresAbiertos, bordered } = useContextoAcordeon();
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
  const { abierto } = useContextoItem();
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

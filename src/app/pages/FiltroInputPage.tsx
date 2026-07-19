import { useState, useMemo } from "react";
import {
  construirFiltro,
  validarValor,
  generarCodigoUso,
  type TipoFiltro,
  type ConfigFiltro,
} from "../../methods/filtroInput";
import { Input } from "../../componentsUI/Input";
import { CodePanel } from "../projectComponents/CodePanel";
import { FonasaToaster, fonasaToast } from "../../componentsUI/Toast";
import { FiCopy, FiCheck } from "react-icons/fi";

// ─── Opciones de caracteres ───────────────────────────────────────────────────

interface OpcionFiltro {
  tipo: TipoFiltro;
  label: string;
  descripcion: string;
  emoji: string;
}

const OPCIONES_CARACTERES: OpcionFiltro[] = [
  { tipo: "numeros",      label: "Números",       descripcion: "Solo dígitos 0–9",                emoji: "0–9"  },
  { tipo: "letras",       label: "Letras",        descripcion: "Letras, tildes y ñ",              emoji: "Aa"   },
  { tipo: "mayusculas",   label: "Mayúsculas",    descripcion: "Fuerza texto a MAYÚSCULA",        emoji: "ABC"  },
  { tipo: "minusculas",   label: "Minúsculas",    descripcion: "Fuerza texto a minúscula",        emoji: "abc"  },
  { tipo: "alfanumerico", label: "Alfanumérico",  descripcion: "Letras y números combinados",     emoji: "Az9"  },
  { tipo: "sinAcentos",   label: "Sin acentos",   descripcion: "Solo a-z A-Z sin tildes",         emoji: "a-z"  },
  { tipo: "telefono",     label: "Teléfono",      descripcion: "Números, +, -, paréntesis",       emoji: "+56"  },
  { tipo: "especiales",   label: "Especiales",    descripcion: "Símbolos !@#$% y otros",          emoji: "@#!"  },
];

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({
  activo, deshabilitado = false, onToggle, emoji, label, descripcion,
}: {
  activo: boolean; deshabilitado?: boolean; onToggle: () => void;
  emoji: string; label: string; descripcion: string;
}) {
  return (
    <button
      type="button"
      onClick={deshabilitado ? undefined : onToggle}
      disabled={deshabilitado}
      className={`relative flex flex-col items-start gap-1.5 rounded-2xl border-2 p-4 text-left transition-all duration-200 select-none ${
        deshabilitado
          ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-40"
          : activo
            ? "cursor-pointer border-[#0572CE] bg-[#0572CE]/5 shadow-sm"
            : "cursor-pointer border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <span className={`absolute top-3 right-3 flex size-5 items-center justify-center rounded-full transition-all duration-200 ${activo ? "bg-[#0572CE] scale-100" : "bg-gray-200 scale-90"}`}>
        <FiCheck className={`size-3 transition-opacity ${activo ? "text-white opacity-100" : "opacity-0"}`} />
      </span>
      <span className={`font-mono text-sm font-bold tracking-tight ${activo ? "text-[#0572CE]" : "text-gray-500"}`}>{emoji}</span>
      <span className={`text-sm font-semibold ${activo ? "text-[#0572CE]" : "text-gray-700"}`}>{label}</span>
      <span className="text-xs text-gray-400 leading-tight">{descripcion}</span>
    </button>
  );
}

// ─── Input numérico ───────────────────────────────────────────────────────────

function InputNumerico({ label, valor, onChange, placeholder }: {
  label: string; valor: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <input
        type="number" min={0} max={500} value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-[#0572CE] focus:ring-2 focus:ring-[#0572CE]/20"
      />
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export function FiltroInputPage() {
  const [seleccionados, setSeleccionados] = useState<Set<TipoFiltro>>(new Set());
  const [modoEmail, setModoEmail] = useState(false);
  const [modoCelular, setModoCelular] = useState(false);
  const [modoTelefonoFijo, setModoTelefonoFijo] = useState(false);
  const [minimoStr, setMinimoStr] = useState("");
  const [maximoStr, setMaximoStr] = useState("");
  const [valor, setValor] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [estadoValidacion, setEstadoValidacion] = useState<"idle" | "ok" | "error">("idle");
  const [copiado, setCopiado] = useState(false);

  const minimo = minimoStr ? parseInt(minimoStr) : undefined;
  const maximo = maximoStr ? parseInt(maximoStr) : undefined;

  const config: ConfigFiltro = useMemo(
    () => ({
      tipos: Array.from(seleccionados),
      validacion: modoEmail ? "email" : modoCelular ? "celular" : modoTelefonoFijo ? "telefonoFijo" : undefined,
      minimo,
      maximo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(Array.from(seleccionados)), modoEmail, modoCelular, modoTelefonoFijo, minimo, maximo],
  );

  const filtro = useMemo(() => construirFiltro(config), [config]);
  const codigo = useMemo(() => generarCodigoUso(config), [config]);

  const modoExclusivo = modoEmail || modoCelular || modoTelefonoFijo;

  function toggleTipo(tipo: TipoFiltro) {
    if (modoExclusivo) return;
    setSeleccionados((prev) => {
      const sig = new Set(prev);
      sig.has(tipo) ? sig.delete(tipo) : sig.add(tipo);
      return sig;
    });
    resetDemo();
  }

  function toggleEmail() {
    const nuevoEstado = !modoEmail;
    setModoEmail(nuevoEstado);
    if (nuevoEstado) { setModoCelular(false); setModoTelefonoFijo(false); setSeleccionados(new Set()); }
    resetDemo();
  }

  function toggleCelular() {
    const nuevoEstado = !modoCelular;
    setModoCelular(nuevoEstado);
    if (nuevoEstado) {
      setModoEmail(false);
      setModoTelefonoFijo(false);
      setSeleccionados(new Set());
      // Arrancar con "+" prefijado automáticamente
      setValor("+");
      setErrorMsg(null);
      setEstadoValidacion("idle");
    } else {
      resetDemo();
    }
  }

  function toggleTelefonoFijo() {
    const nuevoEstado = !modoTelefonoFijo;
    setModoTelefonoFijo(nuevoEstado);
    if (nuevoEstado) { setModoEmail(false); setModoCelular(false); setSeleccionados(new Set()); }
    resetDemo();
  }

  function resetDemo() {
    setValor("");
    setErrorMsg(null);
    setEstadoValidacion("idle");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nuevo = filtro(e.target.value);
    setValor(nuevo);
    // resetear estado visual al editar
    setErrorMsg(null);
    setEstadoValidacion("idle");
  }

  function handleValidar() {
    if (!valor) {
      setErrorMsg("Escribe algo primero");
      setEstadoValidacion("error");
      return;
    }
    const res = validarValor(valor, config);
    if (res.valido) {
      setErrorMsg(null);
      setEstadoValidacion("ok");
    } else {
      setErrorMsg(res.mensaje ?? "Valor inválido");
      setEstadoValidacion("error");
    }
  }

  function limpiarTodo() {
    setSeleccionados(new Set());
    setModoEmail(false);
    setModoCelular(false);
    setModoTelefonoFijo(false);
    setMinimoStr("");
    setMaximoStr("");
    resetDemo();
  }

  async function copiarCodigo() {
    try {
      await navigator.clipboard.writeText(codigo);
      fonasaToast.success("Código copiado");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch { /* silently fail */ }
  }

  const hayAlgo = seleccionados.size > 0 || modoEmail || modoCelular || modoTelefonoFijo || minimo || maximo;

  const placeholderInput = modoEmail
    ? "correo@ejemplo.cl"
    : modoCelular
      ? "+56912345678 o 912345678"
      : modoTelefonoFijo
        ? "+5622123456 o 22123456"
        : seleccionados.size > 0
          ? `Solo: ${Array.from(seleccionados).map((t) => OPCIONES_CARACTERES.find((o) => o.tipo === t)!.label).join(", ")}`
          : "Sin restricciones — escribe lo que quieras";

  const porcentaje = maximo && valor.length > 0
    ? Math.min((valor.length / maximo) * 100, 100)
    : null;

  // ¿Tiene algo que validar al presionar el botón?
  const necesitaValidar = modoEmail || modoCelular || modoTelefonoFijo || !!minimo;

  return (
    <div className="max-w-3xl">
      <FonasaToaster />

      {/* Header */}
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">Métodos</p>
      <h2 className="text-4xl font-bold text-gray-800 mb-2">Constructor de Filtros</h2>
      <p className="text-gray-500 mb-8">
        Configura qué caracteres acepta un input, sus límites y validaciones. El código se genera listo para copiar.
      </p>

      {/* ── 1. Tipos de caracteres ── */}
      <section className="mb-8">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          1. Tipos de caracteres
        </p>

        {/* Chips exclusivos — email, celular, fijo */}
        <div className="flex flex-col gap-2 mb-3">
          {[
            { activo: modoEmail,       toggle: toggleEmail,        emoji: "@",    label: "Email",           desc: "Validación de correo electrónico" },
            { activo: modoCelular,     toggle: toggleCelular,      emoji: "+569", label: "Número Celular",  desc: "Formato chileno: 9XXXXXXXX o +569XXXXXXXX" },
            { activo: modoTelefonoFijo,toggle: toggleTelefonoFijo, emoji: "☎",   label: "Teléfono Fijo",   desc: "Formato chileno: 2XXXXXXXX o +562XXXXXXXX" },
          ].map(({ activo, toggle, emoji, label, desc }) => (
            <button
              key={label}
              type="button"
              onClick={toggle}
              className={`w-full flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                activo
                  ? "border-[#0572CE] bg-[#0572CE]/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-sm font-bold w-10 shrink-0 ${activo ? "text-[#0572CE]" : "text-gray-500"}`}>
                  {emoji}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${activo ? "text-[#0572CE]" : "text-gray-700"}`}>{label}</p>
                  <p className="text-xs text-gray-400">Modo exclusivo — {desc}</p>
                </div>
              </div>
              <span className={`flex size-5 items-center justify-center rounded-full transition-all duration-200 shrink-0 ${activo ? "bg-[#0572CE] scale-100" : "bg-gray-200 scale-90"}`}>
                <FiCheck className={`size-3 transition-opacity ${activo ? "text-white opacity-100" : "opacity-0"}`} />
              </span>
            </button>
          ))}
        </div>

        {/* Grid chips — solo visible si no hay modo exclusivo */}
        {!modoExclusivo && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OPCIONES_CARACTERES.map((op) => (
              <Chip
                key={op.tipo}
                activo={seleccionados.has(op.tipo)}
                deshabilitado={false}
                onToggle={() => toggleTipo(op.tipo)}
                emoji={op.emoji}
                label={op.label}
                descripcion={op.descripcion}
              />
            ))}
          </div>
        )}

        {/* Pills resumen */}
        <div className="mt-4 flex flex-wrap items-center gap-2 min-h-[28px]">
          {hayAlgo ? (
            <>
              {modoEmail && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0572CE]/10 px-2.5 py-0.5 text-xs font-medium text-[#0572CE]">
                  Email
                  <button type="button" onClick={toggleEmail} className="ml-0.5 hover:text-[#0572CE]/80">×</button>
                </span>
              )}
              {modoCelular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0572CE]/10 px-2.5 py-0.5 text-xs font-medium text-[#0572CE]">
                  Número Celular
                  <button type="button" onClick={toggleCelular} className="ml-0.5 hover:text-[#0572CE]/80">×</button>
                </span>
              )}
              {modoTelefonoFijo && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0572CE]/10 px-2.5 py-0.5 text-xs font-medium text-[#0572CE]">
                  Teléfono Fijo
                  <button type="button" onClick={toggleTelefonoFijo} className="ml-0.5 hover:text-[#0572CE]/80">×</button>
                </span>
              )}
              {!modoExclusivo && Array.from(seleccionados).map((tipo) => {
                const op = OPCIONES_CARACTERES.find((o) => o.tipo === tipo)!;
                return (
                  <span key={tipo} className="inline-flex items-center gap-1 rounded-full bg-[#0572CE]/10 px-2.5 py-0.5 text-xs font-medium text-[#0572CE]">
                    {op.label}
                    <button type="button" onClick={() => toggleTipo(tipo)} className="ml-0.5 text-[#0572CE]/60 hover:text-[#0572CE]">×</button>
                  </span>
                );
              })}
              {!modoExclusivo && (minimo || maximo) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {minimo ? `≥${minimo}` : ""}{minimo && maximo ? " " : ""}{maximo ? `≤${maximo}` : ""} chars
                </span>
              )}
              <button type="button" onClick={limpiarTodo} className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-1">
                Limpiar todo
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">Sin configuración — acepta cualquier caracter</span>
          )}
        </div>
      </section>

      {/* ── 2. Longitud — solo visible si no hay modo exclusivo */}
      {!modoExclusivo && (
        <section className="mb-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            2. Límites de longitud <span className="normal-case font-normal text-gray-400">(opcional)</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InputNumerico label="Mínimo de caracteres" valor={minimoStr} onChange={(v) => { setMinimoStr(v); resetDemo(); }} placeholder="Ej: 3" />
            <InputNumerico label="Máximo de caracteres" valor={maximoStr} onChange={(v) => { setMaximoStr(v); resetDemo(); }} placeholder="Ej: 50" />
          </div>
        </section>
      )}

      {/* ── 3. Demo ── */}
      <section className="mb-8">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          {modoExclusivo ? "2. Prueba en vivo" : "3. Prueba en vivo"}
        </p>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type={modoEmail ? "email" : "text"}
                value={valor}
                onChange={handleChange}
                error={estadoValidacion === "error"}
                placeholder={placeholderInput}
              />
            </div>
            {/* Botón validar — visible solo si hay algo que validar */}
            {necesitaValidar && (
              <button
                type="button"
                onClick={handleValidar}
                className="shrink-0 rounded-xl border border-[#0572CE] bg-white px-4 py-2 text-sm font-medium text-[#0572CE] hover:bg-[#0572CE] hover:text-white transition-all duration-200 active:scale-95"
              >
                Validar
              </button>
            )}
          </div>

          {/* Resultado de validación */}
          {estadoValidacion === "error" && errorMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <span className="text-red-500 text-sm">✗</span>
              <p className="text-xs text-red-600">{errorMsg}</p>
            </div>
          )}
          {estadoValidacion === "ok" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <span className="text-green-500 text-sm">✓</span>
              <p className="text-xs text-green-700">
                {modoEmail
                  ? "Correo electrónico válido"
                  : modoCelular
                    ? "Número de celular válido"
                    : modoTelefonoFijo
                      ? "Teléfono fijo válido"
                      : "Valor dentro del rango permitido"}
              </p>
            </div>
          )}

          {/* Barra de progreso */}
          {maximo && valor.length > 0 && porcentaje !== null && (
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${
                    porcentaje >= 100 ? "bg-red-400" : porcentaje >= 80 ? "bg-amber-400" : "bg-[#0572CE]"
                  }`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
              <p className={`text-xs text-right ${porcentaje >= 100 ? "text-red-500" : "text-gray-400"}`}>
                {valor.length} / {maximo}
              </p>
            </div>
          )}

          {/* Contador simple */}
          {!maximo && valor.length > 0 && estadoValidacion === "idle" && (
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{valor.length} caracter{valor.length !== 1 ? "es" : ""}</span>
              <button type="button" onClick={resetDemo} className="hover:text-gray-600 transition-colors">Limpiar</button>
            </div>
          )}

          {/* Hint mínimo */}
          {minimo && !modoEmail && valor.length > 0 && valor.length < minimo && estadoValidacion === "idle" && (
            <p className="text-xs text-amber-500">
              Faltan {minimo - valor.length} caracter{minimo - valor.length !== 1 ? "es" : ""} para el mínimo
            </p>
          )}
        </div>
      </section>

      {/* ── 4. Código generado ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {modoExclusivo ? "3. Código generado" : "4. Código generado"}
          </p>
          <button
            type="button"
            onClick={copiarCodigo}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-[#0572CE] hover:text-[#0572CE] transition-all duration-200 active:scale-95"
          >
            {copiado
              ? <><FiCheck className="size-3.5 text-green-600" /><span className="text-green-600">Copiado</span></>
              : <><FiCopy className="size-3.5" />Copiar código</>
            }
          </button>
        </div>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <CodePanel code={codigo} language="typescript" />
        </div>
      </section>
    </div>
  );
}

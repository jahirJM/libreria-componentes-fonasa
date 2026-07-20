import { useState, useMemo } from "react";
import Holidays from "date-holidays";

interface CalendarioRangoProps {
  /** Callback cuando se selecciona un rango completo (inicio y fin) */
  onRangeSelect?: (start: Date, end: Date) => void;
  /** Callback cuando se selecciona una sola fecha (primer click) */
  onDateSelect?: (date: Date) => void;
  /** Callback cuando se selecciona la fecha de inicio (primer click en modo rango) */
  onStartSelect?: (date: Date) => void;
  /** Mes inicial a mostrar (0-11). Por defecto el mes actual */
  initialMonth?: number;
  /** Año inicial a mostrar. Por defecto el año actual */
  initialYear?: number;
  /** Clase CSS adicional para el contenedor */
  className?: string;
  /** Modo de visualización: single (un calendario) o double (dos calendarios lado a lado) */
  mode?: "single" | "double";
  /** Mostrar conteo de días junto a la fecha fin. Default: true */
  showStats?: boolean;
  /** Contar feriados en el total de días. Default: true */
  feriados?: boolean;
  /** Contar días hábiles en el total de días. Default: true */
  habiles?: boolean;
  /** Contar fines de semana en el total de días. Default: true */
  finSemana?: boolean;
  /** Fecha mínima seleccionable. Las fechas anteriores se deshabilitan */
  minDate?: Date;
  /** Fecha máxima seleccionable. Las fechas posteriores se deshabilitan */
  maxDate?: Date;
  /** Callback para botón de confirmar. Si se pasa, muestra un botón "Seleccionar" */
  onConfirm?: () => void;
}

const DAYS_OF_WEEK = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(date: Date, start: Date, end: Date): boolean {
  const d = date.getTime();
  return d >= start.getTime() && d <= end.getTime();
}

function isWeekend(date: Date): boolean {
  const dow = date.getDay();
  return dow === 0 || dow === 6;
}

function getNextMonth(month: number, year: number): { month: number; year: number } {
  if (month === 11) return { month: 0, year: year + 1 };
  return { month: month + 1, year };
}

function getPrevMonth(month: number, year: number): { month: number; year: number } {
  if (month === 0) return { month: 11, year: year - 1 };
  return { month: month - 1, year };
}

function generateCalendarDays(month: number, year: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: (Date | null)[] = [];

  for (let i = 0; i < startDow; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

/** Panel individual de un mes del calendario */
function CalendarPanel({
  month,
  year,
  holidays,
  startDate,
  endDate,
  hoveredDate,
  onDayClick,
  onDayHover,
  onDayLeave,
  today,
  label,
  minDate,
  maxDate,
}: {
  month: number;
  year: number;
  holidays: { date: Date; name: string }[];
  startDate: Date | null;
  endDate: Date | null;
  hoveredDate: Date | null;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
  onDayLeave: () => void;
  today: Date;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
}) {
  const calendarDays = useMemo(() => generateCalendarDays(month, year), [month, year]);

  const isHoliday = (date: Date): string | null => {
    const found = holidays.find((h) => isSameDay(h.date, date));
    return found ? found.name : null;
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && date.getTime() < minDate.getTime()) return true;
    if (maxDate && date.getTime() > maxDate.getTime()) return true;
    return false;
  };

  const getPreviewEnd = (): Date | null => {
    if (startDate && !endDate && hoveredDate) {
      return hoveredDate;
    }
    return endDate;
  };

  const getDayClasses = (date: Date): string => {
    const holiday = isHoliday(date);
    const disabled = isDisabled(date);
    const previewEnd = getPreviewEnd();
    const rangeStart = startDate;
    const rangeEnd = previewEnd;

    const base =
      "w-9 h-9 flex items-center justify-center text-sm rounded-full transition-all relative ";

    // Día deshabilitado
    if (disabled) {
      return base + "text-gray-300 cursor-not-allowed line-through";
    }

    const clickable = "cursor-pointer ";

    const isStart = rangeStart && isSameDay(date, rangeStart);
    const isEnd = rangeEnd && isSameDay(date, rangeEnd);

    if (isStart || isEnd) {
      return base + clickable + "bg-[#0572CE] text-white font-bold ring-2 ring-[#0572CE] ring-offset-1";
    }

    if (rangeStart && rangeEnd) {
      const effectiveStart =
        rangeStart.getTime() <= rangeEnd.getTime() ? rangeStart : rangeEnd;
      const effectiveEnd =
        rangeStart.getTime() <= rangeEnd.getTime() ? rangeEnd : rangeStart;
      if (isInRange(date, effectiveStart, effectiveEnd)) {
        if (holiday) {
          return base + clickable + "bg-[#0572CE]/30 text-[#0572CE] font-semibold";
        }
        return base + clickable + "bg-[#D4E8F7] text-[#1e3a5f] font-medium";
      }
    }

    if (holiday) {
      return base + clickable + "bg-[#0572CE] text-white font-semibold hover:ring-2 hover:ring-[#0572CE]";
    }

    if (isSameDay(date, today)) {
      return base + clickable + "border-2 border-[#008CB5] text-[#008CB5] font-semibold hover:bg-[#D4E8F7]";
    }

    if (isWeekend(date)) {
      return base + clickable + "text-gray-400 hover:bg-[#D4E8F7]";
    }

    return base + clickable + "text-gray-700 hover:bg-[#D4E8F7]";
  };

  return (
    <div className="flex-1 min-w-0">
      {label && (
        <div className="text-xs font-medium text-[#0572CE] uppercase tracking-wide mb-2 text-center">
          {label}
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-800 text-center mb-2">
        {MONTH_NAMES[month]} {year}
      </h3>

      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="w-9 h-9" />;
          }

          const holidayName = isHoliday(date);
          const disabled = isDisabled(date);

          return (
            <div key={date.toISOString()} className="flex justify-center">
              <button
                type="button"
                disabled={disabled}
                className={getDayClasses(date)}
                onClick={() => !disabled && onDayClick(date)}
                onMouseEnter={() => !disabled && onDayHover(date)}
                onMouseLeave={onDayLeave}
                title={holidayName ?? undefined}
                aria-label={`${date.getDate()} de ${MONTH_NAMES[month]}${holidayName ? ` - Feriado: ${holidayName}` : ""}${disabled ? " - No disponible" : ""}`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarioRango({
  onRangeSelect,
  onDateSelect,
  onStartSelect,
  initialMonth,
  initialYear,
  className = "",
  mode = "single",
  showStats = true,
  feriados = true,
  habiles = true,
  finSemana = true,
  minDate,
  maxDate,
  onConfirm,
}: CalendarioRangoProps) {
  const today = new Date();
  const [leftMonth, setLeftMonth] = useState(initialMonth ?? today.getMonth());
  const [leftYear, setLeftYear] = useState(initialYear ?? today.getFullYear());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const rightPanel = useMemo(() => getNextMonth(leftMonth, leftYear), [leftMonth, leftYear]);

  // Obtener feriados de los años visibles
  const holidays = useMemo(() => {
    const hd = new Holidays("CL");
    const years = new Set([leftYear, rightPanel.year]);
    const allHolidays: { date: Date; name: string }[] = [];

    years.forEach((y) => {
      const yearHolidays = hd.getHolidays(y);
      yearHolidays
        .filter((h) => h.type === "public")
        .forEach((h) => {
          allHolidays.push({ date: new Date(h.date), name: h.name });
        });
    });

    return allHolidays;
  }, [leftYear, rightPanel.year]);

  // Conteo de días del rango — solo cuenta los tipos habilitados por props
  const countedDays = useMemo(() => {
    if (!startDate || !endDate) return null;

    const effectiveStart = startDate.getTime() <= endDate.getTime() ? startDate : endDate;
    const effectiveEnd = startDate.getTime() <= endDate.getTime() ? endDate : startDate;

    let count = 0;

    const current = new Date(effectiveStart);
    while (current <= effectiveEnd) {
      const weekend = isWeekend(current);
      const holiday = holidays.some((h) => isSameDay(h.date, current));

      if (holiday && feriados) {
        count++;
      } else if (weekend && !holiday && finSemana) {
        count++;
      } else if (!weekend && !holiday && habiles) {
        count++;
      }

      current.setDate(current.getDate() + 1);
    }

    return count;
  }, [startDate, endDate, holidays, feriados, habiles, finSemana]);

  const handleDayClick = (date: Date) => {
    // Modo fecha única
    if (onDateSelect) {
      setStartDate(date);
      setEndDate(null);
      onDateSelect(date);
      return;
    }

    // Modo rango
    if (!startDate || (startDate && endDate)) {
      // Primer click o reinicio
      setStartDate(date);
      setEndDate(null);
      onStartSelect?.(date);
    } else {
      // Segundo click
      if (date.getTime() < startDate.getTime()) {
        setEndDate(startDate);
        setStartDate(date);
        onStartSelect?.(date);
        onRangeSelect?.(date, startDate);
      } else {
        setEndDate(date);
        onRangeSelect?.(startDate, date);
      }
    }
  };

  const prevMonth = () => {
    const prev = getPrevMonth(leftMonth, leftYear);
    setLeftMonth(prev.month);
    setLeftYear(prev.year);
  };

  const nextMonth = () => {
    const next = getNextMonth(leftMonth, leftYear);
    setLeftMonth(next.month);
    setLeftYear(next.year);
  };

  const containerClass =
    mode === "double"
      ? `w-[680px] bg-white rounded-xl shadow-lg border border-gray-200 p-5 ${className}`
      : `w-[340px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 ${className}`;

  return (
    <div className={containerClass}>
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Mes anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {mode === "single" && (
          <h2 className="text-base font-semibold text-gray-800">
            {MONTH_NAMES[leftMonth]} {leftYear}
          </h2>
        )}

        {mode === "double" && (
          <h2 className="text-base font-semibold text-gray-800">
            {MONTH_NAMES[leftMonth]} — {MONTH_NAMES[rightPanel.month]} {rightPanel.year}
          </h2>
        )}

        <button
          type="button"
          onClick={nextMonth}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Mes siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Paneles de calendario */}
      <div className={mode === "double" ? "flex gap-6" : ""}>
        <CalendarPanel
          month={leftMonth}
          year={leftYear}
          holidays={holidays}
          startDate={startDate}
          endDate={endDate}
          hoveredDate={hoveredDate}
          onDayClick={handleDayClick}
          onDayHover={setHoveredDate}
          onDayLeave={() => setHoveredDate(null)}
          today={today}
          label={mode === "double" ? "Fecha inicio" : undefined}
          minDate={minDate}
          maxDate={maxDate}
        />

        {mode === "double" && (
          <>
            <div className="w-px bg-gray-200 self-stretch" />

            <CalendarPanel
              month={rightPanel.month}
              year={rightPanel.year}
              holidays={holidays}
              startDate={startDate}
              endDate={endDate}
              hoveredDate={hoveredDate}
              onDayClick={handleDayClick}
              onDayHover={setHoveredDate}
              onDayLeave={() => setHoveredDate(null)}
              today={today}
              label="Fecha término"
              minDate={minDate}
              maxDate={maxDate}
            />
          </>
        )}
      </div>

      {/* Leyenda */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#0572CE]" />
          Feriado
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D4E8F7]" />
          Rango seleccionado
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 border-[#008CB5]" />
          Hoy
        </div>
        {/* Indicador de filtro activo */}
        {!(feriados && habiles && finSemana) && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            {habiles && !feriados && !finSemana && "Solo días hábiles"}
            {habiles && feriados && !finSemana && "Días hábiles y feriados"}
            {habiles && !feriados && finSemana && "Días hábiles y fin de semana"}
            {!habiles && feriados && finSemana && "Solo feriados y fin de semana"}
            {!habiles && feriados && !finSemana && "Solo feriados"}
            {!habiles && !feriados && finSemana && "Solo fin de semana"}
            {!habiles && !feriados && !finSemana && "Sin conteo"}
          </div>
        )}
      </div>

      {/* Info de selección + conteo inline + botón confirmar */}
      {startDate && (
        <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onDateSelect ? (
              <div>
                <span className="font-medium text-[#0572CE]">Fecha:</span>{" "}
                {startDate.toLocaleDateString("es-CL")}
              </div>
            ) : (
              <>
                <div>
                  <span className="font-medium text-[#0572CE]">Inicio:</span>{" "}
                  {startDate.toLocaleDateString("es-CL")}
                </div>
                {endDate && (
                  <>
                    <span className="text-gray-300">→</span>
                    <div>
                      <span className="font-medium text-[#0572CE]">Fin:</span>{" "}
                      {endDate.toLocaleDateString("es-CL")}
                    </div>
                  </>
                )}
                {!endDate && (
                  <span className="text-gray-400">(selecciona fecha fin)</span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 ml-3">
            {/* Conteo de días */}
            {showStats && countedDays !== null && (
              <span className="bg-[#0572CE] text-white px-2.5 py-1 rounded-full text-[11px] font-semibold">
                {countedDays} días
              </span>
            )}
            {/* Botón confirmar */}
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="bg-[#0572CE] text-white px-3 py-1 rounded-2xl text-[11px] font-medium hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Seleccionar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

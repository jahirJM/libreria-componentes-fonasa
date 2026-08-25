import { useState, useRef, useCallback } from "react";
import { FiCopy, FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { Table } from "../../componentsUI/Table";
import { Switch } from "../../componentsUI/Switch";
import { CodePanel } from "../../app/projectComponents/CodePanel";
import { fonasaToast } from "../../componentsUI/Toast";

interface PlaygroundColumn {
  id: string;
  name: string;
}

interface PlaygroundRow {
  id: string;
  cells: string[];
}

export function TablePlayground() {
  const [columns, setColumns] = useState<PlaygroundColumn[]>([
    { id: "col-1", name: "Nombre" },
    { id: "col-2", name: "RUT" },
    { id: "col-3", name: "Email" },
    { id: "col-4", name: "Rol" },
  ]);
  const [rows, setRows] = useState<PlaygroundRow[]>([
    { id: "row-1", cells: ["Juan Pérez", "12.345.678-9", "juan@email.com", "Admin"] },
    { id: "row-2", cells: ["María López", "98.765.432-1", "maria@email.com", "Usuario"] },
  ]);
  const [ocultable, setOcultable] = useState(true);
  const [redimensionable, setRedimensionable] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);

  const colCounter = useRef(5);
  const rowCounter = useRef(3);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !previewContainerRef.current) return;
      const rect = previewContainerRef.current.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(e.clientX - rect.left, rect.width));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const addColumn = () => {
    const id = `col-${colCounter.current}`;
    colCounter.current++;
    setColumns((prev) => [...prev, { id, name: `Columna ${columns.length + 1}` }]);
    setRows((prev) => prev.map((r) => ({ ...r, cells: [...r.cells, "-"] })));
  };

  const removeColumn = (index: number) => {
    setColumns((prev) => prev.filter((_, i) => i !== index));
    setRows((prev) => prev.map((r) => ({ ...r, cells: r.cells.filter((_, i) => i !== index) })));
  };

  const updateColumnName = (id: string, name: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };

  const addRow = () => {
    const id = `row-${rowCounter.current}`;
    rowCounter.current++;
    setRows((prev) => [...prev, { id, cells: columns.map(() => "-") }]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateCell = (rowId: string, colIndex: number, value: string) => {
    setRows((prev) => prev.map((r) => r.id === rowId ? { ...r, cells: r.cells.map((c, i) => i === colIndex ? value : c) } : r));
  };

  const generatedCode = `<Table
  nombreColumnas={[${columns.map((c) => `"${c.name}"`).join(", ")}]}${ocultable ? "\n  ocultable" : ""}${redimensionable ? "\n  redimensionable" : ""}
>
${rows.map((r) => `  <tr className="border-b border-gray-100">\n${r.cells.map((c) => `    <td className="px-4 py-2 text-sm">${c}</td>`).join("\n")}\n  </tr>`).join("\n")}
</Table>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      fonasaToast.success("Código copiado");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silently fail */ }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[70vh]">
      {/* Left panel */}
      <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Props */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Props</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={ocultable} onChange={setOcultable} tamano="sm" />
            <span className="text-xs text-gray-600">ocultable</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={redimensionable} onChange={setRedimensionable} tamano="sm" />
            <span className="text-xs text-gray-600">redimensionable</span>
          </label>
        </div>

        {/* Columns editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Columnas ({columns.length})</p>
            <button
              onClick={addColumn}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>
          <div className="space-y-1.5">
            {columns.map((col, index) => (
              <div key={col.id} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={col.name}
                  onChange={(e) => updateColumnName(col.id, e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                />
                <button
                  onClick={() => removeColumn(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <FiTrash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Rows editor */}
        <div className="space-y-2 flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filas ({rows.length})</p>
            <button
              onClick={addRow}
              className="flex items-center gap-1 text-xs text-[#0572CE] hover:text-[#0572CE]/80 transition-colors cursor-pointer"
            >
              <FiPlus className="size-3" />
              Agregar
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {rows.map((row) => (
              <div key={row.id} className="rounded-lg border border-gray-200 p-2 space-y-1.5 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">{row.id}</span>
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="size-3" />
                  </button>
                </div>
                {row.cells.map((cell, i) => (
                  <input
                    key={i}
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(row.id, i, e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-[#0572CE]"
                    placeholder={columns[i]?.name ?? `Col ${i + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-hidden border-b border-gray-200">
          <div
            ref={previewContainerRef}
            className="h-full p-6 relative flex items-center overflow-auto bg-gray-50/30"
          >
            <div
              className="overflow-hidden border-r border-gray-200 flex items-center justify-center px-4 w-full"
              style={{ width: previewWidth ?? "100%" }}
            >
              <div className="w-full">
                <Table
                  nombreColumnas={columns.map((c) => c.name)}
                  ocultable={ocultable}
                  redimensionable={redimensionable}
                >
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100">
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-4 py-2 text-sm">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 bottom-0 flex items-center cursor-col-resize z-10 group px-1"
              style={{ left: previewWidth ? `calc(${previewWidth}px + 1.5rem - 6px)` : "calc(100% - 1.5rem - 6px)" }}
            >
              <div className="w-1.5 h-10 rounded-full bg-gray-300 group-hover:bg-[#0572CE] transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-48 shrink-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Código generado</p>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0572CE] transition-colors cursor-pointer">
              {copied ? <><FiCheckCircle className="size-3 text-green-600" /><span className="text-green-600">Copiado</span></> : <><FiCopy className="size-3" />Copiar</>}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CodePanel code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  );
}

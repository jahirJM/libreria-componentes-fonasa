import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col items-center text-center py-20">
      <h1 className="text-5xl font-bold text-white mb-4">Fonasa UI</h1>
      <p className="text-lg text-gray-400 max-w-xl mb-8">
        Librería de componentes React para proyectos internos de Fonasa.
        Componentes listos para copiar y pegar en tu proyecto.
      </p>
      <div className="flex gap-4">
        <Link
          to="/components"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          Ver componentes
        </Link>
        <Link
          to="/docs"
          className="rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
        >
          Documentación
        </Link>
      </div>
    </div>
  );
}

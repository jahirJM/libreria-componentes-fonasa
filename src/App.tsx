import { registry } from "./registry";
import { ComponentPreview } from "./components/ComponentPreview";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Librería de Componentes
        </h1>
        <div className="flex flex-col gap-12">
          {registry.map((entry) => (
            <ComponentPreview key={entry.name} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ComponentsLayout } from "./app/layouts/ComponentsLayout";
import { ComponentsIndex } from "./app/pages/ComponentsIndex";
import { DefaultLayout } from "./app/layouts/DefaultLayout";
import { ComponentPage } from "./app/pages/ComponentPage";
import { MethodsLayout } from "./app/layouts/MethodsLayout";
import { MethodsIndex } from "./app/pages/MethodsIndex";
import { MethodPage } from "./app/pages/MethodPage";
import { FiltroInputPage } from "./app/pages/FiltroInputPage";
import { ColorsLayout } from "./app/layouts/ColorsLayout";
import { LogosLayout } from "./app/layouts/LogosLayout";
import { RecursosPage } from "./app/pages/RecursosPage";
import { AnimationsLayout } from "./app/layouts/AnimationsLayout";
import { AnimationsPage } from "./app/pages/AnimationsPage";
import { DocsLayout } from "./app/layouts/DocsLayout";

import { Home } from "./app/pages/Home";
import { DocsHome } from "./app/pages/DocsHome";
import { DocsInstalacion } from "./app/pages/DocsInstalacion";
import { DocsUso } from "./app/pages/DocsUso";
import { DocsColaboradores } from "./app/pages/DocsColaboradores";
import { DocsDependencias } from "./app/pages/DocsDependencias";
import { ColorsPage } from "./app/pages/ColorsPage";
import { Navbar } from "./app/projectComponents/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Rutas sin sidebar */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Rutas con sidebar — Documentación */}
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<DocsHome />} />
          <Route path="/docs/instalacion" element={<DocsInstalacion />} />
          <Route path="/docs/uso" element={<DocsUso />} />
          <Route path="/docs/colaboradores" element={<DocsColaboradores />} />
          <Route path="/docs/dependencias" element={<DocsDependencias />} />
        </Route>

        {/* Ruta con sidebar — Colores */}
        <Route element={<ColorsLayout />}>
          <Route path="/colors" element={<ColorsPage />} />
        </Route>

        {/* Rutas con sidebar — Componentes */}
        <Route element={<ComponentsLayout />}>
          <Route path="/components" element={<ComponentsIndex />} />
          <Route path="/components/:name" element={<ComponentPage />} />
        </Route>

        {/* Rutas con sidebar — Métodos */}
        <Route element={<MethodsLayout />}>
          <Route path="/methods" element={<MethodsIndex />} />
          <Route path="/methods/:name" element={<MethodPage />} />
          <Route path="/methods/constructor-filtros" element={<FiltroInputPage />} />
        </Route>

        {/* Recursos (Logos + Templates) */}
        <Route element={<LogosLayout />}>
          <Route path="/recursos" element={<RecursosPage />} />
        </Route>

        {/* Animaciones */}
        <Route element={<AnimationsLayout />}>
          <Route path="/animaciones" element={<AnimationsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

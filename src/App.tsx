import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ComponentsLayout } from "./app/layouts/ComponentsLayout";
import { ComponentsIndex } from "./app/pages/ComponentsIndex";
import { DefaultLayout } from "./app/layouts/DefaultLayout";
import { ComponentPage } from "./app/pages/ComponentPage";
import { MethodsLayout } from "./app/layouts/MethodsLayout";
import { MethodsIndex } from "./app/pages/MethodsIndex";
import { MethodPage } from "./app/pages/MethodPage";
import { FiltroInputPage } from "./app/pages/FiltroInputPage";

import { Home } from "./app/pages/Home";
import { Docs } from "./app/pages/Docs";
import { ColorsPage } from "./app/pages/ColorsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin sidebar */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

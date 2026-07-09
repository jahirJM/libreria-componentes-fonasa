import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ComponentsLayout } from "./app/layouts/ComponentsLayout";
import { ComponentsIndex } from "./app/pages/ComponentsIndex";
import { DefaultLayout } from "./app/layouts/DefaultLayout";
import { ComponentPage } from "./app/pages/ComponentPage";

import { Home } from "./app/pages/Home";
import { Docs } from "./app/pages/Docs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin sidebar */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
        </Route>

        {/* Rutas con sidebar */}
        <Route element={<ComponentsLayout />}>
          <Route path="/components" element={<ComponentsIndex />} />
          <Route path="/components/:name" element={<ComponentPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

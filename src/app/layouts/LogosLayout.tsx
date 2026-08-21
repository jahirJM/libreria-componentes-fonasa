import { Outlet } from "react-router-dom";
import { Footer } from "../../componentsUI/Footer";

export function LogosLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex pt-14 flex-1">
        <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

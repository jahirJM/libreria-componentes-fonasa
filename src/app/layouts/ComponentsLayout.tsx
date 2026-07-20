import { Outlet } from "react-router-dom";
import { Navbar } from "../projectComponents/Navbar";
import { Sidebar } from "../projectComponents/Sidebar";
import { Footer } from "../../componentsUI/Footer";

export function ComponentsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <div className="flex pt-14 flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 min-w-0 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

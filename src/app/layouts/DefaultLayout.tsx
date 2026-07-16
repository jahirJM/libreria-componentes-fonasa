import { Outlet } from "react-router-dom";
import { Navbar } from "../projectComponents/Navbar";
import { Footer } from "../../componentsUI/Footer";

export function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="pt-14 px-6 flex-1">
        <div className="mx-auto max-w-4xl py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Navbar } from "../projectComponents/Navbar";

export function DefaultLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      <main className="pt-16 px-6">
        <div className="mx-auto max-w-4xl py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

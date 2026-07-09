import { Outlet } from "react-router-dom";
import { Navbar } from "../projectComponents/Navbar";
import { Sidebar } from "../projectComponents/Sidebar";

export function ComponentsLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Navbar } from "../projectComponents/Navbar";

export function AnimationsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="flex-1 pt-14 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

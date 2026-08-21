import { Outlet } from "react-router-dom";

export function LogosLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <main className="flex-1 pt-14 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

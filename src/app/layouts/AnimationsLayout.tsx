import { Outlet } from "react-router-dom";
import { PageTransition } from "../projectComponents/PageTransition";

export function AnimationsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121e2b] text-gray-800 dark:text-[#e2e8f0] transition-colors duration-200">
      <main className="flex-1 pt-14 overflow-y-auto">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}

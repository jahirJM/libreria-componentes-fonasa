import { Outlet } from "react-router-dom";
import { Footer } from "../../componentsUI/Footer";
import { MethodsSidebar } from "../projectComponents/MethodsSidebar";
import { PageTransition } from "../projectComponents/PageTransition";

export function MethodsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121e2b] text-gray-800 dark:text-[#e2e8f0] transition-colors duration-200">
      <div className="flex pt-14 flex-1">
        <MethodsSidebar />
        <main className="flex-1 lg:ml-64 p-8 min-w-0 overflow-hidden flex flex-col">
          <div className="flex-1">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

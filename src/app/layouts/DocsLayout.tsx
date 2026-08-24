import { Outlet } from "react-router-dom";
import { DocsSidebar } from "../projectComponents/DocsSidebar";
import { Footer } from "../../componentsUI/Footer";

export function DocsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121e2b] text-gray-800 dark:text-[#e2e8f0] transition-colors duration-200">
      <div className="flex pt-14 flex-1">
        <DocsSidebar />
        <main className="flex-1 lg:ml-64 min-w-0 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 pl-0 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl">
              <Outlet />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

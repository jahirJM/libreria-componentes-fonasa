import { Outlet } from "react-router-dom";
import { ColorsSidebar } from "../projectComponents/ColorsSidebar";
import { Footer } from "../../componentsUI/Footer";
import { PageTransition } from "../projectComponents/PageTransition";

export function ColorsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121e2b] text-gray-800 dark:text-[#e2e8f0] transition-colors duration-200">
      <div className="flex pt-14 flex-1">
        <ColorsSidebar />
        <main className="flex-1 lg:ml-64 min-w-0 overflow-hidden flex flex-col">
          <div className="flex-1 p-8">
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

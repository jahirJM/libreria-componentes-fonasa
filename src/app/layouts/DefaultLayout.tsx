import { Outlet } from "react-router-dom";
import { Footer } from "../../componentsUI/Footer";
import { PageTransition } from "../projectComponents/PageTransition";

export function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121e2b] text-gray-800 dark:text-[#e2e8f0] transition-colors duration-200">
      <main className="pt-14 px-6 flex-1">
        <div className="mx-auto max-w-4xl py-12">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </main>
      <Footer />
    </div>
  );
}

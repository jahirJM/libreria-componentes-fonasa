import { useState, useEffect } from "react";
import { colorSections, slugifySection } from "../pages/ColorsPage";

export function ColorsSidebar() {
  const [activeSection, setActiveSection] = useState(
    slugifySection(colorSections[0].title)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    colorSections.forEach((section) => {
      const el = document.getElementById(slugifySection(section.title));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleClick(sectionTitle: string) {
    const id = slugifySection(sectionTitle);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }

  return (
    <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
      {/* Section links */}
      <div className="ml-3 mt-2 border-l-2 border-gray-300 pl-3">
        <nav className="flex flex-col gap-0.5 text-sm font-medium">
          {colorSections.map((section) => {
            const id = slugifySection(section.title);
            const isActive = activeSection === id;
            return (
              <button
                key={section.title}
                onClick={() => handleClick(section.title)}
                className={`w-full text-left rounded-lg px-3 py-1.5 transition-colors duration-100 ${
                  isActive
                    ? "bg-[#0572CE] text-white font-semibold"
                    : "text-[#0572CE] hover:bg-[#0572CE] hover:text-white"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

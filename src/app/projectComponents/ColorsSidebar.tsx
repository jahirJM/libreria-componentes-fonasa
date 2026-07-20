import { useState, useEffect } from "react";
import { IoMdColorPalette } from "react-icons/io";
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
    <aside className="fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 mb-2">
        <IoMdColorPalette className="size-4 text-[#0572CE]" />
        <span className="font-bold">Paleta de Colores</span>
      </div>

      {/* Section links */}
      <nav className="ml-3 border-l-2 border-gray-300 pl-3 flex flex-col gap-0.5">
        {colorSections.map((section) => {
          const id = slugifySection(section.title);
          const isActive = activeSection === id;
          return (
            <button
              key={section.title}
              onClick={() => handleClick(section.title)}
              className={`text-left rounded-lg px-3 py-1.5 text-sm transition-colors duration-100 ${
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
    </aside>
  );
}

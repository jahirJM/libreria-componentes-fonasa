import { useLocation, useNavigate } from "react-router-dom";
import { Navbar as NavbarUI, type NavbarItem } from "../../componentsUI/Navbar";
import { ThemeToggle } from "../../componentsUI/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS: NavbarItem[] = [
  { label: "Inicio", path: "/", exact: true },
  { label: "Componentes", path: "/components" },
  { label: "Métodos", path: "/methods" },
  { label: "Recursos", path: "/recursos" },
  { label: "Animaciones", path: "/animaciones" },
  { label: "Colores", path: "/colors" },
  { label: "Docs", path: "/docs" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <NavbarUI
        items={NAV_ITEMS}
        activePath={location.pathname}
        variant="underline"
        logoElement={
          <div className="relative group">
            <img src="/logos/fonasa/svg/fonasa-logo-name.svg" alt="Fonasa UI" className="h-8 w-auto" />
            <span className="absolute -bottom-2 -right-4.5 flex items-center justify-center size-6 rounded-full border-2 border-white bg-[#0572CE] dark:border-[#111d29]">
              <span className="flex items-center gap-px text-white font-bold text-[13px] rotate-10">
                <span className="animate-[codeSymbolUp_4s_ease-in-out_infinite]">&lt;</span>
                <span className="animate-[codeSymbolDown_4s_ease-in-out_infinite]">&gt;</span>
              </span>
            </span>
          </div>
        }
        logoAlt="Fonasa UI"
        onNavigate={(path) => navigate(path)}
        onLogoClick={() => navigate("/")}
        className="z-99 dark:bg-gray-900 dark:border-gray-800"
      />
      {/* Toggle dark mode — solo visible en desktop (lg+) */}
      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
        className="hidden lg:block fixed top-3.5 right-6 z-[100]"
      />

      {/* Toggle dark mode — solo visible en mobile (< lg) */}
      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
        className="lg:hidden fixed top-3.5 right-16 z-[100]"
      />
    </>
  );
}

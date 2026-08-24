import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar as NavbarUI, type NavbarItem } from "../../componentsUI/Navbar";
import { LuCode } from "react-icons/lu";
import { FiSun, FiMoon } from "react-icons/fi";
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
  const [tilting, setTilting] = useState(false);

  function handleToggle() {
    setTilting(true);
    toggleTheme();
    setTimeout(() => setTilting(false), 500);
  }

  const trackTilt = tilting
    ? theme === "dark" ? "rotate-[-4deg]" : "rotate-[4deg]"
    : "rotate-0";

  return (
    <>
      <NavbarUI
        items={NAV_ITEMS}
        activePath={location.pathname}
        variant="underline"
        logoElement={
          <div className="relative">
            <img src="/logos/fonasa/svg/fonasa-logo-name.svg" alt="Fonasa UI" className="h-8 w-auto" />
            <span className="absolute -bottom-2 -right-4.5 flex items-center justify-center size-6 rounded-full border-2 border-white dark:border-[#061018] bg-[#0572CE]">
              <LuCode className="size-4 text-[#fff] rotate-10 stroke-[3]" />
            </span>
          </div>
        }
        logoAlt="Fonasa UI"
        onNavigate={(path) => navigate(path)}
        onLogoClick={() => navigate("/")}
        className="z-99 dark:bg-gray-900 dark:border-gray-800"
      />
      {/* Toggle dark mode — solo visible en desktop (lg+) */}
      <button
        onClick={handleToggle}
        className="hidden lg:block fixed top-3.5 right-6 z-[100] cursor-pointer"
        title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <div className={`relative w-12 h-6 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
          theme === "dark" ? "bg-[#1e3044] border-[#2d4a6a]" : "bg-gray-200 border-gray-300"
        } ${trackTilt}`}>
          <div className={`absolute top-0.5 size-5 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
            theme === "dark"
              ? "left-[26px] bg-[#0572CE] rotate-[360deg]"
              : "left-0.5 bg-white shadow-md rotate-0"
          }`}>
            {theme === "dark" ? (
              <FiSun className="size-3 text-white" />
            ) : (
              <FiMoon className="size-3 text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {/* Toggle dark mode — solo visible en mobile (< lg) */}
      <button
        onClick={handleToggle}
        className="lg:hidden fixed top-3.5 right-16 z-[100] cursor-pointer"
        title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <div className={`relative w-12 h-6 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
          theme === "dark" ? "bg-[#1e3044] border-[#2d4a6a]" : "bg-gray-200 border-gray-300"
        } ${trackTilt}`}>
          <div className={`absolute top-0.5 size-5 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.2,0.27,1.2)] ${
            theme === "dark"
              ? "left-[26px] bg-[#0572CE] rotate-[360deg]"
              : "left-0.5 bg-white shadow-md rotate-0"
          }`}>
            {theme === "dark" ? (
              <FiSun className="size-3 text-white" />
            ) : (
              <FiMoon className="size-3 text-gray-500" />
            )}
          </div>
        </div>
      </button>
    </>
  );
}

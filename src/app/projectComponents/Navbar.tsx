import { useLocation, useNavigate } from "react-router-dom";
import { Navbar as NavbarUI, type NavbarItem } from "../../componentsUI/Navbar";
import { LuCode } from "react-icons/lu";

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

  return (
    <NavbarUI
      items={NAV_ITEMS}
      activePath={location.pathname}
      variant="underline"
      logoElement={
        <div className="relative">
          <img src="/logos/fonasa/svg/fonasa-logo-name.svg" alt="Fonasa UI" className="h-8 w-auto" />
          <span className="absolute -bottom-2 -right-4.5 flex items-center justify-center size-6 rounded-full border-2 border-white bg-[#0572CE]">
            <LuCode className="size-4 text-[#fff] rotate-10 stroke-[3]" />
          </span>
        </div>
      }
      logoAlt="Fonasa UI"
      onNavigate={(path) => navigate(path)}
      onLogoClick={() => navigate("/")}
      className="z-99"
    />
  );
}

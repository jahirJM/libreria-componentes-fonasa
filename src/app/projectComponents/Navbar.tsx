import { useLocation, useNavigate } from "react-router-dom";
import { Navbar as NavbarUI, type NavbarItem } from "../../componentsUI/Navbar";

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
      logoSrc="/fonasa-favicon.ico"
      logoAlt="Fonasa"
      title="Fonasa UI"
      onNavigate={(path) => navigate(path)}
      onLogoClick={() => navigate("/")}
      className="z-99"
    />
  );
}

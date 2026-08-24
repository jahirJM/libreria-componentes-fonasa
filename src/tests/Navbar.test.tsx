import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "../componentsUI/Navbar";

const items = [
  { label: "Inicio", path: "/", exact: true },
  { label: "Solicitudes", path: "/solicitudes" },
  { label: "Configuración", path: "/config" },
];

describe("Navbar", () => {
  it("renderiza los items de navegacion", () => {
    render(<Navbar items={items} activePath="/" />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("renderiza el titulo", () => {
    render(<Navbar items={items} activePath="/" title="Fonasa" />);
    expect(screen.getByText("Fonasa")).toBeInTheDocument();
  });

  it("ejecuta onNavigate al hacer click en un item", () => {
    const handleNavigate = jest.fn();
    render(<Navbar items={items} activePath="/" onNavigate={handleNavigate} />);
    fireEvent.click(screen.getAllByText("Solicitudes")[0]);
    expect(handleNavigate).toHaveBeenCalledWith("/solicitudes");
  });

  it("ejecuta onLogoClick al hacer click en el logo", () => {
    const handleLogoClick = jest.fn();
    render(<Navbar items={items} activePath="/" title="Logo" onLogoClick={handleLogoClick} />);
    fireEvent.click(screen.getByText("Logo"));
    expect(handleLogoClick).toHaveBeenCalled();
  });

  it("tiene boton de menu mobile", () => {
    render(<Navbar items={items} activePath="/" />);
    expect(screen.getByLabelText("Abrir menú")).toBeInTheDocument();
  });
});

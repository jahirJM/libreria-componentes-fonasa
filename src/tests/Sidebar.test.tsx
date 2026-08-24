import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sidebar } from "../componentsUI/Sidebar";

const menuItems = [
  { label: "Solicitudes", path: "/solicitudes", icon: () => <span>📋</span> },
  { label: "Configuración", path: "/config", icon: () => <span>⚙️</span> },
];

describe("Sidebar", () => {
  it("renderiza el titulo", () => {
    render(<Sidebar title="Panel" menuItems={menuItems} />);
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("renderiza el nombre de usuario", () => {
    render(<Sidebar userName="Juan Pérez" menuItems={menuItems} />);
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("renderiza los items del menu", () => {
    render(<Sidebar menuItems={menuItems} />);
    expect(screen.getByText("Solicitudes")).toBeInTheDocument();
    expect(screen.getByText("Configuración")).toBeInTheDocument();
  });

  it("ejecuta onNavigate al clickear un item", () => {
    const handleNavigate = jest.fn();
    render(<Sidebar menuItems={menuItems} onNavigate={handleNavigate} />);
    fireEvent.click(screen.getByText("Solicitudes"));
    expect(handleNavigate).toHaveBeenCalledWith("/solicitudes");
  });

  it("muestra skeleton cuando loading es true", () => {
    const { container } = render(<Sidebar loading menuItems={menuItems} />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("se oculta cuando isOpen es false", () => {
    const { container } = render(<Sidebar isOpen={false} menuItems={menuItems} />);
    expect(container.querySelector("aside")).toHaveClass("-translate-x-full");
  });
});

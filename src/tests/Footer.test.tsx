import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "../componentsUI/Footer";

describe("Footer", () => {
  it("renderiza el texto de copyright con año actual", () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${year} Copyright FONASA, todos los derechos reservados`)).toBeInTheDocument();
  });

  it("renderiza el texto 'Hecho con'", () => {
    render(<Footer />);
    expect(screen.getByText(/Hecho con/)).toBeInTheDocument();
    expect(screen.getByText(/por FONASA/)).toBeInTheDocument();
  });

  it("aplica color de texto personalizado", () => {
    const { container } = render(<Footer textColor="text-white" />);
    expect(container.querySelector("footer")).toHaveClass("text-white");
  });
});

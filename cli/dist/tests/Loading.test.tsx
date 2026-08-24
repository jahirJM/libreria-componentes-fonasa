import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loading, LoadingFonasa } from "../componentsUI/Loading";

describe("Loading", () => {
  it("renderiza el spinner", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("muestra el mensaje cuando se proporciona", () => {
    render(<Loading mensaje="Procesando..." />);
    expect(screen.getByText("Procesando...")).toBeInTheDocument();
  });

  it("no muestra mensaje cuando no se proporciona", () => {
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });
});

describe("LoadingFonasa", () => {
  it("renderiza el spinner con favicon", () => {
    const { container } = render(<LoadingFonasa />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeInTheDocument();
  });

  it("muestra mensaje cuando se proporciona", () => {
    render(<LoadingFonasa mensaje="Cargando datos..." />);
    expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
  });
});

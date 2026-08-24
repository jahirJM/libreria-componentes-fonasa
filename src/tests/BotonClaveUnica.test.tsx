import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BotonClaveUnica } from "../componentsUI/BotonClaveUnica";

describe("BotonClaveUnica", () => {
  it("renderiza como link por defecto", () => {
    render(<BotonClaveUnica />);
    const link = screen.getByLabelText("Iniciar sesión con ClaveÚnica");
    expect(link.tagName).toBe("A");
  });

  it("renderiza como boton cuando asButton es true", () => {
    render(<BotonClaveUnica asButton />);
    const button = screen.getByLabelText("Iniciar sesión con ClaveÚnica");
    expect(button.tagName).toBe("BUTTON");
  });

  it("muestra el label personalizado", () => {
    render(<BotonClaveUnica label="ClaveÚnica" />);
    expect(screen.getByLabelText("ClaveÚnica con ClaveÚnica")).toBeInTheDocument();
  });

  it("ejecuta onClick cuando es boton", () => {
    const handleClick = jest.fn();
    render(<BotonClaveUnica asButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<BotonClaveUnica isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("tiene href correcto por defecto", () => {
    render(<BotonClaveUnica />);
    const link = screen.getByLabelText("Iniciar sesión con ClaveÚnica");
    expect(link).toHaveAttribute("href", "https://iam-backend.claveunica.gob.cl/auth/accounts/login");
  });
});

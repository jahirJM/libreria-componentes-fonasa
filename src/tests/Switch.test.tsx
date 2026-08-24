import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Switch } from "../componentsUI/Switch";

describe("Switch", () => {
  it("renderiza con role switch", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("tiene aria-checked false por defecto", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("ejecuta onChange al hacer click", () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("refleja estado checked controlado", () => {
    render(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("se deshabilita cuando disabled es true", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("no ejecuta onChange cuando disabled", () => {
    const handleChange = jest.fn();
    render(<Switch disabled onChange={handleChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("muestra skeleton cuando isLoading es true", () => {
    const { container } = render(<Switch isLoading />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("maneja estado no controlado con defaultChecked", () => {
    render(<Switch defaultChecked={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});

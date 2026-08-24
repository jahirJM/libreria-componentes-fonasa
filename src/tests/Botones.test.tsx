import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BotonConfirmar, BotonCancelar, BotonPrimario, BotonSecundario, BotonOutline, BotonLink } from "../componentsUI/Botones";

describe("Botones", () => {
  describe("BotonConfirmar", () => {
    it("renderiza con label", () => {
      render(<BotonConfirmar label="Guardar" />);
      expect(screen.getByText("Guardar")).toBeInTheDocument();
    });

    it("ejecuta onClick", () => {
      const handleClick = jest.fn();
      render(<BotonConfirmar label="OK" onClick={handleClick} />);
      fireEvent.click(screen.getByText("OK"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("se deshabilita cuando isDisabled es true", () => {
      render(<BotonConfirmar label="Guardar" isDisabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("muestra skeleton cuando isLoading es true", () => {
      const { container } = render(<BotonConfirmar label="Guardar" isLoading />);
      expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    });
  });

  describe("BotonCancelar", () => {
    it("renderiza con label", () => {
      render(<BotonCancelar label="Cancelar" />);
      expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("se deshabilita cuando isDisabled es true", () => {
      render(<BotonCancelar label="Cancelar" isDisabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("BotonPrimario", () => {
    it("renderiza con label", () => {
      render(<BotonPrimario label="Enviar" />);
      expect(screen.getByText("Enviar")).toBeInTheDocument();
    });

    it("tiene type submit cuando se configura", () => {
      render(<BotonPrimario label="Enviar" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("BotonSecundario", () => {
    it("renderiza con label", () => {
      render(<BotonSecundario label="Volver" />);
      expect(screen.getByText("Volver")).toBeInTheDocument();
    });
  });

  describe("BotonOutline", () => {
    it("renderiza con label y borde", () => {
      render(<BotonOutline label="Ver más" />);
      expect(screen.getByText("Ver más")).toBeInTheDocument();
    });
  });

  describe("BotonLink", () => {
    it("renderiza como texto clickeable", () => {
      render(<BotonLink label="Ver detalle" />);
      expect(screen.getByText("Ver detalle")).toBeInTheDocument();
    });
  });
});

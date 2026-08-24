import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SkeletonSolicitudCard, SkeletonSolicitudesList } from "../componentsUI/SkeletonSolicitud";

describe("SkeletonSolicitud", () => {
  it("renderiza SkeletonSolicitudCard con animacion pulse", () => {
    const { container } = render(<SkeletonSolicitudCard />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renderiza el numero correcto de skeletons en la lista", () => {
    const { container } = render(<SkeletonSolicitudesList count={5} />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(5);
  });

  it("renderiza 3 skeletons por defecto", () => {
    const { container } = render(<SkeletonSolicitudesList />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(3);
  });
});

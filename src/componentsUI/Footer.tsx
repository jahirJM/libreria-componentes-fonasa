import { HiHeart } from "react-icons/hi";

interface FooterProps {
  textColor?: string;
}

export const Footer = ({ textColor = "text-gray-800" }: FooterProps) => {
  const fechaHoy = new Date();
  const year = fechaHoy.getFullYear();

  return (
    <footer className={`text-xs text-center bg-[#fafdff] pt-10 pb-2 ${textColor}`}>
      <p>© {year} Copyright FONASA, todos los derechos reservados</p>
      <p>
        Hecho con <HiHeart className="text-red-500 size-5 inline" /> por FONASA
      </p>
    </footer>
  );
};

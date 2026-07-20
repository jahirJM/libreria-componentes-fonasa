import type { IconType } from "react-icons";
import React from "react";

interface BotonesProps {
  label: React.ReactNode;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}

export const BotonConfirmar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type,
}: BotonesProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-cyan-600 hover:bg-cyan-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonCancelar = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
}: BotonesProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonPrimario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type = "button",
  customClass = "",
}: BotonesProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#0572CE] hover:bg-blue-700 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonSecundario = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
}: BotonesProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border border-transparent px-4 py-1.5 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonOutline = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  type = "button",
  customClass = "",
}: BotonesProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex justify-center items-center rounded-2xl border px-4 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
        isDisabled
          ? "border-gray-200 text-gray-300 cursor-not-allowed"
          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl mr-2" />}
      {label}
    </button>
  );
};

export const BotonLink = ({
  label,
  icon: Icon,
  onClick,
  isDisabled,
  customClass = "",
}: BotonesProps) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`inline-flex justify-center items-center px-1 py-0.5 text-sm font-medium focus:outline-none ${
        isDisabled
          ? "text-gray-300 cursor-not-allowed"
          : "text-[#0572CE] hover:text-blue-700 cursor-pointer"
      } ${customClass}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg mr-1.5" />}
      {label}
    </button>
  );
};

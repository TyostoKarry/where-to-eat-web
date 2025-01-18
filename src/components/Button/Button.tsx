import React from "react";
import "./button.css";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, disabled, onClick }) => {
  return (
    <button
      className="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

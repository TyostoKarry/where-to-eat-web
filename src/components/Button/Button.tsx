import { FC } from "react";
import "./button.css";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  useLightTheme?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  disabled,
  useLightTheme = false,
  width = "100%",
  height = "auto",
  fontSize = "var(--font-size-l)",
  fontWeight = "var(--font-weight-bold)",
  padding = "var(--padding-sm) var(--padding-m)",
  onClick,
}) => {
  return (
    <button
      className={`button ${useLightTheme ? "button-light" : ""}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ width, height, fontSize, fontWeight, padding }}
    >
      {label}
    </button>
  );
};

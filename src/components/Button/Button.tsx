import { FC, ReactNode } from "react";
import "./button.css";

export interface ButtonProps {
  label: string | ReactNode;
  disabled?: boolean;
  useLightTheme?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
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
  tooltip,
}) => {
  return (
    <div className="button-container">
      <button
        className={`button ${useLightTheme ? "button-light" : ""}`}
        type="button"
        disabled={disabled}
        onClick={(e) => onClick?.(e)}
        style={{ width, height, fontSize, fontWeight, padding }}
      >
        {typeof label === "string" ? <span>{label}</span> : label}
      </button>
      {tooltip && <div className="button-tooltip">{tooltip}</div>}
    </div>
  );
};

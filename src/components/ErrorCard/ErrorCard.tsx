import { FC, ReactNode } from "react";
import "./errorcard.css";

interface ErrorCardProps {
  errorTitle: string;
  errorMessage: string;
  children?: ReactNode;
}

export const ErrorCard: FC<ErrorCardProps> = ({
  errorTitle,
  errorMessage,
  children,
}) => {
  return (
    <div className="errorcard">
      <h2 className="errorcard__title">{errorTitle}</h2>
      <p className="errorcard__message">{errorMessage}</p>
      {children}
    </div>
  );
};

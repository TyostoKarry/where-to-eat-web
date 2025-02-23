import ErrorCross from "@assets/icons/error-cross.svg?react";
import { FC, useState, useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className={`toast ${fadeOut ? "hide" : ""}`} onClick={handleClose}>
      <ErrorCross className="toast__icon" />
      <span className="toast__message">{message}</span>
    </div>
  );
};

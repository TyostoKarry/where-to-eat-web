import { FC } from "react";
import "./topbar.css";
import { GitHubButton } from "@components/GitHubButton";

export const TopBar: FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="drawer-button">☰</button>
        <span className="topbar-title">Where To Eat</span>
      </div>
      <div className="topbar-right">
        <GitHubButton />
      </div>
    </header>
  );
};

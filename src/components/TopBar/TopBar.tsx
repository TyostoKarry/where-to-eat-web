import "./topbar.css";
import { Button } from "@components/Button";
import { GitHubButton } from "@components/GitHubButton";
import { FC } from "react";

interface TopBarProps {
  openUserLocationMapModal: () => void;
}

export const TopBar: FC<TopBarProps> = ({ openUserLocationMapModal }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="drawer-button">☰</button>
        <span className="topbar-title">Where To Eat</span>
      </div>
      <Button
        label="Select Location"
        useLightTheme
        width="auto"
        fontSize="var(--font-size-l)"
        onClick={openUserLocationMapModal}
      />
      <GitHubButton />
    </header>
  );
};

import { FC, useState } from "react";
import "./topbar.css";
import { Button } from "@components/Button";
import { UserLocationMap } from "@components/UserLocationMap";
import { GitHubButton } from "@components/GitHubButton";

export const TopBar: FC = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="topbar-container">
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
          onClick={() => {
            setShowMap((prev) => !prev);
          }}
        />
        <div className="topbar-right">
          <GitHubButton />
        </div>
      </header>
      <div className={`userlocation-map-container ${showMap ? "open" : ""}`}>
        <UserLocationMap />
      </div>
    </div>
  );
};

import { FC, useState } from "react";
import "./topbar.css";
import { Button } from "@components/Button";
import { UserLocationMap } from "@components/UserLocationMap";
import { GitHubButton } from "@components/GitHubButton";

interface TopBarProps {
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number }) => void;
}

export const TopBar: FC<TopBarProps> = ({ userLocation, setUserLocation }) => {
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
      {userLocation && (
        <div className={`userlocation-map-container ${showMap ? "open" : ""}`}>
          <UserLocationMap
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            shouldRecenter={showMap}
          />
        </div>
      )}
    </div>
  );
};

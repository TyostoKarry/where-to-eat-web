import { FC, useState, useRef } from "react";
import "./topbar.css";
import { Button } from "@components/Button";
import { UserLocationMap } from "@components/UserLocationMap";
import DoubleChevronUp from "@assets/icons/double-chevron-up.svg?react";
import CenterLocation from "@assets/icons/center-location.svg?react";
import { GitHubButton } from "@components/GitHubButton";

interface TopBarProps {
  userLocation: { lat: number; lon: number } | null;
  setUserLocation: (location: { lat: number; lon: number }) => void;
}

export const TopBar: FC<TopBarProps> = ({ userLocation, setUserLocation }) => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<{ centerMap: () => void }>(null);

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
          disabled={!userLocation}
        />
        <div className="topbar-right">
          <GitHubButton />
        </div>
      </header>
      {userLocation && (
        <div className={`userlocation-map-container ${showMap ? "open" : ""}`}>
          <UserLocationMap
            ref={mapRef}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            shouldRecenter={showMap}
          />
          <div className="map-button-container">
            <Button
              label={<CenterLocation className="button-icon" />}
              useLightTheme
              fontSize="var(--font-size-l)"
              padding="0 var(--padding-l)"
              width="auto"
              height="30px"
              onClick={() => {
                mapRef.current?.centerMap();
              }}
              disabled={!userLocation}
            />
            <Button
              label={<DoubleChevronUp className="button-icon" />}
              useLightTheme
              fontSize="var(--font-size-l)"
              padding="0"
              height="30px"
              onClick={() => {
                setShowMap(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

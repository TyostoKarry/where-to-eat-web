import { FC, useRef, useState, useEffect } from "react";
import { Button } from "@components/Button";
import { UserLocationMap } from "@components/UserLocationMap/UserLocationMap";
import CenterLocation from "@assets/icons/center-location.svg?react";
import "./userlocationmapmodal.css";

interface UserLocationMapModalProps {
  userLocation: { lat: number; lon: number };
  setUserLocation: (location: { lat: number; lon: number }) => void;
  onClose: () => void;
}

export const UserLocationMapModal: FC<UserLocationMapModalProps> = ({
  userLocation,
  setUserLocation,
  onClose,
}) => {
  const userLocationMapRef = useRef<{
    centerMap: () => void;
    centerMapOnDeviceLocation: () => void;
  }>(null);
  const [pendingUserLocation, setPendingUserLocation] = useState(userLocation);

  useEffect(() => {
    setPendingUserLocation(userLocation);
  }, [userLocation]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="user-location-map-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="user-location-map-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <UserLocationMap
          ref={userLocationMapRef}
          userLocation={pendingUserLocation}
          setUserLocation={setPendingUserLocation}
          shouldRecenter={true}
        />
        <div className="user-location-map-modal-button-container">
          <div className="user-location-map-modal-lcoation-buttons">
            <Button
              label={<CenterLocation className="center-icon" />}
              useLightTheme
              fontSize="var(--font-size-l)"
              padding="0 var(--padding-l)"
              width="auto"
              height="32px"
              onClick={() => userLocationMapRef.current?.centerMap()}
            />
            <Button
              label="Use device location"
              useLightTheme
              fontSize="var(--font-size-l)"
              padding="0 var(--padding-l)"
              width="auto"
              height="32px"
              onClick={() => {
                userLocationMapRef.current?.centerMapOnDeviceLocation();
              }}
            />
          </div>
          <div className="user-location-map-modal-cancel-save-buttons">
            <Button
              label="Cancel"
              useLightTheme
              onClick={onClose}
              height="32px"
            />
            <Button
              label="Save"
              useLightTheme
              onClick={() => {
                setUserLocation(pendingUserLocation);
                onClose();
              }}
              height="32px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

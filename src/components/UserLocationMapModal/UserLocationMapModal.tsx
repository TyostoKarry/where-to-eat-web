import CenterLocation from "@assets/icons/center-location.svg?react";
import ErrorCross from "@assets/icons/error-cross.svg?react";
import { Button } from "@components/Button";
import { UserLocationMap } from "@components/UserLocationMap/UserLocationMap";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useRef, useState, useEffect, useContext } from "react";
import "./userlocationmapmodal.css";

interface UserLocationMapModalProps {
  userLocation: { lat: number; lon: number } | null;
  setToast: (toast: { message: string; visible: boolean }) => void;
}

export const UserLocationMapModal: FC<UserLocationMapModalProps> = ({
  userLocation,
  setToast,
}) => {
  const { handleSetUserLocationManually, closeUserLocationMapModal } =
    useRestaurant();
  const lang = useContext(LanguageContext);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const userLocationMapRef = useRef<{
    centerMap: () => void;
    centerMapOnDeviceLocation: () => void;
  }>(null);
  const [pendingUserLocation, setPendingUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(userLocation);

  useEffect(() => {
    setPendingUserLocation(userLocation);
  }, [userLocation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        closeUserLocationMapModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeUserLocationMapModal]);

  return (
    <div className="user-location-map-modal-overlay">
      <div className="user-location-map-modal-content" ref={modalContentRef}>
        <div className="user-location-map-modal-header">
          <h3>{lang.userLocationMapModal.setUserLocation}</h3>
          <Button
            label={<ErrorCross />}
            onClick={closeUserLocationMapModal}
            width="30px"
            height="30px"
            padding="var(--padding-s)"
          />
        </div>
        <div className="user-location-map-modal-map-container">
          <UserLocationMap
            ref={userLocationMapRef}
            userLocation={pendingUserLocation}
            setUserLocation={setPendingUserLocation}
            shouldRecenter={true}
            setToast={setToast}
          />
        </div>
        <div className="user-location-map-modal-button-container">
          <div className="user-location-map-modal-location-buttons">
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
              label={lang.button.useDeviceLocation}
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
              label={lang.button.cancel}
              useLightTheme
              onClick={closeUserLocationMapModal}
              height="32px"
            />
            <Button
              label={lang.button.save}
              useLightTheme
              onClick={() => {
                if (
                  pendingUserLocation &&
                  (pendingUserLocation.lat != userLocation?.lat ||
                    pendingUserLocation.lon != userLocation?.lon)
                ) {
                  handleSetUserLocationManually(pendingUserLocation);
                }
                closeUserLocationMapModal();
              }}
              height="32px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

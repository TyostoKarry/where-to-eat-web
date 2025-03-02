import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { FC } from "react";
import "./errorstates.css";

interface UserLocationErrorProps {
  userLocationServiceDenied: boolean | null;
  openUserLocationMapModal: () => void;
}

export const UserLocationError: FC<UserLocationErrorProps> = ({
  userLocationServiceDenied,
  openUserLocationMapModal,
}) => {
  return (
    <ErrorCard
      errorTitle={
        userLocationServiceDenied
          ? "Location Access Disabled"
          : "Location Not Found"
      }
      errorMessage={
        userLocationServiceDenied
          ? "Location access is blocked in browser settings. Please enable it to find nearby restaurants or manually select a location"
          : "Couldn't determine device location. Please enable location access in your browser settings or manually select a location"
      }
    >
      <div className="errorstates__button-container">
        <Button
          label="Select Location"
          useLightTheme
          width="100%"
          padding="var(--padding-m)"
          fontSize="var(--font-size-l)"
          onClick={openUserLocationMapModal}
        />
      </div>
    </ErrorCard>
  );
};

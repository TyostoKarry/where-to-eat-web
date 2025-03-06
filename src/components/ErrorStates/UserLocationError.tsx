import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./errorstates.css";

interface UserLocationErrorProps {
  userLocationServiceDenied: boolean | null;
}

export const UserLocationError: FC<UserLocationErrorProps> = ({
  userLocationServiceDenied,
}) => {
  const { openUserLocationMapModal } = useRestaurant();
  const lang = useContext(LanguageContext);
  return (
    <ErrorCard
      errorTitle={
        userLocationServiceDenied
          ? lang.userLocationError.serviceDeniedTitle
          : lang.userLocationError.locationErrorTitle
      }
      errorMessage={
        userLocationServiceDenied
          ? lang.userLocationError.serviceDeniedMessage
          : lang.userLocationError.locationErrorMessage
      }
    >
      <div className="errorstates__button-container">
        <Button
          label={lang.button.selectLocation}
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

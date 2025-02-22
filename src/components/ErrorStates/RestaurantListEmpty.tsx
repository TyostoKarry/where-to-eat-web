import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { FC } from "react";
import "./errorstates.css";

interface UserLocationErrorProps {
  openUserLocationMapModal: () => void;
}

export const RestaurantListEmpty: FC<UserLocationErrorProps> = ({
  openUserLocationMapModal,
}) => {
  return (
    <ErrorCard
      errorTitle="No Restaurants Found"
      errorMessage="Couldn’t find any restaurants in your selected area. Try adjusting your location"
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

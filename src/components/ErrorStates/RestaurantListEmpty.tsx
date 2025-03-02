import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { FC, useContext } from "react";
import "./errorstates.css";

interface UserLocationErrorProps {
  openUserLocationMapModal: () => void;
}

export const RestaurantListEmpty: FC<UserLocationErrorProps> = ({
  openUserLocationMapModal,
}) => {
  const lang = useContext(LanguageContext);
  return (
    <ErrorCard
      errorTitle={lang.restaurantListEmpty.title}
      errorMessage={lang.restaurantListEmpty.message}
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

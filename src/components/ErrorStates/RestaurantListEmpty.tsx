import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./errorstates.css";

export const RestaurantListEmpty: FC = () => {
  const { openUserLocationMapModal } = useRestaurant();
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

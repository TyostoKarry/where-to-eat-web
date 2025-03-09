import { Button } from "@components/Button";
import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./errorstates.css";

export const FilteredRestaurantsEmpty: FC = () => {
  const { openFilterModal } = useRestaurant();
  const lang = useContext(LanguageContext);
  return (
    <ErrorCard
      errorTitle={lang.filteredRestaurantsEmpty.title}
      errorMessage={lang.filteredRestaurantsEmpty.message}
    >
      <div className="errorstates__button-container">
        <Button
          label={lang.button.updateFilters}
          onClick={openFilterModal}
          useLightTheme
          width="100%"
        />
      </div>
    </ErrorCard>
  );
};

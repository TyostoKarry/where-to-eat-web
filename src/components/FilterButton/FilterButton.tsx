import FilterIcon from "@assets/icons/filter.svg?react";
import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./filterbutton.css";

export const FilterButton: FC = () => {
  const {
    openFilterModal,
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
    availableAmenity,
    availableCuisines,
    availableDietaryOptions,
  } = useRestaurant();
  const lang = useContext(LanguageContext);

  const activeFiltersCount =
    selectedAmenity.length +
    selectedCuisines.length +
    selectedDietaryOptions.length;
  const possibleFiltersCount =
    availableCuisines.length + availableDietaryOptions.length;
  const isDisabled = possibleFiltersCount === 0 && availableAmenity.length < 2;

  return (
    <div className="filter-button-wrapper">
      <Button
        label={
          <div className="filter-button-content">
            <FilterIcon className="filter-icon" />
            <span className="filter-button-text">{lang.button.filter}</span>
          </div>
        }
        onClick={openFilterModal}
        width="auto"
        disabled={isDisabled}
        tooltip={isDisabled ? lang.filterModal.noFilterOptions : ""}
      />
      {activeFiltersCount > 0 && (
        <span className="filter-count-badge">{activeFiltersCount}</span>
      )}
    </div>
  );
};

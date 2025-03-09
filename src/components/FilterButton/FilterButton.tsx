import FilterIcon from "@assets/icons/filter.svg?react";
import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./filterbutton.css";

export const FilterButton: FC = () => {
  const { openFilterModal, selectedCuisines, selectedDietaryOptions } =
    useRestaurant();
  const lang = useContext(LanguageContext);

  const activeFiltersCount =
    selectedCuisines.length + selectedDietaryOptions.length;

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
      />
      {activeFiltersCount > 0 && (
        <span className="filter-count-badge">{activeFiltersCount}</span>
      )}
    </div>
  );
};

import ErrorCross from "@assets/icons/error-cross.svg?react";
import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useEffect, useState, useRef, useContext } from "react";
import "./filtermodal.css";

export const FilterModal: FC = () => {
  const {
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
    toggleAmenityFilter,
    toggleCuisineFilter,
    toggleDietaryFilter,
    resetFilters,
    availableCuisines,
    availableDietaryOptions,
    closeFilterModal,
  } = useRestaurant();
  const lang = useContext(LanguageContext);

  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveFiltersCount(
      selectedAmenity.length +
        selectedCuisines.length +
        selectedDietaryOptions.length,
    );
  }, [selectedAmenity, selectedCuisines, selectedDietaryOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeFilterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFilterModal]);

  return (
    <div className="filter-modal-backdrop">
      <div className="filter-modal" ref={modalRef}>
        <div className="filter-modal-header">
          <h3>{lang.filterModal.filterRestaurants}</h3>
          <Button
            label={<ErrorCross />}
            onClick={closeFilterModal}
            width="30px"
            height="30px"
            padding="var(--padding-s)"
          />
        </div>

        <div className="filter-modal-content">
          <div className="filter-section">
            <h4>{lang.filterModal.placeType}</h4>
            <div className="filter-chips">
              {["restaurant", "fast_food"].map((amenity) => (
                <div
                  key={amenity}
                  className={`filter-chip ${selectedAmenity.includes(amenity as "restaurant" | "fast_food") ? "active" : ""}`}
                  onClick={() =>
                    toggleAmenityFilter(amenity as "restaurant" | "fast_food")
                  }
                  role="button"
                >
                  {lang.filterModal[amenity as "restaurant" | "fast_food"]}
                </div>
              ))}
            </div>
          </div>

          {availableCuisines.length > 0 && (
            <div className="filter-section">
              <h4>{lang.filterModal.cuisine}</h4>
              <div className="filter-chips">
                {availableCuisines.map((cuisine) => (
                  <div
                    key={cuisine}
                    className={`filter-chip ${selectedCuisines.includes(cuisine) ? "active" : ""}`}
                    onClick={() => toggleCuisineFilter(cuisine)}
                    role="button"
                  >
                    {cuisine}
                  </div>
                ))}
              </div>
            </div>
          )}

          {availableDietaryOptions.length > 0 && (
            <div className="filter-section">
              <h4>{lang.filterModal.dietaryOptions}</h4>
              <div className="filter-chips">
                {availableDietaryOptions.map((option) => (
                  <div
                    key={option}
                    className={`filter-chip ${selectedDietaryOptions.includes(option) ? "active" : ""}`}
                    onClick={() => toggleDietaryFilter(option)}
                    role="button"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="filter-modal-footer">
          {activeFiltersCount > 0 && (
            <Button
              label={lang.button.reset}
              onClick={resetFilters}
              width="auto"
            />
          )}
          <Button
            label={`${lang.button.apply}${activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}`}
            onClick={closeFilterModal}
            width="auto"
            useLightTheme
          />
        </div>
      </div>
    </div>
  );
};

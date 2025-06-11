import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext, useMemo } from "react";
import "./lastrestaurantpageinfo.css";

export const LastRestaurantPageInfo: FC = () => {
  const {
    openFilterModal,
    openUserLocationMapModal,
    userLocation,
    restaurantData,
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
  } = useRestaurant();
  const lang = useContext(LanguageContext);

  const formattedLocation = userLocation
    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`
    : "Unknown location";

  const filteredCount = useMemo(() => {
    if (
      selectedAmenity.length === 0 &&
      selectedCuisines.length === 0 &&
      selectedDietaryOptions.length === 0
    ) {
      return null;
    }

    return restaurantData.filter((restaurant) => {
      const amenityMatch =
        selectedAmenity.length === 0 ||
        selectedAmenity.includes(restaurant.amenity);

      const cuisineMatch =
        selectedCuisines.length === 0 ||
        (restaurant.cuisine &&
          restaurant.cuisine.some((cuisine) =>
            selectedCuisines.includes(cuisine),
          ));

      const dietaryMatch =
        selectedDietaryOptions.length === 0 ||
        (restaurant.dietaryOptions &&
          restaurant.dietaryOptions.some((option) =>
            selectedDietaryOptions.includes(option),
          ));

      return amenityMatch && cuisineMatch && dietaryMatch;
    }).length;
  }, [
    restaurantData,
    selectedAmenity,
    selectedCuisines,
    selectedDietaryOptions,
  ]);

  const hasActiveFilters = filteredCount !== null;

  return (
    <div
      className={`lastrestaurantpageinfo ${
        filteredCount === 1 || restaurantData.length === 1
          ? "force-small-screen"
          : ""
      }`}
    >
      <div className="lastrestaurantpageinfo__content">
        <h2 className="lastrestaurantpageinfo__title">
          {lang.lastRestaurantPageInfo.title}
        </h2>
        <p className="lastrestaurantpageinfo__text">
          {lang.lastRestaurantPageInfo.text}
        </p>
        <div className="lastrestaurantpageinfo__stats">
          <div className="lastrestaurantpageinfo__stat-item">
            <span className="lastrestaurantpageinfo__stat-label">
              {hasActiveFilters
                ? lang.lastRestaurantPageInfo.filteredRestaurants
                : lang.lastRestaurantPageInfo.totalRestaurants}
            </span>
            <span className="lastrestaurantpageinfo__stat-value">
              {hasActiveFilters
                ? `${filteredCount} ${lang.lastRestaurantPageInfo.of} ${restaurantData.length}`
                : restaurantData.length}
              {hasActiveFilters && (
                <span className="lastrestaurantpageinfo__stat-label">
                  {" "}
                  {lang.lastRestaurantPageInfo.total}
                </span>
              )}
            </span>
          </div>
          <div className="lastrestaurantpageinfo__stat-item">
            <span className="lastrestaurantpageinfo__stat-label">
              {lang.lastRestaurantPageInfo.searchRadius}
            </span>
            <span className="lastrestaurantpageinfo__stat-value">
              {lang.lastRestaurantPageInfo.searchRadiusKm}
            </span>
          </div>
          <div className="lastrestaurantpageinfo__stat-item">
            <span className="lastrestaurantpageinfo__stat-label">
              {lang.lastRestaurantPageInfo.currentLocation}
            </span>
            <span className="lastrestaurantpageinfo__stat-value">
              {formattedLocation}
            </span>
          </div>
        </div>
      </div>
      <div className="lastrestaurantpageinfo__actions">
        <Button
          label={
            hasActiveFilters ? lang.button.updateFilters : lang.button.filter
          }
          onClick={openFilterModal}
          useLightTheme
          width="100%"
          fontSize={
            filteredCount === 1 || restaurantData.length === 1
              ? "var(--font-size-lastrestaurantpageinfo-button)"
              : ""
          }
          padding={
            filteredCount === 1 || restaurantData.length === 1
              ? "var(--padding-lastrestaurantpageinfo-button)"
              : ""
          }
        />
        <Button
          label={lang.button.changeLocation}
          onClick={openUserLocationMapModal}
          useLightTheme
          width="100%"
          fontSize={
            filteredCount === 1 || restaurantData.length === 1
              ? "var(--font-size-lastrestaurantpageinfo-button)"
              : ""
          }
          padding={
            filteredCount === 1 || restaurantData.length === 1
              ? "var(--padding-lastrestaurantpageinfo-button)"
              : ""
          }
        />
      </div>
    </div>
  );
};

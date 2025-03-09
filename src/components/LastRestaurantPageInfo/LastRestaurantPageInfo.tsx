import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./lastrestaurantpageinfo.css";

export const LastRestaurantPageInfo: FC = () => {
  const {
    openFilterModal,
    openUserLocationMapModal,
    userLocation,
    restaurantData,
  } = useRestaurant();
  const lang = useContext(LanguageContext);

  const formattedLocation = userLocation
    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lon.toFixed(4)}`
    : "Unknown location";

  return (
    <div className="lastrestaurantpageinfo">
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
              {lang.lastRestaurantPageInfo.totalRestaurants}
            </span>
            <span className="lastrestaurantpageinfo__stat-value">
              {restaurantData.length}
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
          label={lang.button.updateFilters}
          onClick={openFilterModal}
          useLightTheme
          width="auto"
        />
        <Button
          label={lang.button.changeLocation}
          onClick={openUserLocationMapModal}
          useLightTheme
          width="auto"
        />
      </div>
    </div>
  );
};

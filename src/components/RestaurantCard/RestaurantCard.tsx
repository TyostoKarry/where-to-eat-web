import { Button } from "@components/Button";
import { RestaurantMap } from "@components/RestaurantMap";
import { LanguageContext } from "@contexts/LanguageContext";
import { formatDistance } from "@utils/distance";
import { FC, useState, useRef, useContext } from "react";
import "./restaurantcard.css";

interface RestaurantCardProps {
  restaurantName: string;
  distance: number;
  latitude: number;
  longitude: number;
  address?: string;
  postalCode?: string;
  cuisine?: string[];
  dietaryOptions?: string[];
  openingHours?: string;
  phoneNumber?: string;
  website?: string;
  updateLayout: () => void;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurantName,
  distance,
  latitude,
  longitude,
  address,
  postalCode,
  cuisine = [],
  dietaryOptions = [],
  openingHours,
  phoneNumber,
  website,
  updateLayout = () => {},
}) => {
  const lang = useContext(LanguageContext);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<{ centerMap: () => void }>(null);

  const toggleMap = () => {
    const selection = window.getSelection()?.toString();
    // If text is selected, do not toggle the map
    if (selection && selection.length > 0) {
      return;
    }

    setShowMap((prev) => !prev);
    requestAnimationFrame(() => updateLayout());
  };

  return (
    <div className="restaurantcard-masonry">
      <div className="restaurantcard" onClick={() => toggleMap()}>
        <div className="restaurantcard-content">
          <div className="title-container">
            <h2 className="title">{restaurantName}</h2>
            <div className="distance-badge">{formatDistance(distance)}</div>
          </div>
          <div className="title-break-line" />

          <div className="restaurantcard-info-container">
            {address && (
              <div className="selection">
                <span className="label">{lang.restaurantCard.address}</span>
                <div className="address">
                  <p>{address}</p>
                  <p>{postalCode}</p>
                </div>
              </div>
            )}

            {cuisine.length > 0 && (
              <div className="selection">
                <span className="label">
                  {lang.restaurantCard.cuisineOptions}
                </span>
                <p className="cuisine">{cuisine.join(", ")}</p>
              </div>
            )}

            {dietaryOptions.length > 0 && (
              <div className="selection">
                <span className="label">
                  {lang.restaurantCard.dietaryOptions}
                </span>
                <p className="dietaryoptions">{dietaryOptions.join(", ")}</p>
              </div>
            )}

            {openingHours && (
              <div className="selection">
                <span className="label">
                  {lang.restaurantCard.openingHours}
                </span>
                <div className="openinghours">
                  {openingHours.split(";").map((line, index) => {
                    const [days, time] = line.trim().split(" ");
                    return (
                      <div className="opening-hours-row" key={index}>
                        <span className="opening-hours-day">{days}</span>
                        <span className="opening-hours-time">{time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {phoneNumber && (
              <div className="selection">
                <span className="label">{lang.restaurantCard.phoneNumber}</span>
                <p className="contact">{phoneNumber}</p>
              </div>
            )}
          </div>

          <div className="websitebutton">
            <Button
              label={
                website
                  ? lang.restaurantCard.visitWebsite
                  : lang.restaurantCard.searchOnGoogle
              }
              useLightTheme
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  website ||
                    `https://www.google.com/search?q=${encodeURIComponent(restaurantName)}`,
                );
              }}
              width="auto"
              fontSize="var(--font-size-website-button)"
              padding="var(--padding-website-button)"
            />
          </div>
        </div>
        {showMap && (
          <div className={`map-container`}>
            <div className="map" onClick={(e) => e.stopPropagation()}>
              <RestaurantMap
                ref={mapRef}
                latitude={latitude}
                longitude={longitude}
              />
            </div>
            <div className="map-buttons">
              <Button
                label={lang.button.center}
                useLightTheme
                onClick={(e) => {
                  e.stopPropagation();
                  mapRef.current?.centerMap();
                }}
                width="auto"
                fontSize="var(--font-size-m)"
                padding="var(--padding-s) var(--padding-s)"
              />
              <Button
                label={lang.button.close}
                useLightTheme
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMap();
                }}
                width="auto"
                fontSize="var(--font-size-m)"
                padding="var(--padding-s) var(--padding-s)"
              />
            </div>
          </div>
        )}
      </div>
      {/* 
      Masonry does not dynamically adjust layout smoothly when an element inside a card expands. 
      This invisible div acts as a placeholder with the same height as the map when it's opened. 
      It shrinks at the same pace as the map expands, tricking Masonry into adjusting the layout instantly.
      */}
      {showMap && <div className={`map-container-masonry-fix`} />}
    </div>
  );
};

import { FC, useState, useRef } from "react";
import { Button } from "@components/Button";
import { formatDistance } from "@utils/distance";
import { RestaurantMap } from "@components/RestaurantMap";
import "./RestaurantCard.css";

interface RestaurantCardProps {
  restaurantName: string;
  address?: string;
  distance: number;
  latitude: number;
  longitude: number;
  cuisine?: string[];
  dietaryOptions?: string[];
  openingHours?: string;
  phoneNumber?: string;
  website?: string;
  updateLayout: () => void;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  restaurantName,
  address,
  distance,
  latitude,
  longitude,
  cuisine = [],
  dietaryOptions = [],
  openingHours,
  phoneNumber,
  website,
  updateLayout = () => {},
}) => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<{ centerMap: () => void }>(null);

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    setTimeout(() => updateLayout(), 10);
  };

  return (
    <div className="restaurantcard-masonry">
      <div className="restaurantcard">
        <Button
          label={formatDistance(distance)}
          useLightTheme
          width="auto"
          fontSize="var(--font-size-xl)"
          onClick={() => toggleMap()}
        />

        <div className="info">
          <h2 className="title">{restaurantName}</h2>

          {address && (
            <div className="selection">
              <span className="label">Address:</span>
              <p className="address">{address}</p>
            </div>
          )}

          {cuisine.length > 0 && (
            <div className="selection">
              <span className="label">Cuisine Options:</span>
              <p className="cuisine">{cuisine.join(", ")}</p>
            </div>
          )}

          {dietaryOptions.length > 0 && (
            <div className="selection">
              <span className="label">Dietary Options:</span>
              <p className="dietaryoptions">{dietaryOptions.join(", ")}</p>
            </div>
          )}

          {openingHours && (
            <div className="selection">
              <span className="label">Opening Hours:</span>
              <p className="openinghours">{openingHours}</p>
            </div>
          )}

          {phoneNumber && (
            <div className="selection">
              <span className="label">Phone Number:</span>
              <p className="contact">{phoneNumber}</p>
            </div>
          )}

          <div className="websitebutton">
            <Button
              label={website ? "Visit Website" : "Search on Google"}
              useLightTheme
              onClick={() =>
                window.open(
                  website ||
                    `https://www.google.com/search?q=${encodeURIComponent(restaurantName)}`
                )
              }
              width="auto"
              fontSize="var(--font-size-xl)"
              padding="var(--padding-m) var(--padding-l)"
            />
          </div>
        </div>
        {showMap && (
          <div className={`map-container`}>
            <div className="map">
              <RestaurantMap
                ref={mapRef}
                latitude={latitude}
                longitude={longitude}
              />
            </div>
            <div className="map-buttons">
              <Button
                label="Center"
                useLightTheme
                onClick={() => mapRef.current?.centerMap()}
                width="auto"
                fontSize="var(--font-size-m)"
                padding="var(--padding-s) var(--padding-s)"
              />
              <Button
                label="Close"
                useLightTheme
                onClick={() => toggleMap()}
                width="auto"
                fontSize="var(--font-size-m)"
                padding="var(--padding-s) var(--padding-s)"
              />
            </div>
          </div>
        )}
      </div>
      {showMap && <div className={`map-container-masonry-fix`} />}
    </div>
  );
};

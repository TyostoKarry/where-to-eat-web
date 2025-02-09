import { Button } from "@components/Button";
import { RestaurantMap } from "@components/RestaurantMap";
import { formatDistance } from "@utils/distance";
import { FC, useState, useRef } from "react";
import "./RestaurantCard.css";

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
          width="100px"
          fontSize="var(--font-size-xl)"
          onClick={() => toggleMap()}
        />

        <div className="info">
          <h2 className="title">{restaurantName}</h2>

          {address && (
            <div className="selection">
              <span className="label">Address:</span>
              <div className="address">
                <p>{address}</p>
                <p>{postalCode}</p>
              </div>
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
                    `https://www.google.com/search?q=${encodeURIComponent(restaurantName)}`,
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
      {/* 
      Masonry does not dynamically adjust layout smoothly when an element inside a card expands. 
      This invisible div acts as a placeholder with the same height as the map when it's opened. 
      It shrinks at the same pace as the map expands, tricking Masonry into adjusting the layout instantly.
      */}
      {showMap && <div className={`map-container-masonry-fix`} />}
    </div>
  );
};

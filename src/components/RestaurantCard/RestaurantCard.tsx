import React from "react";
import { Button } from "@components/Button";
import "./RestaurantCard.css";

interface RestaurantCardProps {
  restaurantName: string;
  address?: string;
  distance: string;
  cuisine?: string[];
  dietaryOptions?: string[];
  openingHours?: string;
  phoneNumber?: string;
  website?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantName,
  address,
  distance,
  cuisine = [],
  dietaryOptions = [],
  openingHours,
  phoneNumber,
  website,
}) => {
  return (
    <div className="restaurantcard">
      <Button
        label={distance}
        useLightTheme
        width="auto"
        fontSize="var(--font-size-xl)"
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
    </div>
  );
};

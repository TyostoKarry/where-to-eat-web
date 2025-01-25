import React, { useState, useEffect } from "react";
import Masonry from "masonry-layout";
import { useUserLocation } from "@hooks/useUserLocation";
import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantCard } from "@components/RestaurantCard";
import "./restaurantlist.css";

export const RestaurantList: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const { latitude, longitude, error } = useUserLocation();

  React.useEffect(() => {
    if (latitude != null && longitude != null) {
      fetchOSMOverpassAPI(latitude, longitude).then((data) =>
        setRestaurantData(data)
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (restaurantData.length === 0) return;

    const masonry = new Masonry(".restaurantlist", {
      itemSelector: ".restaurantcard",
      columnWidth: ".restaurantcard",
      gutter: 24,
      horizontalOrder: true,
      fitWidth: true,
    });

    return () => masonry.destroy();
  }, [restaurantData]);

  return (
    <div className="restaurantlist">
      {restaurantData.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurantName={restaurant.name}
          distance={restaurant.distance}
          address={restaurant.address}
          cuisine={restaurant.cuisine}
          dietaryOptions={restaurant.dietaryOptions}
          openingHours={restaurant.openingHours}
          phoneNumber={restaurant.phoneNumber}
          website={restaurant.website}
        />
      ))}
    </div>
  );
};

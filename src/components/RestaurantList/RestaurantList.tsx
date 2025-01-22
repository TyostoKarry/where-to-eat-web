import React, { useState, useEffect } from "react";
import Masonry from "masonry-layout";
import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantCard } from "@components/RestaurantCard";
import "./restaurantlist.css";

export const RestaurantList: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);

  React.useEffect(() => {
    const query = `
    [out:json];
    node["amenity"~"restaurant|fast_food"](around:2000,${lat},${lon});
    out body;
    `;
    fetchOSMOverpassAPI(query).then((data) => setRestaurantData(data));
  }, []);

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
          address={restaurant.address}
          distance="200m"
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

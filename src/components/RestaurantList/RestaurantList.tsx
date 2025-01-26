import { FC, useState, useEffect } from "react";
import Masonry from "masonry-layout";
import { useUserLocation } from "@hooks/useUserLocation";
import { fetchOSMOverpassAPI, Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantCard } from "@components/RestaurantCard";
import "./restaurantlist.css";

export const RestaurantList: FC = () => {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [masonry, setMasonry] = useState<Masonry | null>(null);
  const { latitude, longitude, error } = useUserLocation();

  useEffect(() => {
    if (latitude != null && longitude != null) {
      fetchOSMOverpassAPI(latitude, longitude).then((data) =>
        setRestaurantData(data)
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (restaurantData.length === 0) return;

    if (!masonry) {
      const newMasonry = new Masonry(".restaurantlist", {
        itemSelector: ".restaurantcard-masonry",
        columnWidth: ".restaurantcard",
        gutter: 24,
        horizontalOrder: true,
        fitWidth: true,
      });

      setMasonry(newMasonry);
    } else {
      masonry.layout();
    }
  }, [restaurantData]);

  return (
    <div className="restaurantlist">
      {restaurantData.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurantName={restaurant.name}
          distance={restaurant.distance}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
          address={restaurant.address}
          cuisine={restaurant.cuisine}
          dietaryOptions={restaurant.dietaryOptions}
          openingHours={restaurant.openingHours}
          phoneNumber={restaurant.phoneNumber}
          website={restaurant.website}
          updateLayout={() => masonry?.layout()}
        />
      ))}
    </div>
  );
};

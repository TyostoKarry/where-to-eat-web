import { Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantCard } from "@components/RestaurantCard";
import Masonry from "masonry-layout";
import { FC, useState, useEffect } from "react";
import "./restaurantlist.css";

interface RestaurantListProps {
  restaurantData: Restaurant[];
}

export const RestaurantList: FC<RestaurantListProps> = ({ restaurantData }) => {
  const [masonry, setMasonry] = useState<Masonry | null>(null);

  useEffect(() => {
    if (restaurantData.length === 0) return;

    masonry?.destroy();

    const newMasonry = new Masonry(".restaurantlist", {
      itemSelector: ".restaurantcard-masonry",
      columnWidth: ".restaurantcard",
      gutter: 24,
      fitWidth: true,
    });

    setMasonry(newMasonry);

    return () => {
      newMasonry.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          postalCode={restaurant.postalCode}
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

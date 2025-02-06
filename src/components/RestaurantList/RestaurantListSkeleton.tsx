import { FC, useState, useEffect } from "react";
import Masonry from "masonry-layout";
import { RestaurantCardSkeleton } from "@components/RestaurantCard";
import "./RestaurantListskeleton.css";

export const RestaurantListSkeleton: FC = () => {
  const [masonry, setMasonry] = useState<Masonry | null>(null);

  useEffect(() => {
    setTimeout(() => masonry?.layout(), 10);
  }, [masonry]);

  useEffect(() => {
    masonry?.destroy();

    const newMasonry = new Masonry(".restaurantlist-skeleton", {
      itemSelector: ".restaurantcard-skeleton-masonry",
      columnWidth: ".restaurantcard-skeleton",
      gutter: 24,
      fitWidth: true,
    });

    setMasonry(newMasonry);

    return () => {
      newMasonry.destroy();
    };
  }, []);

  return (
    <div className="restaurantlist-skeleton">
      {Array.from({ length: 20 }).map((_, index) => (
        <RestaurantCardSkeleton
          key={index}
          infoCount={Math.floor(Math.random() * 5) + 1}
        />
      ))}
    </div>
  );
};

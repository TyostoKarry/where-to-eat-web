import { RestaurantCardSkeleton } from "@components/RestaurantCard";
import Masonry from "masonry-layout";
import { FC, useState, useEffect } from "react";
import "./restaurantlistskeleton.css";

export const RestaurantListSkeleton: FC = () => {
  const [masonry, setMasonry] = useState<Masonry | null>(null);

  const getGutterSize = () => {
    // Smaller separation between cards on smaller screens
    return window.innerWidth <= 900 ? 12 : 24;
  };

  useEffect(() => {
    setTimeout(() => masonry?.layout(), 10);
  }, [masonry]);

  useEffect(() => {
    masonry?.destroy();

    const newMasonry = new Masonry(".restaurantlist-skeleton", {
      itemSelector: ".restaurantcard-skeleton-masonry",
      columnWidth: ".restaurantcard-skeleton",
      gutter: getGutterSize(),
      fitWidth: true,
    });

    setMasonry(newMasonry);

    return () => {
      newMasonry.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

import { Restaurant } from "@api/OSMOverpassAPI";
import { RestaurantCard } from "@components/RestaurantCard";
import Masonry from "masonry-layout";
import { FC, useState, useEffect, useRef } from "react";
import "./restaurantlist.css";

interface RestaurantListProps {
  restaurantData: Restaurant[];
  currentPage: number;
  setMasonryWidth: (width: number) => void;
  ITEMS_PER_PAGE: number;
}

export const RestaurantList: FC<RestaurantListProps> = ({
  restaurantData,
  currentPage,
  setMasonryWidth,
  ITEMS_PER_PAGE,
}) => {
  const [masonry, setMasonry] = useState<Masonry | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return restaurantData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getGutterSize = () => {
    // Smaller separation between cards on smaller screens
    return window.innerWidth <= 900 ? 12 : 24;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMasonryWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setMasonryWidth]);

  useEffect(() => {
    if (restaurantData.length === 0) return;

    masonry?.destroy();

    if (containerRef.current) {
      const newMasonry = new Masonry(containerRef.current, {
        itemSelector: ".restaurantcard-masonry",
        columnWidth: ".restaurantcard",
        gutter: getGutterSize(),
        fitWidth: true,
      });

      setMasonry(newMasonry);
    }

    return () => {
      masonry?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantData, currentPage]);

  const handleUpdateLayout = () => {
    masonry?.layout();
  };

  return (
    <div className="restaurantlist" ref={containerRef}>
      {getCurrentPageItems().map((restaurant) => (
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
          updateLayout={handleUpdateLayout}
        />
      ))}
    </div>
  );
};

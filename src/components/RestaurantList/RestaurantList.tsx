import { Restaurant } from "@api/OSMOverpassAPI";
import { PaginationControls } from "@components/PaginationControls";
import { RestaurantCard } from "@components/RestaurantCard";
import Masonry from "masonry-layout";
import { FC, useState, useEffect, useRef } from "react";
import "./restaurantlist.css";

interface RestaurantListProps {
  restaurantData: Restaurant[];
}

export const RestaurantList: FC<RestaurantListProps> = ({ restaurantData }) => {
  const [masonry, setMasonry] = useState<Masonry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [masonryWidth, setMasonryWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 50;
  const totalItems = restaurantData.length;

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return restaurantData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Create ResizeObserver to monitor the width of the masonry container
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Update the width state based on the actual computed width
        setMasonryWidth(entry.contentRect.width);
      }
    });

    // Start observing the container
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (restaurantData.length === 0) return;

    masonry?.destroy();

    if (containerRef.current) {
      const newMasonry = new Masonry(containerRef.current, {
        itemSelector: ".restaurantcard-masonry",
        columnWidth: ".restaurantcard",
        gutter: 24,
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

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  };

  return (
    <div className="restaurantlist-container">
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

      {restaurantData.length > ITEMS_PER_PAGE && (
        <div
          className="pagination-wrapper"
          style={{
            width: masonryWidth > 0 ? `${masonryWidth}px` : "auto",
            maxWidth: "100%",
          }}
        >
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            restaurantCount={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      )}
    </div>
  );
};

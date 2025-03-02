import { Restaurant } from "@api/OSMOverpassAPI";
import { LastRestaurantPageInfo } from "@components/LastRestaurantPageInfo";
import { PaginationControls } from "@components/PaginationControls";
import { RestaurantList } from "@components/RestaurantList";
import { FC, useState } from "react";
import "./restaurantpage.css";

interface RestaurantPageProps {
  restaurantData: Restaurant[];
  openUserLocationMapModal: () => void;
}

export const RestaurantPage: FC<RestaurantPageProps> = ({
  restaurantData,
  openUserLocationMapModal,
}) => {
  const ITEMS_PER_PAGE = 50;
  const totalItems = restaurantData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);
  const [masonryWidth, setMasonryWidth] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  };

  return (
    <div className="restaurantpage">
      <RestaurantList
        restaurantData={restaurantData}
        currentPage={currentPage}
        setMasonryWidth={setMasonryWidth}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />

      {currentPage === totalPages && (
        <div
          className="restaurantpage__lastrestaurantpageinfo-wrapper"
          style={{
            width: masonryWidth > 0 ? `${masonryWidth}px` : "auto",
            maxWidth: "100%",
          }}
        >
          <LastRestaurantPageInfo onSelectLocation={openUserLocationMapModal} />
        </div>
      )}

      {restaurantData.length > ITEMS_PER_PAGE && (
        <div
          className="restaurantpage__pagination-wrapper"
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
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

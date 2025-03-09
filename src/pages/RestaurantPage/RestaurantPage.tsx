import { Restaurant } from "@api/OSMOverpassAPI";
import { FilteredRestaurantsEmpty } from "@components/ErrorStates";
import { LastRestaurantPageInfo } from "@components/LastRestaurantPageInfo";
import { PaginationControls } from "@components/PaginationControls";
import { RestaurantList } from "@components/RestaurantList";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useState, useMemo } from "react";
import "./restaurantpage.css";

interface RestaurantPageProps {
  restaurantData: Restaurant[];
}

export const RestaurantPage: FC<RestaurantPageProps> = ({ restaurantData }) => {
  const ITEMS_PER_PAGE = 50;
  const { selectedCuisines, selectedDietaryOptions } = useRestaurant();
  const [currentPage, setCurrentPage] = useState(1);
  const [masonryWidth, setMasonryWidth] = useState(0);

  const filteredRestaurants = useMemo(() => {
    return restaurantData.filter((restaurant) => {
      const cuisineMatch =
        selectedCuisines.length === 0 ||
        (restaurant.cuisine &&
          restaurant.cuisine.some((cuisine) =>
            selectedCuisines.includes(cuisine),
          ));

      const dietaryMatch =
        selectedDietaryOptions.length === 0 ||
        (restaurant.dietaryOptions &&
          restaurant.dietaryOptions.some((option) =>
            selectedDietaryOptions.includes(option),
          ));

      return cuisineMatch && dietaryMatch;
    });
  }, [restaurantData, selectedCuisines, selectedDietaryOptions]);

  const totalItems = filteredRestaurants.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useMemo(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCuisines, selectedDietaryOptions]);

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
      {filteredRestaurants.length === 0 ? (
        <div className="restaurantpage__empty-filtered-restaurants-wrapper">
          <FilteredRestaurantsEmpty />
        </div>
      ) : (
        <>
          <RestaurantList
            restaurantData={filteredRestaurants}
            currentPage={currentPage}
            setMasonryWidth={setMasonryWidth}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          />

          {currentPage === totalPages && totalItems > 0 && (
            <div
              className="restaurantpage__lastrestaurantpageinfo-wrapper"
              style={{
                width: masonryWidth > 0 ? `${masonryWidth}px` : "auto",
                maxWidth: "100%",
              }}
            >
              <LastRestaurantPageInfo />
            </div>
          )}

          {totalItems > ITEMS_PER_PAGE && (
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
        </>
      )}
    </div>
  );
};

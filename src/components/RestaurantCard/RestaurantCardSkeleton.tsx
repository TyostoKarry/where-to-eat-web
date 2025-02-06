import { FC } from "react";
import "./RestaurantCardSkeleton.css";

interface RestaurantCardSkeletonProps {
  infoCount?: number;
}

export const RestaurantCardSkeleton: FC<RestaurantCardSkeletonProps> = ({
  infoCount = 0,
}) => {
  return (
    <div className="restaurantcard-skeleton-masonry">
      <div className="restaurantcard-skeleton">
        <div className="restaurantcard-skeleton_distance-button" />
        <div className="restaurantcard-skeleton_data-container">
          <div className="restaurantcard-skeleton__name-wrapper">
            <div className="restaurantcard-skeleton__name" />
          </div>
          {Array.from({ length: infoCount }).map((_, index) => (
            <div
              key={index}
              className="restaurantcard-skeleton__info-container"
            >
              <div className="restaurantcard-skeleton__title" />
              <div className="restaurantcard-skeleton__info" />
            </div>
          ))}
        </div>
        <div className="restaurantcard-skeleton__website-button" />
      </div>
    </div>
  );
};

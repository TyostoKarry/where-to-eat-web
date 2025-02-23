import { FC } from "react";
import "./restaurantcardskeleton.css";

interface RestaurantCardSkeletonProps {
  infoCount?: number;
}

export const RestaurantCardSkeleton: FC<RestaurantCardSkeletonProps> = ({
  infoCount = 0,
}) => {
  const getRandomWidth = (min: number, max: number) =>
    `${Math.floor(Math.random() * (max - min + 1) + min)}px`;
  const getRandomHeight = () => (Math.random() < 0.25 ? "50px" : "25px");

  return (
    <div className="restaurantcard-skeleton-masonry">
      <div className="restaurantcard-skeleton">
        <div className="restaurantcard-skeleton_distance-button" />
        <div className="restaurantcard-skeleton_data-container">
          <div className="restaurantcard-skeleton__name-wrapper">
            <div
              className="restaurantcard-skeleton__name"
              style={{ width: getRandomWidth(180, 220) }}
            />
            <div className="restaurantcard-skeleton__name-separator" />
          </div>
          {infoCount > 0 && (
            <div className="restaurantcard-skeleton__info-wrapper">
              {Array.from({ length: infoCount }).map((_, index) => (
                <div
                  key={index}
                  className="restaurantcard-skeleton__info-container"
                >
                  <div
                    className="restaurantcard-skeleton__title"
                    style={{ width: getRandomWidth(70, 100) }}
                  />
                  <div
                    className="restaurantcard-skeleton__info"
                    style={{
                      width: getRandomWidth(180, 240),
                      height: getRandomHeight(),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="restaurantcard-skeleton__website-button" />
      </div>
    </div>
  );
};

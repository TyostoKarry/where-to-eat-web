import { FC } from "react";
import "./restaurantcardskeleton.css";

interface RestaurantCardSkeletonProps {
  infoCount?: number;
}

export const RestaurantCardSkeleton: FC<RestaurantCardSkeletonProps> = ({
  infoCount = 0,
}) => {
  const isMobile = window.innerWidth <= 900;
  // Helper function to get skeleton frame value ranges based on screen size
  const getValueRange = (
    mobileMin: number,
    mobileMax: number,
    computerMin: number,
    computerMax: number,
  ): { min: number; max: number } => {
    return isMobile
      ? { min: mobileMin, max: mobileMax }
      : { min: computerMin, max: computerMax };
  };

  // Generated skeleton frame value ranges
  const { min: titleMin, max: titleMax } = getValueRange(80, 110, 180, 230);
  const { min: labelMin, max: labelMax } = getValueRange(40, 80, 70, 100);
  const { min: infoMin, max: infoMax } = getValueRange(80, 140, 180, 240);

  const getRandomWidth = (min: number, max: number) =>
    `${Math.floor(Math.random() * (max - min + 1) + min)}px`;
  const getRandomHeight = () =>
    Math.random() < 0.25
      ? isMobile
        ? "28px"
        : "50px"
      : isMobile
        ? "14px"
        : "25px";

  return (
    <div className="restaurantcard-skeleton-masonry">
      <div className="restaurantcard-skeleton">
        <div className="restaurantcard-skeleton_data-container">
          <div className="restaurantcard-skeleton__name-wrapper">
            <div className="restaurantcard-skeleton__name-row">
              <div
                className="restaurantcard-skeleton__name"
                style={{ width: getRandomWidth(titleMin, titleMax) }}
              />
              <div className="restaurantcard-skeleton_distance" />
            </div>
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
                    style={{ width: getRandomWidth(labelMin, labelMax) }}
                  />
                  <div
                    className="restaurantcard-skeleton__info"
                    style={{
                      width: getRandomWidth(infoMin, infoMax),
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

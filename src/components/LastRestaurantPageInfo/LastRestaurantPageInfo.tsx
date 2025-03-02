import { Button } from "@components/Button";
import { FC } from "react";
import "./lastrestaurantpageinfo.css";

interface LastRestaurantPageInfoProps {
  onSelectLocation: () => void;
}

export const LastRestaurantPageInfo: FC<LastRestaurantPageInfoProps> = ({
  onSelectLocation,
}) => {
  return (
    <div className="lastrestaurantpageinfo">
      <h2 className="lastrestaurantpageinfo__text">
        You have seen all restaurants within 10 km radius. Select a new location
        to see more.
      </h2>
      <Button
        label="Change Location"
        onClick={onSelectLocation}
        useLightTheme
        width="auto"
      />
    </div>
  );
};

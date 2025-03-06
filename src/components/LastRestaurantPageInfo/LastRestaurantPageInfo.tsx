import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";
import "./lastrestaurantpageinfo.css";

export const LastRestaurantPageInfo: FC = () => {
  const { openUserLocationMapModal } = useRestaurant();
  const lang = useContext(LanguageContext);
  return (
    <div className="lastrestaurantpageinfo">
      <h2 className="lastrestaurantpageinfo__text">
        {lang.lastRestaurantPageInfo.text}
      </h2>
      <Button
        label={lang.button.changeLocation}
        onClick={openUserLocationMapModal}
        useLightTheme
        width="auto"
      />
    </div>
  );
};

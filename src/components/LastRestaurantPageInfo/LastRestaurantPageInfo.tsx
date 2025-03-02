import { Button } from "@components/Button";
import { LanguageContext } from "@contexts/LanguageContext";
import { FC, useContext } from "react";
import "./lastrestaurantpageinfo.css";

interface LastRestaurantPageInfoProps {
  onSelectLocation: () => void;
}

export const LastRestaurantPageInfo: FC<LastRestaurantPageInfoProps> = ({
  onSelectLocation,
}) => {
  const lang = useContext(LanguageContext);
  return (
    <div className="lastrestaurantpageinfo">
      <h2 className="lastrestaurantpageinfo__text">
        {lang.lastRestaurantPageInfo.text}
      </h2>
      <Button
        label={lang.button.changeLocation}
        onClick={onSelectLocation}
        useLightTheme
        width="auto"
      />
    </div>
  );
};

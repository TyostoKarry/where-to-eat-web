import "./topbar.css";
import { Button } from "@components/Button";
import { FilterButton } from "@components/FilterButton";
import { GitHubButton } from "@components/GitHubButton";
import { LanguageContext } from "@contexts/LanguageContext";
import { useRestaurant } from "@contexts/RestaurantContext";
import { FC, useContext } from "react";

export const TopBar: FC = () => {
  const { openUserLocationMapModal } = useRestaurant();
  const lang = useContext(LanguageContext);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{lang.topBar.title}</span>
      </div>
      <div className="topbar-center">
        <div className="topbar-buttons">
          <Button
            label={lang.button.selectLocation}
            useLightTheme
            width="auto"
            fontSize="var(--font-size-topbar-button)"
            padding="var(--padding-topbar-button)"
            onClick={openUserLocationMapModal}
          />
          <FilterButton />
        </div>
      </div>
      <div className="topbar-right">
        <GitHubButton />
      </div>
    </header>
  );
};

import "./topbar.css";
import { Button } from "@components/Button";
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
        <button className="drawer-button">☰</button>
        <span className="topbar-title">{lang.topBar.title}</span>
      </div>
      <Button
        label="Select Location"
        useLightTheme
        width="auto"
        fontSize="var(--font-size-l)"
        onClick={openUserLocationMapModal}
      />
      <GitHubButton />
    </header>
  );
};

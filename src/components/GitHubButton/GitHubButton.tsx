import GitHubIcon from "@assets/icons/github.svg?react";
import { LanguageContext } from "@contexts/LanguageContext";
import { FC, useContext } from "react";
import "./githubbutton.css";

const GITHUB_REPO_URL = "https://github.com/TyostoKarry/where-to-eat-web";

export const GitHubButton: FC = () => {
  const lang = useContext(LanguageContext);
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="github-button"
    >
      <GitHubIcon className="github-icon" />
      <span className="github-text">{lang.githubButton.github}</span>
    </a>
  );
};

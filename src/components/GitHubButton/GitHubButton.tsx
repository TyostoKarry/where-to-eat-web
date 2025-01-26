import { FC } from "react";
import "./GitHubButton.css";
import GitHubIcon from "@assets/icons/github.svg?react";

const GITHUB_REPO_URL = "https://github.com/TyostoKarry/where-to-eat-web";

export const GitHubButton: FC = () => {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="github-button"
    >
      <GitHubIcon className="github-icon" />
      <span className="github-text">GitHub</span>
    </a>
  );
};

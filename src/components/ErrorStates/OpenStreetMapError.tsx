import { ErrorCard } from "@components/ErrorCard";
import { LanguageContext } from "@contexts/LanguageContext";
import { FC, useContext } from "react";

export const OpenStreetMapError: FC = () => {
  const lang = useContext(LanguageContext);
  return (
    <ErrorCard
      errorTitle={lang.openStreetMapError.title}
      errorMessage={lang.openStreetMapError.message}
    />
  );
};
